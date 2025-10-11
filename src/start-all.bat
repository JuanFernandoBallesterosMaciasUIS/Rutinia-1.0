@echo off
chcp 65001 >nul
REM Script para iniciar Frontend (React) y Backend (Django) simultáneamente
REM Uso: start-all.bat

cls
echo.
echo ========================================
echo 🚀 Rutinia - Iniciador Automático
echo ========================================
echo.

REM Obtener directorio del script
set "SCRIPT_DIR=%~dp0"
set "BACKEND_DIR=%SCRIPT_DIR%backend-django\rutinia"
set "FRONTEND_DIR=%SCRIPT_DIR%frontend-react"

REM Verificar que los directorios existan
if not exist "%BACKEND_DIR%" (
    color 0C
    echo ❌ ERROR: No se encuentra el directorio del backend
    echo.
    echo Esperado en: %BACKEND_DIR%
    echo.
    pause
    exit /b 1
)

if not exist "%FRONTEND_DIR%" (
    color 0C
    echo ❌ ERROR: No se encuentra el directorio del frontend
    echo.
    echo Esperado en: %FRONTEND_DIR%
    echo.
    pause
    exit /b 1
)

color 0A
echo ✅ Directorios encontrados:
echo    📂 Backend:  %BACKEND_DIR%
echo    📂 Frontend: %FRONTEND_DIR%
echo.

REM Verificar que exista Python
where python >nul 2>nul
if errorlevel 1 (
    color 0E
    echo ⚠️  ADVERTENCIA: Python no encontrado en el PATH
    echo    Asegúrate de tener Python instalado
    echo.
    pause
)

REM Verificar que exista Node/npm
where npm >nul 2>nul
if errorlevel 1 (
    color 0E
    echo ⚠️  ADVERTENCIA: npm no encontrado en el PATH
    echo    Asegúrate de tener Node.js instalado
    echo.
    pause
)

color 0B
echo.
echo ========================================
echo ✨ Iniciando servicios...
echo ========================================
echo.

REM Iniciar Django en una nueva ventana
echo 🐍 [1/2] Iniciando Django Backend...
start "🐍 Django Backend - Rutinia [http://localhost:8000]" cmd /k "color 0D && cd /d "%BACKEND_DIR%" && echo ========================================= && echo 🐍 Django Backend - Rutinia && echo ========================================= && echo. && echo 🌐 URL: http://localhost:8000 && echo 📡 API: http://localhost:8000/api && echo. && echo 💡 Presiona Ctrl+C para detener && echo. && ..\venv\Scripts\python.exe manage.py runserver"

REM Esperar 5 segundos para que Django inicie
echo    ⏳ Esperando 5 segundos para que Django inicie...
timeout /t 5 /nobreak > nul

REM Iniciar React en una nueva ventana
echo ⚛️  [2/2] Iniciando React Frontend...
start "⚛️  React Frontend - Rutinia [http://localhost:5173]" cmd /k "color 0B && cd /d "%FRONTEND_DIR%" && echo ========================================= && echo ⚛️  React Frontend - Rutinia && echo ========================================= && echo. && echo 🌐 Local: http://localhost:5173 && echo 📱 Red: Revisa la URL 'Network' que aparecerá abajo && echo. && echo 💡 Presiona Ctrl+C para detener && echo. && npm run dev"

color 0A
echo.
echo ========================================
echo ✅ ¡Servicios iniciados correctamente!
echo ========================================
echo.
echo 📝 Se abrieron 2 ventanas nuevas:
echo    1. 🐍 Django Backend  - Puerto 8000
echo    2. ⚛️  React Frontend - Puerto 5173
echo.
echo 🌐 URLs de acceso:
echo    ► Backend API:  http://localhost:8000/api
echo    ► Frontend:     http://localhost:5173
echo.
echo 📱 Para acceder desde tu celular:
echo    1. Busca la URL "Network" en la ventana de React
echo    2. Úsala en el navegador de tu celular
echo    3. Ambos deben estar en la misma WiFi
echo.
echo 🛑 Para detener los servicios:
echo    ► Cierra las ventanas que se abrieron, O
echo    ► Presiona Ctrl+C en cada ventana
echo.
echo 💡 TIP: Mantén esta ventana abierta para ver este resumen
echo.
echo ========================================

pause
