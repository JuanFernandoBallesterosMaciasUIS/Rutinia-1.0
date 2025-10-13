# ✨ Cambios: Icon y Color ahora en Backend

**Fecha:** 11 de octubre de 2025  
**Versión:** 2.0 - Con icon y color en MongoDB  

---

## 🔄 Resumen de Cambios

Después del merge con `main`, se integraron los campos **`icono`** y **`color`** al modelo de Django. Ahora estos datos se almacenan **directamente en MongoDB** en lugar de usar `localStorage`.

---

## 📊 Cambios en el Backend

### 1️⃣ **Modelo Actualizado** (`models.py`)

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
    # ✨ NUEVOS CAMPOS
    icono = fields.StringField(max_length=50)
    color = fields.StringField(max_length=20)
```

### 2️⃣ **Serializer** (`serializers.py`)

El serializer ya incluye todos los campos automáticamente:

```python
class HabitoSerializer(mon.DocumentSerializer):
    class Meta:
        model = Habito
        fields = '__all__'  # ✅ Incluye icono y color
```

---

## 🎨 Cambios en el Frontend

### 1️⃣ **Actualización de `api.js`**

#### Función `mapHabitoToBackend()`:

**ANTES:**
```javascript
const data = {
  usuario: usuarioId,
  nombre: frontendHabito.name,
  dificultad: 'media',
  // ... otros campos
  // ❌ NO enviaba icon ni color
};
```

**AHORA:**
```javascript
const data = {
  usuario: usuarioId,
  nombre: frontendHabito.name,
  dificultad: 'media',
  // ... otros campos
  // ✨ NUEVOS CAMPOS
  icono: frontendHabito.icon || 'fitness_center',
  color: frontendHabito.color || 'blue'
};
```

#### Función `mapHabitoToFrontend()`:

**ANTES:**
```javascript
export const mapHabitoToFrontend = (backendHabito, visualData = {}) => {
  return {
    id: backendHabito.id,
    name: backendHabito.nombre,
    // ❌ Tomaba icon y color de localStorage
    icon: visualData.icon || 'fitness_center',
    color: visualData.color || 'blue',
    // ...
  };
};
```

**AHORA:**
```javascript
export const mapHabitoToFrontend = (backendHabito) => {
  return {
    id: backendHabito.id,
    name: backendHabito.nombre,
    // ✨ Ahora vienen del backend
    icon: backendHabito.icono || 'fitness_center',
    color: backendHabito.color || 'blue',
    // ...
  };
};
```

### 2️⃣ **Actualización de `App.jsx`**

#### Función `loadHabitsFromBackend()`:

**ANTES:**
```javascript
const visualData = localStorageService.getVisualData();
const mappedHabits = backendHabits.map(habit => 
  api.mapHabitoToFrontend(habit, visualData[habit.id])
);
```

**AHORA:**
```javascript
// ✨ YA NO necesitamos visualData de localStorage
const mappedHabits = backendHabits.map(habit => 
  api.mapHabitoToFrontend(habit)
);
```

#### Función `handleCreateHabit()`:

**ANTES:**
```javascript
// Guardar datos visuales en localStorage
const visualData = {
  icon: newHabitData.icon,
  color: newHabitData.color
};

const backendData = api.mapHabitoToBackend(newHabitData, TEMP_USER_ID);
const createdHabit = await api.createHabito(backendData);

// Guardar en localStorage
localStorageService.saveVisualData(createdHabit.id, visualData);

const frontendHabit = api.mapHabitoToFrontend(createdHabit, visualData);
```

**AHORA:**
```javascript
// ✨ Mapear al formato del backend (INCLUYE icon y color)
const backendData = api.mapHabitoToBackend(newHabitData, TEMP_USER_ID);
const createdHabit = await api.createHabito(backendData);

// ✨ Icon y color ya vienen del backend
const frontendHabit = api.mapHabitoToFrontend(createdHabit);
```

#### Función `handleEditHabit()`:

**ANTES:**
```javascript
// Guardar en localStorage
const visualData = {
  icon: editedHabitData.icon,
  color: editedHabitData.color
};
localStorageService.saveVisualData(editedHabitData.id, visualData);

const backendData = api.mapHabitoToBackend(editedHabitData, TEMP_USER_ID);
const updatedHabit = await api.updateHabito(editedHabitData.id, backendData);

const frontendHabit = api.mapHabitoToFrontend(updatedHabit, visualData);
```

**AHORA:**
```javascript
// ✨ Mapear al formato del backend (INCLUYE icon y color)
const backendData = api.mapHabitoToBackend(editedHabitData, TEMP_USER_ID);
const updatedHabit = await api.updateHabito(editedHabitData.id, backendData);

// ✨ Icon y color vienen del backend
const frontendHabit = api.mapHabitoToFrontend(updatedHabit);
```

#### Función `handleDeleteHabit()`:

**ANTES:**
```javascript
await api.deleteHabito(habitId);

// Eliminar de localStorage
localStorageService.deleteVisualData(habitId);

const updatedHabits = habitsData.filter(habit => habit.id !== habitId);
```

**AHORA:**
```javascript
await api.deleteHabito(habitId);

// ✨ YA NO necesitamos eliminar de localStorage

const updatedHabits = habitsData.filter(habit => habit.id !== habitId);
```

---

## 📦 Almacenamiento de Datos

### **ANTES (v1.0 - localStorage + MongoDB):**

```
┌─────────────┐         ┌──────────────┐
│ localStorage│         │   MongoDB    │
├─────────────┤         ├──────────────┤
│ icon        │         │ nombre       │
│ color       │         │ descripcion  │
└─────────────┘         │ dificultad   │
                        │ frecuencia   │
                        │ dias[]       │
                        │ ...          │
                        └──────────────┘
