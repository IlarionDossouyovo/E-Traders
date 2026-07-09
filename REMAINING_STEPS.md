# 🚀 E-Traders - Guide de Lancement Complet

## ✅ Projet Terminé - Prêt pour le Lancement

### Status Final

| Composant | Status |
|-----------|--------|
| **Pages** | ✅ academy, market, trading, portfolio, settings, agents |
| **API Agents** | ✅ chat, signal, risk, sentiment, config |
| **API Services** | ✅ signals, sentiment, portfolio, performance, ollama |
| **Ollama Integration** | ✅ Connecté aux 5 modèles IA |
| **n8n Automation** | ✅ Docker config + Dockerfile |
| **Auth Fondateur** | ✅ Accès réservé /agents |
| **Docker Config** | ✅ PostgreSQL + Redis + n8n |
| **Configuration** | ✅ .env, start.sh |

---

## 🏁 Étapes de Lancement Rapide

### 1. Configuration Initiale (Déjà fait ✅)

```bash
# Le fichier .env est déjà créé
# Éditer docker/.env si besoin de personnaliser
```

### 2. Démarrer Docker (PostgreSQL + Redis + n8n)

```bash
cd /workspace/project/E-Traders/docker
docker compose up -d
```

### 3. Installer les Dépendances

```bash
cd /workspace/project/E-Traders
npm install
```

### 4. Lancer Ollama (Machine Locale - Déjà installé ✅)

```bash
# Modèles disponibles:
# - llama3.2:latest (2.0 GB)
# - llama3.1:8b (4.9 GB)
# - qwen2.5-coder:7b (4.7 GB)
# - nomic-embed-text (274 MB)
# - phi3:mini (2.2 GB)

# Terminal 1
ollama serve
```

### 5. Lancer le Frontend

```bash
cd /workspace/project/E-Traders
npm run dev
```

---

## 🌐 Accès à la Plateforme

| Page | URL |
|------|-----|
| **Accueil** | http://localhost:3000 |
| **Académie** | http://localhost:3000/academy |
| **Marché** | http://localhost:3000/market |
| **Trading** | http://localhost:3000/trading |
| **Portefeuille** | http://localhost:3000/portfolio |
| **Agents IA** | http://localhost:3000/agents |
| **Paramètres** | http://localhost:3000/settings |

---

## 🤖 Agents IA Configurés

| Agent | Modèle | Fonction |
|-------|--------|----------|
| Signal Generator | llama3.2 | Signaux trading |
| Risk Manager | llama3.1:8b | Gestion risques |
| Market Sentiment | llama3.2 | Analyse sentiment |
| AI Tutor | llama3.1:8b | Formation IA |
| Scalping Bot | qwen2.5-coder:7b | Trading HF |
| Portfolio Tracker | llama3.2 | Suivi portefeuille |
| Workflow Automation | llama3.1:8b | Automatisation |
| Research Assistant | llama3.2 | Recherche |

---

## 📡 APIs Disponibles

```
/api/agents/chat        - Communication avec les agents
/api/agents/signal     - Signaux de trading
/api/agents/risk       - Gestion des risques
/api/agents/sentiment  - Analyse sentiment
/api/agents/config     - Configuration agents
/api/ollama            - Connexion Ollama
/api/signals           - Signaux marchés
/api/sentiment         - Sentiment marchés
/api/portfolio         - Gestion portefeuille
/api/performance       - Performances
```

---

## 🔧 Commandes de Gestion

```bash
# Script de démarrage automatique
./start.sh

# Statut Docker
docker ps

# Logs
docker logs e-traders-db
docker logs e-traders-redis

# Arrêter
docker compose down

# Redémarrer
docker compose restart
```

---

**E-Traders By ELECTRON** - Trading Intelligent