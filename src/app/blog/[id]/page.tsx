"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

// Blog Article Data
const blogArticles = [
  {
    id: 1,
    title: "Introduction au Trading Automatisé avec l'IA",
    excerpt: "Découvrez comment les agents IA révolutionnent le trading financier moderne.",
    content: `
# Introduction au Trading Automatisé avec l'IA

Le trading automatisé représente l'avenir de la finance. Avec E-TRADERS, vous pouvez profiter de la puissance de l'intelligence artificielle pour maximiser vos profits.

## Pourquoi l'IA?

Les agents IA analysent des millions de données en temps réel, bien plus qu'un humain ne pourrait le faire. Ils détectent des patterns que l'œil humain ne peut voir.

## Nos Agents IA

E-TRADERS dispose de 12 agents IA spécialisés:
- Signal Generator pour les signaux de trading
- Risk Manager pour la gestion des risques
- Market Sentiment pour l'analyse du sentiment
- Et 9 autres agents...

## Commencer

1. Configurez Ollama
2. Lancez les agents
3. Démarrez le trading automatique
    `,
    category: "Trading",
    date: "24 Juin 2024",
    readTime: "5 min",
    image: "🤖",
  },
  {
    id: 2,
    title: "Stratégies RSI et MACD expliquées",
    excerpt: "Maîtrisez les indicateurs techniques pour des signaux précis.",
    content: `
# Stratégies RSI et MACD

Le RSI (Relative Strength Index) et le MACD sont deux des indicateurs les plus utilisés en analyse technique.

## RSI (Relative Strength Index)

Le RSI mesure la vitesse et le changement des mouvements de prix. Il oscille entre 0 et 100.

- RSI > 70: Suracheté
- RSI < 30: Survente
- RSI = 50: Neutre

## MACD (Moving Average Convergence Divergence)

Le MACD est un indicateur de tendance qui montre la relation entre deux moyennes mobiles.

## Signaux d'achat

- RSI < 30 + MACD haussier = Achat
- Croisement MACD au-dessus de la ligne de signal = Achat

## Signaux de vente

- RSI > 70 + MACD baissier = Vente
- Croisement MACD en dessous de la ligne de signal = Vente
    `,
    category: "Analyse",
    date: "23 Juin 2024",
    readTime: "8 min",
    image: "📊",
  },
  {
    id: 3,
    title: "Gestion du Risque en Trading",
    excerpt: "Les règles d'or pour protéger votre capital.",
    content: `
# Gestion du Risque en Trading

La gestion du risque est essentielle pour la longévité dans le trading.

## Règles fondamentales

1. **Risque par trade**: Maximum 2% du capital
2. **Exposition par devise**: Maximum 10%
3. **Drawdown maximum**: 15% = stop total
4. **Levier maximum**: 10x

## Stop Loss

Always use stop loss! It limits your losses and protects your capital.

## Position Sizing

Calculez la taille de votre position:
Position = Capital × Risque / (Prix d'entrée - Stop Loss)

## Diversification

Ne mettez pas tous vos œufs dans le même panier. Diversifiez entre:
- Forex
- Crypto
- Actions
    `,
    category: "Risque",
    date: "22 Juin 2024",
    readTime: "6 min",
    image: "🛡️",
  },
  {
    id: 4,
    title: "Bitcoin et Crypto Trading avec l'IA",
    excerpt: "Analyse des tendances crypto avec l'intelligence artificielle.",
    content: `
# Bitcoin et Crypto Trading

Le marché crypto est parmi les plus volatils. L'IA peut vous aider à naviguer cette volatilité.

## Analyse BTC

Bitcoin reste le leader du marché crypto. Surveillez:
- Prix Bitcoin
- Dominance Bitcoin
- Sentiment réseau

## Agents IA pour Crypto

E-TRADERS dispose de:
- Crypto Analyst pour l'analyse technique
- On-Chain data analysis
- TVL tracking

## Stratégies

1. **HODL**: Long terme
2. **Swing Trading**: Moyen terme
3. **Scalping**: Court terme
    `,
    category: "Crypto",
    date: "21 Juin 2024",
    readTime: "7 min",
    image: "₿",
  },
  {
    id: 5,
    title: "Forex: Guide des Paires Majeures",
    excerpt: "Guide complet des paires de devises majeures.",
    content: `
# Forex: Guide des Paires Majeures

Le marché Forex est le plus liquide au monde.

## Paires majeures

### EUR/USD
La paire la plus échangée. Représente ~85% du volume Forex.

### GBP/USD
"La Cable" - Deuxième paire la plus échangée.

### USD/JPY
Paire du yen japonais. Sensible aux interventions de la Banque du Japon.

## Paires secondaires

- EUR/GBP
- EUR/JPY
- AUD/USD

## Heures de trading

- Session Asiatique: 00:00 - 09:00 UTC
- Session Européenne: 08:00 - 17:00 UTC
- Session US: 13:00 - 22:00 UTC
    `,
    category: "Forex",
    date: "20 Juin 2024",
    readTime: "5 min",
    image: "💱",
  },
  {
    id: 6,
    title: "Algo Trading 360° avec nos Agents IA",
    excerpt: "Automatisez vos stratégies de trading avec nos 12 agents IA.",
    content: `
# Algo Trading 360°

Automatisez vos stratégies avec E-TRADERS et nos 12 agents IA.

## Les 12 Agents

1. Signal Generator - Signaux de trading
2. Risk Manager - Gestion des risques
3. Market Sentiment - Sentiment du marché
4. AI Tutor - Tutorat
5. Scalping Bot - Scalping automatique
6. Portfolio Tracker - Suivi du portefeuille
7. News Analyst - Actualités
8. Crypto Analyst - Analyse crypto
9. Forex Analyst - Analyse forex
10. Pattern Scanner - Patterns graphiques
11. Backtester - Backtesting
12. Alert System - Alertes

## Configuration

1. Installez Ollama
2. Lancez les agents
3. Configurez les stratégies
4. Démarrez le trading
    `,
    category: "Automation",
    date: "19 Juin 2024",
    readTime: "10 min",
    image: "⚡",
  },
  {
    id: 7,
    title: "Comprendre le Scalping",
    excerpt: "Technique de trading rapide pour des profits immédiats.",
    content: `
# Comprendre le Scalping

Le scalping est une technique de trading à court terme.

## Qu'est-ce que le scalping?

Le scalping consiste à prendre des positions très courtes, souvent quelques secondes à quelques minutes.

## Principes

1. Petits profits, beaucoup de trades
2. Effet de levier utilisé
3. Execution rapide requise
4. Gestion stricte du risque

## Meilleures paires pour scalping

- EUR/USD
- GBP/USD
- USD/JPY

## Horaires

Session US (14:00-22:00 UTC) est la plus volatile.
    `,
    category: "Scalping",
    date: "18 Juin 2024",
    readTime: "6 min",
    image: "⚔️",
  },
  {
    id: 8,
    title: "Swing Trading: stratégie moyen terme",
    excerpt: "Profitez des tendances sur plusieurs jours.",
    content: `
# Swing Trading

Le swing trading est une stratégie moyen terme.

## Définition

Le swing trading vise à capturer des mouvements sur plusieurs jours à quelques semaines.

## Avantages

- Moins de stress que le scalping
- Plus de temps pour analyser
- Transactions moins fréquentes

## Analyse

Utilisez:
- Support et résistance
- Tendances longues
- Figures chartistes
- RSI, MACD

## Gestion de position

- Stop loss: 2-3% du prix d'entrée
- Take profit: 5-10% du prix d'entrée
    `,
    category: "Swing",
    date: "17 Juin 2024",
    readTime: "7 min",
    image: "🌊",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const id = parseInt(params?.id as string) || 1;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const article = blogArticles.find(a => a.id === id) || blogArticles[0];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={cn("transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-72")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border">
          <div>
            <h1 className="text-2xl font-bold text-white">Blog</h1>
            <p className="text-sm text-gray-400">Article</p>
          </div>
          <Link href="/blog" className="text-electron-gold hover:underline">← Retour au blog</Link>
        </header>

        {/* Content */}
        <div className="p-8 max-w-4xl mx-auto">
          <Link href="/blog" className="text-electron-gold hover:underline mb-6 inline-block">← Tous les articles</Link>
          
          <article className="bg-dark-card border border-dark-border rounded-2xl p-8">
            <div className="text-6xl mb-6">{article.image}</div>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs text-electron-gold bg-electron-gold/10 px-3 py-1 rounded-full">{article.category}</span>
              <span className="text-sm text-gray-500">{article.date} • {article.readTime}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>
            
            <p className="text-xl text-gray-400 mb-8">{article.excerpt}</p>
            
            <div className="prose prose-invert max-w-none">
              {article.content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) {
                  return <h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold text-electron-gold mt-6 mb-3">{line.slice(3)}</h2>;
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="text-gray-400 ml-4">{line.slice(2)}</li>;
                }
                if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
                  return <li key={i} className="text-gray-400 ml-4 list-decimal">{line.slice(2)}</li>;
                }
                if (line.trim() === '') {
                  return <br key={i} />;
                }
                return <p key={i} className="text-gray-300 mb-2">{line}</p>;
              })}
            </div>
            
            <div className="mt-8 pt-8 border-t border-dark-border">
              <Link href="/blog" className="px-6 py-3 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors">
                Retour au blog
              </Link>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}