"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

// Video Tutorials Data
const videoTutorials = [
  {
    id: 1,
    title: "Introduction à E-TRADERS",
    description: "Découvrez la plateforme E-TRADERS BY ELECTRON et ses fonctionnalités.",
    duration: "5:30",
    category: "Débutant",
    thumbnail: "🎯",
    views: 1250,
    date: "24 Juin 2024",
  },
  {
    id: 2,
    title: "Comment configurer Ollama",
    description: "Guide complet pour installer et configurer Ollama.",
    duration: "8:45",
    category: "Configuration",
    thumbnail: "⚙️",
    views: 890,
    date: "23 Juin 2024",
  },
  {
    id: 3,
    title: "Docker et E-TRADERS",
    description: "Configuration de Docker pour les agents IA.",
    duration: "6:20",
    category: "Configuration",
    thumbnail: "🐳",
    views: 756,
    date: "22 Juin 2024",
  },
  {
    id: 4,
    title: "Utiliser les 12 Agents IA",
    description: "Tutoriel complet sur les 12 agents IA d'E-TRADERS.",
    duration: "12:15",
    category: "Agents",
    thumbnail: "🤖",
    views: 2100,
    date: "21 Juin 2024",
  },
  {
    id: 5,
    title: "Générer des signaux de trading",
    description: "Comment utiliser Signal Generator pour créer des signaux.",
    duration: "7:30",
    category: "Signaux",
    thumbnail: "⚡",
    views: 1580,
    date: "20 Juin 2024",
  },
  {
    id: 6,
    title: "Gestion des risques",
    description: "Utilisez Risk Manager pour protéger votre capital.",
    duration: "9:00",
    category: "Risque",
    thumbnail: "🛡️",
    views: 1320,
    date: "19 Juin 2024",
  },
  {
    id: 7,
    title: "Analyse du sentiment",
    description: "Market Sentiment et analyse des nouvelles.",
    duration: "8:15",
    category: "Analyse",
    thumbnail: "📰",
    views: 980,
    date: "18 Juin 2024",
  },
  {
    id: 8,
    title: "Scalping Bot en action",
    description: "Configurer et lancer le Scalping Bot.",
    duration: "10:45",
    category: "Scalping",
    thumbnail: "⚔️",
    views: 1890,
    date: "17 Juin 2024",
  },
  {
    id: 9,
    title: "Portfolio Tracker",
    description: "Suivez vos positions en temps réel.",
    duration: "5:50",
    category: "Portfolio",
    thumbnail: "💼",
    views: 720,
    date: "16 Juin 2024",
  },
  {
    id: 10,
    title: "Crypto Analyst",
    description: "Analysez les cryptomonnaies avec l'IA.",
    duration: "11:20",
    category: "Crypto",
    thumbnail: "₿",
    views: 1450,
    date: "15 Juin 2024",
  },
  {
    id: 11,
    title: "Forex Analyst",
    description: "Analysez les paires de devises.",
    duration: "9:40",
    category: "Forex",
    thumbnail: "💱",
    views: 1100,
    date: "14 Juin 2024",
  },
  {
    id: 12,
    title: "Pattern Scanner",
    description: "Détectez les patterns graphiques.",
    duration: "8:00",
    category: "Analyse",
    thumbnail: "📈",
    views: 890,
    date: "13 Juin 2024",
  },
  {
    id: 13,
    title: "Backtester vos stratégies",
    description: "Testez vos stratégies sur des données historiques.",
    duration: "13:30",
    category: "Automation",
    thumbnail: "🔬",
    views: 670,
    date: "12 Juin 2024",
  },
  {
    id: 14,
    title: "Alert System",
    description: "Créez des alertes de prix.",
    duration: "4:20",
    category: "Alertes",
    thumbnail: "🔔",
    views: 540,
    date: "11 Juin 2024",
  },
  {
    id: 15,
    title: "AI Tutor - Cours de trading",
    description: "Apprenez le trading avec l'IA.",
    duration: "15:00",
    category: "Formation",
    thumbnail: "🎓",
    views: 2340,
    date: "10 Juin 2024",
  },
];

const categories = ["Tous", "Débutant", "Configuration", "Agents", "Signaux", "Risque", "Analyse", "Scalping", "Portfolio", "Crypto", "Forex", "Formation", "Alertes", "Automation"];

// Video Card
function VideoCard({ video }: { video: typeof videoTutorials[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-electron-gold/50 transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-dark-bg to-dark-card flex items-center justify-center">
        <span className="text-6xl">{video.thumbnail}</span>
        {/* Play Button Overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity",
          isHovered && "opacity-100"
        )}>
          <button className="w-16 h-16 bg-electron-gold rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-premium-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-electron-gold bg-electron-gold/10 px-2 py-1 rounded-full">{video.category}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-electron-gold transition-colors">{video.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{video.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{video.views} vues</span>
          <span>{video.date}</span>
        </div>
      </div>
    </div>
  );
}

// Featured Video
function FeaturedVideo({ video }: { video: typeof videoTutorials[0] }) {
  return (
    <div className="bg-gradient-to-br from-electron-gold/20 via-dark-card to-dark-bg border border-electron-gold/30 rounded-2xl p-6 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Preview */}
        <div className="relative h-64 lg:h-full bg-dark-bg rounded-xl flex items-center justify-center">
          <span className="text-8xl">{video.thumbnail}</span>
          <button className="absolute w-20 h-20 bg-electron-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-premium-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="text-xs text-electron-gold bg-electron-gold/10 px-3 py-1 rounded-full w-fit mb-3">Vidéo à la une</span>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">{video.title}</h2>
          <p className="text-gray-400 mb-4">{video.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>{video.duration}</span>
            <span>•</span>
            <span>{video.views} vues</span>
            <span>•</span>
            <span>{video.date}</span>
          </div>
          <button className="px-6 py-3 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors w-fit">
            Regarder la vidéo
          </button>
        </div>
      </div>
    </div>
  );
}

// Page
export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = videoTutorials.filter(video => {
    const categoryMatch = selectedCategory === "Tous" || video.category === selectedCategory;
    const searchMatch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featured = videoTutorials[0];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={cn("transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-72")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border">
          <div>
            <h1 className="text-2xl font-bold text-white">Tutoriels Vidéo</h1>
            <p className="text-sm text-gray-400">Apprenez à utiliser E-TRADERS</p>
          </div>
          <Link href="/academy" className="text-electron-gold hover:underline">← Académie</Link>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Rechercher une vidéo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-electron-gold transition-colors"
            />
          </div>

          {/* Featured Video */}
          <FeaturedVideo video={featured} />

          {/* Categories */}
          <div className="mb-6">
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

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* No Results */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="text-gray-400">Aucune vidéo trouvée</p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-dark-card border border-dark-border rounded-2xl text-center">
              <div className="text-3xl font-bold text-electron-gold mb-2">{videoTutorials.length}</div>
              <p className="text-gray-400">Vidéos</p>
            </div>
            <div className="p-6 bg-dark-card border border-dark-border rounded-2xl text-center">
              <div className="text-3xl font-bold text-electron-gold mb-2">
                {videoTutorials.reduce((acc, v) => acc + v.views, 0).toLocaleString()}
              </div>
              <p className="text-gray-400">Vues totales</p>
            </div>
            <div className="p-6 bg-dark-card border border-dark-border rounded-2xl text-center">
              <div className="text-3xl font-bold text-electron-gold mb-2">2h 45m</div>
              <p className="text-gray-400">Durée totale</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}