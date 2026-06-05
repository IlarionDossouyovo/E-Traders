# 🤖 E-Traders AI Setup Guide

## Configuration Requise

### 1. Ollama (AI sur machine hôte)

Ollama doit être installé et en cours d'exécution sur votre machine :

```bash
# Installation Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Démarrer Ollama
ollama serve

# Télécharger un modèle (optionnel)
ollama pull llama3.2
```

### 2. Accéder à Ollama depuis Docker

```bash
# Vérifier que Ollama écoute sur toutes les interfaces
# Modifier /etc/ollama.env ou :
export OLLAMA_HOST=0.0.0.0:11434
```

## Services Docker Actifs

```bash
# Voir les conteneurs
sudo docker ps

# Logs n8n
sudo docker logs e-traders-n8n

# Redémarrer si besoin
sudo docker restart e-traders-n8n
```

## Accéder à n8n

1. Ouvrir http://localhost:5678
2. Créer un compte
3. Importer les workflows JSON depuis `/n8n-workflows/`

## Configuration des API Keys

Éditer `/workspace/project/docker/.env` :

```
OLLAMA_API_KEY=ollama
OLLAMA_BASE_URL=http://host.docker.internal:11434
```

## Webhooks Disponibles

- **Signal Generator**: `POST http://localhost:5678/webhook/ai-signal-generator`
- **AI Tutor**: `POST http://localhost:5678/webhook/ai-tutor`
- **Risk Alert**: `POST http://localhost:5678/webhook/risk-management`

## Dépannage

```bash
# Vérifier Ollama
curl http://host.docker.internal:11434/api/tags

# Si erreur de connexion, ajouter à docker-compose:
extra_hosts:
  - "host.docker.internal:host-gateway"
```