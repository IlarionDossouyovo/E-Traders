"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Brain,
  Bell,
  RefreshCw,
  Filter,
  Search,
  AlertTriangle,
  Target,
  Clock,
  Zap,
} from "lucide-react";

// Demo market data
const allSignals: Array<{
  id: string;
  pair: string;
  market: "forex" | "crypto" | "stocks";
  signal: "buy" | "sell" | "hold";
  price: number;
  change: number;
  confidence: number;
  rsi: number;
  macd: string;
  trend: string;
  timestamp: string;
}> = [
  { id: "1", pair: "EUR/USD", market: "forex", signal: "buy", price: 1.0892, change: 0.12, confidence: 92, rsi: 45, macd: "bullish", trend: "up", timestamp: "Il y a 2 min" },
  { id: "2", pair: "GBP/USD", market: "forex", signal: "hold", price: 1.2670, change: -0.05, confidence: 65, rsi: 52, macd: "neutral", trend: "sideways", timestamp: "Il y a 5 min" },
  { id: "3", pair: "USD/JPY", market: "forex", signal: "sell", price: 156.85, change: 0.08, confidence: 78, rsi: 68, macd: "bearish", trend: "down", timestamp: "Il y a 8 min" },
  { id: "4", pair: "BTC/USDT", market: "crypto", signal: "buy", price: 67430, change: 2.5, confidence: 88, rsi: 55, macd: "bullish", trend: "up", timestamp: "Il y a 1 min" },
  { id: "5", pair: "ETH/USDT", market: "crypto", signal: "buy", price: 3520, change: 1.8, confidence: 85, rsi: 58, macd: "bullish", trend: "up", timestamp: "Il y a 3 min" },
  { id: "6", pair: "SOL/USDT", market: "crypto", signal: "sell", price: 145.20, change: 5.2, confidence: 72, rsi: 75, macd: "bearish", trend: "up", timestamp: "Il y a 10 min" },
  { id: "7", pair: "AAPL", market: "stocks", signal: "hold", price: 178.50, change: 0.8, confidence: 70, rsi: 50, macd: "neutral", trend: "sideways", timestamp: "Il y a 15 min" },
  { id: "8", pair: "NVDA", market: "stocks", signal: "buy", price: 875.30, change: 1.5, confidence: 90, rsi: 42, macd: "bullish", trend: "up", timestamp: "Il y a 5 min" },
  { id: "9", pair: "TSLA", market: "stocks", signal: "sell", price: 175.40, change: -1.2, confidence: 82, rsi: 72, macd: "bearish", trend: "down", timestamp: "Il y a 12 min" },
  { id: "10", pair: "EUR/GBP", market: "forex", signal: "hold", price: 0.8595, change: 0.03, confidence: 55, rsi: 48, macd: "neutral", trend: "sideways", timestamp: "Il y a 20 min" },
];

const marketNews = [
  { id: "1", title: "La Fed maintient ses taux inchangés", source: "Reuters", time: "Il y a 1h", sentiment: "positive" },
  { id: "2", title: "Bitcoin dépasse les $67,000 après l'annonce ETF", source: "CoinDesk", time: "Il y a 2h", sentiment: "positive" },
  { id: "3", title: "NVIDIA lance une nouvelle IA...", source: "Bloomberg", time: "Il y a 3h", sentiment: "positive" },
  { id: "4", title: "Tensions commerciales USA/Chine...", source: "FX Street", time: "Il y a 4h", sentiment: "negative" },
];

