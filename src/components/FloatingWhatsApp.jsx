import React from 'react';

export default function FloatingWhatsApp({ onOpenModal }) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 select-none pointer-events-none">
      <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-lg text-[11px] text-slate-700 font-medium pointer-events-auto">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Chat with Raj • UAE &amp; India Fast Track</span>
      </div>

      <button
        onClick={onOpenModal}
        className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:scale-105 transition-all focus:outline-none cursor-pointer"
        title="Chat on WhatsApp with Raj (+971 58 238 9502)"
      >
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
        <span className="material-symbols-outlined text-[24px] sm:text-[28px]">chat</span>
      </button>
    </div>
  );
}
