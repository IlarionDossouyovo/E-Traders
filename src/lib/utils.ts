import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 2): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", options || {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getMarketIcon(market: string): string {
  const icons: Record<string, string> = {
    forex: "💱",
    crypto: "₿",
    stocks: "📈",
    actions: "🏢",
  };
  return icons[market.toLowerCase()] || "📊";
}

export function getSignalColor(signal: "buy" | "sell" | "hold"): string {
  const colors = {
    buy: "text-accent-green",
    sell: "text-accent-red",
    hold: "text-yellow-400",
  };
  return colors[signal];
}

export function getSignalBg(signal: "buy" | "sell" | "hold"): string {
  const bgs = {
    buy: "bg-accent-green/20",
    sell: "bg-accent-red/20",
    hold: "bg-yellow-400/20",
  };
  return bgs[signal];
}

export function calculatePnL(entryPrice: number, currentPrice: number, quantity: number, side: "long" | "short"): { amount: number; percent: number } {
  const pnl = side === "long" 
    ? (currentPrice - entryPrice) * quantity
    : (entryPrice - currentPrice) * quantity;
  
  const percent = ((currentPrice - entryPrice) / entryPrice) * 100;
  
  return {
    amount: pnl,
    percent: side === "long" ? percent : -percent,
  };
}

export function generateDemoData(count: number, min: number, max: number): number[] {
  return Array.from({ length: count }, () => 
    Math.random() * (max - min) + min
  );
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Market hours helper
export function isMarketOpen(market: "forex" | "crypto" | "stocks"): boolean {
  const now = new Date();
  const hour = now.getUTCHours();
  const day = now.getUTCDay();
  
  if (market === "crypto") return true; // 24/7
  if (market === "forex") {
    // Monday 00:00 to Friday 22:00 UTC
    return day >= 1 && day <= 5 && hour < 22;
  }
  if (market === "stocks") {
    // NYSE hours: 9:30 AM - 4:00 PM ET
    return day >= 1 && day <= 5 && hour >= 14 && hour < 21;
  }
  return false;
}