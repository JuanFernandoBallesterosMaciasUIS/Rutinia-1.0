# 🚀 Cómo Correr el Proyecto Rutinia

## ✅ Estado Actual

- ✅ Django corriendo en: `http://localhost:8000`
- ✅ React corriendo en: `http://localhost:5173`
- ✅ CORS configurado correctamente
- ✅ 3 hábitos de prueba creados en MongoDB
- ✅ **NO hay datos simulados** - Solo usa datos de la base de datos

---

## 📋 Requisitos

- Python 3.11
- Node.js 20.15.1
- MongoDB Atlas (ya configurado)

---

## 🎯 Forma Rápida (Recomendada)

### Usar el script automático:

```powershell
cd "C:\Users\jball\OneDrive\Documentos\UIS\septimo semestre\Entornos de programación\Rutinia-1.0\src"
.\start-all.bat
```

**Esto abrirá 2 ventanas:**
- 🐍 **Django Backend** - Puerto 8000
- ⚛️ **React Frontend** - Puerto 5173

---

## 🔧 Forma Manual (Dos Terminales)

### Terminal 1: Django Backend

```powershell
cd "C:\Users\jball\OneDrive\Documentos\UIS\septimo semestre\Entornos de programación\Rutinia-1.0\src\backend-django"
.\venv\Scripts\Activate.ps1
cd rutinia
python manage.py runserver
```

**Django estará en:** `http://localhost:8000`

---

### Terminal 2: React Frontend

```powershell
cd "C:\Users\jball\OneDrive\Documentos\UIS\septimo semestre\Entornos de programación\Rutinia-1.0\src\frontend-react"
npm run dev
```

**React estará en:** `http://localhost:5173`

---

## 🌐 URLs Importantes

| Servicio | URL |
|----------|-----|
| **Aplicación React** | http://localhost:5173 |
| **API Django** | http://localhost:8000/api/ |
| **Hábitos** | http://localhost:8000/api/habitos/ |
| **Categorías** | http://localhost:8000/api/categorias/ |
| **Usuarios** | http://localhost:8000/api/usuarios/ |
| **Desde celular** | http://192.168.1.30:5173 |

---

## 📱 Acceso desde Celular

1. Asegúrate de estar en la **misma red WiFi**
2. En la terminal de React, busca la línea que dice **`Network:`**
3. Usa esa URL en el navegador de tu celular

**Ejemplo:** `http://192.168.1.30:5173`

---

## 👤 Usuario de Prueba

El sistema actualmente usa un usuario temporal:

- **ID:** `68ea57f5fc52f3058c8233ab`
- **Nombre:** Usuario Demo
- **Email:** demo@rutinia.com

---

## 📝 Hábitos Creados

Actualmente hay **3 hábitos de prueba** en MongoDB:

1. 🚰 **Beber 8 vasos de agua** (Diaria)
2. 🏃 **Hacer ejercicio** (Semanal - L, M, V)
3. 🧘 **Meditar 10 minutos** (Diaria)

---

## 🔄 Crear Más Hábitos de Prueba

Si necesitas más hábitos de prueba, ejecuta:

```powershell
cd "C:\Users\jball\OneDrive\Documentos\UIS\septimo semestre\Entornos de programación\Rutinia-1.0\src\backend-django\rutinia"
..\venv\Scripts\python.exe create_sample_habits.py
```

---

## ⚙️ Configuración CORS

Ya está configurado en `backend-django/rutinia/rutinia/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

CORS_ALLOW_CREDENTIALS = True
```

---

## 🛑 Detener los Servicios

- **Opción 1:** Cierra las ventanas de terminal
- **Opción 2:** Presiona `Ctrl + C` en cada terminal

---

## ⚠️ Solución de Problemas

### React no muestra hábitos

1. **Verifica que Django esté corriendo:**
   - Abre `http://localhost:8000/api/habitos/`
   - Deberías ver JSON con los hábitos

2. **Verifica la consola del navegador:**
   - Presiona `F12` en el navegador
   - Busca errores en la pestaña "Console"

3. **Recarga la página:**
   - Presiona `Ctrl + R` o `F5`

### Error de CORS

Si ves errores de CORS en la consola:

1. Verifica que Django esté corriendo
2. Asegúrate de que `corsheaders` esté en `INSTALLED_APPS`
3. Reinicia Django

### Node.js Version Error

Si Vite dice que la versión de Node es incorrecta:

- **Ya está solucionado** - Vite se bajó a la versión 5.4.11
- Si persiste, verifica: `node --version`

---

## 📦 Dependencias Instaladas

### Backend (Django)
- Django 5.2.7
- djangorestframework 3.16.1
- mongoengine 0.29.1
- django-cors-headers 4.9.0

### Frontend (React)
- React 19.1.1
- Vite 5.4.11
- Tailwind CSS 3.4.18

---

## 💡 Notas Importantes

1. **NO hay datos simulados** - La aplicación SOLO usa datos de MongoDB
2. Si no hay conexión al backend, verás un mensaje de error
3. Los iconos y colores de los hábitos se guardan en `localStorage` del navegador
4. Los datos de negocio (nombre, descripción, frecuencia) están en MongoDB

---

## 📞 Ayuda

Si tienes problemas:

1. Verifica que ambos servicios estén corriendo
2. Revisa la consola del navegador (F12)
3. Verifica los logs de Django en la terminal
4. Asegúrate de estar en la misma red WiFi (para acceso móvil)

---

**¡Listo!** Ahora puedes abrir `http://localhost:5173` y ver tus hábitos. 🎉
