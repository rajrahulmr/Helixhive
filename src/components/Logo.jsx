import React from 'react';

export default function Logo({ size = 'default', showText = true, className = '' }) {
  const iconSize = size === 'small' ? 'w-7 h-7' : size === 'large' ? 'w-10 h-10' : 'w-8 h-8';
  const textSize = size === 'small' ? 'text-lg' : size === 'large' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Geometric DNA / Helix Hexagon Vector Icon */}
      <div className={`relative ${iconSize} flex items-center justify-center`}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-primary-container/20 rounded-xl blur-md group-hover:bg-primary-container/40 transition-all duration-300" />
        
        {/* SVG Geometric Double Helix */}
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_0_12px_rgba(0,242,254,0.6)] transform group-hover:scale-105 transition-transform duration-300"
        >
          {/* Hexagonal Outer Frame */}
          <polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            stroke="url(#hexGradient)"
            strokeWidth="2"
            fill="rgba(6, 20, 35, 0.7)"
            strokeLinejoin="round"
          />

          {/* DNA Strand 1 (Cyan) */}
          <path
            d="M12 12 C 16 16, 24 16, 28 20 C 32 24, 24 28, 20 28"
            stroke="url(#strandCyan)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* DNA Strand 2 (Ice Blue) */}
          <path
            d="M28 12 C 24 16, 16 16, 12 20 C 8 24, 16 28, 20 28"
            stroke="url(#strandIce)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Rung Base Pairs */}
          <line x1="15" y1="14" x2="25" y2="14" stroke="#00f2fe" strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round" />
          <line x1="14" y1="20" x2="26" y2="20" stroke="#92dbff" strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round" />
          <line x1="16" y1="26" x2="24" y2="26" stroke="#00f2fe" strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round" />

          {/* Glowing Helix Central Core Nucleus */}
          <circle cx="20" cy="20" r="2.5" fill="#00f2fe" className="animate-pulse" />
          <circle cx="15" cy="14" r="1.5" fill="#6ff6ff" />
          <circle cx="25" cy="14" r="1.5" fill="#92dbff" />
          <circle cx="14" cy="20" r="1.5" fill="#92dbff" />
          <circle cx="26" cy="20" r="1.5" fill="#6ff6ff" />

          {/* Gradients */}
          <defs>
            <linearGradient id="hexGradient" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00f2fe" />
              <stop offset="0.5" stopColor="#3a494b" />
              <stop offset="1" stopColor="#00c4fd" />
            </linearGradient>
            <linearGradient id="strandCyan" x1="12" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00f2fe" />
              <stop offset="1" stopColor="#00c4fd" />
            </linearGradient>
            <linearGradient id="strandIce" x1="28" y1="12" x2="12" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#92dbff" />
              <stop offset="1" stopColor="#6ff6ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-bold tracking-tight text-primary ${textSize} flex items-center`}>
            Helix<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary">hive</span>
          </span>
          {size === 'large' && (
            <span className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant">
              Web Architecture Studio
            </span>
          )}
        </div>
      )}
    </div>
  );
}
