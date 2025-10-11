# 🚀 Guía de Inicio Rápido - Rutinia

## ⚡ Inicio con un Solo Comando

### Opción 1: Usar el script BAT (Recomendado para Windows)

Simplemente haz **doble clic** en el archivo o ejecuta desde la terminal:

```bash
.\start-all.bat
```

Esto abrirá **2 ventanas** automáticamente:
1. **Django Backend** - http://localhost:8000
2. **React Frontend** - http://localhost:5173

### Opción 2: Usar PowerShell Script

```powershell
.\start-all.ps1
```

---

## 📋 ¿Qué hace el script?

1. ✅ Verifica que existan los directorios del backend y frontend
2. ✅ Inicia Django en el puerto 8000
3. ✅ Espera 3 segundos (para que Django inicie primero)
4. ✅ Inicia React/Vite en el puerto 5173
5. ✅ Abre dos ventanas separadas para cada servicio

---

## 🛑 Cómo Detener los Servicios

### Si usaste `start-all.bat`:
- Simplemente **cierra las ventanas** que se abrieron, O
- Presiona **Ctrl + C** en cada ventana

### Si usaste `start-all.ps1`:
- Presiona **Ctrl + C** en la ventana de PowerShell

---

## 📱 Acceder a la Aplicación

Después de ejecutar el script:

### Desde tu PC:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api

### Desde tu celular (misma red WiFi):
- Busca la URL que muestra Vite en la ventana de React
- Ejemplo: http://192.168.1.30:5173
- Usa esa URL en el navegador de tu celular

---

## ⚙️ Requisitos (Solo Primera Vez)

### 1. Python y dependencias instaladas
```bash
cd backend-django/rutinia
pip install -r ../requeriments.txt
pip install django-cors-headers
```

### 2. Node.js y dependencias instaladas
```bash
cd frontend-react
npm install
```

### 3. MongoDB corriendo
Asegúrate de que MongoDB esté instalado y ejecutándose.

### 4. CORS configurado
Sigue las instrucciones en: `backend-django/CORS_SETUP.md`

---

## 🔧 Inicio Manual (Si prefieres)

### Backend (Terminal 1):
```bash
cd backend-django/rutinia
python manage.py runserver
```

### Frontend (Terminal 2):
```bash
cd frontend-react
npm run dev
```

---

## 🐛 Solución de Problemas

### "No se reconoce como comando interno o externo"
- Asegúrate de tener Python y Node.js instalados
- Verifica que estén en el PATH del sistema

### "Error al iniciar Django"
- Verifica que MongoDB esté corriendo
- Revisa que las dependencias estén instaladas: `pip list`

### "Error al iniciar React"
- Verifica que las dependencias estén instaladas: `npm list`
- Intenta: `npm install` en la carpeta frontend-react

### Los scripts no se ejecutan
- **PowerShell:** Ejecuta esto primero (como administrador):
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
- **BAT:** Asegúrate de ejecutar desde la carpeta `src`

### "Puerto ya en uso"
Si el puerto 8000 o 5173 ya están en uso:

**Windows:**
```bash
# Ver qué está usando el puerto 8000
netstat -ano | findstr :8000

# Matar el proceso (reemplaza PID con el número que aparece)
taskkill /PID <PID> /F
```

---

## 📂 Estructura de Archivos

```
src/
├── start-all.bat          ← Script principal (Windows)
├── start-all.ps1          ← Script PowerShell alternativo
├── README_START.md        ← Este archivo
├── backend-django/
│   └── rutinia/
│       └── manage.py
└── frontend-react/
    └── package.json
```

---

## ✨ Consejos

1. **Primera vez:** Ejecuta manualmente una vez para verificar que todo funcione
2. **Desarrollo:** Usa el script para ahorrar tiempo
3. **Producción:** NO uses estos scripts, configura un servidor apropiado
4. **Git:** Los archivos .bat y .ps1 ya están en el repositorio

---

## 🆘 Ayuda Adicional

- **Documentación completa:** Ver `README.md` en la carpeta raíz
- **Integración Backend:** Ver `frontend-react/BACKEND_INTEGRATION.md`
- **Configurar CORS:** Ver `backend-django/CORS_SETUP.md`

---

## 🎯 Siguiente Paso

1. Ejecuta `.\start-all.bat`
2. Espera a que se abran las dos ventanas
3. Abre http://localhost:5173 en tu navegador
4. ¡Empieza a usar Rutinia! 🎉