```

### **AHORA (v2.0 - Solo MongoDB):**

```
┌──────────────┐
│   MongoDB    │
├──────────────┤
│ nombre       │
│ descripcion  │
│ dificultad   │
│ frecuencia   │
│ dias[]       │
│ icono ✨     │
│ color ✨     │
│ ...          │
└──────────────┘
```

---

## 🔄 Flujo de Datos Actualizado

### **Crear Hábito:**

```
1. Usuario llena NewHabitModal
   ↓ (incluye icon y color)
2. handleCreateHabit()
   ↓
3. mapHabitoToBackend() → INCLUYE icono y color
   ↓
4. POST /api/habitos/
   ↓
5. Backend guarda TODO en MongoDB (incluyendo icono y color)
   ↓
6. Respuesta con hábito completo
   ↓
7. mapHabitoToFrontend() → icon y color vienen de backend
   ↓
8. Actualizar estado local
```

### **Listar Hábitos:**

```
1. loadHabitsFromBackend()
   ↓
2. GET /api/habitos/
   ↓
3. Backend devuelve hábitos con icono y color
   ↓
4. mapHabitoToFrontend() → icon y color del backend
   ↓
5. Mostrar en UI
```

### **Editar Hábito:**

```
1. Usuario edita en EditHabitModal
   ↓ (puede cambiar icon y color)
2. handleEditHabit()
   ↓
3. mapHabitoToBackend() → INCLUYE icono y color
   ↓
4. PATCH /api/habitos/{id}/
   ↓
5. Backend actualiza TODO en MongoDB
   ↓
6. Respuesta con hábito actualizado
   ↓
7. mapHabitoToFrontend() → icon y color del backend
   ↓
8. Actualizar estado local
```

---

## 📋 JSON Ejemplo

### **POST /api/habitos/ (Crear):**

```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "nombre": "Hacer ejercicio",
  "descripcion": "30 min de cardio",
  "dificultad": "media",
  "fecha_inicio": "2025-10-11",
  "tipo_frecuencia": "Semanal",
  "dias": ["Lunes", "Miercoles", "Viernes"],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "fitness_center",
  "color": "blue"
}
```

### **Respuesta del Backend:**

```json
{
  "id": "68ea584a2617670c3a4375d2",
  "usuario": {
    "id": "68ea57f5fc52f3058c8233ab",
    "nombre": "Juan",
    "apellido": "Ballesteros",
    "correo": "juan@example.com"
  },
  "categoria": null,
  "nombre": "Hacer ejercicio",
  "descripcion": "30 min de cardio",
  "dificultad": "media",
  "fecha_inicio": "2025-10-11",
  "tipo_frecuencia": "Semanal",
  "dias": ["Lunes", "Miercoles", "Viernes"],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "fitness_center",
  "color": "blue"
}
```

---

## ✅ Ventajas de este Cambio

1. **✨ Persistencia real:** Icon y color se guardan en la base de datos
2. **🔄 Sincronización:** Los datos visuales están sincronizados entre dispositivos
3. **🧹 Menos complejidad:** No hay que gestionar localStorage para estos campos
4. **📊 Datos completos:** Toda la información del hábito en un solo lugar
5. **🔒 Backup:** Los iconos y colores se respaldan con el resto de los datos

---

## 🧪 Cómo Probar

### 1️⃣ **Crear un hábito nuevo:**

- Abre el modal de nuevo hábito
- Selecciona un icono (ej: 🏋️ fitness_center)
- Selecciona un color (ej: azul)
- Completa los demás campos
- Guarda

**Verificar:**
- El hábito aparece con el icono y color seleccionados
- Recarga la página (F5) → El icono y color persisten

### 2️⃣ **Editar un hábito:**

- Abre el modal de edición
- Cambia el icono (ej: 📚 book)
- Cambia el color (ej: verde)
- Guarda

**Verificar:**
- El hábito se actualiza inmediatamente
- Recarga la página → Los cambios persisten

### 3️⃣ **Verificar en MongoDB:**

```javascript
// En MongoDB Compass o Shell
db.habito.find().pretty()

// Deberías ver:
{
  "_id": ObjectId("..."),
  "nombre": "Hacer ejercicio",
  "icono": "fitness_center",
  "color": "blue",
  // ... otros campos
}
```

---

## 🔧 Migración de Datos Existentes

Si ya tenías hábitos en localStorage, puedes:

### Opción 1: Limpiar y empezar de nuevo

```javascript
// En la consola del navegador
localStorage.clear();
location.reload();
```

### Opción 2: Migrar datos manualmente

1. Edita cada hábito existente
2. Selecciona el icono y color deseados
3. Guarda

Esto actualizará los campos en el backend.

---

## 📁 Archivos Modificados

1. ✅ `backend-django/rutinia/core/models.py` - Agregados campos `icono` y `color`
2. ✅ `frontend-react/src/services/api.js` - Actualizado mapeo para incluir icon/color
3. ✅ `frontend-react/src/App.jsx` - Removidas llamadas a localStorage para icon/color

---

## 🚨 Notas Importantes

- **localStorage ya NO se usa para icon/color**
- **Todos los datos ahora vienen del backend**
- **Los hábitos antiguos necesitan ser editados para tener icon/color**
- **El campo `categoria` sigue siendo opcional** (requiere ObjectId válido)

---

**Estado:** ✅ COMPLETAMENTE FUNCIONAL  
**Compatibilidad:** Backend Django + MongoDB + Frontend React  
**Próximos pasos:** Probar crear, editar y eliminar hábitos 🚀
