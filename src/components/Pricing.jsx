import React, { useState } from 'react';

export default function Pricing({ onSelectPlan, onOpenWhatsAppModal }) {
  const [currency, setCurrency] = useState('AED');

  const packages = [
    {
      id: 'bio-link',
      title: 'Bio Link Website',
      badge: 'Replace Linktree',
      delivery: '48h Delivery',
      desc: 'Perfect for influencers, coaches, and creators who want a stunning, instant-loading bio page.',
      prices: {
        AED: 'AED 349',
        USD: '$99',
        INR: '₹4,999',
      },
      feeSubtext: 'Zero monthly fees forever',
      isPopular: false,
      features: [
        'Replaces slow Linktree with your own custom branded website',
        'Tap-to-Chat buttons for WhatsApp & Instagram DMs',
        'Add your photos, videos, links & services easily',
        'Opens in 0.1 second — followers never wait',
        'Delivered ready to launch in 48 Hours',
      ],
      waMessage:
        "Hi Raj, I want the Bio Link Website for my Instagram Bio. Let's start the build!",
      buttonText: 'Get Bio Link on WhatsApp',
    },
    {
      id: 'creator-business',
      title: 'Creator Business Website',
      badge: 'Complete Showcase',
      delivery: '3-4 Days Delivery',
      desc: 'Everything in Bio Link plus multi-section portfolio to showcase your work, reviews, and get client enquiries.',
      prices: {
        AED: 'AED 899',
        USD: '$249',
        INR: '₹12,999',
      },
      feeSubtext: 'Zero monthly subscriptions forever',
      isPopular: true,
      features: [
        'Custom modern multi-section website designed for your brand',
        'Showcase photos, videos, past work & customer reviews',
        'Direct WhatsApp & Email booking form for client leads',
        'Connect your own domain name (yourname.com)',
        'Delivered ready to launch in 3 to 4 Days',
      ],
      waMessage:
        "Hi Raj, I'm ready to get the Creator Business Website with portfolio and lead booking.",
      buttonText: 'Get Business Site on WhatsApp',
    },
    {
      id: 'custom-web-app',
      title: 'Custom Web App',
      badge: 'Bespoke System',
      delivery: '7 Days Delivery',
      desc: 'For startups, gyms, clinics, or stores that need custom booking, online payments, or client portals.',
      prices: {
        AED: 'AED 2,199',
        USD: '$599',
        INR: '₹29,999',
      },
      feeSubtext: 'Includes 30 days engineering support',
      isPopular: false,
      features: [
        'Custom online payment checkout (Stripe / Apple Pay / Cards)',
        'Automated booking calendar or client portal',
        'Super fast, ultra-secure — no WordPress hacks or crashes',
        'Easy admin panel to manage inquiries & content',
        'Delivered in 7 Days with 30 days full support',
      ],
      waMessage:
        "Hi Raj, I'm interested in building a Custom Web App with payments/portal.",
      buttonText: 'Discuss Custom App on WhatsApp',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Currency Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Transparent Fixed Pricing
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                No Monthly Retainers
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Select Your Build Tier
            </h2>
          </div>

          {/* Currency Segmented Control */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold shadow-inner">
            <button
              onClick={() => setCurrency('AED')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currency === 'AED'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              AED (د.إ)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currency === 'INR'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              INR (₹)
            </button>
          </div>
        </div>

        {/* 3 High Polish Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg) => {
            const isPop = pkg.isPopular;
            return (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                  isPop
                    ? 'border-2 border-brand-600 bg-white shadow-xl shadow-brand-500/10 md:-translate-y-2'
                    : 'border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Most Popular Ribbon */}
                {isPop && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-white">star</span>
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                        isPop ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                        isPop
                          ? 'text-brand-600 bg-brand-50 border-brand-100'
                          : 'text-slate-600 bg-slate-50 border-slate-100'
                      }`}
                    >
                      {pkg.delivery}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-900 mt-4">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {pkg.desc}
                  </p>

                  {/* Price */}
                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span
                      className={`font-display text-4xl font-extrabold ${
                        isPop ? 'text-brand-600' : 'text-slate-900'
                      }`}
                    >
                      {pkg.prices[currency]}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ one-time</span>
                  </div>
                  <p
                    className={`text-[11px] font-medium mt-1 ${
                      isPop ? 'text-emerald-600' : 'text-emerald-600'
                    }`}
                  >
                    {pkg.feeSubtext}
                  </p>

                  {/* Features List */}
                  <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span
                          className={`material-symbols-outlined text-[16px] mt-0.5 shrink-0 ${
                            isPop ? 'text-brand-600 font-bold' : 'text-emerald-600'
                          }`}
                        >
                          {isPop ? 'check_circle' : 'check'}
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-4 border-t border-slate-100 space-y-2">
                  <a
                    href={`https://wa.me/917907142807?text=${encodeURIComponent(pkg.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                      isPop
                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    <span>{pkg.buttonText}</span>
                    <span
                      className={`material-symbols-outlined text-[15px] ${
                        isPop ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    >
                      chat
                    </span>
                  </a>

                  <button
                    onClick={() => onSelectPlan(`${pkg.title} (${pkg.prices[currency]})`)}
                    className="w-full py-2 text-center text-xs font-medium text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
                  >
                    Or fill custom booking form →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
