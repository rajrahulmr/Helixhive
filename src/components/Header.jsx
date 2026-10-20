import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['services', 'pricing', 'work', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Pricing Plans', href: '#pricing', id: 'pricing' },
    { name: 'Work / Projects', href: '#work', id: 'work' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#061423]/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-[#061423]/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center focus:outline-none">
          <Logo size="default" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? 'text-primary-container font-semibold drop-shadow-[0_0_8px_rgba(0,242,254,0.4)]'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-container to-secondary rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Triggers (Desktop) */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://wa.me/917907142807?text=Hi%20Helixhive,%20I%20am%20interested%20in%20building%20a%20website%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-surface-container-high/80 text-primary-container hover:text-white hover:bg-surface-container-highest transition-all"
            title="Chat on WhatsApp"
            aria-label="Direct WhatsApp Consultation"
          >
            <span className="material-symbols-outlined text-[20px] block">chat</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold text-on-primary-fixed bg-gradient-to-r from-primary-container via-secondary-container to-secondary shadow-[0_0_24px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            <span>Get Started</span>
            <span className="material-symbols-outlined ml-1.5 text-[18px]">arrow_forward</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="https://wa.me/917907142807?text=Hi%20Helixhive,%20I%20am%20interested%20in%20building%20a%20website%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface-container-high text-primary-container"
            aria-label="WhatsApp"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-surface-container-high text-primary hover:text-primary-container focus:outline-none transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Hamburger Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-[#061423]/98 backdrop-blur-2xl border-b border-outline-variant/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium text-on-surface hover:text-primary-container py-2 border-b border-surface-container-high transition-colors"
              >
                <span>{link.name}</span>
                <span className="material-symbols-outlined text-primary-container text-[18px]">chevron_right</span>
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl text-center text-sm font-bold text-on-primary-fixed bg-gradient-to-r from-primary-container to-secondary-container shadow-[0_0_20px_rgba(0,242,254,0.35)]"
              >
                Get Free Consultation
              </a>
              <a
                href="https://wa.me/917907142807?text=Hi%20Helixhive,%20I%20am%20interested%20in%20building%20a%20website%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl text-center text-sm font-semibold text-primary bg-surface-container-high flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-primary-container text-[18px]">chat</span>
                Chat on WhatsApp (+91 7907142807)
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
