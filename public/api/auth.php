<?php
/**
 * Raj Work Lab - Secure Global Admin Authentication API
 * Server-side bcrypt authentication & session management.
 */

// Allow CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

// Ensure storage directory exists and is protected
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

// Ensure .htaccess blocks direct HTTP access to data folder
$htaccessFile = $dataDir . '/.htaccess';
if (!file_exists($htaccessFile)) {
    @file_put_contents($htaccessFile, "Order Deny,Allow\nDeny from all\n");
}

$storeFile = $dataDir . '/auth_store.php';

// Helper to load store
function loadStore($file) {
    if (!file_exists($file)) {
        return [
            'username' => '',
            'password_hash' => '',
            'created_at' => null,
            'updated_at' => null,
            'sessions' => [],
            'failed_attempts' => []
        ];
    }
    $raw = @file_get_contents($file);
    if (!$raw) return null;
    // Strip php exit guard
    $json = preg_replace('/^<\?php\s+exit;\s*\?>\s*/', '', $raw);
    $data = json_decode($json, true);
    if (!is_array($data)) return null;
    if (!isset($data['sessions'])) $data['sessions'] = [];
    if (!isset($data['failed_attempts'])) $data['failed_attempts'] = [];
    return $data;
}

// Helper to save store
function saveStore($file, $data) {
    $content = "<?php exit; ?>\n" . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    return @file_put_contents($file, $content, LOCK_EX);
}

// Helper to get client IP
function getClientIp() {
    return $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
}

$store = loadStore($storeFile);
if (!$store) {
    $store = [
        'username' => '',
        'password_hash' => '',
        'created_at' => null,
        'updated_at' => null,
        'sessions' => [],
        'failed_attempts' => []
    ];
}

// Parse input
$input = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if ($rawInput) {
        $input = json_decode($rawInput, true) ?: [];
    }
}

// Determine action
$action = $_GET['action'] ?? $input['action'] ?? '';
if (!$action) {
    $path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    $parts = explode('/', $path);
    $last = end($parts);
    if ($last !== 'auth.php' && $last !== 'auth') {
        $action = $last;
    } else {
        $action = 'status';
    }
}

$clientIp = getClientIp();

// Clean up expired sessions (older than 7 days)
$now = time();
if (isset($store['sessions']) && is_array($store['sessions'])) {
    foreach ($store['sessions'] as $tok => $sData) {
        if (!isset($sData['expires_at']) || $sData['expires_at'] < $now) {
            unset($store['sessions'][$tok]);
        }
    }
}

// Clean up old failed attempts (> 15 mins)
if (isset($store['failed_attempts']) && is_array($store['failed_attempts'])) {
    foreach ($store['failed_attempts'] as $ipKey => $fData) {
        if (($now - ($fData['last_attempt'] ?? 0)) > 900) {
            unset($store['failed_attempts'][$ipKey]);
        }
    }
}

