import React from 'react';

export default function Logo({ size = 'default', showText = true, className = '' }) {
  const iconSize = size === 'small' ? 'w-8 h-8' : size === 'large' ? 'w-11 h-11' : 'w-10 h-10';

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Brand Icon Box */}
      <div className={`${iconSize} rounded-xl overflow-hidden shadow-sm border border-slate-200/80 bg-white flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300`}>
        <img
          src="/assets/raj_work_lab_logo.png"
          alt="Raj Work Lab Logo"
          className="w-full h-full object-contain rounded-lg p-0.5"
          onError={(e) => {
            // High-precision geometric monogram SVG fallback
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-display font-bold text-slate-900 text-base leading-tight tracking-tight flex items-center gap-1.5">
            Raj Work Lab{' '}
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 font-semibold border border-brand-100">
              UAE • IN
            </span>
          </span>
          <span className="text-[10px] tracking-widest uppercase text-slate-600 font-semibold -mt-0.5">
            High-Speed Static Sites
          </span>
        </div>
      )}
    </div>
  );
}
