"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
    content: `
# Introduction à E-TRADERS

Bienvenue sur E-TRADERS BY ELECTRON, la plateforme de trading intelligent.

## Ce que vous allez apprendre

- Présentation de l'interface
- Configuration initiale
- Les 12 agents IA
- Comment générer des signaux

## Prérequis

- Node.js installé
- Docker (optionnel)
- Ollama (optionnel)

## Étapes de configuration

1. Clonez le projet
2. Installez les dépendances
3. Lancez le serveur
4. Configurez les agents
    `,
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
    content: `
# Comment configurer Ollama

Ollama est Essential pour les agents IA d'E-TRADERS.

## Installation

### Windows
Téléchargez Ollama depuis ollama.ai

### Mac/Linux
\`\`\`bash
curl -fsSL https://ollama.ai/install.sh | sh
\`\`\`

## Configuration

1. Lancez Ollama: \`ollama serve\`
2. Téléchargez un modèle: \`ollama pull llama3.1\`
3. Vérifiez: \`ollama list\`

## Dépannage

- Port 11434 déjà utilisé? Changez le port
- Pas assez de RAM? Utilisez phi3:mini
    `,
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
    content: `
# Docker et E-TRADERS

Docker permet de faire tourner les agents en isolation.

## Installation Docker

1. Téléchargez Docker Desktop
2. Lancez Docker
3. Vérifiez: \`docker ps\`

## Configuration E-TRADERS

Le fichier docker-compose.yml contient:
- API server
- Database
- Redis cache
- Agents containers

## Commandes utiles

\`\`\`bash
docker-compose up -d
docker-compose logs -f
docker-compose down
\`\`\`
    `,
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
    content: `
# Les 12 Agents IA

E-TRADERS dispose de 12 agents spécialisés.

## Liste des agents

1. **Signal Generator** - Signaux de trading
2. **Risk Manager** - Gestion des risques
3. **Market Sentiment** - Sentiment du marché
4. **AI Tutor** - Tutorat trading
5. **Scalping Bot** - Trading rapide
6. **Portfolio Tracker** - Suivi portefeuille
7. **News Analyst** - Analyse news
8. **Crypto Analyst** - Analyse crypto
9. **Forex Analyst** - Analyse forex
10. **Pattern Scanner** - Patterns graphiques
11. **Backtester** - Test stratégies
12. **Alert System** - Alertes prix

## Comment les utiliser

1. Allez sur /agents
2. Entrez le code: ELECTRON-2024
3. Sélectionnez un agent
4. Configurez les paramètres
5. Lancez l'agent
    `,
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
    content: `
# Générer des signaux de trading

Le Signal Generator est l'agent le plus important.

## Types de signaux

- ACHAT (buy)
- VENTE (sell)
- ATTENTE (hold)

## Paramètres

- Paire: EUR/USD, BTC/USDT, etc.
- Timeframe: 1m, 5m, 1h, 1j
- Indicateurs: RSI, MACD, BB

## Interprétation

- Confiance > 80%: Fort signal
- Confiance 60-80%: Signal moyen
- Confiance < 60%: Faible signal
    `,
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
    content: `
# Gestion des risques

La gestion du risque est Essential.

## Règles d'or

1. **Risque max par trade**: 2% du capital
2. **Stop loss obligatoire**: Toujours!
3. **Leverage max**: 10x
4. **Drawdown max**: 15%

## Configuration Risk Manager

- Stop loss: 50 pips
- Take profit: 100 pips
- Trailing stop: 30 pips

## Signaux d'alerte

- Exposition > 20%
- Drawdown > 10%
- Positions ouvertes > 5
    `,
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
    content: `
# Analyse du sentiment

Le sentiment influences les prix.

## Sources

- Twitter/X
- Reddit
- News financières
- On-chain data

## Indicateurs de sentiment

- Fear & Greed Index
- Social volume
- News sentiment
- Funding rates

## Utilisation

1. Allez sur /agents
2. Sélectionnez Market Sentiment
3. Configurez les sources
4. Analysez les résultats
    `,
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
    content: `
# Scalping Bot

Le scalping c'est trades rapides.

## Configuration

- Timeframe: 1m ou 5m
- TP: 5-10 pips
- SL: 10-15 pips
- Lots: 0.01-0.1

## Stratégies

1. Breakout日内
2. Range trading
3. News trading
4. Momentum

## Horaires

- Session US: 14h-22h UTC
- Meilleure volatilité

## Risk management

- Max 5 trades/jour
- Pause après 3 pertes consécutives
    `,
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
    content: `
# Portfolio Tracker

Suivez toutes vos positions.

## Fonctionnalités

- P&L en temps réel
- Allocation par actif
- Performance historique
- Alertes de prix

## Ajout de positions

1. Allez sur /portfolio
2. Cliquez "Ajouter"
3. Remplissez les détails
4. Sauvegardez

## Statistiques

- Total portfolio
- Profit/Perte
- Plus/moins values
- Diversification
    `,
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
    content: `
# Crypto Analyst

Analyse specialized crypto.

## Métriques

- Prix actuel
- Volume 24h
- Dominance
- Fear & Greed
- On-chain: TVL, active addresses

## Analyse technique

- Support/Résistance
- RSI, MACD
- Bandes Bollinger
- Volumes

## Signaux

- ACHAT: RSI < 30
- VENTE: RSI > 70
- Croisement MACD
    `,
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
    content: `
# Forex Analyst

Analyse les paires Forex.

## Paires majeures

- EUR/USD
- GBP/USD
- USD/JPY
- USD/CHF

## Paires croisées

- EUR/GBP
- EUR/JPY
- GBP/JPY

## Calendrier économique

- NPF (Non-Farm Payrolls)
- Interest rates
- GDP
- Inflation
    `,
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
    content: `
# Pattern Scanner

Détectez les figures chartistes.

## Patterns haussiers

- Double bottom
- Tête épaules inversé
- Biseau ascendant
- Drapeau haussier

## Patterns baissiers

- Double top
- Tête épaules
- Biseau descendant
- Drapeau baissier

## Configuration

- Timeframe: 1h, 4h, 1j
- Paires:Toutes
- Confiance > 70%
    `,
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
    content: `
# Backtester

Testez avant d'investir.

## Paramètres

- Date début/fin
- Capital initial
- Paire
- Timeframe
- Stratégie

## Métriques

- Profit total
- Max drawdown
- Sharpe ratio
- Win rate
- Trades totaux

## Interprétation

- Sharpe > 1: Bon
- Sharpe > 2: Excellent
- Drawdown < 20%: Acceptable
    `,
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
    content: `
# Alert System

Ne manquez plus aucun mouvement.

## Types d'alertes

- Prix cible
- Pourcentage de variation
- Cross RSI
- Cross MACD
- Volume spike

## Configuration

1. Sélectionnez la paire
2. Définissez la condition
3. Définissez la cible
4. Activez l'alerte

## Notifications

- In-app
- Email (à venir)
- SMS (à venir)
    `,
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
    content: `
# AI Tutor

Votre professeur de trading.

## Cours disponibles

### Débutant
- Qu'est-ce que le trading?
- Les marchés
- Analyse technique
- Gestion du risque

### Intermédiaire
- Indicateurs avancés
- Patterns graphiques
- Stratégies

### Avancé
- Algotrading
- Psychologie
- Money management

## Comment utiliser

1. Allez sur /agents
2. Sélectionnez AI Tutor
3. Posez votre question
4. Recevez une réponse personnalisée
    `,
  },
];

