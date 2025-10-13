# 🔐 Sistema de Login - Rutinia

## 📋 Descripción

Se ha implementado un sistema completo de autenticación (login y registro) para la aplicación Rutinia. La página de login incluye diseño moderno, modo oscuro automático, validaciones, y está completamente integrada con el backend Django.

## ✨ Características

### 🎨 Diseño
- ✅ Interfaz moderna con gradientes purple/indigo
- ✅ Modo oscuro automático (respeta preferencias del sistema)
- ✅ Diseño totalmente responsive (móvil, tablet, desktop)
- ✅ Animaciones suaves y transiciones
- ✅ Iconos Material Icons

### 🔑 Funcionalidades de Login
- ✅ Iniciar sesión con correo y contraseña
- ✅ Validación de formato de correo
- ✅ Validación de contraseña (mínimo 6 caracteres)
- ✅ Mostrar/ocultar contraseña
- ✅ Manejo de errores con mensajes claros
- ✅ Estados de carga (loading)

### 📝 Funcionalidades de Registro
- ✅ Formulario completo (nombre, apellido, correo, contraseña)
- ✅ Confirmación de contraseña
- ✅ Validación de coincidencia de contraseñas
- ✅ Creación de usuario en backend
- ✅ Auto-login después de registro exitoso

### 🔄 Integración
- ✅ Integrado con API REST de Django
- ✅ Persistencia de sesión en localStorage
- ✅ Carga automática de hábitos del usuario al iniciar sesión
- ✅ Botón de cerrar sesión en Sidebar
- ✅ Información del usuario visible en Sidebar

## 🚀 Uso

### Para Usuarios

#### Iniciar Sesión
1. Abre la aplicación (aparecerá la página de login automáticamente)
2. Ingresa tu correo y contraseña
3. Haz clic en "Iniciar Sesión"

#### Registrarse
1. En la página de login, haz clic en la pestaña "Registrarse"
2. Completa todos los campos:
   - Nombre
   - Apellido
   - Correo electrónico
   - Contraseña (mínimo 6 caracteres)
   - Confirmar contraseña
3. Haz clic en "Crear Cuenta"
4. Automáticamente iniciarás sesión

#### Cerrar Sesión
1. Haz clic en el botón del menú (☰) para abrir el Sidebar
2. Ve hasta abajo y haz clic en "Cerrar sesión"

### Para Desarrolladores

#### Archivos Modificados/Creados

**Nuevos archivos:**
```
src/frontend-react/src/components/Login.jsx
```

**Archivos modificados:**
```
src/frontend-react/src/App.jsx
src/frontend-react/src/components/Sidebar.jsx
src/frontend-react/src/services/api.js
```

#### Funciones de API Agregadas

En `src/services/api.js`:

```javascript
// Iniciar sesión
export const loginUsuario = async (credentials)

// Registrar nuevo usuario
export const registrarUsuario = async (userData)

// Obtener información de usuario
export const getUsuario = async (id)

// Actualizar información de usuario
export const updateUsuario = async (id, userData)
```

#### Componente Login

**Props:**
- `onLoginSuccess`: Función callback que se ejecuta cuando el login es exitoso

**Ejemplo de uso:**
```jsx
<Login onLoginSuccess={(usuario) => {
  console.log('Usuario autenticado:', usuario);
  // Hacer algo con el usuario
}} />
```

#### Estado de Autenticación en App.jsx

```javascript
const [usuario, setUsuario] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);

// Verificar sesión al cargar
useEffect(() => {
  const savedUser = localStorage.getItem('usuario');
  if (savedUser) {
    setUsuario(JSON.parse(savedUser));
    setIsAuthenticated(true);
  }
}, []);

// Login exitoso
const handleLoginSuccess = (userData) => {
  setUsuario(userData);
  setIsAuthenticated(true);
};

// Logout
const handleLogout = () => {
  setUsuario(null);
  setIsAuthenticated(false);
  localStorage.removeItem('usuario');
};
```

## 🔧 Configuración del Backend

### Endpoints Requeridos

El sistema de login utiliza los siguientes endpoints del backend:

#### 1. Login (GET /api/usuarios/)
```
GET http://localhost:8000/api/usuarios/
```
Actualmente se obtienen todos los usuarios y se filtra por correo/clave en el frontend.

**⚠️ Nota de Seguridad:** Se recomienda crear un endpoint dedicado para login:
```
POST /api/usuarios/login/
Body: { correo, clave }
Response: { id, nombre, apellido, correo, tema, ... }
```