switch ($action) {
    // ------------------------------------------------------------------------
    // STATUS: Check if admin account is set up
    // ------------------------------------------------------------------------
    case 'status':
        $isSetup = !empty($store['username']) && !empty($store['password_hash']);
        echo json_encode([
            'success' => true,
            'isSetup' => $isSetup,
            'username' => $isSetup ? $store['username'] : null
        ]);
        break;

    // ------------------------------------------------------------------------
    // SETUP: Initial one-time account setup
    // ------------------------------------------------------------------------
    case 'setup':
        $isSetup = !empty($store['username']) && !empty($store['password_hash']);
        if ($isSetup) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Admin account has already been initialized. Please log in with existing credentials.'
            ]);
            exit;
        }

        $username = trim($input['username'] ?? '');
        $password = $input['password'] ?? '';

        if (strlen($username) < 3) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Username/Email must be at least 3 characters.']);
            exit;
        }

        if (strlen($password) < 6) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters for security.']);
            exit;
        }

        $hash = password_hash($password, PASSWORD_BCRYPT);
        $token = bin2hex(random_bytes(32));

        $store['username'] = $username;
        $store['password_hash'] = $hash;
        $store['created_at'] = date('c');
        $store['updated_at'] = date('c');
        $store['sessions'][$token] = [
            'username' => $username,
            'expires_at' => $now + (86400 * 7),
            'ip' => $clientIp
        ];

        saveStore($storeFile, $store);

        echo json_encode([
            'success' => true,
            'message' => 'Master admin account successfully created.',
            'token' => $token,
            'user' => [
                'username' => $username
            ]
        ]);
        break;

    // ------------------------------------------------------------------------
    // LOGIN: Authenticate against bcrypt hash
    // ------------------------------------------------------------------------
    case 'login':
        $isSetup = !empty($store['username']) && !empty($store['password_hash']);
        if (!$isSetup) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'isNotSetup' => true,
                'message' => 'Master account not set up yet. Please complete initial setup first.'
            ]);
            exit;
        }

        // Check brute-force lockout
        $ipAttempts = $store['failed_attempts'][$clientIp] ?? ['count' => 0, 'last_attempt' => 0];
        if ($ipAttempts['count'] >= 5 && ($now - $ipAttempts['last_attempt']) < 900) {
            $remainingCooldown = 900 - ($now - $ipAttempts['last_attempt']);
            $mins = ceil($remainingCooldown / 60);
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'message' => "Too many failed attempts. Security cooldown active. Please wait {$mins} minutes."
            ]);
            exit;
        }

        $username = trim($input['username'] ?? '');
        $password = $input['password'] ?? '';

        $userMatch = (strtolower($username) === strtolower($store['username']));
        $passMatch = password_verify($password, $store['password_hash']);

        if ($userMatch && $passMatch) {
            // Reset failed attempts on success
            unset($store['failed_attempts'][$clientIp]);

            $token = bin2hex(random_bytes(32));
            $store['sessions'][$token] = [
                'username' => $store['username'],
                'expires_at' => $now + (86400 * 7),
                'ip' => $clientIp
            ];
            saveStore($storeFile, $store);

            echo json_encode([
                'success' => true,
                'token' => $token,
                'user' => [
                    'username' => $store['username']
                ]
            ]);
        } else {
            // Increment failed attempt counter
            $newCount = ($ipAttempts['count'] ?? 0) + 1;
            $store['failed_attempts'][$clientIp] = [
                'count' => $newCount,
                'last_attempt' => $now
            ];
            saveStore($storeFile, $store);

            $attemptsLeft = max(0, 5 - $newCount);
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => $attemptsLeft > 0 
                    ? "Invalid credentials. {$attemptsLeft} attempt(s) remaining." 
                    : "Account temporarily locked for 15 minutes due to multiple failed attempts."
            ]);
        }
        break;

    // ------------------------------------------------------------------------
    // VERIFY: Verify session token
    // ------------------------------------------------------------------------
    case 'verify':
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        $token = '';
        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            $token = trim($matches[1]);
        } else {
            $token = $input['token'] ?? $_GET['token'] ?? '';
        }

        if ($token && isset($store['sessions'][$token])) {
            $session = $store['sessions'][$token];
            if (($session['expires_at'] ?? 0) > $now) {
                echo json_encode([
                    'success' => true,
                    'valid' => true,
                    'user' => [
                        'username' => $session['username']
                    ]
                ]);
                exit;
            }
        }

        echo json_encode(['success' => false, 'valid' => false]);
        break;

    // ------------------------------------------------------------------------
    // CHANGE PASSWORD: Update master password globally across all devices
    // ------------------------------------------------------------------------
    case 'change_password':
        $isSetup = !empty($store['username']) && !empty($store['password_hash']);
        if (!$isSetup) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Admin account not found.']);
            exit;
        }

        // Verify current credentials
        $currentPassword = $input['currentPassword'] ?? '';
        $newPassword = $input['newPassword'] ?? '';

        if (!password_verify($currentPassword, $store['password_hash'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Current password is incorrect.']);
            exit;
        }

        if (strlen($newPassword) < 6) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'New password must be at least 6 characters.']);
            exit;
        }

        $newHash = password_hash($newPassword, PASSWORD_BCRYPT);
        $store['password_hash'] = $newHash;
        $store['updated_at'] = date('c');

        // Refresh session token for the user changing the password
        $newToken = bin2hex(random_bytes(32));
        $store['sessions'] = [
            $newToken => [
                'username' => $store['username'],
                'expires_at' => $now + (86400 * 7),
                'ip' => $clientIp
            ]
        ];

        saveStore($storeFile, $store);

        echo json_encode([
            'success' => true,
            'message' => 'Master password updated successfully across all systems.',
            'token' => $newToken
        ]);
        break;

    // ------------------------------------------------------------------------
    // LOGOUT: Invalidate active session
    // ------------------------------------------------------------------------
    case 'logout':
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        $token = '';
        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            $token = trim($matches[1]);
        } else {
            $token = $input['token'] ?? '';
        }

        if ($token && isset($store['sessions'][$token])) {
            unset($store['sessions'][$token]);
            saveStore($storeFile, $store);
        }

        echo json_encode(['success' => true, 'message' => 'Logged out successfully.']);
        break;

    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Unknown API action.']);
        break;
}
