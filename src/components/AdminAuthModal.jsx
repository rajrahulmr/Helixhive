import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export default function AdminAuthModal({ isOpen, onClose, onSuccess }) {
  const [isSetup, setIsSetup] = useState(null); // null = loading, true/false
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  // Check setup status whenever modal opens
  useEffect(() => {
    if (!isOpen) {
      setError('');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    authService.getStatus().then((res) => {
      if (!isMounted) return;
      setIsLoading(false);
      if (res.success) {
        setIsSetup(res.isSetup);
        if (res.isSetup && res.username) {
          setUsername(res.username);
        } else if (!res.isSetup) {
          setUsername('admin@rajworklab.com');
        }
      } else {
        // Fallback default to setup mode if server responded with isSetup false or fresh installation
        setIsSetup(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Handle countdown if locked
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = username.trim();
    if (!cleanUser) {
      setError('Please enter your username or email.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    // First-time setup flow
    if (!isSetup) {
      if (password.length < 6) {
        setError('Password must be at least 6 characters for security.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please re-enter.');
        return;
      }

      setIsLoading(true);
      const res = await authService.setup(cleanUser, password);
      setIsLoading(false);

      if (res.success) {
        setError('');
        setPassword('');
        setConfirmPassword('');
        onSuccess();
      } else {
        setError(res.message || 'Failed to initialize master account.');
      }
      return;
    }

    // Standard login flow
    setIsLoading(true);
    const res = await authService.login(cleanUser, password);
    setIsLoading(false);

    if (res.success) {
      setError('');
      setPassword('');
      onSuccess();
    } else {
      setError(res.message || 'Invalid username or password.');
      if (res.status === 429) {
        setCooldownSeconds(900); // 15 min lock
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Security Shield Icon */}
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-800 mx-auto flex items-center justify-center mb-4 border border-slate-200 shadow-xs">
          <span className="material-symbols-outlined text-[24px]">
            {!isSetup ? 'shield_person' : 'lock'}
          </span>
        </div>

        {/* Header */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700 mb-2 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {!isSetup ? 'One-Time Master Setup' : 'Global Server-Side Auth'}
        </div>

        <h3 className="font-display font-bold text-lg text-slate-900">
          {!isSetup ? 'Create Master Admin Account' : 'Admin Security Gate'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          {!isSetup
            ? 'Set up your permanent global credentials. This password will be securely hashed on the server across all devices.'
            : 'Enter master account credentials to unlock Raj Work Lab Control Center.'}
        </p>

        {error && (
          <div className="mt-3.5 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium text-left flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-left">
          {/* Username / Email field */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Admin Username / Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin@rajworklab.com"
              disabled={isLoading || cooldownSeconds > 0}
              required
              autoFocus={isSetup ? false : true}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all"
            />
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {!isSetup ? 'Create Master Password' : 'Password'}
              </label>
              {!isSetup && (
                <span className="text-[10px] text-slate-400 font-medium">min 6 chars</span>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={!isSetup ? 'Choose a strong password' : 'Enter password'}
                disabled={isLoading || cooldownSeconds > 0}
                required
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                tabIndex="-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Confirm Password (only during initial setup) */}
          {!isSetup && (
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Confirm Master Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter master password"
                disabled={isLoading}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || cooldownSeconds > 0 || !username.trim() || !password}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Verifying...</span>
                </>
              ) : !isSetup ? (
                'Save & Enter'
              ) : (
                'Authorize'
              )}
            </button>
          </div>
        </form>

        <p className="text-[10px] text-slate-400 mt-4">
          Bcrypt Encrypted • Cross-Device Global Account Setup
        </p>
      </div>
    </div>
  );
}
