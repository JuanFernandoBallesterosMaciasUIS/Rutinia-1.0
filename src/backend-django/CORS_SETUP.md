# 🔐 Configuración de CORS para Django

## Instrucciones Rápidas

### 1. Instalar django-cors-headers

```bash
cd backend-django/rutinia
pip install django-cors-headers
```

### 2. Actualizar requirements.txt

Agrega esta línea al archivo `backend-django/requeriments.txt`:
```
django-cors-headers==4.3.0
```

### 3. Modificar settings.py

Abre `backend-django/rutinia/rutinia/settings.py` y realiza los siguientes cambios:

#### a) Agregar a INSTALLED_APPS:
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'rest_framework_mongoengine',
    'corsheaders',  # ← AGREGAR ESTA LÍNEA
    
    # Local apps
    'core',
]
```

#### b) Agregar a MIDDLEWARE (debe estar al inicio):
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ← AGREGAR AL INICIO
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

#### c) Configurar CORS al final del archivo:
```python
# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Para desarrollo en red local, agrega tu IP:
# CORS_ALLOWED_ORIGINS += [
#     "http://192.168.1.30:5173",  # Reemplaza con tu IP
# ]

# Métodos HTTP permitidos
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# Headers permitidos
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### 4. Reiniciar el servidor Django

```bash
python manage.py runserver
```

### 5. Verificar configuración

Deberías ver esto en la consola cuando React haga peticiones:
```
"GET /api/habitos/ HTTP/1.1" 200
"POST /api/habitos/ HTTP/1.1" 201
```

---

## 🚨 Importante para Desarrollo

Si estás teniendo problemas con CORS durante el desarrollo, **temporalmente** puedes usar:

```python
# ⚠️ SOLO PARA DESARROLLO - NUNCA EN PRODUCCIÓN
CORS_ALLOW_ALL_ORIGINS = True
```

**PERO** asegúrate de quitar esto antes de ir a producción y usar la lista específica de orígenes permitidos.

---

## ✅ Verificar que funciona

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Recarga la aplicación React
4. Busca peticiones a `http://localhost:8000/api/habitos/`
5. Verifica que el status sea `200 OK` y no haya errores de CORS

---

## 🐛 Solución de Problemas

### Error: "CORS header 'Access-Control-Allow-Origin' missing"
- ✅ Verifica que `corsheaders` esté instalado: `pip list | grep cors`
- ✅ Revisa que `CorsMiddleware` esté al INICIO de MIDDLEWARE
- ✅ Confirma que la URL de React esté en CORS_ALLOWED_ORIGINS

### Error: "Method not allowed"
- ✅ Verifica que el método (GET, POST, etc.) esté en CORS_ALLOW_METHODS
- ✅ Revisa las URLs de Django (urls.py)

### Aún no funciona
1. Reinicia Django completamente
2. Limpia caché del navegador (Ctrl + Shift + Delete)
3. Verifica los logs de Django en la terminal
