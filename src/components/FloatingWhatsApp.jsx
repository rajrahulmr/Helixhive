import React from 'react';

export default function FloatingWhatsApp({ onOpenModal }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 select-none">
      <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-lg text-[11px] text-slate-700 font-medium">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Chat with Raj • UAE &amp; India Fast Track</span>
      </div>

      <button
        onClick={onOpenModal}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:scale-105 transition-all focus:outline-none cursor-pointer"
        title="Chat on WhatsApp with Raj"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
        <span className="material-symbols-outlined text-[28px]">chat</span>
      </button>
    </div>
  );
}
