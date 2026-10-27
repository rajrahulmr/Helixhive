import React from 'react';

export default function Logo({ size = 'default', showText = true, className = '' }) {
  // Increased sizes: large, prominent, and high visual presence
  const iconSize = size === 'small' 
    ? 'w-9 h-9 sm:w-10 sm:h-10' 
    : size === 'large' 
    ? 'w-12 h-12 sm:w-14 sm:h-14' 
    : 'w-10 h-10 sm:w-12 sm:h-12';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none shrink-0 ${className}`}>
      {/* Brand Icon Box - High polish */}
      <div className={`${iconSize} rounded-xl overflow-hidden shadow-sm border border-slate-200/90 bg-white flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300 shrink-0`}>
        <img
          src="/assets/raj_work_lab_logo.png"
          alt="Raj Work Lab Logo"
          className="w-full h-full object-contain rounded-lg p-0.5"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap">
            <span className="font-display font-extrabold text-slate-900 text-base sm:text-lg leading-tight tracking-tight whitespace-nowrap">
              Raj Work Lab
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-brand-50 text-brand-700 font-bold border border-brand-200/80 whitespace-nowrap">
              DXB • IN
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] tracking-wider uppercase text-slate-500 font-semibold -mt-0.5 block truncate">
            High-Speed Websites &amp; Apps
          </span>
        </div>
      )}
    </div>
  );
}
