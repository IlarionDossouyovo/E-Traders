"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

// All Blog Articles
const allArticles = [
  {
    id: 1,
    title: "Introduction au Trading Automatisé avec l'IA",
    excerpt: "Découvrez comment les agents IA révolutionnent le trading financier moderne. Apprenez les bases de l'automatisation et comment maximiser vos profits.",
    content: "Le trading automatisé représente l'avenir de la finance...",
    category: "Trading",
    date: "24 Juin 2024",
    readTime: "5 min",
    image: "🤖",
    featured: true,
  },
  {
    id: 2,
    title: "Stratégies RSI et MACD expliquées",
    excerpt: "Maîtrisez les indicateurs techniques pour des signaux précis. Guide complet pour comprendre et utiliser RSI et MACD.",
    content: "Le RSI (Relative Strength Index) est un indicateur...",
    category: "Analyse",
    date: "23 Juin 2024",
    readTime: "8 min",
    image: "📊",
    featured: true,
  },
  {
    id: 3,
    title: "Gestion du Risque en Trading",
    excerpt: "Les règles d'or pour protéger votre capital. Comment limiter les pertes et maximiser les gains.",
    content: "La gestion du risque est essentielle...",
    category: "Risque",
    date: "22 Juin 2024",
    readTime: "6 min",
    image: "🛡️",
    featured: false,
  },
  {
    id: 4,
    title: "Bitcoin et Crypto Trading avec l'IA",
    excerpt: "Analyse des tendances crypto avec l'intelligence artificielle. Prédictions et signaux pour BTC, ETH et les altcoins.",
    content: "Le marché crypto est très volatile...",
    category: "Crypto",
    date: "21 Juin 2024",
    readTime: "7 min",
    image: "₿",
    featured: true,
  },
  {
    id: 5,
    title: "Forex: Guide des Paires Majeures",
    excerpt: "Guide complet des paires de devises majeures. EUR/USD, GBP/USD, USD/JPY et plus.",
    content: "Le marché Forex est le plus liquide...",
    category: "Forex",
    date: "20 Juin 2024",
    readTime: "5 min",
    image: "💱",
    featured: false,
  },
  {
    id: 6,
    title: "Algo Trading 360° avec nos Agents IA",
    excerpt: "Automatisez vos stratégies de trading avec nos 12 agents IA. Configuration et optimisation.",
    content: "L'algotrading permet...",
    category: "Automation",
    date: "19 Juin 2024",
    readTime: "10 min",
    image: "⚡",
    featured: true,
  },
  {
    id: 7,
    title: "Comprendre le Scalping",
    excerpt: "Technique de trading rapide pour des profits immédiats. Guide du scalper débutants.",
    content: "Le scalping consiste à...",
    category: "Scalping",
    date: "18 Juin 2024",
    readTime: "6 min",
    image: "⚔️",
    featured: false,
  },
  {
    id: 8,
    title: "Swing Trading: stratégie moyen terme",
    excerpt: "Profitez des tendances sur plusieurs jours. Analyse technique avancée.",
    content: "Le swing trading est idéal...",
    category: "Swing",
    date: "17 Juin 2024",
    readTime: "7 min",
    image: "🌊",
    featured: false,
  },
  {
    id: 9,
    title: "Les Chandeliers Japonais",
    excerpt: "Maîtrisez les figures de chandeliers. Doji, Marubozu, Hammer et plus.",
    content: "Les chandeliers japonais...",
    category: "Analyse",
    date: "16 Juin 2024",
    readTime: "8 min",
    image: "🕯️",
    featured: false,
  },
  {
    id: 10,
    title: "Portfolio Management",
    excerpt: "Comment diversifier et gérer votre portefeuille. Allocation d'actifs optimale.",
    content: "La diversification est clé...",
    category: "Portfolio",
    date: "15 Juin 2024",
    readTime: "9 min",
    image: "💼",
    featured: false,
  },
  {
    id: 11,
    title: "Backtesting: Testez vos stratégies",
    excerpt: "Validez vos stratégies sur des données historiques. Guide complet du backtesting.",
    content: "Le backtesting permet...",
    category: "Automation",
    date: "14 Juin 2024",
    readTime: "10 min",
    image: "🔬",
    featured: false,
  },
  {
    id: 12,
    title: "Signaux de Trading IA",
    excerpt: "Comment nos agents IA génèrent des signaux. Précision et fiabilité.",
    content: "Nos agents IA analysent...",
    category: "AI",
    date: "13 Juin 2024",
    readTime: "5 min",
    image: "🎯",
    featured: false,
  },
];

const categories = ["Tous", "Trading", "Analyse", "Risque", "Crypto", "Forex", "Automation", "Scalping", "Swing", "Portfolio", "AI"];

// Article Card
function ArticleCard({ article }: { article: typeof allArticles[0] }) {
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
        <Link href={`/blog/${article.id}`} className="text-sm text-electron-gold hover:underline">Lire plus →</Link>
      </div>
    </div>
  );
}

// Featured Article
function FeaturedArticle({ article }: { article: typeof allArticles[0] }) {
  return (
    <div className="lg:col-span-2 group p-8 bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border rounded-2xl hover:border-electron-gold/50 transition-all">
      <div className="flex items-start gap-6">
        <div className="text-6xl">{article.image}</div>
        <div>
          <span className="text-xs text-electron-gold bg-electron-gold/10 px-2 py-1 rounded-full">À la une</span>
          <h3 className="text-2xl font-bold text-white mt-2 mb-2 group-hover:text-electron-gold transition-colors">{article.title}</h3>
          <p className="text-gray-400 mb-4">{article.excerpt}</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">{article.date} • {article.readTime}</span>
            <Link href={`/blog/${article.id}`} className="px-4 py-2 bg-electron-gold text-premium-900 font-semibold rounded-lg hover:bg-electron-goldLight transition-colors">
              Lire l'article
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Blog Page
export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const filteredArticles = selectedCategory === "Tous" 
    ? allArticles 
    : allArticles.filter(a => a.category === selectedCategory);

  const featured = allArticles.find(a => a.featured) || allArticles[0];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={cn("transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-72")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border">
          <div>
            <h1 className="text-2xl font-bold text-white">Blog & Articles</h1>
            <p className="text-sm text-gray-400">Actualités et tutoriels sur le trading</p>
          </div>
          <Link href="/" className="text-electron-gold hover:underline">← Retour</Link>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Featured Article */}
          <div className="mb-8">
            <FeaturedArticle article={featured} />
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Catégories</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-colors",
                    selectedCategory === cat 
                      ? "bg-electron-gold text-premium-900" 
                      : "bg-dark-card text-gray-400 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}