import React, { useState } from 'react';
import Logo from './Logo';

export default function Header({ onOpenOrderModal, onOpenWhatsAppModal, onOpenAdminModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Minimal Announcement Bar */}
      <div className="border-b border-slate-100 bg-slate-50/80 text-xs text-slate-600 py-2.5 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-700 text-[11px] tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              48h Turnaround
            </span>
            <span className="text-slate-700 font-medium text-xs">
              Jamstack Sites for UAE 🇦🇪 &amp; India 🇮🇳 Creators &amp; Startups.
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-[11px]">
            <span className="text-slate-500 font-medium hidden md:inline">Direct Line:</span>
            <a
              href="https://wa.me/971501234567?text=Hi%20Raj,%20I'm%20reaching%20out%20from%20UAE%20for%20a%20custom%20high-speed%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1 transition-colors"
            >
              <span>🇦🇪 UAE (+971)</span>
            </a>
            <a
              href="https://wa.me/917907142807?text=Hi%20Raj,%20I'm%20reaching%20out%20from%20India%20for%20a%20custom%20high-speed%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1 transition-colors"
            >
              <span>🇮🇳 India (+91)</span>
            </a>
            <button
              onClick={() => onOpenOrderModal('Creator Business Website')}
              className="font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-0.5 transition-colors ml-1 cursor-pointer"
            >
              Claim yours
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ultra-Clean Top Navigation */}
      <header className="sticky top-[41px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <Logo />
          </a>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#packages" className="hover:text-slate-900 transition-colors text-slate-900 font-semibold">
              Packages &amp; Pricing
            </a>
            <a href="#showcase" className="hover:text-slate-900 transition-colors">
              Live Builds
            </a>
            <a href="#guarantee" className="hover:text-slate-900 transition-colors">
              48h Guarantee
            </a>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenWhatsAppModal}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => onOpenOrderModal('Creator Business Website')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3.5 sm:px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Claim Website</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onOpenAdminModal}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              title="Admin Control Dashboard"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-4 space-y-3">
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-900 hover:text-brand-600"
            >
              Packages &amp; Pricing
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-brand-600"
            >
              Live Builds
            </a>
            <a
              href="#guarantee"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-brand-600"
            >
              48h Guarantee
            </a>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsAppModal();
                }}
                className="flex-1 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
                WhatsApp
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal('Creator Business Website');
                }}
                className="flex-1 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1"
              >
                Claim Website
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
