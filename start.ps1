# E-Traders By ELECTRON - Script de demarrage

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  E-Traders By ELECTRON - Demarrage" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/3] Verification Docker..." -ForegroundColor Yellow
try {
    $docker = docker ps 2>$null
    if ($docker) {
        Write-Host "    Docker: OK" -ForegroundColor Green
    }
} catch {
    Write-Host "    Docker: PAS ACTIF - Lancez Docker Desktop" -ForegroundColor Red
}

Write-Host "[2/3] Verification Ollama..." -ForegroundColor Yellow
try {
    $ollama = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -UseBasicParsing -ErrorAction SilentlyContinue
    if ($ollama.StatusCode -eq 200) {
        Write-Host "    Ollama: OK" -ForegroundColor Green
    }
} catch {
    Write-Host "    Ollama: PAS ACTIF - Tapez: ollama serve" -ForegroundColor Red
}

Write-Host "[3/3] Lancement Next.js..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Serveur demarre sur http://localhost:3003" -ForegroundColor Green
Write-Host "  Appuyez sur Ctrl+C pour arreter" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Lancer le serveur
npm run dev