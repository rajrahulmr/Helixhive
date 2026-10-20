import React from 'react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-32 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8">
      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary-container/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-secondary-container/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-20 w-[350px] h-[300px] bg-primary-fixed-dim/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Top Innovation Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-high/80 border border-outline-variant/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.18)] mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container" />
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-primary-fixed font-semibold">
            ⚡ Handcrafted Web Architecture • Zero WordPress Bloat
          </span>
        </div>

        {/* Main Headline with Gradient Highlights */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface max-w-5xl leading-[1.12]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-secondary to-primary-fixed drop-shadow-[0_0_30px_rgba(0,242,254,0.3)]">
            High-Converting
          </span>{' '}
          Websites Engineered for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary-fixed to-primary-container">
            Growing Businesses
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl text-balance leading-relaxed">
          Affordable, ultra-fast websites designed to turn visitors into paying customers and WhatsApp inquiries. Zero slow plugins, zero technical headache.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-bold text-on-primary-fixed bg-gradient-to-r from-primary-container to-secondary-container shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:shadow-[0_0_45px_rgba(0,242,254,0.65)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <span>View Transparent Pricing</span>
            <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
          </a>

          <a
            href="https://wa.me/917907142807?text=Hi%20Helixhive,%20I%20am%20interested%20in%20building%20a%20website%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-primary bg-surface-container-high/80 border border-outline-variant/40 hover:bg-surface-container-high hover:text-white transition-all shadow-md group"
          >
            <span className="material-symbols-outlined text-[20px] text-[#25D366] group-hover:scale-110 transition-transform">
              chat
            </span>
            <span>Chat on WhatsApp (+91 7907142807)</span>
          </a>
        </div>

        {/* ============================================================== */}
        {/* RELEVANT 3-STEP PROCESS & CLIENT GUARANTEES (REPLACED CONSOLE) */}
        {/* ============================================================== */}
        <div className="w-full max-w-6xl mt-14 sm:mt-18">
          
          {/* Process Section Title */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-primary-container font-semibold">
              SIMPLE & RAPID DELIVERY
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mt-1 leading-tight">
              From idea to live website in 3 simple steps
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant mt-2">
              No complex paperwork. We take care of layout, copy structure, mobile optimization, hosting, and WhatsApp connection.
            </p>
          </div>

          {/* 3 Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left mb-10">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-surface-container/70 border border-outline-variant/30 hover:border-primary-container/40 backdrop-blur-xl shadow-lg transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-primary-container/15 border border-primary-container/30 flex items-center justify-center font-display font-bold text-primary-container text-base">
                    01
                  </span>
                  <span className="font-mono text-[11px] text-primary uppercase tracking-wider bg-surface-container-highest px-2.5 py-1 rounded-md">
                    Step 1 • 2 Minutes
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface mb-2 group-hover:text-primary-container transition-colors">
                  Choose Plan & Send Details
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Pick your budget plan (starting at ₹1499) and share your business details, products, or reference sites via WhatsApp.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center gap-1.5 text-xs font-mono text-primary-container">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Zero paperwork required</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-surface-container/70 border border-outline-variant/30 hover:border-secondary/40 backdrop-blur-xl shadow-lg transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-secondary-container/15 border border-secondary/30 flex items-center justify-center font-display font-bold text-secondary text-base">
                    02
                  </span>
                  <span className="font-mono text-[11px] text-secondary uppercase tracking-wider bg-surface-container-highest px-2.5 py-1 rounded-md">
                    Step 2 • 48-72 Hours
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface mb-2 group-hover:text-secondary transition-colors">
                  Rapid Design & Clean Build
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  We engineer your custom, mobile-first website using modern React and clean CSS. Zero bloated WordPress templates.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center gap-1.5 text-xs font-mono text-secondary">
                <span className="material-symbols-outlined text-[16px]">speed</span>
                <span>100/100 Mobile Speed score</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-surface-container/70 border border-outline-variant/30 hover:border-primary-fixed/40 backdrop-blur-xl shadow-lg transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-primary-fixed/15 border border-primary-fixed/30 flex items-center justify-center font-display font-bold text-primary-fixed text-base">
                    03
                  </span>
                  <span className="font-mono text-[11px] text-primary-fixed uppercase tracking-wider bg-surface-container-highest px-2.5 py-1 rounded-md">
                    Step 3 • Live Launch
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface mb-2 group-hover:text-primary-fixed transition-colors">
                  Review, Launch & Get Leads
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Review your draft with revisions, connect your domain & SSL, and start getting direct customer WhatsApp messages & calls.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center gap-1.5 text-xs font-mono text-primary-fixed">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Ready to accept inquiries</span>
              </div>
            </div>
          </div>

          {/* Standard Inclusions Strip (Mobile Responsive Grid) */}
          <div className="p-5 sm:p-7 rounded-2xl bg-surface-container-high/60 border border-outline-variant/40 backdrop-blur-2xl shadow-xl text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-outline-variant/30">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-primary-container font-semibold">
                  THE HELIXHIVE STANDARD
                </span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-primary mt-0.5">
                  Included with every website we engineer
                </h4>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Zero Hidden Maintenance Fees
              </span>
            </div>

            {/* 6 Core Guarantees Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-5">
              <div className="p-3.5 rounded-xl bg-surface-container-lowest/70 border border-outline-variant/20 flex flex-col gap-1.5 hover:border-primary-container/40 transition-colors">
                <span className="material-symbols-outlined text-[#25D366] text-[24px]">chat</span>
                <span className="font-display text-xs font-bold text-on-surface">1-Tap WhatsApp</span>
                <span className="text-[11px] text-on-surface-variant leading-tight">Instant customer orders & chats</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest/70 border border-outline-variant/20 flex flex-col gap-1.5 hover:border-secondary/40 transition-colors">
                <span className="material-symbols-outlined text-secondary text-[24px]">bolt</span>
                <span className="font-display text-xs font-bold text-on-surface">0.5s Fast Speed</span>
                <span className="text-[11px] text-on-surface-variant leading-tight">Zero bounce on mobile networks</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest/70 border border-outline-variant/20 flex flex-col gap-1.5 hover:border-primary-fixed/40 transition-colors">
                <span className="material-symbols-outlined text-primary-fixed text-[24px]">devices</span>
                <span className="font-display text-xs font-bold text-on-surface">100% Mobile Ready</span>
                <span className="text-[11px] text-on-surface-variant leading-tight">Thumb-friendly tap buttons</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest/70 border border-outline-variant/20 flex flex-col gap-1.5 hover:border-primary-container/40 transition-colors">
                <span className="material-symbols-outlined text-primary-container text-[24px]">location_on</span>
                <span className="font-display text-xs font-bold text-on-surface">Google Maps & Social</span>
                <span className="text-[11px] text-on-surface-variant leading-tight">Directions & Instagram sync</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest/70 border border-outline-variant/20 flex flex-col gap-1.5 hover:border-secondary/40 transition-colors">
                <span className="material-symbols-outlined text-secondary text-[24px]">lock</span>
                <span className="font-display text-xs font-bold text-on-surface">Free SSL Lock</span>
                <span className="text-[11px] text-on-surface-variant leading-tight">HTTPS secure padlock</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest/70 border border-outline-variant/20 flex flex-col gap-1.5 hover:border-primary-fixed/40 transition-colors">
                <span className="material-symbols-outlined text-primary-fixed text-[24px]">verified</span>
                <span className="font-display text-xs font-bold text-on-surface">Zero WordPress</span>
                <span className="text-[11px] text-on-surface-variant leading-tight">Pure code, zero hackable plugins</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
