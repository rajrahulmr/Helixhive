import React from 'react';

export default function Logo({ size = 'default', showText = true, className = '' }) {
  // Generous, prominent logo sizing as requested
  const iconSize = size === 'small' 
    ? 'w-10 h-10 sm:w-11 sm:h-11' 
    : size === 'large' 
    ? 'w-14 h-14 sm:w-16 sm:h-16' 
    : 'w-12 h-12 sm:w-14 sm:h-14';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 group select-none shrink-0 ${className}`}>
      {/* Brand Icon Box - Enlarged & Crisp */}
      <div className={`${iconSize} rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 bg-white flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300 shrink-0`}>
        <img
          src="/assets/raj_work_lab_logo.png"
          alt="Raj Work Lab Logo"
          className="w-full h-full object-contain rounded-lg sm:rounded-xl"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 flex-nowrap">
            <span className="font-display font-black text-slate-900 text-base sm:text-xl leading-tight tracking-tight whitespace-nowrap">
              Raj Work Lab
            </span>
            <span className="text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded-md bg-brand-50 text-brand-700 font-bold border border-brand-200 whitespace-nowrap">
              DXB • IN
            </span>
          </div>
          <span className="text-[10px] sm:text-xs tracking-wider uppercase text-slate-500 font-bold -mt-0.5 block truncate">
            High-Speed Websites &amp; Apps
          </span>
        </div>
      )}
    </div>
  );
}
