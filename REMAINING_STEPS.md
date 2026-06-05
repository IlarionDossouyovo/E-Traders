# 🚀 Étapes Restantes - E-Traders

## Status Actuel

| Composant | Status | Action Requise |
|-----------|--------|----------------|
| Frontend | ✅ Running | Aucune |
| PostgreSQL | ✅ Running | Aucune |
| Redis | ✅ Running | Aucune |
| n8n | ✅ Running | Configurer |
| Ollama | ❌ Pas lancé | **Lancer** |
| AI Workflows | ❌ Inactifs | **Importer** |
| API Keys | ❌ Non configurées | **Configurer** |

---

## Étape 1: Lancer Ollama (Machine Hôte)

### Installation
```bash
# Terminal 1 - Installer Ollama
curl -fsSL https://ollama.com/install.sh | sh
```

### Démarrage
```bash
# Terminal 1 - Démarrer le serveur
ollama serve

# Terminal 2 - Télécharger un modèle
ollama pull llama3.2
```

### Vérification
```bash
curl http://localhost:11434/api/tags
```

---

## Étape 2: Configurer n8n

### Accès
1. Ouvrir http://localhost:5678
2. Créer un compte

### Importer Workflows
1. **Settings** → **Import workflow**
2. Importer chaque fichier depuis `n8n-workflows/`:
   - 01-ai-signal-generator.json
   - 02-risk-management.json
   - 03-market-sentiment.json
   - 04-ai-tutor.json
   - 05-scalping-bot.json
   - 06-portfolio-tracker.json

### Activer Workflows
1. Cliquer sur chaque workflow
2. Activer (toggle)

---

## Étape 3: Configurer les API Keys

### Fichier `.env`
Créer `docker/.env`:

```env
# Ollama
OLLAMA_API_KEY=ollama
OLLAMA_BASE_URL=http://host.docker.internal:11434

# Binance (Trading Réel)
BINANCE_API_KEY=votre_clé
BINANCE_SECRET=votre_secret

# MetaTrader 5 (Optionnel)
MT5_SERVER=MetaQuotes-Demo
MT5_LOGIN=votre_login
MT5_PASSWORD=votre_mot_de_passe
```

---

## Étape 4: Tester l'Intégration AI

### Test Ollama → n8n
```bash
curl -X POST http://localhost:5678/webhook/ai-tutor \
  -H "Content-Type: application/json" \
  -d '{"question":"C'est quoi le scalping?"}'
```

### Test API Signals
```bash
curl http://localhost:3000/api/signals
```

---

## Résumé des Commandes

```bash
# Terminal 1: Ollama
ollama serve

# Terminal 2: Vérification
curl http://localhost:11434/api/tags

# Terminal 3: Docker (si besoin)
cd /workspace/project/docker
docker compose up -d

# Navigateur
# http://localhost:3000  → Frontend
# http://localhost:5678 → n8n
```

---

## ✅ Checklist Finale

- [ ] Ollama installé
- [ ] Ollama lancé (`ollama serve`)
- [ ] Modèle téléchargé (`ollama pull llama3.2`)
- [ ] n8n configuré
- [ ] Workflows importés
- [ ] Workflows activés
- [ ] API Keys configurées
- [ ] Test AI réussi

---

**E-Traders By ELECTRON** - Trading Intelligent