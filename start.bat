@echo off
echo ========================================
echo   E-Traders By ELECTRON - Demarrage
echo ========================================
echo.

echo [1/3] Verification Docker...
docker ps >nul 2>&1
if errorlevel 1 (
    echo    Docker: PAS ACTIF - Lancez Docker Desktop
) else (
    echo    Docker: OK
)

echo [2/3] Verification Ollama...
curl -s http://localhost:11434/api/tags >nul 2>&1
if errorlevel 1 (
    echo    Ollama: PAS ACTIF - Tapez: ollama serve
) else (
    echo    Ollama: OK
)

echo [3/3] Lancement Next.js...
echo.
echo ========================================
echo   Serveur demarre sur http://localhost:3003
echo   Appuyez sur Ctrl+C pour arreter
echo ========================================
npm run dev

pause