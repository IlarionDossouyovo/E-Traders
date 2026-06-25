"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

// ===== LOGO E-TRADERS BY ELECTRON =====
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-gradient-to-br from-electron-gold via-yellow-400 to-yellow-600 rounded-xl rotate-45" />
        <div className="absolute inset-0.5 bg-dark-bg rounded-xl flex items-center justify-center">
          <span className="text-2xl font-bold text-electron-gold" style={{ fontFamily: 'monospace' }}>E</span>
        </div>
        <div className="absolute -inset-1 bg-electron-gold/30 blur-xl rounded-full animate-pulse" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-wider">E-TRADERS</span>
          <span className="text-xs text-electron-gold bg-electron-gold/10 px-2 py-0.5 rounded-full">BY ELECTRON</span>
        </div>
        <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Trade Smart. Trade Intelligent.</p>
      </div>
    </div>
  );
}

// Navigation Link
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-400 hover:text-electron-gold transition-colors text-sm font-medium">
      {children}
    </Link>
  );
}

// ===== BLOG ARTICLES =====
const blogArticles = [
  {
    id: 1,
    title: "Introduction au Trading Automatisé",
    excerpt: "Découvrez comment les agents IA révolutionnent le trading financier...",
    category: "Trading",
    date: "24 Juin 2024",
    readTime: "5 min",
    image: "🤖",
  },
  {
    id: 2,
    title: "Stratégies RSI et MACD",
    excerpt: "Maîtrisez les indicateurs techniques pour des signaux précis...",
    category: "Analyse",
    date: "23 Juin 2024",
    readTime: "8 min",
    image: "📊",
  },
  {
    id: 3,
    title: "Gestion du Risque en Trading",
    excerpt: "Les règles d'or pour protéger votre capital...",
    category: "Risque",
    date: "22 Juin 2024",
    readTime: "6 min",
    image: "🛡️",
  },
  {
    id: 4,
    title: "Bitcoin et Crypto Trading",
    excerpt: "Analyse des tendances crypto avec l'IA...",
    category: "Crypto",
    date: "21 Juin 2024",
    readTime: "7 min",
    image: "₿",
  },
  {
    id: 5,
    title: "Forex: Paires Majeures",
    excerpt: "Guide complet des paires de devises...",
    category: "Forex",
    date: "20 Juin 2024",
    readTime: "5 min",
    image: "💱",
  },
  {
    id: 6,
    title: "Algo Trading 360°",
    excerpt: "Automatisez vos stratégies avec nos agents IA...",
    category: "Automation",
    date: "19 Juin 2024",
    readTime: "10 min",
    image: "⚡",
  },
];

// Blog Card Component
function BlogCard({ article }: { article: typeof blogArticles[0] }) {
  return (
    <div className="group p-6 bg-dark-card border border-dark-border rounded-2xl hover:border-electron-gold/50 transition-all duration-300 hover:-translate-y-1">
      <div className="text-4xl mb-4">{article.image}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-electron-gold bg-electron-gold/10 px-2 py-1 rounded-full">{article.category}</span>
        <span className="text-xs text-gray-500">{article.readTime}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-electron-gold transition-colors">{article.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{article.excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{article.date}</span>
        <Link href="/blog" className="text-sm text-electron-gold hover:underline">Lire plus →</Link>
      </div>
    </div>
  );
}

// Feature Card with Animation
function FeatureCard({ icon, title, description, link, delay }: { icon: string; title: string; description: string; link: string; delay: string }) {
  return (
    <Link href={link} className="group p-8 bg-dark-card border border-dark-border rounded-2xl hover:border-electron-gold/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-electron-gold/10">
      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electron-gold transition-colors">{title}</h3>
      <p className="text-gray-400">{description}</p>
      <div className="mt-4 text-electron-gold opacity-0 group-hover:opacity-100 transition-opacity">Découvrir →</div>
    </Link>
  );
}

// Stat Card Animation
function AnimatedStat({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  return (
    <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
      <div className="text-4xl font-bold text-electron-gold mb-2">{value}{suffix && <span className="text-2xl">{suffix}</span>}</div>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}

// Demo Dashboard Content
export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={cn("transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-72")}>
        {/* Header Premium */}
        <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border">
          <Logo />
          
          <div className="flex items-center gap-6">
            <NavLink href="/academy">Académie</NavLink>
            <NavLink href="/market">Marché</NavLink>
            <NavLink href="/trading">Trading</NavLink>
            <NavLink href="/portfolio">Portefeuille</NavLink>
            <NavLink href="/agents">Agents AI</NavLink>
            <NavLink href="/settings">Paramètres</NavLink>
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
          {/* ===== HERO SECTION ===== */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              Bienvenue sur <span className="text-electron-gold">E-TRADERS</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">La plateforme de trading intelligent par excellence</p>
            <div className="flex justify-center gap-4">
              <Link href="/trading" className="px-8 py-3 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors">
                Commencer le Trading
              </Link>
              <Link href="/academy" className="px-8 py-3 border border-electron-gold text-electron-gold font-semibold rounded-xl hover:bg-electron-gold/10 transition-colors">
                Apprendre
              </Link>
            </div>
          </div>

          {/* ===== FEATURES WITH ANIMATION ===== */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Découvrir nos fonctionnalités</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard icon="🎓" title="Académie" description="Apprenez le trading avec nos cours interactifs et notre IA" link="/academy" delay="" />
              <FeatureCard icon="📊" title="Analyse Marché" description="Signaux IA en temps réel pour tous les marchés" link="/market" delay="" />
              <FeatureCard icon="🤖" title="Trading Automatique" description="12 agents IA pour automatiser vos stratégies" link="/agents" delay="" />
              <FeatureCard icon="💼" title="Portefeuille" description="Suivez vos positions en temps réel" link="/portfolio" delay="" />
              <FeatureCard icon="⚔️" title="Scalping Bot" description="Trading haute fréquence automatique" link="/trading" delay="" />
              <FeatureCard icon="🛡️" title="Gestion Risque" description="Protégez votre capital avec l'IA" link="/agents" delay="" />
            </div>
          </div>

          {/* ===== STATS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnimatedStat value="$125,430" label="Portefeuille" suffix="$" />
            <AnimatedStat value="+1,250" label="Profit Aujourd'hui" suffix="$" />
            <AnimatedStat value="24" label="Signaux Actifs" />
            <AnimatedStat value="87.3%" label="Précision IA" />
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
              <Link href="/market" className="block w-full mt-6 py-3 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors text-center">
                Voir Tous les Signaux
              </Link>
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

          {/* ===== BLOG ARTICLES SECTION ===== */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Articles & Blog</h2>
              <Link href="/blog" className="text-electron-gold hover:underline">Voir tout →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogArticles.slice(0, 6).map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
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
  const signalColors: any = {
    buy: "text-accent-green bg-accent-green/20",
    sell: "text-accent-red bg-accent-red/20",
    hold: "text-yellow-400 bg-yellow-400/20",
  };
  
  const signalLabels: any = {
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
  const marketLink = market === "Forex" || market === "Actions" ? "/market" : "/market";
  
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
      <Link href={marketLink} className="block w-full mt-4 py-2 border border-dark-border text-gray-400 rounded-xl hover:border-electron-gold hover:text-electron-gold transition-colors text-center">
        Voir plus
      </Link>
    </div>
  );
}