export default function VideoPage() {
  const params = useParams();
  const id = parseInt(params?.id as string) || 1;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const video = videoTutorials.find(v => v.id === id) || videoTutorials[0];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={cn("transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-72")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border">
          <div>
            <h1 className="text-2xl font-bold text-white">Tutoriel Vidéo</h1>
            <p className="text-sm text-gray-400">Formation E-TRADERS</p>
          </div>
          <Link href="/videos" className="text-electron-gold hover:underline">← Tous les tutoriels</Link>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Video Player Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-dark-card to-dark-bg rounded-2xl mb-8 flex items-center justify-center">
            <div className="text-center">
              <span className="text-8xl mb-4 block">{video.thumbnail}</span>
              <button className="w-24 h-24 bg-electron-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform mx-auto">
                <svg className="w-12 h-12 text-premium-900 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <p className="text-gray-400 mt-4">Vidéo: {video.duration}</p>
            </div>
          </div>

          {/* Video Info */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs text-electron-gold bg-electron-gold/10 px-3 py-1 rounded-full">{video.category}</span>
              <span className="text-sm text-gray-500">{video.views} vues • {video.date}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">{video.title}</h1>
            <p className="text-xl text-gray-400 mb-8">{video.description}</p>

            {/* Tutorial Content */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
              {video.content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) {
                  return <h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold text-electron-gold mt-6 mb-3">{line.slice(3)}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-lg font-bold text-white mt-4 mb-2">{line.slice(4)}</h3>;
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="text-gray-400 ml-4 mb-1">• {line.slice(2)}</li>;
                }
                if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
                  return <li key={i} className="text-gray-400 ml-4 list-decimal mb-1">{line.slice(2)}</li>;
                }
                if (line.startsWith('```')) {
                  return null;
                }
                if (line.trim() === '') {
                  return <br key={i} />;
                }
                return <p key={i} className="text-gray-300 mb-2">{line}</p>;
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {video.id > 1 && (
                <Link href={`/videos/${video.id - 1}`} className="px-6 py-3 bg-dark-card border border-dark-border text-gray-400 rounded-xl hover:border-electron-gold hover:text-white transition-colors">
                  ← Précédent
                </Link>
              )}
              <div className="flex-1" />
              {video.id < 15 && (
                <Link href={`/videos/${video.id + 1}`} className="px-6 py-3 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors">
                  Suivant →
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}