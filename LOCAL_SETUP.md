# 🚀 Guide d'Installation Locale - E-Traders

## Prérequis

```bash
# Installer Node.js 18+
node --version

# Installer Docker
docker --version

# Installer Git
git --version
```

## Étape 1: Cloner le projet

```bash
git clone https://github.com/IlarionDossouyovo/E-Traders.git
cd E-Traders
```

## Étape 2: Installer les dépendances

```bash
npm install
```

## Étape 3: Démarrer Docker

```bash
cd docker
docker compose up -d
```

Vérifier:
```bash
docker ps
```

## Étape 4: Lancer le frontend

```bash
# Mode développement
npm run dev

# OU Production
npm run build && npm run start
```

## Étape 5: Accéder

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| n8n | http://localhost:5678 |

## 🐳 Services Docker

| Service | Port | Commande |
|--------|------|---------|
| PostgreSQL | 5432 | Auto |
| Redis | 6379 | Auto |
| n8n | 5678 | Auto |

## 🤖 Ollama (Optionnel - AI)

```bash
# Machine hôte:
ollama serve
ollama pull llama3.2
```

## 🔧 Commandes Utiles

```bash
# Arrêter tout
docker compose down

# Logs
docker logs e-traders-n8n

# Redémarrer
docker restart e-traders-n8n
```

## 🚨 Dépannage

```bash
# Port déjà utilisé
sudo lsof -i :3000

# Nettoyer Docker
docker system prune -a
```

## ✅ Vérification

```bash
curl http://localhost:3000/api/signals
# Devrait retourner des signaux JSON
```

---

**E-Traders By ELECTRON** - Trading Intelligent