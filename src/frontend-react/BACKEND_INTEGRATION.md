# 🔗 Integración con Backend Django

## ✅ Estado Actual

La aplicación React ahora está **conectada con el backend Django** para gestionar los hábitos.

### Endpoints Conectados:
- ✅ **GET /api/habitos/** - Cargar hábitos
- ✅ **POST /api/habitos/** - Crear nuevo hábito
- ✅ **PATCH /api/habitos/{id}/** - Actualizar hábito
- ✅ **DELETE /api/habitos/{id}/** - Eliminar hábito
- ✅ **POST /api/registros/** - Marcar hábito como completado

---

## 📋 Requisitos Previos

### 1. Backend Django ejecutándose
```bash
cd backend-django/rutinia
python manage.py runserver
```
El backend debe estar en: `http://localhost:8000`

### 2. MongoDB ejecutándose
Asegúrate de tener MongoDB corriendo en tu máquina local.

### 3. CORS configurado en Django
Necesitas instalar y configurar `django-cors-headers` en el backend:

```bash
pip install django-cors-headers
```

En `rutinia/settings.py`:
```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Debe estar al inicio
    'django.middleware.common.CommonMiddleware',
    ...
]

# Permitir requests desde React
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://192.168.1.30:5173",  # Tu IP local
]

# O para desarrollo, permitir todos (NO usar en producción):
# CORS_ALLOW_ALL_ORIGINS = True
```

---

## 🗂️ Estructura de Datos

### Campos del Backend (Django/MongoDB)
Los siguientes campos se envían al backend:
```javascript
{
  usuario: "ID_del_usuario",        // Temporal hasta implementar auth
  categoria: "ID_de_categoria",     // Puede ser null
  nombre: "Hacer ejercicio",
  descripcion: "30 minutos diarios",
  dificultad: "media",              // Valor por defecto
  fecha_inicio: "2025-10-11",       // YYYY-MM-DD
  tipo_frecuencia: "diario",        // "diario", "semanal", "mensual"
  dias: ["lun", "mar", "mie"],     // Solo para frecuencia semanal
  publico: false,
  activo: true,
  notificaciones: []
}
```

### Campos del Frontend (React + localStorage)
Estos campos **NO** se envían al backend, se guardan en `localStorage`:
```javascript
{
  icon: "fitness_center",  // Icono de Material Icons
  color: "blue"            // Color del tema
}
```

---

## 🔄 Flujo de Datos

### Crear un Hábito
1. Usuario llena el formulario en React
2. React separa los datos:
   - **Datos del backend**: nombre, categoría, frecuencia, etc.
   - **Datos visuales**: icono, color
3. Se envía POST a `/api/habitos/` con datos del backend
4. Backend responde con el hábito creado (incluye `id`)
5. React guarda datos visuales en `localStorage` usando el `id`
6. Se muestra el hábito en la UI con todos los datos

### Editar un Hábito
1. Usuario modifica el hábito
2. React actualiza datos visuales en `localStorage`
3. Se envía PATCH a `/api/habitos/{id}/` con datos del backend
4. Backend responde con hábito actualizado
5. Se actualiza la UI

### Eliminar un Hábito
1. Usuario confirma eliminación
2. Se envía DELETE a `/api/habitos/{id}/`
3. Se eliminan datos visuales de `localStorage`
4. Se actualiza la UI

### Marcar Hábito Completado
1. Usuario marca hábito como completado
2. Se actualiza `localStorage` inmediatamente (para UI reactiva)
3. Se envía POST a `/api/registros/` en segundo plano
4. Si falla, el cambio ya está guardado localmente

---

## 📦 Archivos Creados

### `src/services/api.js`
Servicio para comunicación con el backend:
- `getHabitos()` - Obtener todos los hábitos
- `createHabito(data)` - Crear nuevo hábito
- `updateHabito(id, data)` - Actualizar hábito
- `deleteHabito(id)` - Eliminar hábito
- `createRegistro(data)` - Marcar hábito completado
- `mapHabitoToBackend()` - Convertir formato frontend → backend
- `mapHabitoToFrontend()` - Convertir formato backend → frontend

### `src/services/localStorage.js`
Servicio para gestión de datos locales:
- `getVisualData()` - Obtener iconos y colores de todos los hábitos
- `saveVisualData(id, data)` - Guardar icono y color de un hábito
- `getCompletedHabits()` - Obtener hábitos completados por fecha
- `toggleHabitCompletion()` - Marcar/desmarcar hábito

---

## 🔧 Configuración

### Cambiar URL del Backend
Edita `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';  // Cambia según tu configuración
```

### Usuario Temporal
Hasta implementar autenticación, se usa un ID temporal:
```javascript
const TEMP_USER_ID = '507f1f77bcf86cd799439011';
```

---

## 🐛 Solución de Problemas

### Error: "Failed to fetch"
- ✅ Verifica que Django esté corriendo en `http://localhost:8000`
- ✅ Revisa que CORS esté configurado correctamente
- ✅ Abre la consola del navegador para ver el error exacto

### Error: "Network request failed"
- ✅ Verifica la conexión a MongoDB
- ✅ Revisa los logs de Django para errores del backend

### Los hábitos no aparecen
- ✅ Verifica que existan hábitos en la base de datos
- ✅ Abre la consola del navegador para ver errores
- ✅ Si falla, la app usa datos de ejemplo automáticamente

### Los iconos/colores no se guardan
- ✅ Revisa que localStorage esté habilitado en el navegador
- ✅ Abre DevTools → Application → Local Storage

---

## 📝 Próximos Pasos

### Pendientes de Implementación:
1. **Autenticación de usuarios** - Reemplazar `TEMP_USER_ID` con usuario real
2. **Gestión de categorías** - Permitir crear/editar categorías desde el frontend
3. **Sincronización de registros** - Eliminar registros cuando se desmarca un hábito
4. **Caché inteligente** - Reducir llamadas al backend
5. **Modo offline** - Permitir uso sin conexión y sincronizar después
6. **Notificaciones** - Implementar sistema de recordatorios

---

## 📚 Recursos

- **Django REST Framework**: https://www.django-rest-framework.org/
- **MongoDB**: https://www.mongodb.com/docs/
- **CORS**: https://developer.mozilla.org/es/docs/Web/HTTP/CORS

---

## ✨ Notas Importantes

1. **Datos visuales separados**: Los iconos y colores se guardan en `localStorage` porque el backend Django no los necesita. Esto permite flexibilidad para cambiar el diseño sin afectar la base de datos.

2. **Sincronización optimista**: Los cambios se muestran inmediatamente en la UI antes de confirmar con el backend, mejorando la experiencia del usuario.

3. **Manejo de errores**: Si el backend falla, la aplicación usa datos locales o de ejemplo para seguir funcionando.

4. **Compatible con móvil**: La configuración de Vite permite acceder desde otros dispositivos en la misma red local.
