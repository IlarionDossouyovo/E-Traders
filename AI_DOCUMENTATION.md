# 🤖 E-Traders AI - Documentation Technique

## Vue d'Ensemble

E-Traders By ELECTRON intègre l'intelligence artificielle pour:
- **Génération de signaux** de trading
- **Analyse de marché** en temps réel
- **Gestion des risques** automatique
- **Assistant pédagogique** (AI Tutor)
- **Trading automatique** (Scalping Bot)

---

## 🧠 Architecture AI

### 1. Modèles AI

| Modèle | Provider | Usage |
|--------|-----------|--------|
| Llama 3.2 | Ollama (Local) | Analyse, Signaux |
| GPT-4 | OpenAI (Optionnel) | Backup |
| Custom | Fine-tuned | Trading Bot |

### 2. Connexion Ollama

```bash
# Machine hôte
ollama serve

# URL depuis Docker
http://host.docker.internal:11434
```

---

## 📊 Workflows AI (n8n)

### Workflow 1: AI Signal Generator
- **Trigger**: Toutes les 15 minutes
- **Fonction**: Analyse marché + génère signaux
- **Sortie**: Signal (BUY/SELL/HOLD), Confidence score

### Workflow 2: Risk Management
- **Trigger**: Toutes les 5 minutes
- **Fonction**: Vérifie seuils de risque
- **Alertes**: Stop loss, Drawdown, Position size

### Workflow 3: Market Sentiment
- **Trigger**: Toutes les heures
- **Fonction**: Analyse sentiment (news, social)
- **Score**: 0-100 (Bullish/Bearish)

### Workflow 4: AI Tutor
- **Trigger**: Webhook
- **Fonction**: Assistant pédagogique
- **Réponses**: Questions trading, Cours

### Workflow 5: Scalping Bot
- **Trigger**: Toutes les 30 secondes
- **Fonction**: Trading automatique scalping
- **Intégration**: Binance API

### Workflow 6: Portfolio Tracker
- **Trigger**: Toutes les 4 heures
- **Fonction**: Suivi performance P&L
- **Statistiques**: Win rate, Sharpe ratio

---

## 🔌 API AI

### /api/signals
```json
{
  "signals": [
    {
      "id": "1",
      "pair": "EUR/USD",
      "market": "forex",
      "signal": "buy",
      "confidence": 92,
      "rsi": 45,
      "macd": "bullish",
      "trend": "up"
    }
  ]
}
```

### /api/sentiment
```json
{
  "sentiment": {
    "overall": 65,
    "forex": 70,
    "crypto": 60,
    "stocks": 55,
    "news": ["Article 1", "Article 2"]
  }
}
```

### /api/trading/emergency-stop
```json
{
  "emergency": {
    "active": false,
    "reason": null,
    "timestamp": null
  }
}
```

---

## 🛠️ Configuration

### Variables d'Environnement

```env
# Ollama
OLLAMA_API_KEY=ollama
OLLAMA_BASE_URL=http://host.docker.internal:11434

# OpenAI (Optionnel)
OPENAI_API_KEY=sk-...

# Binance
BINANCE_API_KEY=...
BINANCE_SECRET=...
```

---

## 📈 Fonctionnalités AI Détaillées

### 1. Signal Generator
- **RSI**: Relative Strength Index
- **MACD**: Moving Average Convergence Divergence
- **Trend Analysis**: EMA 50/200
- **Confidence**: Score pondéré 0-100%

### 2. Risk Management
- **Max Drawdown**: 8.5% (configurable)
- **Position Size**: Kelly Criterion
- **Stop Loss**: ATR-based
- **Take Profit**: 2:1 Ratio

### 3. Market Sentiment
- **Sources**: News API, Social metrics
- **NLP**: Traitement du language naturel
- **Score**: Agrégation multi-sources

### 4. AI Tutor
- **RAG**: Retrieval Augmented Generation
- **Contexte**: Documents académie
- **Mode**: Socratic (questions guidées)

---

## 🚀 Démarrage AI

```bash
# 1. Ollama sur machine hôte
ollama serve
ollama pull llama3.2

# 2. Vérifier connexion
curl http://host.docker.internal:11434/api/tags

# 3. n8n - Importer workflows
# Ouvrir http://localhost:5678
# Import workflows depuis /n8n-workflows/

# 4. Activer workflows
# Dans n8n, activer chaque workflow
```

---

## 📋 Résumé Technique

| Composant | Technologie |
|-----------|------------|
| Modèle LLM | Ollama (Llama 3.2) |
| Automation | n8n |
| API | Next.js |
| Trading | Binance API |
| Database | PostgreSQL |
| Cache | Redis |

---

**E-Traders By ELECTRON** - Trading Intelligent par l'IA