#### 2. Registro (POST /api/usuarios/)
```
POST http://localhost:8000/api/usuarios/
Content-Type: application/json

Body:
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@ejemplo.com",
  "clave": "miPassword123",
  "tema": "light"
}

Response:
{
  "id": "68ea57f5fc52f3058c8233ab",
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@ejemplo.com",
  "clave": "miPassword123",
  "tema": "light"
}
```

### Modelo de Usuario en Backend

El modelo `Usuario` en MongoDB tiene los siguientes campos:

```python
class Usuario(Document):
    nombre = StringField(max_length=50)
    apellido = StringField(max_length=50)
    correo = EmailField(max_length=100, unique=True)
    clave = StringField(max_length=100)
    tema = StringField(max_length=20)
    rol = ReferenceField(Rol)
```

## 🔒 Seguridad

### ⚠️ Consideraciones Importantes

1. **Contraseñas en texto plano**: 
   - Actualmente las contraseñas se guardan en texto plano
   - **Se recomienda implementar hashing** (bcrypt, Argon2, PBKDF2)
   
2. **Sin tokens JWT**:
   - No hay sistema de tokens de autenticación
   - La sesión se maneja solo con localStorage
   - **Se recomienda implementar JWT** para producción

3. **CORS**:
   - Asegúrate de configurar CORS en Django para permitir peticiones desde el frontend

### 🔐 Recomendaciones de Seguridad para Producción

1. **Implementar hashing de contraseñas en el backend:**
```python
from werkzeug.security import generate_password_hash, check_password_hash

# Al crear usuario
usuario.clave = generate_password_hash(password)

# Al verificar login
check_password_hash(usuario.clave, password_ingresada)
```

2. **Implementar JWT para manejo de sesiones:**
```python
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
```

3. **Agregar validaciones adicionales:**
   - Rate limiting para intentos de login
   - Verificación de correo electrónico
   - Recuperación de contraseña
   - 2FA (autenticación de dos factores)

## 📱 Opciones de Login Social (Preparado)

La interfaz incluye botones para login con Google y Facebook (solo UI, pendiente implementación):

```jsx
<button type="button">
  <svg>Google Icon</svg>
  <span>Google</span>
</button>
<button type="button">
  <svg>Facebook Icon</svg>
  <span>Facebook</span>
</button>
```

Para implementar:
1. Instalar librerías: `react-google-login`, `react-facebook-login`
2. Configurar OAuth en Google Console / Facebook Developers
3. Agregar handlers para cada proveedor

## 🎨 Personalización

### Cambiar Colores del Tema

En `Login.jsx`, los colores principales están en:
```jsx
// Gradiente principal
bg-gradient-to-br from-purple-50 via-white to-indigo-50

// Botones primarios
bg-gradient-to-r from-purple-500 to-indigo-600

// Modo oscuro
dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
```

### Agregar Validaciones Personalizadas

En `Login.jsx`, función `validateForm()`:
```javascript
const validateForm = () => {
  const newErrors = {};
  
  // Agregar tus validaciones aquí
  if (condicion) {
    newErrors.campo = 'Mensaje de error';
  }
  
  return Object.keys(newErrors).length === 0;
};
```

## 🐛 Troubleshooting

### Error: "Credenciales inválidas"
- Verifica que el correo esté registrado
- Verifica que la contraseña sea correcta
- Revisa la consola del navegador para más detalles

### Error: "Error al crear la cuenta"
- El correo puede estar ya registrado
- Verifica que el backend esté corriendo en `http://localhost:8000`
- Revisa la consola del navegador y del servidor

### La sesión no persiste al recargar
- Verifica que `localStorage` esté habilitado en el navegador
- Revisa la consola para errores de parseo JSON
- Limpia el localStorage: `localStorage.clear()`

### Los hábitos no cargan después del login
- Verifica que el backend esté corriendo
- Revisa que el usuario tenga hábitos creados
- Verifica la consola del navegador para errores de API

## 📚 Recursos Adicionales

- [React Hooks Documentation](https://react.dev/reference/react)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [MongoEngine Documentation](http://mongoengine.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material Icons](https://fonts.google.com/icons)

## 🤝 Contribuir

Para mejorar el sistema de login:

1. Implementa hashing de contraseñas
2. Agrega JWT para sesiones seguras
3. Implementa verificación de correo
4. Agrega recuperación de contraseña
5. Implementa login social (Google, Facebook)
6. Agrega 2FA (Two-Factor Authentication)

---

**Versión:** 1.0  
**Última actualización:** Octubre 2025  
**Autor:** Equipo Rutinia
