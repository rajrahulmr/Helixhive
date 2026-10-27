import React, { useState } from 'react';
import Logo from './Logo';

export default function Header({
  promo,
  onOpenOrderModal,
  onOpenWhatsAppModal,
  onOpenAdminModal,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* 1. Cohesive Top Announcement / Promo Ribbon (Inside header to guarantee zero overlap on any screen) */}
      <div className="border-b border-slate-100 bg-slate-50/90 text-slate-600 py-1.5 sm:py-2 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-2 text-center md:text-left">
          {/* Left Announcement Message */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] tracking-wide shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              48h Turnaround
            </span>
            <span className="text-slate-700 font-medium text-[11px] sm:text-xs">
              {promo?.isActive && promo?.headline ? (
                <span>{promo.headline}</span>
              ) : (
                <span>
                  High-Speed Websites for UAE 🇦🇪 &amp; India 🇮🇳 Businesses &amp; Creators.
                </span>
              )}
            </span>
          </div>

          {/* Right Direct Lines & Fast Actions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-[11px]">
            <span className="text-slate-400 font-medium hidden lg:inline">Direct Desk:</span>
            <a
              href="https://wa.me/971501234567?text=Hi%20Raj,%20I'm%20reaching%20out%20from%20UAE%20for%20a%20high-speed%20website%20or%20upgrade."
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2 py-0.5 rounded-md inline-flex items-center gap-1 transition-colors"
            >
              <span>🇦🇪 UAE (+971)</span>
            </a>
            <a
              href="https://wa.me/917907142807?text=Hi%20Raj,%20I'm%20reaching%20out%20from%20India%20for%20a%20high-speed%20website%20or%20upgrade."
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2 py-0.5 rounded-md inline-flex items-center gap-1 transition-colors"
            >
              <span>🇮🇳 India (+91)</span>
            </a>
            <button
              onClick={() => onOpenOrderModal('Small Business Growth Website')}
              className="font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-0.5 transition-colors cursor-pointer ml-1"
            >
              <span>Claim Build</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[13px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Logo - clean shrink protection */}
        <a href="#" className="flex items-center shrink-0">
          <Logo />
        </a>

        {/* Center Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-600">
          <a href="#packages" className="hover:text-slate-900 transition-colors text-slate-900 font-semibold">
            Packages &amp; Pricing
          </a>
          <a href="#business-solutions" className="hover:text-slate-900 transition-colors">
            Business Solutions
          </a>
          <a href="#showcase" className="hover:text-slate-900 transition-colors">
            Live Builds
          </a>
          <a href="#guarantee" className="hover:text-slate-900 transition-colors">
            48h Guarantee
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* WhatsApp Direct - hidden on tiny mobile, shown in drawer or sm screens */}
          <button
            onClick={onOpenWhatsAppModal}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
            <span>WhatsApp</span>
          </button>

          {/* Desktop/Tablet Claim Button */}
          <button
            onClick={() => onOpenOrderModal('Small Business Growth Website')}
            className="hidden xs:inline-flex sm:inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <span>Claim Website</span>
            <span className="material-symbols-outlined text-[14px] sm:text-[15px]">arrow_forward</span>
          </button>

          {/* Admin Security Portal Lock Icon */}
          <button
            onClick={onOpenAdminModal}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer border border-transparent hover:border-slate-200"
            title="Admin Control Center (Secured)"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center cursor-pointer border border-slate-200"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/98 backdrop-blur-md px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <a
            href="#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-900 hover:text-brand-600"
          >
            Packages &amp; Pricing
          </a>
          <a
            href="#business-solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-brand-600"
          >
            Small Business &amp; Website Upgrades
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-brand-600"
          >
            Live Builds Portfolio
          </a>
          <a
            href="#guarantee"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-brand-600"
          >
            48h Turnaround Guarantee
          </a>

          {/* Mobile Drawer CTAs */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal('Small Business Growth Website');
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Claim Your Website Now</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsAppModal();
                }}
                className="flex-1 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-50"
              >
                <span className="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
                WhatsApp Desk
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 flex items-center justify-center gap-1 hover:bg-slate-50"
                title="Admin Security Gate"
              >
                <span className="material-symbols-outlined text-[16px] text-slate-500">lock</span>
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
