# 🔍 Análisis de Atributos Faltantes en el Backend

## 📊 Resumen Ejecutivo

**Problema:** El modelo `Habito` en el backend de Django **NO incluye** los campos visuales `color` e `icon` que se usan en el frontend.

**Impacto:** Estos datos se pierden al crear/editar hábitos y solo se preservan localmente en el navegador mediante `localStorage`.

---

## 🎨 Atributos del Frontend (React)

### Datos que el usuario ingresa/selecciona:

```javascript
{
  id: "68ea584a2617670c3a4375d2",
  name: "Hacer ejercicio",           // ✅ Se guarda en backend (nombre)
  category: "Salud",                  // ✅ Se guarda en backend (categoria)
  description: "30 min de cardio",    // ✅ Se guarda en backend (descripcion)
  frequency: "semanal",               // ✅ Se guarda en backend (tipo_frecuencia)
  days: ["Lunes", "Miércoles"],       // ✅ Se guarda en backend (dias)
  
  // ❌ ESTOS NO SE GUARDAN EN EL BACKEND:
  icon: "fitness_center",             // ❌ Solo en localStorage
  color: "blue"                       // ❌ Solo en localStorage
}
```

---

## 🗄️ Modelo Actual del Backend (Django + MongoDB)

```python
class Habito(Document):
    usuario = fields.ReferenceField(Usuario)
    categoria = fields.ReferenceField(Categoria)
    nombre = fields.StringField(max_length=50)
    descripcion = fields.StringField(max_length=100)
    dificultad = fields.StringField(max_length=50)
    fecha_inicio = fields.DateField()
    tipo_frecuencia = fields.StringField(max_length=50)
    dias = fields.ListField(fields.StringField(), required=False)
    publico = fields.BooleanField(default=False)
    activo = fields.BooleanField(default=True)
    notificaciones = fields.EmbeddedDocumentListField(Notificacion)
    
    # ❌ FALTAN ESTOS CAMPOS:
    # icono = fields.StringField(max_length=50)  # Material Icon name
    # color = fields.StringField(max_length=20)  # Color CSS
```

---

## ⚠️ Consecuencias de NO tener estos campos en el backend

### 1. **Pérdida de datos entre dispositivos**
- Si el usuario accede desde otro navegador → pierde iconos y colores
- Si limpia localStorage → pierde iconos y colores
- Si usa modo incógnito → no se guardan iconos y colores

### 2. **Datos inconsistentes**
```javascript
// Navegador A (localStorage)
{
  id: "123",
  icon: "fitness_center",
  color: "blue"
}

// Navegador B (NO tiene localStorage)
{
  id: "123",
  icon: "fitness_center",  // ❌ Valor por defecto
  color: "blue"             // ❌ Valor por defecto
}
```

### 3. **Dificultad para compartir hábitos**
Si en el futuro se implementa compartir hábitos entre usuarios, los iconos/colores no se comparten.

---

## ✅ Solución Recomendada

### Opción 1: Agregar campos al modelo (RECOMENDADO)

**Modificar:** `backend-django/rutinia/core/models.py`

```python
class Habito(Document):
    usuario = fields.ReferenceField(Usuario)
    categoria = fields.ReferenceField(Categoria)
    nombre = fields.StringField(max_length=50)
    descripcion = fields.StringField(max_length=100)
    dificultad = fields.StringField(max_length=50)
    fecha_inicio = fields.DateField()
    tipo_frecuencia = fields.StringField(max_length=50)
    dias = fields.ListField(fields.StringField(), required=False)
    publico = fields.BooleanField(default=False)
    activo = fields.BooleanField(default=True)
    notificaciones = fields.EmbeddedDocumentListField(Notificacion)
    
    # ✅ NUEVOS CAMPOS VISUALES
    icono = fields.StringField(max_length=50, default='fitness_center')
    color = fields.StringField(max_length=20, default='blue')
```

**Modificar:** `frontend-react/src/services/api.js`

