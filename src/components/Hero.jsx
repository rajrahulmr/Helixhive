import React, { useState } from 'react';

export default function Hero() {
  const [activeConsoleTab, setActiveConsoleTab] = useState('vitals');

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
            ⚡ High Performance Web Architecture
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
        <p className="mt-6 text-lg md:text-xl text-on-surface-variant max-w-2xl text-balance leading-relaxed">
          We build modern, ultra-fast websites designed to convert your target audience into predictable, scalable revenue. Zero bloat, zero technical debt.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-bold text-on-primary-fixed bg-gradient-to-r from-primary-container to-secondary-container shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:shadow-[0_0_45px_rgba(0,242,254,0.65)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <span>View Pricing</span>
            <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
          </a>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-bot'))}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-primary bg-surface-container-high/80 border border-outline-variant/40 hover:bg-surface-container-high hover:text-white transition-all shadow-md group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-primary-container group-hover:scale-110 transition-transform">
              chat
            </span>
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Verified Metric Telemetry Strip */}
        <div className="mt-12 w-full max-w-4xl p-4 sm:p-5 rounded-2xl bg-surface-container/70 border border-outline-variant/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.35)] grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
          <div className="flex flex-col items-center p-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-primary tracking-tight">99.9%</span>
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mt-1">Lighthouse Score</span>
          </div>
          <div className="flex flex-col items-center p-2 pt-3 md:pt-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-primary-container tracking-tight">2.4x</span>
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mt-1">Conversion Lift</span>
          </div>
          <div className="flex flex-col items-center p-2 pt-3 md:pt-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-secondary tracking-tight">7-Day</span>
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mt-1">Rapid Turnaround</span>
          </div>
          <div className="flex flex-col items-center p-2 pt-3 md:pt-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-primary-fixed tracking-tight">50+</span>
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mt-1">Founders Served</span>
          </div>
        </div>

        {/* High Tech Interactive Dashboard Mockup */}
        <div className="relative w-full max-w-5xl mt-12 rounded-2xl p-2 sm:p-3 bg-surface-container-highest/30 border border-outline-variant/40 backdrop-blur-2xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)]">
          <div className="rounded-xl bg-surface-container-lowest p-4 sm:p-6 overflow-hidden flex flex-col gap-4 text-left border border-outline-variant/20">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-secondary-container/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-primary-container/80 inline-block" />
                <span className="font-mono text-xs text-on-surface-variant ml-3 hidden sm:inline">
                  helixhive-vitals-console.sys
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded-md">
                  <button
                    onClick={() => setActiveConsoleTab('vitals')}
                    className={`px-2.5 py-0.5 rounded text-xs font-mono transition-all ${
                      activeConsoleTab === 'vitals'
                        ? 'bg-primary-container text-on-primary-fixed font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Vitals
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab('funnel')}
                    className={`px-2.5 py-0.5 rounded text-xs font-mono transition-all ${
                      activeConsoleTab === 'funnel'
                        ? 'bg-primary-container text-on-primary-fixed font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Funnel
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab('speed')}
                    className={`px-2.5 py-0.5 rounded text-xs font-mono transition-all ${
                      activeConsoleTab === 'speed'
                        ? 'bg-primary-container text-on-primary-fixed font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Speed
                  </button>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary-container/10 border border-primary-container/20 text-primary-container font-mono text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                  LIVE TELEMETRY
                </span>
              </div>
            </div>

            {/* Interactive Console Content */}
            {activeConsoleTab === 'vitals' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/30 flex flex-col justify-between hover:border-primary-container/40 transition-colors">
                  <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
                    Core Web Vitals
                  </span>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-primary">100 / 100</span>
                    <span className="font-mono text-xs text-primary-container font-semibold">Optimal</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary-container to-secondary h-1.5 rounded-full w-full" />
                  </div>
                  <span className="font-mono text-[11px] text-on-surface-variant mt-2">
                    FCP: 0.3s • LCP: 0.7s • CLS: 0.000
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/30 flex flex-col justify-between hover:border-secondary/40 transition-colors">
                  <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
                    Edge TTFB Response
                  </span>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-secondary">38 ms</span>
                    <span className="font-mono text-xs text-secondary font-semibold">CDN Global</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-secondary to-primary-fixed h-1.5 rounded-full w-[94%]" />
                  </div>
                  <span className="font-mono text-[11px] text-on-surface-variant mt-2">
                    Multi-region edge network cached
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/30 flex flex-col justify-between hover:border-primary-fixed/40 transition-colors">
                  <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
                    Interactive Readiness
                  </span>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-primary-fixed">0.5s TTI</span>
                    <span className="font-mono text-xs text-primary-container font-semibold">Zero Bloat</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary-container to-secondary-container h-1.5 rounded-full w-[98%]" />
                  </div>
                  <span className="font-mono text-[11px] text-on-surface-variant mt-2">
                    Instant user input handling
                  </span>
                </div>
              </div>
            )}

            {activeConsoleTab === 'funnel' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/30">
                  <span className="font-mono text-xs text-on-surface-variant uppercase">Average Bounce Drop</span>
                  <div className="text-3xl font-bold font-display text-primary mt-2">-42%</div>
                  <p className="font-mono text-xs text-on-surface-variant mt-1">Visitors stay and engage 3x longer</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/30">
                  <span className="font-mono text-xs text-on-surface-variant uppercase">CTA Click Through</span>
                  <div className="text-3xl font-bold font-display text-primary-container mt-2">+168%</div>
                  <p className="font-mono text-xs text-on-surface-variant mt-1">Engineered visual hierarchy & contrast</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/30">
                  <span className="font-mono text-xs text-on-surface-variant uppercase">Direct WhatsApp Leads</span>
                  <div className="text-3xl font-bold font-display text-secondary mt-2">Instant</div>
                  <p className="font-mono text-xs text-on-surface-variant mt-1">Single-tap conversational checkout</p>
                </div>
              </div>
            )}

            {activeConsoleTab === 'speed' && (
              <div className="p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/30 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-primary font-bold">Helixhive Engineered Architecture</span>
                  <span className="text-primary-container">0.5s Load Time (99/100)</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-container to-secondary h-2 rounded-full w-[99%]" />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant mt-1">
                  <span>Traditional Agency / WordPress</span>
                  <span className="text-error">4.8s Load Time (38/100)</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-2">
                  <div className="bg-error/60 h-2 rounded-full w-[38%]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
