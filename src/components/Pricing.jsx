import React, { useState } from 'react';

export default function Pricing({ onSelectPlan }) {
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD' | 'AED'

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      badge: 'Quick Launch',
      popular: false,
      prices: {
        INR: { amount: '₹859', period: 'one-time' },
        USD: { amount: '$12', period: 'one-time' },
        AED: { amount: 'AED 40', period: 'one-time' },
      },
      subtitle: 'Static One-Page Website',
      description: 'Ideal for small businesses wanting an affordable, fast, and professional web presence.',
      features: [
        '1 High-Converting Single Page',
        'Mobile Responsive Layout',
        'Fast 2-3 Day Delivery',
        'Domain purchase extra cost',
        'Contact & WhatsApp Integration',
      ],
      ctaText: 'Choose Basic',
      whatsappMessage: 'Hi Helixhive! I am interested in the Basic Plan (₹859). Can we discuss the launch timeline?',
    },
    {
      id: 'custom',
      name: 'Custom Make Plan',
      badge: 'Best Value',
      popular: true,
      prices: {
        INR: { amount: '₹10,000', period: 'one-time' },
        USD: { amount: '$125', period: 'one-time' },
        AED: { amount: 'AED 450', period: 'one-time' },
      },
      subtitle: 'Tailored Multi-Page Website',
      description: 'Perfect for growing businesses that require tailored design, more pages, and higher lead conversions.',
      features: [
        'Up to 5 Custom Pages',
        'Custom Branding & Design System',
        'Mobile & Tablet Responsive',
        'Speed & SEO Optimization',
        'Lead Capture & WhatsApp Setup',
        'Domain purchase extra cost',
      ],
      ctaText: 'Choose Custom ⚡',
      whatsappMessage: 'Hi Helixhive! I would like to get started with the Custom Make Plan (₹10,000). Let us build our custom website.',
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      badge: 'Bespoke',
      popular: false,
      prices: {
        INR: { amount: '₹25,000+', period: 'or Custom Quote' },
        USD: { amount: '$320+', period: 'or Custom Quote' },
        AED: { amount: 'AED 1,150+', period: 'or Custom Quote' },
      },
      subtitle: 'Bespoke Web Platform',
      description: 'Complete custom solutions, dynamic features, and integrations tailored to established organizations.',
      features: [
        'Dynamic Content & Custom CMS',
        'Custom Features & API Integrations',
        'Advanced Analytics & CRM Sync',
        'Dedicated Priority Engineering Support',
      ],
      ctaText: 'Contact Enterprise',
      whatsappMessage: 'Hi Helixhive! Our company requires an Enterprise / Bespoke solution (₹25,000+). We have custom specifications to discuss.',
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

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest/60 relative" id="pricing">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Title & Currency Toggle */}
        <div className="text-center max-w-2xl flex flex-col items-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-primary-container font-semibold">
            TRANSPARENT INVESTMENT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface mt-2 leading-tight">
            Fixed transparent pricing. Zero surprise invoices.
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant mt-3">
            Select the strategic package tailored to your organization’s immediate growth trajectory.
          </p>

          {/* Dynamic Interactive Currency Switcher */}
          <div className="mt-6 inline-flex items-center p-1 rounded-full bg-surface-container-high border border-outline-variant/40 shadow-inner">
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currency === 'INR'
                  ? 'bg-primary-container text-on-primary-fixed shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${currency === 'INR' ? 'bg-on-primary-fixed' : 'bg-outline'}`} />
              ₹ INR (India)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currency === 'USD'
                  ? 'bg-primary-container text-on-primary-fixed shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              $ USD (Global)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('AED')}
              className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currency === 'AED'
                  ? 'bg-primary-container text-on-primary-fixed shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              AED (Middle East)
            </button>
          </div>
        </div>

        {/* 3 Tier Pricing Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-7 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-surface-container-high/90 border-2 border-primary-container shadow-[0_0_45px_rgba(0,242,254,0.25)] lg:-translate-y-3 z-10'
                  : 'bg-surface-container/70 border border-outline-variant/30 hover:border-primary-container/30 hover:bg-surface-container-high/60 shadow-lg'
              }`}
            >
              {/* Popular Floating Pill Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-fixed font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(0,242,254,0.5)]">
                  MOST POPULAR
                </div>
              )}

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-3 mt-1">
                  <span
                    className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                      plan.popular ? 'text-primary-container' : 'text-on-surface-variant'
                    }`}
                  >
                    {plan.name}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded font-mono text-xs ${
                      plan.popular
                        ? 'bg-primary-container/20 text-primary-container border border-primary-container/30'
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${
                      plan.popular ? 'text-primary drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]' : 'text-on-surface'
                    }`}
                  >
                    {plan.prices[currency].amount}
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    {plan.prices[currency].period}
                  </span>
                </div>

                {/* Subtitle */}
                <div className="font-mono text-xs font-semibold text-primary mb-2">
                  {plan.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-on-surface-variant mb-6 pb-4 border-b border-outline-variant/30 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features List */}
                <ul className="flex flex-col gap-3 text-sm text-on-surface mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary-container text-[20px] shrink-0 mt-0.5">
                        {plan.popular ? 'check_circle' : 'check'}
                      </span>
                      <span className={plan.popular && fIdx === 0 ? 'font-semibold text-primary' : ''}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => handlePlanClick(`${plan.name} (${plan.prices.INR.amount})`)}
                  className={`w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-bold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-container via-secondary-container to-secondary text-on-primary-fixed shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.65)] hover:-translate-y-0.5 active:scale-95'
                      : 'bg-surface-container-highest text-primary hover:bg-primary-container hover:text-on-primary-fixed'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <span className="material-symbols-outlined ml-1.5 text-[18px]">arrow_downward</span>
                </button>

                {/* Instant WhatsApp plan trigger */}
                <a
                  href={`https://wa.me/917907142807?text=${encodeURIComponent(plan.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono text-on-surface-variant hover:text-primary-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Instant WhatsApp Booking</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
