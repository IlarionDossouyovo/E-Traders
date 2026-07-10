# 🤖 Guide de Configuration Ollama - E-Traders

## État des Modèles IA

| Modèle | Taille | Status |
|--------|--------|--------|
| llama3.2 | 2.0 GB | ✅ Installé |
| llama3.1:8b | 4.9 GB | ✅ Installé |
| qwen2.5-coder:7b | 4.7 GB | ✅ Installé |
| nomic-embed-text | 274 MB | ✅ Installé |
| phi3:mini | 2.2 GB | ✅ Installé |

---

## ⚠️ Configuration Requise pour Windows

### 1. Configurer Ollama pour accepter les connexions

Ollama doit écouter sur toutes les interfaces pour être accessible depuis Docker.

Créer un fichier `C:\Users\AUGUSTIN\.ollama\config\config.yaml`:
```yaml
server:
  host: 0.0.0.0:11434
```

OU créer une variable système:
```
OLLAMA_HOST=0.0.0.0:11434
```

### 2. Redémarrer Ollama

```powershell
# Arrêter Ollama
taskkill /F /IM ollama.exe

# Redémarrer Ollama
ollama serve
```

### 3. Configurer Docker Desktop

Dans Docker Desktop → Settings → General:
- ✅ Enable "Expose daemon on tcp://localhost:2375"

### 4. Lancer E-Traders

```bash
# Option 1: Script automatique
.\run-etraders.bat

# Option 2: Manuel
cd docker
docker compose up -d
npm run dev
```

---

## 🌐 URLs de la Plateforme

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3001 |
| Agents IA | http://localhost:3001/agents |
| Academy | http://localhost:3001/academy |
| Market | http://localhost:3001/market |
| Trading | http://localhost:3001/trading |
| Portfolio | http://localhost:3001/portfolio |
| Settings | http://localhost:3001/settings |

---

## 📡 APIs Disponibles

| Endpoint | Description |
|----------|-------------|
| `/api/signals` | Signaux de trading |
| `/api/sentiment` | Analyse sentiment |
| `/api/portfolio` | Gestion portefeuille |
| `/api/performance` | Performances |
| `/api/agents/chat` | Communication IA |
| `/api/agents/signal` | Générateur signaux |
| `/api/agents/risk` | Gestion risques |
| `/api/agents/sentiment` | Analyse sentiment |
| `/api/agents/config` | Configuration agents |

---

## 🔐 Accès Fondateur

Pour accéder à la configuration des agents, utiliser un de ces IDs:
- `founder-1` - ELECTRON Founder
- `admin` - Admin Principal
- `ceo` - CEO ELECTRON
- `CTO` - CTO ELECTRON

---

## ✅ Vérification

```powershell
# Tester Ollama
curl http://localhost:11434/api/tags

# Tester les APIs
curl http://localhost:3001/api/signals
curl http://localhost:3001/api/agents/config
```

---

**E-Traders By ELECTRON** - Trading Intelligent par l'IA
