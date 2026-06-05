#!/bin/bash
# E-Traders Startup Script

echo "🚀 Starting E-Traders Platform..."

# 1. Start Docker services
echo "📦 Starting Docker services..."
cd /workspace/project/docker
sudo docker compose up -d

# 2. Check services
echo "✅ Checking services..."
sudo docker ps

# 3. Test APIs
echo "🔌 Testing APIs..."
curl -s http://localhost:3000/api/signals > /dev/null && echo "✓ Frontend API" || echo "✗ Frontend API"
curl -s http://localhost:5678 > /dev/null && echo "✓ n8n" || echo "✗ n8n"

# 4. Status
echo ""
echo "=== E-Traders Status ==="
echo "Frontend:  http://localhost:3000"
echo "n8n:      http://localhost:5678"
echo "Postgres:   localhost:5432"
echo "Redis:    localhost:6379"
echo ""
echo "⚠️  Pour Ollama (AI), exécuter sur machine hôte:"
echo "   ollama serve"
echo "   ollama pull llama3.2"
echo ""
echo "🚀 Démarrage terminé!"