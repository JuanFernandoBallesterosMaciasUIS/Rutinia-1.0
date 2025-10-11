# Script para iniciar Frontend (React) y Backend (Django) simultáneamente
# Uso: .\start-all.ps1

Write-Host "🚀 Iniciando Rutinia - Frontend y Backend" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

# Obtener el directorio base del proyecto
$projectRoot = Split-Path -Parent $PSScriptRoot

# Rutas
$backendPath = Join-Path $projectRoot "backend-django\rutinia"
$frontendPath = Join-Path $projectRoot "frontend-react"

# Verificar que las rutas existan
if (-not (Test-Path $backendPath)) {
    Write-Host "❌ Error: No se encuentra el directorio del backend en: $backendPath" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $frontendPath)) {
    Write-Host "❌ Error: No se encuentra el directorio del frontend en: $frontendPath" -ForegroundColor Red
    exit 1
}

Write-Host "📂 Backend path: $backendPath" -ForegroundColor Cyan
Write-Host "📂 Frontend path: $frontendPath" -ForegroundColor Cyan
Write-Host ""

# Función para iniciar Django
$djangoScript = {
    param($path)
    Set-Location $path
    Write-Host "🐍 Iniciando Django Backend..." -ForegroundColor Yellow
    Write-Host "URL: http://localhost:8000" -ForegroundColor Cyan
    Write-Host "----------------------------------------" -ForegroundColor Gray
    python manage.py runserver
}

# Función para iniciar React
$reactScript = {
    param($path)
    Set-Location $path
    Start-Sleep -Seconds 3  # Esperar 3 segundos para que Django inicie primero
    Write-Host "⚛️  Iniciando React Frontend..." -ForegroundColor Yellow
    Write-Host "URL: http://localhost:5173" -ForegroundColor Cyan
    Write-Host "----------------------------------------" -ForegroundColor Gray
    npm run dev
}

Write-Host "✨ Iniciando servicios en paralelo..." -ForegroundColor Green
Write-Host ""
Write-Host "💡 Presiona Ctrl+C para detener ambos servicios" -ForegroundColor Yellow
Write-Host ""

# Iniciar ambos procesos en paralelo
$djangoJob = Start-Job -ScriptBlock $djangoScript -ArgumentList $backendPath
$reactJob = Start-Job -ScriptBlock $reactScript -ArgumentList $frontendPath

# Esperar un momento para que los jobs inicien
Start-Sleep -Seconds 2

Write-Host "✅ Django iniciado (Job ID: $($djangoJob.Id))" -ForegroundColor Green
Write-Host "✅ React iniciado (Job ID: $($reactJob.Id))" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Monitoreando servicios..." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Gray
Write-Host ""

# Mostrar output de ambos jobs
try {
    while ($true) {
        # Mostrar output de Django
        $djangoOutput = Receive-Job -Job $djangoJob
        if ($djangoOutput) {
            Write-Host "[DJANGO] " -ForegroundColor Magenta -NoNewline
            Write-Host $djangoOutput
        }

        # Mostrar output de React
        $reactOutput = Receive-Job -Job $reactJob
        if ($reactOutput) {
            Write-Host "[REACT]  " -ForegroundColor Blue -NoNewline
            Write-Host $reactOutput
        }

        # Verificar si algún job ha terminado
        if ($djangoJob.State -eq "Completed" -or $djangoJob.State -eq "Failed") {
            Write-Host "⚠️  Django ha terminado inesperadamente" -ForegroundColor Red
            break
        }
        if ($reactJob.State -eq "Completed" -or $reactJob.State -eq "Failed") {
            Write-Host "⚠️  React ha terminado inesperadamente" -ForegroundColor Red
            break
        }

        Start-Sleep -Milliseconds 500
    }
}
finally {
    Write-Host ""
    Write-Host "🛑 Deteniendo servicios..." -ForegroundColor Yellow
    
    # Detener jobs
    Stop-Job -Job $djangoJob -ErrorAction SilentlyContinue
    Stop-Job -Job $reactJob -ErrorAction SilentlyContinue
    
    # Remover jobs
    Remove-Job -Job $djangoJob -Force -ErrorAction SilentlyContinue
    Remove-Job -Job $reactJob -Force -ErrorAction SilentlyContinue
    
    Write-Host "✅ Servicios detenidos" -ForegroundColor Green
}
