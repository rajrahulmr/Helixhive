// Raj Work Lab - Global Admin Authentication Service
// Communicates with backend API (server-side bcrypt verification)

const API_ENDPOINT = '/api/auth.php';

async function requestApi(action, data = null, method = 'POST') {
  try {
    const token = sessionStorage.getItem('raj_admin_token');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${API_ENDPOINT}?action=${encodeURIComponent(action)}`;
    const options = {
      method,
      headers,
    };

    if (data && method === 'POST') {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        message: json.message || `Request failed with status ${res.status}`,
        ...json,
      };
    }

    return {
      success: true,
      ...json,
    };
  } catch (err) {
    console.error(`[AuthService] Error in ${action}:`, err);
    return {
      success: false,
      message: 'Unable to connect to authentication server. Please check your network connection.',
    };
  }
}

export const authService = {
  // Check if initial admin account is created
  getStatus: async () => {
    return await requestApi('status', null, 'GET');
  },

  // First-time master account setup
  setup: async (username, password) => {
    const res = await requestApi('setup', { username, password });
    if (res.success && res.token) {
      sessionStorage.setItem('raj_admin_token', res.token);
      sessionStorage.setItem('raj_admin_user', res.user?.username || username);
      sessionStorage.setItem('raj_admin_auth', 'true');
    }
    return res;
  },

  // Login
  login: async (username, password) => {
    const res = await requestApi('login', { username, password });
    if (res.success && res.token) {
      sessionStorage.setItem('raj_admin_token', res.token);
      sessionStorage.setItem('raj_admin_user', res.user?.username || username);
      sessionStorage.setItem('raj_admin_auth', 'true');
    }
    return res;
  },

  // Verify active session with server
  verifySession: async () => {
    const token = sessionStorage.getItem('raj_admin_token');
    if (!token) return false;
    const res = await requestApi('verify', { token });
    if (!res.success || !res.valid) {
      authService.logout();
      return false;
    }
    return true;
  },

  // Change master password globally
  changePassword: async (currentPassword, newPassword) => {
    const res = await requestApi('change_password', { currentPassword, newPassword });
    if (res.success && res.token) {
      sessionStorage.setItem('raj_admin_token', res.token);
    }
    return res;
  },

  // Logout
  logout: async () => {
    try {
      await requestApi('logout', {});
    } catch (e) {
      // ignore
    } finally {
      sessionStorage.removeItem('raj_admin_token');
      sessionStorage.removeItem('raj_admin_user');
      sessionStorage.removeItem('raj_admin_auth');
    }
  },

  isAuthenticated: () => {
    return Boolean(sessionStorage.getItem('raj_admin_token') && sessionStorage.getItem('raj_admin_auth') === 'true');
  },

  getUser: () => {
    return sessionStorage.getItem('raj_admin_user') || 'Admin';
  },
};
