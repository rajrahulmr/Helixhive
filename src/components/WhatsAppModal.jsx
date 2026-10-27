import React from 'react';

export default function WhatsAppModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <span className="material-symbols-outlined text-[26px]">chat</span>
        </div>

        <div>
          <h3 className="font-display font-bold text-base text-slate-900">
            Direct WhatsApp Hotline
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Instant developer access for UAE (Dubai) and India businesses &amp; founders.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-left text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center justify-between">
            <span>Current Status:</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Active Online
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Typical response:</span>
            <span className="font-medium text-slate-800">under 5 minutes</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
            <span className="text-slate-500">Direct Lines:</span>
            <span className="font-mono font-semibold text-brand-700">+971 58 238 9502</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <a
            href="https://wa.me/971582389502?text=Hi%20Raj,%20I'm%20based%20in%20UAE%20and%20would%20like%20to%20discuss%20a%20high-speed%20custom%20website%20build."
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <span>🇦🇪 Chat UAE Desk (+971 58 238 9502)</span>
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </a>

          <a
            href="https://wa.me/917907142807?text=Hi%20Raj,%20I'm%20reaching%20out%20from%20India%20to%20upgrade%20my%20business%20website%20and%20landing%20page."
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <span>🇮🇳 Chat India Desk (+91 79071 42807)</span>
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
