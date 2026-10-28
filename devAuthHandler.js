import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.resolve(process.cwd(), 'public/api/data');
const STORE_FILE = path.join(DATA_DIR, 'auth_store.php');

function ensureStoreDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadStore() {
  try {
    ensureStoreDir();
    if (!fs.existsSync(STORE_FILE)) {
      return {
        username: '',
        password_hash: '',
        created_at: null,
        updated_at: null,
        sessions: {},
        failed_attempts: {},
      };
    }
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    const json = raw.replace(/^<\?php\s+exit;\s*\?>\s*/, '');
    const data = JSON.parse(json);
    if (!data.sessions) data.sessions = {};
    if (!data.failed_attempts) data.failed_attempts = {};
    return data;
  } catch (e) {
    return {
      username: '',
      password_hash: '',
      created_at: null,
      updated_at: null,
      sessions: {},
      failed_attempts: {},
    };
  }
}

function saveStore(data) {
  ensureStoreDir();
  const content = `<?php exit; ?>\n${JSON.stringify(data, null, 2)}`;
  fs.writeFileSync(STORE_FILE, content, 'utf-8');
}

export function handleAuthRequest(req, res) {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  if (!pathname.startsWith('/api/auth')) {
    return false;
  }

  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return true;
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    let input = {};
    if (body) {
      try {
        input = JSON.parse(body);
      } catch (e) {
        input = {};
      }
    }

    // Determine action
    let action = urlObj.searchParams.get('action') || input.action || '';
    if (!action) {
      const parts = pathname.replace(/^\/+|\/+$/g, '').split('/');
      const last = parts[parts.length - 1];
      if (last !== 'auth.php' && last !== 'auth') {
        action = last;
      } else {
        action = req.method === 'POST' ? 'login' : 'status';
      }
    }

    const store = loadStore();
    const now = Math.floor(Date.now() / 1000);
    const clientIp = req.socket?.remoteAddress || '127.0.0.1';

    // Cleanup expired sessions
    if (store.sessions) {
      for (const tok in store.sessions) {
        if (store.sessions[tok]?.expires_at < now) {
          delete store.sessions[tok];
        }
      }
    }

    // Process actions
    switch (action) {
      case 'status': {
        const isSetup = Boolean(store.username && store.password_hash);
        res.statusCode = 200;
        res.end(
          JSON.stringify({
            success: true,
            isSetup,
            username: isSetup ? store.username : null,
          })
        );
        return;
      }

      case 'setup': {
        const isSetup = Boolean(store.username && store.password_hash);
        if (isSetup) {
          res.statusCode = 400;
          res.end(
            JSON.stringify({
              success: false,
              message: 'Admin account has already been initialized.',
            })
          );
          return;
        }

        const username = (input.username || '').trim();
        const password = input.password || '';

        if (username.length < 3) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, message: 'Username must be at least 3 characters.' }));
          return;
        }

        if (password.length < 6) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, message: 'Password must be at least 6 characters.' }));
          return;
        }

        const hash = bcrypt.hashSync(password, 10);
        const token = crypto.randomBytes(32).toString('hex');

        store.username = username;
        store.password_hash = hash;
        store.created_at = new Date().toISOString();
        store.updated_at = new Date().toISOString();
        store.sessions[token] = {
          username,
          expires_at: now + 86400 * 7,
          ip: clientIp,
        };

        saveStore(store);

        res.statusCode = 200;
        res.end(
          JSON.stringify({
            success: true,
            message: 'Master admin account successfully created.',
            token,
            user: { username },
          })
        );
        return;
      }

      case 'login': {
        const isSetup = Boolean(store.username && store.password_hash);
        if (!isSetup) {
          res.statusCode = 400;
          res.end(
            JSON.stringify({
              success: false,
              isNotSetup: true,
              message: 'Master account not set up yet.',
            })
          );
          return;
        }

        // Lockout check
        const ipAttempts = store.failed_attempts[clientIp] || { count: 0, last_attempt: 0 };
        if (ipAttempts.count >= 5 && now - ipAttempts.last_attempt < 900) {
          const remainingCooldown = 900 - (now - ipAttempts.last_attempt);
          const mins = Math.ceil(remainingCooldown / 60);
          res.statusCode = 429;
          res.end(
            JSON.stringify({
              success: false,
              message: `Too many failed attempts. Security cooldown active. Please wait ${mins} minutes.`,
            })
          );
          return;
        }

        const username = (input.username || '').trim();
        const password = input.password || '';

        const userMatch = username.toLowerCase() === store.username.toLowerCase();
        // bcrypt supports $2y$ by replacing prefix with $2a$ or directly
        const normalizedHash = store.password_hash.replace(/^\$2y\$/, '$2a$');
        const passMatch = userMatch && bcrypt.compareSync(password, normalizedHash);

        if (userMatch && passMatch) {
          delete store.failed_attempts[clientIp];
          const token = crypto.randomBytes(32).toString('hex');
          store.sessions[token] = {
            username: store.username,
            expires_at: now + 86400 * 7,
            ip: clientIp,
          };
          saveStore(store);

          res.statusCode = 200;
          res.end(
            JSON.stringify({
              success: true,
              token,
              user: { username: store.username },
            })
          );
        } else {
          const newCount = (ipAttempts.count || 0) + 1;
          store.failed_attempts[clientIp] = { count: newCount, last_attempt: now };
          saveStore(store);

          const attemptsLeft = Math.max(0, 5 - newCount);
          res.statusCode = 401;
          res.end(
            JSON.stringify({
              success: false,
              message:
                attemptsLeft > 0
                  ? `Invalid credentials. ${attemptsLeft} attempt(s) remaining.`
                  : 'Account temporarily locked for 15 minutes due to multiple failed attempts.',
            })
          );
        }
        return;
      }

      case 'verify': {
        const authHeader = req.headers.authorization || '';
        let token = '';
        const match = authHeader.match(/Bearer\s+(.*)$/i);
        if (match) {
          token = match[1].trim();
        } else {
          token = input.token || urlObj.searchParams.get('token') || '';
        }

        if (token && store.sessions[token] && store.sessions[token].expires_at > now) {
          res.statusCode = 200;
          res.end(
            JSON.stringify({
              success: true,
              valid: true,
              user: { username: store.sessions[token].username },
            })
          );
          return;
        }

        res.statusCode = 200;
        res.end(JSON.stringify({ success: false, valid: false }));
        return;
      }

      case 'change_password': {
        const isSetup = Boolean(store.username && store.password_hash);
        if (!isSetup) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, message: 'Admin account not found.' }));
          return;
        }

        const currentPassword = input.currentPassword || '';
        const newPassword = input.newPassword || '';

        const normalizedHash = store.password_hash.replace(/^\$2y\$/, '$2a$');
        if (!bcrypt.compareSync(currentPassword, normalizedHash)) {
          res.statusCode = 401;
          res.end(JSON.stringify({ success: false, message: 'Current password is incorrect.' }));
          return;
        }

        if (newPassword.length < 6) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, message: 'New password must be at least 6 characters.' }));
          return;
        }

        const newHash = bcrypt.hashSync(newPassword, 10);
        store.password_hash = newHash;
        store.updated_at = new Date().toISOString();

        const newToken = crypto.randomBytes(32).toString('hex');
        store.sessions = {
          [newToken]: {
            username: store.username,
            expires_at: now + 86400 * 7,
            ip: clientIp,
          },
        };
        saveStore(store);

        res.statusCode = 200;
        res.end(
          JSON.stringify({
            success: true,
            message: 'Master password updated successfully across all systems.',
            token: newToken,
          })
        );
        return;
      }

      case 'logout': {
        const authHeader = req.headers.authorization || '';
        let token = '';
        const match = authHeader.match(/Bearer\s+(.*)$/i);
        if (match) {
          token = match[1].trim();
        } else {
          token = input.token || '';
        }

        if (token && store.sessions[token]) {
          delete store.sessions[token];
          saveStore(store);
        }

        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, message: 'Logged out successfully.' }));
        return;
      }

      default: {
        res.statusCode = 404;
        res.end(JSON.stringify({ success: false, message: 'Unknown API action.' }));
        return;
      }
    }
  });

  return true;
}
