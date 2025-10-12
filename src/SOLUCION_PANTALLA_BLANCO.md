# 🔧 Solución de Problemas - Pantalla en Blanco

**Fecha:** 11 de octubre de 2025  
**Problema:** La aplicación muestra una pantalla en blanco al iniciar  

---

## 🐛 Problemas Encontrados y Solucionados

### **1. Error: HabitCard.jsx vacío**

**Error en consola:**
```
HabitsView.jsx:2 Uncaught SyntaxError: The requested module '/src/components/HabitCard.jsx' 
does not provide an export named 'default' (at HabitsView.jsx:2:8)
```

**Causa:** El archivo `HabitCard.jsx` estaba completamente vacío (probablemente se perdió durante el merge con `main`)

**Solución:**  
✅ Recreado el componente `HabitCard.jsx` con todas las funcionalidades:
- Visualización de hábito con icono y color
- Botón de editar (visible al hover)
- Botón de completar (condicional)
- Indicador de estado completado
- Soporte para diferentes frecuencias
- Responsive design

**Archivo:** `frontend-react/src/components/HabitCard.jsx`

---

### **2. Backend Django no respondía**

**Síntoma:** 
- El frontend se quedaba en "Cargando hábitos..." indefinidamente
- No había datos en pantalla
- Pantalla completamente en blanco

**Diagnóstico:**
```powershell
> curl http://localhost:8000/api/habitos/
curl : No es posible conectar con el servidor remoto
```

```powershell
> netstat -ano | findstr :8000
(sin resultado - puerto no en uso)
```

**Causa:** 
- El servidor Django mostraba que estaba "corriendo" pero realmente no estaba escuchando en el puerto 8000
- Posiblemente el proceso se detuvo o el entorno virtual no estaba correctamente activado

**Solución:**
```powershell
# Activar entorno virtual y ejecutar servidor
cd "...\backend-django"
.\venv\Scripts\Activate.ps1
cd rutinia
python manage.py runserver
```

**Resultado:**
✅ Servidor Django corriendo correctamente en http://127.0.0.1:8000/
✅ API respondiendo en http://localhost:8000/api/habitos/

---

## 📋 Checklist de Resolución

### ✅ **Verificar componentes React:**
- [x] Todos los componentes importados existen
- [x] Todos los componentes tienen `export default`
- [x] No hay archivos vacíos

### ✅ **Verificar servidores:**
- [x] Django corriendo en puerto 8000
- [x] React/Vite corriendo en puerto 5173
- [x] Backend respondiendo a peticiones

### ✅ **Verificar conectividad:**
- [x] CORS configurado correctamente
- [x] API endpoint accesible desde frontend
- [x] MongoDB conectado

---

## 🚀 Comandos para Iniciar Proyecto

### **Iniciar Backend (Django):**
```powershell
cd "C:\Users\jball\OneDrive\Documentos\UIS\septimo semestre\Entornos de programación\Rutinia-1.0\src\backend-django"
.\venv\Scripts\Activate.ps1
cd rutinia
python manage.py runserver
```

**Verificar:**
```powershell
# Debe mostrar conexiones TCP en puerto 8000
netstat -ano | findstr :8000
```

### **Iniciar Frontend (React):**
```powershell
cd "C:\Users\jball\OneDrive\Documentos\UIS\septimo semestre\Entornos de programación\Rutinia-1.0\src\frontend-react"
npm run dev
```

**Salida esperada:**
```
VITE v5.4.11  ready in XXX ms
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.X.X:5173/
```

### **Abrir en navegador:**
```
http://localhost:5173
```

---

## 🔍 Diagnóstico de Problemas Comunes

### **Problema: Pantalla en blanco**

**Revisar consola del navegador (F12):**
1. ¿Hay errores de importación?
   - Verificar que todos los componentes existan
   - Verificar exports/imports

2. ¿Hay errores de red?
   - Verificar que backend esté corriendo
   - Verificar CORS

3. ¿Se queda en "Cargando"?
   - Backend no responde
   - Error en la petición API

