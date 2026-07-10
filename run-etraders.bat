@echo off
chcp 65001 >nul
title E-Traders - Lancement Complet

echo.
echo ========================================
echo    🚀 E-TRADERS - LANCEMENT COMPLET
echo ========================================
echo.

REM ========================================
REM 1. Vérifier Docker Desktop
echo [1/5] Vérification de Docker Desktop...
docker version >nul 2>&1
if errorlevel 1 (
    echo    ❌ Docker Desktop n'est pas démarré!
    echo    Veuillez démarrer Docker Desktop et réessayer.
    pause
    exit /b 1
)
echo    ✅ Docker Desktop est actif

REM ========================================
REM 2. Vérifier Ollama
echo.
echo [2/5] Vérification d'Ollama...
curl -s http://localhost:11434/api/tags >nul 2>&1
if errorlevel 1 (
    echo    ⚠️  Ollama n'est pas démarré!
    echo    Démarrage d'Ollama...
    start "" ollama serve
    timeout /t 5 /nobreak >nul
)
echo    ✅ Ollama est actif

REM ========================================
REM 3. Vérifier les modèles Ollama
echo.
echo [3/5] Modèles Ollama disponibles:
ollama list

REM ========================================
REM 4. Démarrer les services Docker
echo.
echo [4/5] Démarrage des services Docker (PostgreSQL, Redis)...
cd /d "%~dp0docker"
docker compose up -d
if errorlevel 1 (
    echo    ❌ Erreur lors du démarrage de Docker
    pause
    exit /b 1
)
echo    ✅ Services Docker démarrés

REM ========================================
REM 5. Installer les dépendances et démarrer Next.js
echo.
echo [5/5] Démarrage du frontend Next.js...
cd /d "%~dp0"
npm install >nul 2>&1
start "" cmd /c "npm run dev"

echo.
echo.
echo ========================================
echo    ✅ SYSTÈME E-TRADERS PRÊT!
echo ========================================
echo.
echo 🌐 Accès à la plateforme:
echo    http://localhost:3001
echo.
echo 🤖 Agents IA:
echo    http://localhost:3001/agents
echo.
echo 📊 Trading:
echo    http://localhost:3001/trading
echo.
echo.
echo Appuyez sur une touche pour ouvrir la plateforme...
pause >nul

start http://localhost:3001
