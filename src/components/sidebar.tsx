import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogoCompact } from './logo';

// Icons
import {
  BookOpen,
  LineChart,
  Bot,
  Wallet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  Bell,
  Search,
  Menu,
  Cpu,
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  {
    label: 'Académie',
    href: '/academy',
    icon: BookOpen,
    description: 'Apprendre le trading',
    color: 'text-electron-yellow',
  },
  {
    label: 'Marché',
    href: '/market',
    icon: LineChart,
    description: 'Analyser les marchés',
    color: 'text-accent-cyan',
  },
  {
    label: 'Trading',
    href: '/trading',
    icon: Bot,
    description: 'Trading automatique',
    color: 'text-accent-green',
  },
  {
    label: 'Portefeuille',
    href: '/portfolio',
    icon: Wallet,
    description: 'Votre portefeuille',
    color: 'text-electron-gold',
  },
  {
    label: 'Agents AI',
    href: '/agents',
    icon: Cpu,
    description: 'Automatisation 360°',
    color: 'text-purple-400',
  },
];

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300',
        'bg-premium-900 dark:bg-dark-bg border-r border-dark-border',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-dark-border">
        <LogoCompact />
        
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-hover transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                'group relative overflow-hidden',
                isActive
                  ? 'bg-gradient-to-r from-electron-gold/20 to-transparent text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-hover'
              )}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-electron-gold rounded-r-full" />
              )}
              
              <div className={cn('p-2 rounded-lg bg-dark-hover', isActive && 'bg-electron-gold/20')}>
                <Icon size={20} className={cn(isActive ? item.color : '')} />
              </div>
              
              {!collapsed && (
                <div className="flex flex-col">
                  <span className={cn('font-medium', isActive && 'text-white')}>
                    {item.label}
                  </span>
                  <span className="text-xs text-gray-500">{item.description}</span>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section - Powered By */}
      <div className="absolute bottom-20 left-0 right-0 p-4">
        <div className={cn(
          'p-4 rounded-xl bg-gradient-to-br from-electron-gold/10 to-accent-cyan/10',
          'border border-electron-gold/20'
        )}>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={18} className="text-electron-gold" />
            <span className="text-sm font-semibold text-white">ELECTRON AI</span>
          </div>
          {!collapsed && (
            <p className="text-xs text-gray-400">
              Intelligence Artificielle pour votre réussite financière
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-border">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
            'text-gray-400 hover:text-white hover:bg-dark-hover'
          )}
        >
          <Settings size={20} />
          {!collapsed && <span className="font-medium">Paramètres</span>}
        </Link>
        
        {/* User Profile */}
        <div className={cn(
          'flex items-center gap-3 mt-2 px-2',
          collapsed && 'justify-center'
        )}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electron-gold to-electron-yellowDark flex items-center justify-center">
            <span className="text-sm font-bold text-premium-900">ET</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Trader</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// Mobile Sidebar Overlay
export function MobileNav() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-premium-900 border-t border-dark-border px-2 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.slice(0, 4).map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors',
                isActive ? 'text-electron-gold' : 'text-gray-400'
              )}
            >
              <Icon size={20} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Sidebar;