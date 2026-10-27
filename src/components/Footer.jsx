import React from 'react';

export default function Footer({ onOpenAdminModal }) {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/60 py-12 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            R
          </div>
          <div>
            <span className="font-semibold text-slate-800">Raj Work Lab</span>
            <span className="text-slate-500 hidden sm:inline"> — Pure Native Static Architecture.</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="#packages" className="hover:text-slate-900 transition-colors">
            Packages &amp; Pricing
          </a>
          <a href="#showcase" className="hover:text-slate-900 transition-colors">
            Showcase
          </a>
          <a href="#guarantee" className="hover:text-slate-900 transition-colors">
            48h Guarantee
          </a>
          <button
            onClick={onOpenAdminModal}
            className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span>
            Admin Portal
          </button>
        </div>

        <div className="text-slate-400">
          © {new Date().getFullYear()} Raj Work Lab. Built strictly without bloat.
        </div>
      </div>
    </footer>
  );
}
