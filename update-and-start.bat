@echo off
echo ========================================
echo   E-Traders - Mise a jour et demarrage
echo ========================================
echo.

echo [1/4] Nettoyage cache...
if exist .next rmdir /s /q .next
echo    OK

echo [2/4] Pull GitHub...
git pull origin feature/ai-agents-automation-360
echo.

echo [3/4] Installation...
call npm install
echo.

echo [4/4] Demarrage serveur...
echo.
echo ========================================
echo   Serveur sur http://localhost:3003
echo ========================================
call npm run dev -- -p 3003

pause