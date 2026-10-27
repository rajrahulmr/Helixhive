import React from 'react';

export default function Hero({ onOpenOrderModal, onOpenWhatsAppModal }) {
  return (
    <section className="pt-8 pb-8 md:pt-14 md:pb-12 subtle-grid border-b border-slate-100 bg-white w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Guarantee Pill - Responsive wrapping */}
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-700 mb-4 sm:mb-5 shadow-xs text-center">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span>Pure Jamstack • 100/100 Speed • 48h Turnaround</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15] max-w-4xl mx-auto">
          High-Speed Websites for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600">
            Small Businesses &amp; Brands.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto mt-3 sm:mt-4 font-normal leading-relaxed">
          Upgrade your business with a blazing-fast, custom static website. Complete with custom domain purchase, free SSL, zero monthly plugin fees, and 48-hour delivery.
        </p>

        {/* Business Solutions Badges */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] sm:text-[14px]">storefront</span>
            Small Business Launch
          </span>
          <span className="px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] sm:text-[14px]">upgrade</span>
            WordPress &amp; Wix Upgrades
          </span>
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] sm:text-[14px]">language</span>
            Custom Domain (.com/.ae) + SSL
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] sm:text-[14px]">bolt</span>
            100/100 Mobile Speed
          </span>
        </div>

        {/* Metrics Trust Strip */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-[11px] sm:text-xs font-mono text-slate-600">
          <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-emerald-600">bolt</span>
            <span className="font-semibold text-slate-800">100/100 Lighthouse</span>
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-brand-600">timer</span>
            <span className="font-semibold text-slate-800">0.2s LCP Load Time</span>
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-indigo-600">verified</span>
            <span className="font-semibold text-slate-800">Zero Hacks</span>
          </span>
        </div>

        {/* Quick Action Button Group */}
        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => onOpenOrderModal('Small Business Growth Website')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Claim Your Website (From AED 349)</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
          <button
            onClick={onOpenWhatsAppModal}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">chat</span>
            <span>Direct WhatsApp Desk</span>
          </button>
        </div>
      </div>
    </section>
  );
}
