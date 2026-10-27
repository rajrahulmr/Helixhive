import React from 'react';

export default function Logo({ size = 'default', showText = true, className = '' }) {
  const iconSize = size === 'small' ? 'w-7 h-7 sm:w-8 sm:h-8' : size === 'large' ? 'w-10 h-10 sm:w-11 sm:h-11' : 'w-8 h-8 sm:w-9 sm:h-9';

  return (
    <div className={`flex items-center gap-2 group select-none shrink-0 ${className}`}>
      {/* Brand Icon Box */}
      <div className={`${iconSize} rounded-lg sm:rounded-xl overflow-hidden shadow-xs border border-slate-200/80 bg-white flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300 shrink-0`}>
        <img
          src="/assets/raj_work_lab_logo.png"
          alt="Raj Work Lab Logo"
          className="w-full h-full object-contain rounded-md sm:rounded-lg p-0.5"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 flex-nowrap">
            <span className="font-display font-bold text-slate-900 text-sm sm:text-base leading-tight tracking-tight whitespace-nowrap">
              Raj Work Lab
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded bg-brand-50 text-brand-700 font-semibold border border-brand-100 whitespace-nowrap">
              DXB • IN
            </span>
          </div>
          <span className="hidden sm:block text-[10px] tracking-wider uppercase text-slate-500 font-medium -mt-0.5">
            High-Speed Websites &amp; Apps
          </span>
        </div>
      )}
    </div>
  );
}
