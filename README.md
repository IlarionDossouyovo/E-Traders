# 🤖 E-Traders By ELECTRON

Plateforme SaaS de trading intelligente combinant apprentissage interactif, analyse de marché avancée, génération de signaux intelligents et automatisation du trading.

![E-Traders](https://img.shields.io/badge/E--Traders-By-ELECTRON-gold)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Fonctionnalités

### 📚 Académie
- Parcours progressif (Débutant → Expert)
- Cours: Scalping, Swing, Algo Trading
- Simulateur Paper Trading ($100,000)

### 📊 Analyseur de Marché
- Signaux IA (RSI, MACD, Tendances)
- Confidence score (0-100%)
- Actualités et sentiment

### 🤖 Trading Automatique
- 3 Modes: Scalping, Swing, Algo
- Gestion du risque
- Stop Loss / Take Profit

### 💼 Portefeuille
- Holdings en temps réel
- P&L tracking
- Allocation diversifiée

### 🔐 Panel Fondateur (18 Agents IA)
- Accès sécurisé par code secret
- 18 agents IA configurés avec Ollama
- Contrôle total du système
- Gestion des configurations agents

## 🚀 Démarrage

```bash
# Installation
npm install

# Développement
npm run dev

# Production
npm run build
```

## 🌐 Services

| Service | Port | URL |
|--------|------|-----|
| Frontend | 3001 | http://localhost:3001 |
| PostgreSQL | 5433 | localhost:5433 |
| Redis | 6379 | localhost:6379 |

## 📁 Structure

```
/src
  /app          # Pages Next.js
    /academy   # Learning
    /market   # Analysis
    /trading  # Auto trading
    /portfolio # Portfolio
    /settings # Settings
    /agents   # AI Agents
    /founder  # Panel Fondateur (accès sécurisé)
    /api     # API routes
  /components  # UI components
    /logo.tsx
    /sidebar.tsx
/docker       # Docker configs
```

## 🤖 AI (Ollama)

```bash
# Démarrer Ollama sur machine hôte
ollama serve
ollama pull llama3.2
```

## 🔧 Configuration

Éditer `docker/.env`:
- `OLLAMA_API_KEY`
- `BINANCE_API_KEY`
- `BINANCE_SECRET`

## 📝 License

MIT © ELECTRON

---

**E-Traders By ELECTRON** - Trading Intelligent par l'IA