export default function MarketPage() {
  const [selectedMarket, setSelectedMarket] = useState<string>("all");
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSignals = allSignals.filter((signal) => {
    if (selectedMarket !== "all" && signal.market !== selectedMarket) return false;
    if (searchQuery && !signal.pair.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar />
      
      <main className="ml-72 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analyseur de Marché IA</h1>
            <p className="text-gray-400">Signaux intelligents en temps réel par ELECTRON AI</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/videos" className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-xl text-gray-400 hover:text-white hover:border-dark-hover transition-colors">
              🎬 Tutoriels
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-xl text-gray-400 hover:text-white hover:border-dark-hover transition-colors">
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors">
              <Bell className="w-4 h-4" />
              Alertes
            </button>
          </div>
        </header>
        
        {/* AI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <AIStatCard
            icon={<Brain />}
            label="Score IA Global"
            value="87.3%"
            sub="+2.1%"
            positive
          />
          <AIStatCard
            icon={<Target />}
            label="Précision Signaux"
            value="156"
            sub="signaux/jour"
          />
          <AIStatCard
            icon={<Activity />}
            label="Marchés Surveillés"
            value="24"
            sub="actifs"
          />
          <AIStatCard
            icon={<Zap />}
            label="Latence Analyse"
            value="<50ms"
            sub="temps réel"
          />
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher une paire..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-electron-gold transition-colors"
            />
          </div>
          
          <div className="flex gap-2">
            <FilterButton active={selectedMarket === "all"} onClick={() => setSelectedMarket("all")}>
              Tous
            </FilterButton>
            <FilterButton active={selectedMarket === "forex"} onClick={() => setSelectedMarket("forex")}>
              💱 Forex
            </FilterButton>
            <FilterButton active={selectedMarket === "crypto"} onClick={() => setSelectedMarket("crypto")}>
              ₿ Crypto
            </FilterButton>
            <FilterButton active={selectedMarket === "stocks"} onClick={() => setSelectedMarket("stocks")}>
              📈 Actions
            </FilterButton>
          </div>
        </div>
        
        {/* Signals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Signals List */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xl font-bold text-white mb-4">Signaux en Direct</h2>
            {filteredSignals.map((signal) => (
              <SignalCard
                key={signal.id}
                signal={signal}
                selected={selectedSignal === signal.id}
                onClick={() => setSelectedSignal(signal.id)}
              />
            ))}
          </div>
          
          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Selected Signal Details */}
            {selectedSignal ? (
              <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4">
                  {allSignals.find(s => s.id === selectedSignal)?.pair}
                </h3>
                <AnalysisDetails signal={allSignals.find(s => s.id === selectedSignal)!} />
              </div>
            ) : (
              <div className="p-6 bg-dark-card border border-dark-border rounded-2xl text-center">
                <LineChart className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">Sélectionnez un signal pour voir les détails</p>
              </div>
            )}
            
            {/* News Sentiment */}
            <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-electron-gold" />
                Actualités
              </h3>
              <div className="space-y-3">
                {marketNews.map((news) => (
                  <div key={news.id} className="p-3 bg-dark-bg/50 rounded-xl">
                    <p className="text-sm text-white mb-1">{news.title}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{news.source}</span>
                      <span>•</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AIStatCard({
  icon,
  label,
  value,
  sub,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  positive?: boolean;
}) {
  return (
    <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
      <div className="mb-2 text-electron-gold">{icon}</div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={cn("text-2xl font-bold", positive ? "text-accent-green" : "text-white")}>
        {value}
      </p>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
  );
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-xl text-sm transition-colors",
        active
          ? "bg-electron-gold text-premium-900 font-medium"
          : "bg-dark-card border border-dark-border text-gray-400 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

function SignalCard({
  signal,
  selected,
  onClick,
}: {
  signal: (typeof allSignals)[0];
  selected?: boolean;
  onClick: () => void;
}) {
  const signalStyles = {
    buy: "border-l-accent-green bg-accent-green/5",
    sell: "border-l-accent-red bg-accent-red/5",
    hold: "border-l-yellow-400 bg-yellow-400/5",
  };
  
  const signalLabels = {
    buy: "ACHAT",
    sell: "VENTE",
    hold: "ATTENTE",
  };
  
  const signalIcons = {
    buy: <TrendingUp className="w-4 h-4" />,
    sell: <TrendingDown className="w-4 h-4" />,
    hold: <Activity className="w-4 h-4" />,
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 bg-dark-card border border-dark-border rounded-xl cursor-pointer transition-all",
        selected && "border-electron-gold",
        signalStyles[signal.signal]
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-white">{signal.pair}</p>
            <p className="text-xs text-gray-500 capitalize">{signal.market}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-white font-medium">
              {signal.market === "forex" ? signal.price.toFixed(4) : 
               signal.market === "crypto" ? formatCurrency(signal.price) : 
               `$${signal.price}`}
            </p>
            <p className={cn("text-sm", signal.change >= 0 ? "text-accent-green" : "text-accent-red")}>
              {formatPercent(signal.change)}
            </p>
          </div>
          
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full",
            signal.signal === "buy" && "bg-accent-green/20 text-accent-green",
            signal.signal === "sell" && "bg-accent-red/20 text-accent-red",
            signal.signal === "hold" && "bg-yellow-400/20 text-yellow-400"
          )}>
            {signalIcons[signal.signal]}
            <span className="text-xs font-medium">{signalLabels[signal.signal]}</span>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 relative">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="#1A2332" strokeWidth="4" fill="none" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke={
                    signal.confidence >= 80 ? "#00FF88" :
                    signal.confidence >= 60 ? "#FFD700" : "#FF4757"
                  }
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${signal.confidence * 1.256} 125.6`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {signal.confidence}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Technical Indicators */}
      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-dark-border text-sm">
        <span className="text-gray-500">RSI: <span className={cn(
          signal.rsi > 70 ? "text-accent-red" :
          signal.rsi < 30 ? "text-accent-green" :
          "text-white"
        )}>{signal.rsi}</span></span>
        <span className="text-gray-500">MACD: <span className={signal.macd === "bullish" ? "text-accent-green" : signal.macd === "bearish" ? "text-accent-red" : "text-white"}>{signal.macd}</span></span>
        <span className="text-gray-500">Tendance: <span className={signal.trend === "up" ? "text-accent-green" : signal.trend === "down" ? "text-accent-red" : "text-white"}>{signal.trend}</span></span>
        <span className="text-gray-500 ml-auto flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {signal.timestamp}
        </span>
      </div>
    </div>
  );
}

function AnalysisDetails({ signal }: { signal: (typeof allSignals)[0] }) {
  const indicatorColors = {
    bullish: "text-accent-green",
    bearish: "text-accent-red",
    neutral: "text-white",
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl">
        <span className="text-gray-400">RSI (14)</span>
        <span className={cn(
          signal.rsi > 70 ? "text-accent-red" :
          signal.rsi < 30 ? "text-accent-green" :
          "text-white"
        )}>
          {signal.rsi} - {
            signal.rsi > 70 ? "Suracheté" :
            signal.rsi < 30 ? "Survendu" :
            "Neutre"
          }
        </span>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl">
        <span className="text-gray-400">MACD</span>
        <span className={`${indicatorColors[signal.macd as keyof typeof indicatorColors]} capitalize`}>
          {signal.macd}
        </span>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl">
        <span className="text-gray-400">Tendance</span>
        <span className={`${indicatorColors[signal.trend as keyof typeof indicatorColors]} capitalize`}>
          {signal.trend}
        </span>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl">
        <span className="text-gray-400">Confiance IA</span>
        <span className="text-electron-gold font-bold">{signal.confidence}%</span>
      </div>
      
      <button className="w-full py-3 mt-4 bg-gradient-to-r from-electron-gold to-electron-yellowDark text-premium-900 font-semibold rounded-xl hover:from-electron-goldLight transition-colors">
        Exécuter le Trade
      </button>
    </div>
  );
}