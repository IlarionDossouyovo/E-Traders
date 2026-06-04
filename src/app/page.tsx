"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

// Demo Dashboard Content
export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={cn("transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-72")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border">
          <div>
            <h1 className="text-2xl font-bold text-white">Tableau de Bord</h1>
            <p className="text-sm text-gray-400">Bienvenue sur E-Traders By ELECTRON</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 px-4 py-2 pl-10 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-electron-gold transition-colors"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Notifications */}
            <button className="relative p-3 bg-dark-card border border-dark-border rounded-xl text-gray-400 hover:text-white hover:border-dark-hover transition-colors">
              <span className="absolute top-2 right-2 w-2 h-2 bg-electron-gold rounded-full animate-pulse" />
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            {/* Balance Card */}
            <div className="px-4 py-2 bg-gradient-to-r from-electron-gold/20 to-accent-cyan/20 border border-electron-gold/30 rounded-xl">
              <p className="text-xs text-gray-400">Solde Total</p>
              <p className="text-lg font-bold text-electron-gold">$125,430.00</p>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Portefeuille"
              value="$125,430"
              change={+12.5}
              icon="💰"
            />
            <StatCard
              title="Trade Aujourd'hui"
              value="+$1,250"
              change={+8.2}
              icon="📈"
            />
            <StatCard
              title="Signaux Actifs"
              value="24"
              change={+5}
              icon="⚡"
            />
            <StatCard
              title="Précision IA"
              value="87.3%"
              change={+2.1}
              icon="🎯"
            />
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 p-6 bg-dark-card border border-dark-border rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Performance du Portefeuille</h2>
                  <p className="text-sm text-gray-400">Evolution sur 30 jours</p>
                </div>
                <div className="flex gap-2">
                  <TimeframeButton active>1J</TimeframeButton>
                  <TimeframeButton>1S</TimeframeButton>
                  <TimeframeButton>1M</TimeframeButton>
                  <TimeframeButton>1A</TimeframeButton>
                </div>
              </div>
              <div className="h-80 flex items-center justify-center bg-dark-bg/50 rounded-xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-400">Graphique TradingView</p>
                  <p className="text-sm text-gray-500">Intégration en cours...</p>
                </div>
              </div>
            </div>
            
            {/* Quick Signals */}
            <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6">Signaux IA</h2>
              <div className="space-y-4">
                <SignalItem
                  pair="EUR/USD"
                  signal="buy"
                  confidence={92}
                  price="1.0892"
                />
                <SignalItem
                  pair="BTC/USDT"
                  signal="sell"
                  accuracy={88}
                  price="67,430"
                />
                <SignalItem
                  pair="AAPL"
                  signal="hold"
                  accuracy={75}
                  price="178.50"
                />
                <SignalItem
                  pair="ETH/USDT"
                  signal="buy"
                  accuracy={85}
                  price="3,520"
                />
              </div>
              <button className="w-full mt-6 py-3 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors">
                Voir Tous les Signaux
              </button>
            </div>
          </div>
          
          {/* Markets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MarketCard
              market="Forex"
              pairs={[
                { pair: "EUR/USD", price: "1.0892", change: +0.12 },
                { pair: "GBP/USD", price: "1.2670", change: -0.05 },
                { pair: "USD/JPY", price: "156.85", change: +0.08 },
              ]}
            />
            <MarketCard
              market="Crypto"
              pairs={[
                { pair: "BTC/USDT", price: "67,430", change: +2.5 },
                { pair: "ETH/USDT", price: "3,520", change: +1.8 },
                { pair: "SOL/USDT", price: "145.20", change: +5.2 },
              ]}
            />
            <MarketCard
              market="Actions"
              pairs={[
                { pair: "AAPL", price: "178.50", change: +0.8 },
                { pair: "NVDA", price: "875.30", change: +1.5 },
                { pair: "TSLA", price: "175.40", change: -1.2 },
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Components
function StatCard({ title, value, change, icon }: { title: string; value: string; change: number; icon: string }) {
  return (
    <div className="p-6 bg-dark-card border border-dark-border rounded-2xl hover:border-electron-gold/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className={change >= 0 ? "text-accent-green" : "text-accent-red"}>
          {change >= 0 ? "+" : ""}{change}%
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function TimeframeButton({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={cn(
        "px-3 py-1.5 text-sm rounded-lg transition-colors",
        active
          ? "bg-electron-gold text-premium-900 font-medium"
          : "text-gray-400 hover:text-white hover:bg-dark-hover"
      )}
    >
      {children}
    </button>
  );
}

function SignalItem({ pair, signal, confidence, price }: { pair: string; signal: string; confidence?: number; accuracy?: number; price: string }) {
  const signalColors: Record<string, string> = {
    buy: "text-accent-green bg-accent-green/20",
    sell: "text-accent-red bg-accent-red/20",
    hold: "text-yellow-400 bg-yellow-400/20",
  };
  
  const signalLabels: Record<string, string> = {
    buy: "ACHAT",
    sell: "VENTE",
    hold: "ATTENTE",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-dark-bg/50 rounded-xl">
      <div>
        <p className="font-semibold text-white">{pair}</p>
        <p className="text-sm text-gray-400">${price}</p>
      </div>
      <div className="text-right">
        <span className={cn("px-3 py-1 rounded-full text-xs font-medium", signalColors[signal])}>
          {signalLabels[signal]}
        </span>
        <p className="text-xs text-gray-500 mt-1">Confiance: {confidence}%</p>
      </div>
    </div>
  );
}

function MarketCard({ market, pairs }: { market: string; pairs: { pair: string; price: string; change: number }[] }) {
  return (
    <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-electron-gold rounded-full animate-pulse" />
        {market}
      </h3>
      <div className="space-y-3">
        {pairs.map((item) => (
          <div key={item.pair} className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl">
            <span className="font-medium text-white">{item.pair}</span>
            <div className="text-right">
              <span className="text-white">{item.price}</span>
              <span className={cn("ml-2 text-sm", item.change >= 0 ? "text-accent-green" : "text-accent-red")}>
                {item.change >= 0 ? "+" : ""}{item.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 border border-dark-border text-gray-400 rounded-xl hover:border-electron-gold hover:text-electron-gold transition-colors">
        Voir plus
      </button>
    </div>
  );
}