```javascript
export const mapHabitoToBackend = (frontendHabito, usuarioId) => {
  return {
    usuario: usuarioId,
    categoria: frontendHabito.category || null,
    nombre: frontendHabito.name,
    descripcion: frontendHabito.description || '',
    dificultad: 'media',
    fecha_inicio: new Date().toISOString().split('T')[0],
    tipo_frecuencia: frontendHabito.frequency,
    dias: frontendHabito.frequency === 'semanal' ? frontendHabito.days : [],
    publico: false,
    activo: true,
    notificaciones: [],
    
    // ✅ AGREGAR ESTOS CAMPOS
    icono: frontendHabito.icon || 'fitness_center',
    color: frontendHabito.color || 'blue'
  };
};

export const mapHabitoToFrontend = (backendHabito, visualData = {}) => {
  return {
    id: backendHabito.id,
    name: backendHabito.nombre,
    category: backendHabito.categoria?.nombre || backendHabito.categoria || '',
    
    // ✅ PRIORIZAR DATOS DEL BACKEND SOBRE LOCALSTORAGE
    icon: backendHabito.icono || visualData.icon || 'fitness_center',
    color: backendHabito.color || visualData.color || 'blue',
    
    description: backendHabito.descripcion || '',
    frequency: backendHabito.tipo_frecuencia,
    days: backendHabito.dias || [],
    dificultad: backendHabito.dificultad,
    fecha_inicio: backendHabito.fecha_inicio,
    publico: backendHabito.publico,
    activo: backendHabito.activo
  };
};
```

**Ventajas:**
- ✅ Persistencia completa de datos
- ✅ Sincronización entre dispositivos
- ✅ Datos consistentes
- ✅ Permite compartir hábitos con apariencia visual

**Desventajas:**
- ⚠️ Requiere migración de datos existentes
- ⚠️ Necesita actualizar serializers

---

### Opción 2: Mantener en localStorage (ACTUAL)

**NO hacer cambios**, dejar como está.

**Ventajas:**
- ✅ Menos tráfico de red
- ✅ Personalización local por dispositivo
- ✅ No requiere cambios en backend

**Desventajas:**
- ❌ Pérdida de datos al cambiar de dispositivo
- ❌ Datos no sincronizados
- ❌ No se pueden compartir preferencias visuales

---

## 📋 Comparación de Campos

| Campo Frontend | Campo Backend | ¿Se Guarda? | Almacenamiento |
|----------------|---------------|-------------|----------------|
| `name` | `nombre` | ✅ Sí | MongoDB |
| `category` | `categoria` | ✅ Sí | MongoDB |
| `description` | `descripcion` | ✅ Sí | MongoDB |
| `frequency` | `tipo_frecuencia` | ✅ Sí | MongoDB |
| `days` | `dias` | ✅ Sí | MongoDB |
| `icon` | ❌ **NO EXISTE** | ❌ No | localStorage |
| `color` | ❌ **NO EXISTE** | ❌ No | localStorage |
| - | `dificultad` | ✅ Sí | MongoDB |
| - | `fecha_inicio` | ✅ Sí | MongoDB |
| - | `publico` | ✅ Sí | MongoDB |
| - | `activo` | ✅ Sí | MongoDB |
| - | `notificaciones` | ✅ Sí | MongoDB |

---

## 🎯 Recomendación Final

**Implementar Opción 1** (agregar campos al modelo) porque:

1. **Mejor experiencia de usuario:** Iconos/colores persisten en todos los dispositivos
2. **Datos completos:** Todo en un solo lugar (MongoDB)
3. **Escalabilidad:** Facilita futuras funciones (compartir, importar/exportar)
4. **Consistencia:** No depender de localStorage que puede borrarse

---

## 📝 Archivos que se deben modificar

Si decides implementar la **Opción 1**:

1. ✏️ `backend-django/rutinia/core/models.py` - Agregar campos `icono` y `color`
2. ✏️ `backend-django/rutinia/core/serializers.py` - Incluir nuevos campos en serializer
3. ✏️ `frontend-react/src/services/api.js` - Actualizar mapeo de datos
4. ✏️ `frontend-react/src/App.jsx` - Eliminar dependencia exclusiva de localStorage
5. 🔄 Migrar datos existentes (opcional, si ya hay hábitos creados)

---

## 🚀 Pasos de Implementación

### Paso 1: Actualizar Modelo
```python
# backend-django/rutinia/core/models.py
icono = fields.StringField(max_length=50, default='fitness_center')
color = fields.StringField(max_length=20, default='blue')
```

### Paso 2: Actualizar Serializer
```python
# backend-django/rutinia/core/serializers.py
class HabitoSerializer(DocumentSerializer):
    class Meta:
        model = Habito
        fields = '__all__'  # O especificar incluyendo 'icono' y 'color'
```

### Paso 3: Actualizar Frontend
- Modificar `mapHabitoToBackend()` para enviar icon/color
- Modificar `mapHabitoToFrontend()` para recibir icon/color del backend
- (Opcional) Mantener localStorage como fallback

### Paso 4: Probar
```bash
# Crear hábito con icono y color
# Verificar que se guarden en MongoDB
# Limpiar localStorage y recargar
# Verificar que icon/color persistan
```

---

**Fecha:** 11 de enero de 2025  
**Autor:** Análisis técnico del proyecto Rutinia
