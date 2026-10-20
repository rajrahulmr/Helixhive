import React from 'react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-outline-variant/20">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a href="#" className="flex items-center">
              <Logo size="default" />
            </a>
            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
              High-conviction digital engineering, bespoke web systems, and high-performance frontend architecture crafted for scaling tech leaders and growing enterprises.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-primary-container font-semibold">
              Navigation
            </span>
            <a href="#services" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Services & Capabilities
            </a>
            <a href="#pricing" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Pricing Plans
            </a>
            <a href="#work" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Work / Case Studies
            </a>
            <a href="#contact" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Initiate Project Brief
            </a>
          </div>

          {/* Col 3: Direct Engagement */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-primary-container font-semibold">
              Direct Engagement
            </span>
            
            <a
              href="https://wa.me/917907142807?text=Hi%20Helixhive,%20I%20am%20interested%20in%20building%20a%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2.5"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">chat</span>
              <span>+91 7907142807</span>
            </a>

            <a
              href="mailto:rajrahulmr96@gmail.com"
              className="text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2.5"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">mail</span>
              <span>rajrahulmr96@gmail.com</span>
            </a>

            <div className="mt-2 font-mono text-xs text-outline flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary-container">location_on</span>
              <span>Bengaluru / Global Remote Delivery</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Telemetry */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-on-surface-variant text-center md:text-left">
            © 2026 Helixhive Web Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-3 font-mono text-xs text-outline">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span>Helixhive System Architecture v2.4 Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
