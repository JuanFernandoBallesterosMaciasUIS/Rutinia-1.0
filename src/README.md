# 🚀 Rutinia - Guía de Inicio Rápido

## 📋 Requisitos Previos

- **Node.js** v20.15.1 o superior
- **Python** 3.8 o superior
- **MongoDB** instalado y corriendo
- **Git** (opcional)

---

## 🏁 Inicio Rápido (Ambos Servicios)

### 1. Configurar Backend Django

```bash
# Navegar al directorio del backend
cd backend-django/rutinia

# Crear entorno virtual (opcional pero recomendado)
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r ../requeriments.txt

# Instalar CORS (necesario para conectar con React)
pip install django-cors-headers

# Inicializar categorías (opcional)
python manage.py shell < init_categorias.py

# Iniciar servidor Django
python manage.py runserver
```

El backend estará disponible en: **http://localhost:8000**

### 2. Configurar Frontend React

```bash
# En otra terminal, navegar al directorio del frontend
cd frontend-react

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en:
- **Local:** http://localhost:5173
- **Red local:** http://192.168.1.30:5173 (accesible desde celular/tablet)

---

## 🔧 Configuración de CORS (Primera Vez)

**IMPORTANTE:** Para que React pueda comunicarse con Django, debes configurar CORS.

Sigue las instrucciones detalladas en: [`backend-django/CORS_SETUP.md`](backend-django/CORS_SETUP.md)

**Resumen rápido:**
1. `pip install django-cors-headers`
2. Agregar `'corsheaders'` a `INSTALLED_APPS` en `settings.py`
3. Agregar `'corsheaders.middleware.CorsMiddleware'` al inicio de `MIDDLEWARE`
4. Configurar `CORS_ALLOWED_ORIGINS` con las URLs de React

---



## 📚 Documentación

### Para Desarrolladores:

- **Integración con Backend:** [`frontend-react/BACKEND_INTEGRATION.md`](frontend-react/BACKEND_INTEGRATION.md)
  - Cómo funciona la conexión React ↔ Django
  - Estructura de datos
  - Manejo de errores
  - Próximos pasos

- **Configuración CORS:** [`backend-django/CORS_SETUP.md`](backend-django/CORS_SETUP.md)
  - Instalación paso a paso
  - Solución de problemas
  - Configuración para desarrollo vs producción

### Endpoints API Disponibles:

#### Hábitos
- `GET /api/habitos/` - Listar todos los hábitos
- `POST /api/habitos/` - Crear nuevo hábito
- `GET /api/habitos/{id}/` - Obtener hábito específico
- `PATCH /api/habitos/{id}/` - Actualizar hábito
- `DELETE /api/habitos/{id}/` - Eliminar hábito

#### Registros (Completados)
- `GET /api/registros/` - Listar registros
- `POST /api/registros/` - Marcar hábito como completado

#### Categorías
- `GET /api/categorias/` - Listar categorías
- `POST /api/categorias/` - Crear categoría

#### Usuarios
- `GET /api/usuarios/` - Listar usuarios
- `POST /api/usuarios/` - Crear usuario

---

## 🗂️ Estructura del Proyecto

```
Rutinia-1.0/
├── backend-django/
│   ├── rutinia/
│   │   ├── core/              # App principal (modelos, vistas, etc.)
│   │   ├── rutinia/           # Configuración de Django
│   │   ├── db.sqlite3         # Base de datos (no se usa, usa MongoDB)
│   │   ├── manage.py
│   │   └── init_categorias.py # Script para inicializar categorías
│   ├── requeriments.txt       # Dependencias Python
│   └── CORS_SETUP.md          # Guía de configuración CORS
│
├── frontend-react/
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── services/          # API y localStorage
│   │   │   ├── api.js         # Comunicación con Django
│   │   │   └── localStorage.js # Datos visuales locales
│   │   ├── data/              # Datos de ejemplo
│   │   ├── App.jsx            # Componente principal
│   │   └── index.css          # Estilos globales
│   ├── public/
│   ├── package.json
│   ├── vite.config.js         # Configuración de Vite
│   └── BACKEND_INTEGRATION.md # Documentación de integración
│
└── backend-springboot/         # (No en uso actualmente)
```

---

## ✨ Características Implementadas

### Frontend (React)
- ✅ Interfaz responsive (móvil y desktop)
- ✅ Modo oscuro/claro
- ✅ Vista de hábitos del día
- ✅ Calendario mensual/semanal
- ✅ Lista completa de hábitos con filtros
- ✅ Modales optimizados para crear/editar hábitos
- ✅ Tarjetas de hábitos compactas para móvil
- ✅ Header y footer fijos durante scroll
- ✅ Acceso desde red local

### Backend (Django + MongoDB)
- ✅ API REST completa
- ✅ Modelos: Usuario, Hábito, Registro, Categoría, Rol
- ✅ MongoDB como base de datos
- ✅ Serializers para JSON

### Integración
- ✅ Conexión React ↔ Django
- ✅ Crear, editar, eliminar hábitos
- ✅ Marcar hábitos como completados
- ✅ Datos visuales (color, icono) en localStorage
- ✅ Manejo de errores y fallback a datos locales
- ✅ Indicador de carga

---

## 🚧 Pendientes

- ⏳ Sistema de autenticación
- ⏳ Gestión de categorías desde UI
- ⏳ Vista de análisis/estadísticas
- ⏳ Notificaciones/recordatorios
- ⏳ Sincronización offline
- ⏳ Tests automatizados

---

## 🐛 Solución de Problemas Comunes

### Backend no inicia
- Verifica que MongoDB esté corriendo: `mongod --version`
- Revisa los logs en la terminal
- Asegúrate de haber instalado todas las dependencias: `pip install -r requeriments.txt`

### Frontend no carga hábitos
- Abre la consola del navegador (F12)
- Verifica que Django esté corriendo en http://localhost:8000
- Revisa que CORS esté configurado correctamente
- Mira la pestaña "Network" para ver las peticiones HTTP

### Error "CORS policy"
- Sigue la guía: [`backend-django/CORS_SETUP.md`](backend-django/CORS_SETUP.md)
- Reinicia Django después de configurar CORS

### No puedo acceder desde celular
- Verifica que ambos dispositivos estén en la misma red WiFi
- Usa la URL "Network" que muestra Vite, no la "Local"
- Desactiva firewall temporalmente si estás en Windows

---

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -am 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crea un Pull Request

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la Universidad Industrial de Santander (UIS).

---

## 👥 Autores

- Juan Fernando Ballesteros Macias
- [Otros colaboradores]

---

## 🆘 Soporte

Si encuentras problemas:
1. Revisa la documentación en los archivos `.md`
2. Verifica los logs en las terminales
3. Abre un issue en el repositorio de GitHub
