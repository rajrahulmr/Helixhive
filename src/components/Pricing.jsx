import React, { useState } from 'react';
import { dataService } from '../services/dataService';

export default function Pricing({ offers = [], onSelectPlan, onOpenWhatsAppModal }) {
  const [currency, setCurrency] = useState('AED');
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Use passed offers or fallback to dataService
  const packageList = offers && offers.length > 0 ? offers : dataService.getOffers();

  const categories = ['ALL', 'Small Business', 'Modernization', 'Custom Systems'];

  const filteredPackages = packageList.filter((pkg) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'Small Business') {
      return pkg.category?.includes('Small Business') || pkg.id?.includes('small-biz') || pkg.id?.includes('starter');
    }
    if (activeCategory === 'Modernization') {
      return pkg.category?.includes('Modernization') || pkg.id?.includes('upgrade');
    }
    if (activeCategory === 'Custom Systems') {
      return pkg.category?.includes('Startups') || pkg.id?.includes('app');
    }
    return true;
  });

  return (
    <section className="py-14 sm:py-20 bg-white" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Transparent Fixed Pricing
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Zero Monthly Retainers
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Select Your Build Tier
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              High-speed Jamstack architectures for small businesses, site modernizations, and bespoke applications.
            </p>
          </div>

          {/* Currency Segmented Control */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold shadow-inner self-start md:self-auto">
            <button
              onClick={() => setCurrency('AED')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currency === 'AED'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🇦🇪 AED (د.إ)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🇺🇸 USD ($)
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currency === 'INR'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🇮🇳 INR (₹)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {filteredPackages.map((pkg) => {
            const isPop = pkg.isPopular;
            const priceValue = pkg.prices?.[currency] || pkg.prices?.AED || 'Inquire';

            return (
              <div
                key={pkg.id}
                className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all relative ${
                  isPop
                    ? 'border-2 border-brand-600 bg-white shadow-xl shadow-brand-500/10 md:-translate-y-1.5'
                    : 'border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Most Popular Ribbon */}
                {isPop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-white">star</span>
                    RECOMMENDED
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md truncate ${
                        isPop ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                        isPop
                          ? 'text-brand-600 bg-brand-50 border-brand-100'
                          : 'text-slate-600 bg-slate-50 border-slate-100'
                      }`}
                    >
                      {pkg.delivery}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 mt-3 leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed min-h-[36px]">
                    {pkg.desc}
                  </p>

                  {/* Price Display */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`font-display text-2xl sm:text-3xl font-extrabold ${
                          isPop ? 'text-brand-600' : 'text-slate-900'
                        }`}
                      >
                        {priceValue}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">/ flat</span>
                    </div>
                    <p className="text-[11px] font-medium text-emerald-600 mt-0.5">
                      {pkg.feeSubtext || 'Zero recurring maintenance fees'}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="mt-5 space-y-2 text-xs text-slate-600">
                    {pkg.features &&
                      pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span
                            className={`material-symbols-outlined text-[15px] mt-0.5 shrink-0 ${
                              isPop ? 'text-brand-600 font-bold' : 'text-emerald-600'
                            }`}
                          >
                            {isPop ? 'check_circle' : 'check'}
                          </span>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-3 border-t border-slate-100 space-y-2">
                  <a
                    href={`https://wa.me/917907142807?text=${encodeURIComponent(
                      pkg.waMessage || `Hi Raj, I am interested in the ${pkg.title} (${priceValue}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                      isPop
                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{pkg.buttonText || 'Claim Package'}</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-500">
                      chat
                    </span>
                  </a>

                  <button
                    onClick={() => onSelectPlan(`${pkg.title} (${priceValue})`)}
                    className="w-full py-1.5 text-center text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline cursor-pointer"
                  >
                    Order via Online Form →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Business Upgrade Value Callout */}
        <div id="business-solutions" className="mt-12 bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-100">
              Business Transformation
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              Want to upgrade your existing business with a high-speed website?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              We migrate your slow WordPress or Wix site to modern React Jamstack architecture with <strong>custom domain purchase, zero downtime, free SSL, and a guaranteed 100/100 Google Lighthouse score</strong>.
            </p>
          </div>
          <button
            onClick={() => onSelectPlan('Website Upgrade & Redesign')}
            className="shrink-0 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Upgrade My Website</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
