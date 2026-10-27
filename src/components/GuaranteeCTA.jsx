import React from 'react';

export default function GuaranteeCTA({ onOpenOrderModal, onOpenWhatsAppModal }) {
  return (
    <section className="py-16 sm:py-24 bg-white" id="guarantee">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle glowing ambient mesh */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-sky-300 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              100% Satisfaction Guarantee
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Ready to turn your Instagram followers into paying clients?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Send us your Instagram handle, pick a tier, and we ship your custom high-speed build in 48 hours. If it doesn't score 95+ on Google PageSpeed, you get a 100% refund.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => onOpenOrderModal('Creator Business Website')}
                className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Claim My Website (AED 899)</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              <button
                onClick={onOpenWhatsAppModal}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-emerald-400 text-[18px]">chat</span>
                <span>Ask Raj on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
