import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'full' | 'icon';
}

const sizes = {
  sm: { width: 32, height: 32, text: 'text-sm' },
  md: { width: 40, height: 40, text: 'text-lg' },
  lg: { width: 56, height: 56, text: 'text-2xl' },
  xl: { width: 72, height: 72, text: 'text-4xl' },
};

// Premium Logo SVG - E-TRADERS BY ELECTRON
export function Logo({ size = 'md', showText = true, variant = 'full' }: LogoProps) {
  const sizeConfig = sizes[size];
  
  const LogoIcon = () => (
    <svg
      width={sizeConfig.width}
      height={sizeConfig.height}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Premium Dark Background Circle */}
      <circle cx="36" cy="36" r="34" fill="url(#premiumGradient)" stroke="#D4AF37" strokeWidth="2" />
      
      {/* Outer Glow Ring */}
      <circle cx="36" cy="36" r="32" stroke="url(#goldGlow)" strokeWidth="1" opacity="0.5" />
      
      {/* Dynamic Circle Structure */}
      <circle cx="36" cy="36" r="28" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
      
      {/* Candlestick Chart - Financial Element */}
      <rect x="18" y="32" width="3" height="8" fill="#00FF88" rx="1" />
      <rect x="24" y="28" width="3" height="12" fill="#FF4757" rx="1" />
      <rect x="30" y="24" width="3" height="16" fill="#00FF88" rx="1" />
      <rect x="36" y="20" width="3" height="20" fill="#00FF88" rx="1" />
      <rect x="42" y="26" width="3" height="14" fill="#00FF88" rx="1" />
      <rect x="48" y="18" width="3" height="22" fill="#00FF88" rx="1" />
      
      {/* Rising Financial Arrow */}
      <path
        d="M36 12L32 18H35L33 26L38 18H35L38 12H36Z"
        fill="#D4AF37"
        stroke="#F5C542"
        strokeWidth="0.5"
      />
      
      {/* AI Neural Network Dots */}
      <circle cx="22" cy="52" r="1.5" fill="#00D4FF" opacity="0.8" />
      <circle cx="50" cy="52" r="1.5" fill="#00D4FF" opacity="0.8" />
      <circle cx="36" cy="56" r="1.5" fill="#00D4FF" opacity="0.8" />
      <circle cx="36" cy="48" r="2" fill="#D4AF37" />
      
      {/* Neural Connections */}
      <path d="M22 52L36 48L50 52" stroke="#00D4FF" strokeWidth="0.5" opacity="0.4" />
      <path d="M36 48L36 56" stroke="#00D4FF" strokeWidth="0.5" opacity="0.4" />
      
      {/* Lightning Bolt - ELECTRON Symbol */}
      <path
        d="M38 8L26 24H35L29 40L41 24H32L38 8Z"
        fill="url(#lightningGradient)"
        stroke="#FFFBEB"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="premiumGradient" x1="0" y1="0" x2="72" y2="72">
          <stop offset="0%" stopColor="#0F2137" />
          <stop offset="50%" stopColor="#050505" />
          <stop offset="100%" stopColor="#0A1628" />
        </linearGradient>
        <linearGradient id="goldGlow" x1="0" y1="0" x2="72" y2="72">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F5C542" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="lightningGradient" x1="26" y1="8" x2="41" y2="40">
          <stop offset="0%" stopColor="#F5C542" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  );

  const IconOnly = () => (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <LogoIcon />
        <div className="absolute inset-0 rounded-full bg-electron-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );

  const FullLogo = () => (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative">
        <LogoIcon />
        <div className="absolute inset-0 rounded-full bg-electron-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold leading-none tracking-tight ${sizeConfig.text}`}>
            <span className="text-electron-gold">E-</span>
            <span className="text-white dark:text-white">Traders</span>
          </span>
          <span className={`text-[10px] uppercase tracking-[0.3em] text-electron-goldDark font-semibold`}>
            By ELECTRON
          </span>
        </div>
      )}
    </Link>
  );

  return variant === 'icon' ? <IconOnly /> : <FullLogo />;
}

// Animated Logo with Rings
export function LogoAnimated({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeConfig = sizes[size];
  
  return (
    <svg
      width={sizeConfig.width}
      height={sizeConfig.height}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-pulse-glow"
    >
      {/* Animated Outer Rings */}
      <circle cx="36" cy="36" r="34" stroke="#D4AF37" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="34;36;34" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="36" cy="36" r="30" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      
      {/* Main Background */}
      <circle cx="36" cy="36" r="28" fill="url(#logoGradAnim)" stroke="#D4AF37" strokeWidth="2" />
      
      {/* Candlesticks */}
      <rect x="18" y="32" width="3" height="8" fill="#00FF88" rx="1" />
      <rect x="24" y="28" width="3" height="12" fill="#FF4757" rx="1" />
      <rect x="30" y="24" width="3" height="16" fill="#00FF88" rx="1" />
      <rect x="36" y="20" width="3" height="20" fill="#00FF88" rx="1" />
      <rect x="42" y="26" width="3" height="14" fill="#00FF88" rx="1" />
      <rect x="48" y="18" width="3" height="22" fill="#00FF88" rx="1" />
      
      {/* Lightning Bolt */}
      <path
        d="M38 8L26 24H35L29 40L41 24H32L38 8Z"
        fill="url(#lightningGrad)"
        stroke="#FFFBEB"
        strokeWidth="1"
      />
      
      {/* Neural Dots */}
      <circle cx="22" cy="52" r="1.5" fill="#00D4FF" />
      <circle cx="50" cy="52" r="1.5" fill="#00D4FF" />
      <circle cx="36" cy="56" r="1.5" fill="#00D4FF" />
      <circle cx="36" cy="48" r="2" fill="#D4AF37" />
      
      <defs>
        <linearGradient id="logoGradAnim" x1="0" y1="0" x2="72" y2="72">
          <stop offset="0%" stopColor="#0F2137" />
          <stop offset="100%" stopColor="#0A1628" />
        </linearGradient>
        <linearGradient id="lightningGrad" x1="26" y1="8" x2="41" y2="40">
          <stop offset="0%" stopColor="#F5C542" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Compact Logo for Sidebar
export function LogoCompact() {
  return (
    <Link href="/" className="flex items-center justify-center">
      <svg
        width="36"
        height="36"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="36" cy="36" r="34" fill="url(#compactGrad)" stroke="#D4AF37" strokeWidth="2" />
        
        {/* Candlesticks */}
        <rect x="20" y="30" width="3" height="10" fill="#00FF88" rx="1" />
        <rect x="26" y="26" width="3" height="14" fill="#FF4757" rx="1" />
        <rect x="32" y="22" width="3" height="18" fill="#00FF88" rx="1" />
        <rect x="38" y="28" width="3" height="12" fill="#00FF88" rx="1" />
        <rect x="44" y="24" width="3" height="16" fill="#00FF88" rx="1" />
        
        <path
          d="M38 8L26 24H35L29 40L41 24H32L38 8Z"
          fill="#D4AF37"
          stroke="#FFFBEB"
          strokeWidth="1"
        />
        
        <defs>
          <linearGradient id="compactGrad" x1="0" y1="0" x2="72" y2="72">
            <stop offset="0%" stopColor="#0F2137" />
            <stop offset="100%" stopColor="#0A1628" />
          </linearGradient>
        </defs>
      </svg>
    </Link>
  );
}

export default Logo;
