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

export function Logo({ size = 'md', showText = true, variant = 'full' }: LogoProps) {
  const sizeConfig = sizes[size];
  
  // SVG Logo Icon - Electron Lightning Bolt with Trading Chart
  const LogoIcon = () => (
    <svg
      width={sizeConfig.width}
      height={sizeConfig.height}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Background Circle - Premium Dark */}
      <circle cx="36" cy="36" r="34" fill="url(#logoGradient)" stroke="#FFD700" strokeWidth="2" />
      
      {/* Lightning Bolt - ELECTRON Symbol */}
      <path
        d="M40 18L28 36H38L32 54L44 36H34L40 18Z"
        fill="#FFD700"
        stroke="#FFFBEB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Trading Line Chart Accent */}
      <path
        d="M22 48L28 42L34 46L50 34"
        stroke="#00D4FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Chart Points */}
      <circle cx="22" cy="48" r="2" fill="#00D4FF" />
      <circle cx="28" cy="42" r="2" fill="#00D4FF" />
      <circle cx="34" cy="46" r="2" fill="#00D4FF" />
      <circle cx="50" cy="34" r="2" fill="#00FF88" />
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="72" y2="72">
          <stop offset="0%" stopColor="#0F2137" />
          <stop offset="100%" stopColor="#0A1628" />
        </linearGradient>
      </defs>
    </svg>
  );

  const IconOnly = () => (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <LogoIcon />
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 rounded-full bg-electron-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );

  const FullLogo = () => (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative">
        <LogoIcon />
        {/* Glow Effect on Hover */}
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

// Alternative Logo with Animated Ring
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
      <circle cx="36" cy="36" r="34" stroke="#FFD700" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="34;36;34" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="36" cy="36" r="30" stroke="#FFD700" strokeWidth="0.5" opacity="0.5" />
      
      {/* Main Background */}
      <circle cx="36" cy="36" r="28" fill="url(#logoGradientAnimated)" stroke="#FFD700" strokeWidth="2" />
      
      {/* Lightning Bolt */}
      <path
        d="M40 18L28 36H38L32 54L44 36H34L40 18Z"
        fill="#FFD700"
        stroke="#FFFBEB"
        strokeWidth="1.5"
      />
      
      {/* Floating Chart Elements */}
      <path
        d="M22 48L28 42L34 46L50 34"
        stroke="#00D4FF"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      
      <defs>
        <linearGradient id="logoGradientAnimated" x1="0" y1="0" x2="72" y2="72">
          <stop offset="0%" stopColor="#0F2137" />
          <stop offset="100%" stopColor="#0A1628" />
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
        <circle cx="36" cy="36" r="34" fill="url(#compactGrad)" stroke="#FFD700" strokeWidth="2" />
        <path
          d="M40 18L28 36H38L32 54L44 36H34L40 18Z"
          fill="#FFD700"
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