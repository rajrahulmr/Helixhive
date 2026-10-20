import React from 'react';

export default function Services() {
  const features = [
    {
      icon: 'speed',
      title: 'High Speed Performance',
      description: 'Under 1.0s Time to Interactive, zero client-side bloat, and instant edge caching engineered with clean React architecture.',
      tag: 'Sub-second TTFB',
      tagIcon: 'bolt',
      accentColor: 'text-primary-container',
      glowBg: 'bg-primary-container/10',
    },
    {
      icon: 'trending_up',
      title: 'Conversion Optimization',
      description: 'Every section engineered with psychological behavioral triggers, high-contrast CTAs, and frictionless lead capture mechanisms.',
      tag: 'Revenue Focused',
      tagIcon: 'rocket_launch',
      accentColor: 'text-secondary',
      glowBg: 'bg-secondary/10',
    },
    {
      icon: 'devices',
      title: 'Mobile-First Design',
      description: 'Fluid responsive layouts meticulously tuned down to 320px boundaries. Ergonomic thumb-zone controls for effortless tap conversion.',
      tag: '100% Touch Native',
      tagIcon: 'touch_app',
      accentColor: 'text-primary-fixed',
      glowBg: 'bg-primary-fixed/10',
    },
    {
      icon: 'query_stats',
      title: 'SEO Ready Stack',
      description: 'Structured JSON-LD schema markup, semantic HTML5, lightning Core Web Vitals, and social OpenGraph tags primed for search ranking.',
      tag: 'Google Vitals 100/100',
      tagIcon: 'search_insights',
      accentColor: 'text-primary-container',
      glowBg: 'bg-primary-container/10',
    },
  ];

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 relative" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-14 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-primary-container font-semibold">
            ENGINEERED EXCELLENCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface leading-tight">
            Why ambitious founders choose Helixhive over traditional agencies
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant mt-2 leading-relaxed">
            Most agencies ship heavy, slow templates cluttered with page builders. We engineer purpose-built web software with zero bloat and absolute conversion focus.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl bg-surface-container/60 hover:bg-surface-container-high/70 border border-outline-variant/30 hover:border-primary-container/40 backdrop-blur-xl shadow-lg hover:shadow-[0_10px_35px_rgba(0,242,254,0.15)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Badge */}
                <div className={`w-12 h-12 rounded-xl ${feature.glowBg} border border-outline-variant/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`material-symbols-outlined text-[26px] ${feature.accentColor}`}>
                    {feature.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-on-surface mb-2.5">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Tag Footer */}
              <div className={`mt-6 pt-3 border-t border-outline-variant/20 font-mono text-xs ${feature.accentColor} flex items-center justify-between`}>
                <span>{feature.tag}</span>
                <span className="material-symbols-outlined text-[16px]">{feature.tagIcon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
