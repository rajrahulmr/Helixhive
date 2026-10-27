import React from 'react';

export default function Hero({ onOpenOrderModal, onOpenWhatsAppModal }) {
  return (
    <section className="pt-10 pb-8 md:pt-16 md:pb-12 subtle-grid border-b border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Guarantee Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 mb-5 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Pure Jamstack • 100/100 PageSpeed Guaranteed • 48h Turnaround</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15] max-w-4xl mx-auto">
          Custom High-Speed Websites for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600">
            Modern Creators.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-4 font-normal leading-relaxed">
          Hand-crafted static builds replacing slow Linktree, Carrd &amp; WordPress. Pick your tier, launch in 48 hours.
        </p>

        {/* Metrics Trust Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-slate-600">
          <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">bolt</span>
            <span className="font-semibold text-slate-800">100/100 Lighthouse</span>
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <span className="material-symbols-outlined text-[16px] text-brand-600">timer</span>
            <span className="font-semibold text-slate-800">0.2s LCP Load</span>
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <span className="material-symbols-outlined text-[16px] text-indigo-600">verified</span>
            <span className="font-semibold text-slate-800">Zero Monthly Plugins</span>
          </span>
        </div>

        {/* Quick Action Button Group */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onOpenOrderModal('Creator Business Website')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Choose Your Plan (AED 899)</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
          <button
            onClick={onOpenWhatsAppModal}
            className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">chat</span>
            <span>Direct WhatsApp Desk</span>
          </button>
        </div>
      </div>
    </section>
  );
}
