import React, { useState } from 'react';

export default function Pricing({ onSelectPlan }) {
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD' | 'AED'
  const [expandedPlans, setExpandedPlans] = useState({});

  const toggleExpand = (planId) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  const plans = [
    {
      id: 'static-1499',
      badge: 'Static site',
      name: 'The ₹1499 Plan',
      popular: false,
      prices: {
        INR: { amount: '₹1499', unit: 'one page' },
        USD: { amount: '$19', unit: 'one page' },
        AED: { amount: 'AED 70', unit: 'one page' },
      },
      description: 'A fixed, fast-loading page built for small businesses that mainly need to be found and contacted — not edited every week.',
      features: [
        'Header, hero, about, why-choose-us & footer sections',
        'Up to 10 products or services listed',
        'Gallery of up to 10 images',
        'Contact form + WhatsApp & direct call button',
        'Free subdomain, WhatsApp & Instagram, Google Maps',
        '2 rounds of edits on the first draft',
        'Extra pages anytime, ₹400 each',
      ],
      meta: {
        delivery: 'Ready in 2 days',
        hosting: '₹1499/year (or free Netlify/Vercel connect)',
        domain: 'Free subdomain included or connect yours',
      },
      ctaText: 'Ask about this plan',
    },
    {
      id: 'react-2999',
      badge: 'Modern React',
      badgeHighlight: 'MOST POPULAR',
      name: 'The ₹2999 Plan',
      popular: true,
      prices: {
        INR: { amount: '₹2999', unit: 'up to 5 pages' },
        USD: { amount: '$39', unit: 'up to 5 pages' },
        AED: { amount: 'AED 135', unit: 'up to 5 pages' },
      },
      description: 'A dynamic, high-performance modern React website for businesses that expect to grow — add pages, products, showcase galleries, and convert leads.',
      features: [
        'All core sections + Up to 5 custom pages (React & Tailwind)',
        'Up to 20 products or services listed',
        'Gallery of up to 20 images',
        'SSL certificate & Core Web Vitals 99+ speed included',
        'Interactive contact form + instant WhatsApp integration',
        'WhatsApp, Instagram & Google Maps integration',
        '3 rounds of edits on the first draft',
        'Extra pages anytime, ₹600 each',
      ],
      meta: {
        delivery: 'Ready in 4-5 days',
        hosting: '₹1999/year (or free edge deployment)',
        domain: 'Use yours, or we buy & connect (extra charge)',
      },
      ctaText: 'Ask about this plan ⚡',
    },
    {
      id: 'growth-6999',
      badge: 'Dynamic Web App',
      name: 'The ₹6999 Plan',
      popular: false,
      prices: {
        INR: { amount: '₹6999', unit: 'multi-page dynamic' },
        USD: { amount: '$89', unit: 'multi-page dynamic' },
        AED: { amount: 'AED 320', unit: 'multi-page dynamic' },
      },
      description: 'Custom-engineered interactive web application with dynamic filters, lead capture automation, and high-impact conversion layout.',
      features: [
        'Up to 10 custom pages with smooth micro-interactions',
        'Dynamic product/service catalog or portfolio filtering',
        'Advanced lead capture with email & CRM notifications',
        'Schema markup & complete technical SEO setup',
        'Dedicated mobile-first UX with 100/100 Lighthouse benchmark',
        '5 rounds of revisions & dedicated project sprint',
        'Extra pages anytime, ₹800 each',
      ],
      meta: {
        delivery: 'Ready in 6-7 days',
        hosting: 'Cloud edge performance included',
        domain: 'Free custom domain DNS setup & SSL',
      },
      ctaText: 'Ask about this plan',
    },
    {
      id: 'enterprise-custom',
      badge: 'Bespoke Software',
      name: 'Enterprise Platform',
      popular: false,
      prices: {
        INR: { amount: '₹19,999+', unit: 'custom quote' },
        USD: { amount: '$249+', unit: 'custom quote' },
        AED: { amount: 'AED 890+', unit: 'custom quote' },
      },
      description: 'Full-stack custom web applications, client portals, payment gateways, and tailored APIs engineered for serious business scale.',
      features: [
        'Full-stack custom architecture (React + Node/Serverless backend)',
        'Custom database & API integrations',
        'Payment gateway integration (Stripe / Razorpay)',
        'Client portal, user auth, or custom admin dashboard',
        'Dedicated Lead Architect & 30-day post-launch warranty',
        'Enterprise-grade security, automated backups & SLA',
      ],
      meta: {
        delivery: '2-3 weeks agile delivery',
        hosting: 'Scalable AWS/Vercel cloud architecture',
        domain: 'Full production provisioning & custom setup',
      },
      ctaText: 'Discuss Custom Scope',
    },
  ];

  const handlePlanClick = (planName) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Compile rich formatted WhatsApp message with full plan details
  const getWhatsAppUrl = (plan) => {
    const price = plan.prices[currency].amount;
    const unit = plan.prices[currency].unit;

    const message =
      `*New Project Inquiry — ${plan.name}*\n\n` +
      `📦 *Package:* ${plan.name} (${plan.badge})\n` +
      `💰 *Investment:* ${price} (${unit})\n` +
      `⏱️ *Delivery Timeline:* ${plan.meta.delivery}\n` +
      `🌐 *Hosting/Domain:* ${plan.meta.hosting}\n\n` +
      `✨ *Key Inclusions:*\n` +
      plan.features.slice(0, 5).map((f) => `• ${f}`).join('\n') +
      `\n\n` +
      `Hi Helixhive! I would like to get started with this plan for my website. Can you share the next steps?`;

    return `https://wa.me/917907142807?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest/60 relative" id="pricing">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl flex flex-col items-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-mono text-xs font-semibold uppercase tracking-wider mb-3">
            <span>⚡ 100% Handcrafted React & Clean Code — Zero WordPress, Zero Bloat</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface leading-tight">
            Fixed transparent pricing. Zero surprise invoices.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant mt-3 leading-relaxed max-w-2xl">
            From affordable, blazing-fast starter launches to bespoke high-scale web platforms. Select the strategic package engineered for your immediate growth.
          </p>

          {/* Interactive Multi-Currency Switcher */}
          <div className="mt-6 inline-flex items-center p-1 rounded-full bg-surface-container-high border border-outline-variant/40 shadow-inner">
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currency === 'INR'
                  ? 'bg-primary-container text-on-primary-fixed shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${currency === 'INR' ? 'bg-on-primary-fixed' : 'bg-outline'}`} />
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currency === 'USD'
                  ? 'bg-primary-container text-on-primary-fixed shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              $ USD
            </button>
            <button
              type="button"
              onClick={() => setCurrency('AED')}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currency === 'AED'
                  ? 'bg-primary-container text-on-primary-fixed shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              AED
            </button>
          </div>
        </div>

        {/* 4 Tier Responsive Pricing Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            const isExpanded = !!expandedPlans[plan.id];
            const visibleFeatures = isExpanded ? plan.features : plan.features.slice(0, 4);
            const remainingCount = plan.features.length - 4;

            return (
              <div
                key={plan.id}
                className={`relative p-5 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-surface-container-high/95 border-2 border-primary-container shadow-[0_0_40px_rgba(0,242,254,0.25)] lg:-translate-y-2.5 z-10'
                    : 'bg-surface-container/70 border border-outline-variant/30 hover:border-primary-container/40 hover:bg-surface-container-high/70 shadow-lg'
                }`}
              >
                {/* Popular Floating Pill Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-fixed font-mono text-[11px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(0,242,254,0.5)]">
                    {plan.badgeHighlight}
                  </div>
                )}

                <div>
                  {/* Category Badge */}
                  <div className="mb-2">
                    <span
                      className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                        plan.popular ? 'text-primary-container' : 'text-primary'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  {/* Plan Title */}
                  <h3 className="font-display text-2xl font-bold text-on-surface mb-2">
                    {plan.name}
                  </h3>

                  {/* Price Display */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span
                      className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
                        plan.popular ? 'text-primary drop-shadow-[0_0_12px_rgba(0,242,254,0.3)]' : 'text-on-surface'
                      }`}
                    >
                      {plan.prices[currency].amount}
                    </span>
                    <span className="font-mono text-xs text-on-surface-variant">
                      {plan.prices[currency].unit}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-on-surface-variant mb-4 pb-4 border-b border-outline-variant/30 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features List with Show More toggle */}
                  <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-on-surface mb-2">
                    {visibleFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5">
                          {plan.popular ? 'check_circle' : 'check'}
                        </span>
                        <span className={plan.popular && fIdx === 0 ? 'font-semibold text-primary' : 'text-on-surface/90'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* "Show more" / "Show less" Expand Trigger */}
                  {plan.features.length > 4 && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(plan.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary-container hover:text-white transition-colors py-1.5 mb-4 group cursor-pointer"
                    >
                      <span>
                        {isExpanded ? 'Show fewer features' : `+${remainingCount} more features`}
                      </span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-y-0.5 transition-transform">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  )}
                </div>

                {/* Bottom Meta & Action Controls */}
                <div className="pt-2">
                  {/* Meta details strip */}
                  <div className="pt-3 pb-4 border-t border-outline-variant/30 text-xs font-mono text-on-surface-variant flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-outline text-[11px] uppercase">Timeline</span>
                      <span className="text-primary font-medium">{plan.meta.delivery}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-outline text-[11px] uppercase">Hosting</span>
                      <span className="text-[#aebac1] truncate max-w-[180px]">{plan.meta.hosting}</span>
                    </div>
                  </div>

                  {/* Action Buttons: Direct WhatsApp Redirection with Pre-Filled Plan Details */}
                  <div className="flex flex-col gap-2">
                    <a
                      href={getWhatsAppUrl(plan)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        plan.popular
                          ? 'bg-gradient-to-r from-primary-container via-secondary-container to-secondary text-on-primary-fixed shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.65)] hover:-translate-y-0.5 active:scale-95'
                          : 'bg-surface-container-highest text-primary hover:bg-primary-container hover:text-on-primary-fixed'
                      }`}
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>{plan.ctaText}</span>
                    </a>

                    {/* Online Form Option */}
                    <button
                      type="button"
                      onClick={() => handlePlanClick(`${plan.name} (${plan.prices.INR.amount})`)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-mono text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>Or submit brief online</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_downward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
