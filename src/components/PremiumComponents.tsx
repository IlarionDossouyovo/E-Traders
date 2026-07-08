"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  style?: React.CSSProperties;
}

export function PremiumCard({ children, className, glow = false, hover = true, style }: PremiumCardProps) {
  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden rounded-2xl border transition-all duration-500",
        "bg-dark-card/80 backdrop-blur-xl border-dark-border",
        hover && "hover:border-electron-gold/50 hover:shadow-lg hover:shadow-electron-gold/10",
        glow && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-electron-gold/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        className
      )}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full hover:animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      {children}
    </div>
  );
}

interface AnimatedCounterProps {
  value: string | number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({ value, suffix = "", prefix = "" }: AnimatedCounterProps) {
  return (
    <span className="tabular-nums">
      {prefix}{value}{suffix}
    </span>
  );
}

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export function GlowButton({ children, onClick, className, variant = "primary" }: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-6 py-3 font-semibold rounded-xl overflow-hidden group",
        variant === "primary" 
          ? "bg-electron-gold text-premium-900" 
          : "bg-dark-card text-white border border-dark-border",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      {variant === "primary" && (
        <div className="absolute inset-0 bg-electron-goldLight opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: string;
  delay?: number;
}

export function StatCard({ title, value, change, icon, delay = 0 }: StatCardProps) {
  return (
    <PremiumCard 
      className="p-6 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        <div className={cn(
          "px-2 py-1 rounded-lg text-sm font-medium",
          change >= 0 ? "bg-accent-green/20 text-accent-green" : "bg-accent-red/20 text-accent-red"
        )}>
          {change >= 0 ? "+" : ""}{change}%
        </div>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </PremiumCard>
  );
}