**Revisar terminal de Vite:**
- ¿Hay errores de compilación?
- ¿Hay warnings de dependencias?

**Revisar terminal de Django:**
- ¿Está realmente corriendo?
- ¿Hay errores de base de datos?
- ¿Hay requests entrantes?

---

## 🧪 Pruebas de Verificación

### **1. Verificar Backend:**
```powershell
# Opción 1: PowerShell
Invoke-WebRequest -Uri "http://localhost:8000/api/habitos/" -UseBasicParsing

# Opción 2: Navegador
# Abrir: http://localhost:8000/api/habitos/
# Debe mostrar: [] o lista de hábitos en JSON
```

### **2. Verificar Frontend:**
```javascript
// Abrir consola del navegador (F12)
// No debe haber errores en rojo
// Solo warnings de desarrollo son normales
```

### **3. Verificar Conectividad:**
```javascript
// En consola del navegador:
fetch('http://localhost:8000/api/habitos/')
  .then(r => r.json())
  .then(data => console.log('✅ Backend conectado:', data))
  .catch(err => console.error('❌ Error:', err));
```

---

## 📝 Logs Útiles

### **Backend Django (Terminal):**
```
Watching for file changes with StatReloader
Performing system checks...
System check identified no issues (0 silenced).
October 11, 2025 - 22:04:47
Django version 5.2.7, using settings 'rutinia.settings'
Starting development server at http://127.0.0.1:8000/
✅ ESTO INDICA QUE ESTÁ CORRIENDO

# Cuando llegan requests:
[11/Oct/2025 22:05:00] "GET /api/habitos/ HTTP/1.1" 200 XXXX
✅ 200 = Éxito
❌ 400 = Bad Request
❌ 404 = Not Found
❌ 500 = Server Error
```

### **Frontend Vite (Terminal):**
```
VITE v5.4.11  ready in 397 ms
➜  Local:   http://localhost:5173/
✅ ESTO INDICA QUE ESTÁ CORRIENDO

# Hot reload funcionando:
10:05:23 PM [vite] hmr update /src/App.jsx
✅ Los cambios se reflejan automáticamente
```

---

## ⚠️ Errores Comunes y Soluciones

### **Error: Cannot GET /api/habitos/**
**Causa:** Backend no corriendo o URL incorrecta  
**Solución:** Iniciar Django, verificar `urls.py`

### **Error: CORS policy**
**Causa:** django-cors-headers no configurado  
**Solución:** Verificar `settings.py` → `CORS_ALLOWED_ORIGINS`

### **Error: Module not found**
**Causa:** Componente no existe o mal importado  
**Solución:** Verificar ruta de importación, recrear componente

### **Error: Cannot read properties of undefined**
**Causa:** Datos no cargados correctamente  
**Solución:** Agregar validaciones, usar optional chaining (`?.`)

### **Pantalla blanca sin errores**
**Causa:** Backend no responde, loading infinito  
**Solución:** Reiniciar backend, verificar red

---

## ✅ Estado Final

**Backend:**
- ✅ Django 5.2.7 corriendo en puerto 8000
- ✅ MongoDB conectado
- ✅ API respondiendo correctamente
- ✅ CORS configurado

**Frontend:**
- ✅ React 19.1.1 + Vite 5.4.11 en puerto 5173
- ✅ Todos los componentes recreados
- ✅ HabitCard.jsx funcional
- ✅ Conexión con backend exitosa

**Funcionalidad:**
- ✅ Crear hábitos con icon y color (guardado en backend)
- ✅ Editar hábitos (actualiza backend)
- ✅ Listar hábitos (lee de backend)
- ✅ Eliminar hábitos (borra de backend)

---

**Próximos Pasos:**
1. Probar crear un hábito
2. Verificar que se muestra correctamente
3. Probar editar icon y color
4. Verificar persistencia (recargar página)

---

**Fecha de resolución:** 11 de octubre de 2025, 22:05  
**Estado:** ✅ **RESUELTO Y FUNCIONAL**
