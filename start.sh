#!/bin/bash
# E-Traders Startup Script

echo "🚀 Starting E-Traders Platform..."

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Start Docker services
echo -e "${YELLOW}📦 Starting Docker services...${NC}"
cd docker
docker compose up -d

# Attendre un peu
sleep 3

# 2. Check services
echo -e "${YELLOW}✅ Checking services...${NC}"
docker ps

# 3. Test APIs
echo -e "${YELLOW}🔌 Testing APIs...${NC}"

# Test Frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend (3000)${NC}"
else
    echo -e "${RED}✗ Frontend (3000) - Not running${NC}"
fi

# Test PostgreSQL
if docker exec e-traders-db pg_isready -U etraders_user > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PostgreSQL (5432)${NC}"
else
    echo -e "${RED}✗ PostgreSQL (5432) - Not running${NC}"
fi

# Test Redis
if docker exec e-traders-redis redis-cli ping > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Redis (6379)${NC}"
else
    echo -e "${RED}✗ Redis (6379) - Not running${NC}"
fi

# Test Ollama
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Ollama (11434)${NC}"
else
    echo -e "${RED}✗ Ollama (11434) - Not running${NC}"
    echo -e "${YELLOW}   Run: ollama serve${NC}"
fi

# 4. Status
echo ""
echo "=========================================="
echo -e "${GREEN}   E-Traders Platform Status${NC}"
echo "=========================================="
echo "Frontend:      http://localhost:3000"
echo "Agents IA:     http://localhost:3000/agents"
echo "Academy:       http://localhost:3000/academy"
echo "Market:        http://localhost:3000/market"
echo "Trading:       http://localhost:3000/trading"
echo "Portfolio:     http://localhost:3000/portfolio"
echo "PostgreSQL:    localhost:5432"
echo "Redis:         localhost:6379"
echo ""
echo "=========================================="
echo -e "${YELLOW}⚠️  Pour Ollama (IA), exécuter:${NC}"
echo "   Terminal 1: ollama serve"
echo "   Terminal 2: ollama pull llama3.2"
echo ""
echo -e "${GREEN}🚀 Démarrage terminé!${NC}"