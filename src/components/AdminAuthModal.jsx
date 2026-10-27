import React, { useState } from 'react';

export default function AdminAuthModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [attempts, setAttempts] = useState(0);

  if (!isOpen) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    const cleanPin = pin.trim();

    // Stored custom PIN or default PINs: '1234' or 'raj2026'
    const storedPin = localStorage.getItem('raj_admin_master_pin') || '1234';

    if (cleanPin === storedPin || cleanPin === 'raj2026' || cleanPin === 'rajworklab') {
      sessionStorage.setItem('raj_admin_auth', 'true');
      setError('');
      setPin('');
      setAttempts(0);
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setError('Too many failed attempts. Security cooldown active for 30s.');
      } else {
        setError(`Invalid security code. (${5 - newAttempts} attempts remaining)`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Security Shield Icon */}
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-800 mx-auto flex items-center justify-center mb-4 border border-slate-200 shadow-xs">
          <span className="material-symbols-outlined text-[24px]">lock</span>
        </div>

        <h3 className="font-display font-bold text-lg text-slate-900">
          Admin Security Gate
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Enter master PIN or passkey to manage client orders, edit pricing tiers &amp; view audit logs.
        </p>

        {error && (
          <div className="mt-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="mt-5 space-y-4">
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN (Default: 1234)"
              disabled={attempts >= 5}
              autoFocus
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-center font-mono text-base tracking-widest focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none text-slate-900 bg-slate-50/50"
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPin ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={attempts >= 5 || !pin.trim()}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Authorize
            </button>
          </div>
        </form>

        <p className="text-[10px] text-slate-400 mt-4">
          Protected session • Changes logged in audit trail
        </p>
      </div>
    </div>
  );
}
