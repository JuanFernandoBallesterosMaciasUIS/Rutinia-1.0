# ✏️ Funcionalidad de Edición de Hábitos

## 📋 Estado Actual

✅ **La funcionalidad de edición ya está COMPLETAMENTE IMPLEMENTADA y funcionando**

---

## 🔄 Flujo Completo de Edición

### 1️⃣ **Abrir Modal de Edición**

**Usuario hace clic en el icono de editar** (lápiz) en una tarjeta de hábito:

```jsx
// HabitCard.jsx
<button onClick={handleEdit}>
  <span className="material-icons">edit</span>
</button>
```

**Se ejecuta:**
```javascript
// App.jsx
const openEditModal = (habit) => {
  setCurrentEditHabit(habit);  // Guarda el hábito actual
  setShowEditHabitModal(true); // Abre el modal
};
```

---

### 2️⃣ **Modal Pre-llenado con Datos**

El modal `EditHabitModal` se abre con los datos actuales del hábito:

```jsx
// EditHabitModal.jsx - useEffect
useEffect(() => {
  if (isOpen && habitData) {
    setFormData({
      id: habitData.id,
      name: habitData.name,
      category: habitData.category,
      icon: habitData.icon,           // ⬅️ Del localStorage
      color: habitData.color,          // ⬅️ Del localStorage
      description: habitData.description,
      frequency: habitData.frequency,
      days: habitData.days
    });
    setSelectedIcon(habitData.icon);
    setSelectedColor(habitData.color);
    setSelectedDays(habitData.days || []);
  }
}, [isOpen, habitData]);
```

**El usuario puede modificar:**
- ✏️ Nombre
- ✏️ Categoría
- 🎨 Icono (visual - localStorage)
- 🎨 Color (visual - localStorage)
- 📝 Descripción
- 📅 Frecuencia (Diaria/Semanal/Mensual)
- 📆 Días (si es semanal)

---

### 3️⃣ **Guardar Cambios**

Cuando el usuario hace clic en **"Guardar"**:

```javascript
// App.jsx - handleEditHabit()
const handleEditHabit = async (editedHabitData) => {
  try {
    // 1. Guardar datos visuales en localStorage
    const visualData = {
      icon: editedHabitData.icon,
      color: editedHabitData.color
    };
    localStorageService.saveVisualData(editedHabitData.id, visualData);
    
    // 2. Mapear al formato del backend
    const backendData = api.mapHabitoToBackend(editedHabitData, TEMP_USER_ID);
    
    // 3. Actualizar en el backend
    const updatedHabit = await api.updateHabito(editedHabitData.id, backendData);
    
    // 4. Mapear respuesta del backend
    const frontendHabit = api.mapHabitoToFrontend(updatedHabit, visualData);
    
    // 5. Actualizar estado local
    const updatedHabits = habitsData.map(habit =>
      habit.id === editedHabitData.id ? frontendHabit : habit
    );
    setHabitsData(updatedHabits);
    
    // 6. Cerrar modal y mostrar mensaje
    setShowEditHabitModal(false);
    setCurrentEditHabit(null);
    showSuccessMessage('¡Hábito actualizado exitosamente!');
  } catch (error) {
    console.error('Error al actualizar hábito:', error);
    showErrorMessage('Error al actualizar el hábito. Intenta de nuevo.');
  }
};
```

---

## 📊 Datos que se Envían al Backend

### JSON Ejemplo (Frecuencia Diaria):

```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "nombre": "Hacer ejercicio actualizado",
  "dificultad": "media",
  "fecha_inicio": "2025-10-11",
  "tipo_frecuencia": "Diaria",
  "dias": [],
  "publico": false,
  "activo": true,
  "notificaciones": []
}
```

### JSON Ejemplo (Frecuencia Semanal):

```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "nombre": "Ir al gimnasio",
  "descripcion": "Rutina de pesas completa",
  "dificultad": "media",
  "fecha_inicio": "2025-10-11",
  "tipo_frecuencia": "Semanal",
  "dias": ["Lunes", "Miercoles", "Viernes"],
  "publico": false,
  "activo": true,
  "notificaciones": []
}
```

**Nota:** `icon` y `color` NO se envían al backend, solo se guardan en localStorage.

---

## 🔧 Petición HTTP

```javascript
// api.js - updateHabito()
PATCH http://localhost:8000/api/habitos/{habitId}/
Content-Type: application/json

{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "nombre": "Hábito actualizado",
  ...
}
```

**Método:** `PATCH` (actualización parcial)  
**Endpoint:** `/api/habitos/{id}/`  
**Headers:** `Content-Type: application/json`

---

## 🎨 Almacenamiento de Datos Visuales

### localStorage (Icon + Color):

```javascript
// localStorage.js
{
  "habitVisualData": {
    "68ea584a2617670c3a4375d2": {
      "icon": "fitness_center",
      "color": "blue"
    },
    "68ea584a2617670c3a4375d3": {
      "icon": "book",
      "color": "green"
    }
  }
}
```

### MongoDB (Resto de datos):

```javascript
{
  _id: ObjectId("68ea584a2617670c3a4375d2"),
  usuario: ObjectId("68ea57f5fc52f3058c8233ab"),
  nombre: "Hacer ejercicio",
  descripcion: "30 min de cardio",
  dificultad: "media",
  fecha_inicio: ISODate("2025-10-11"),
  tipo_frecuencia: "Semanal",
  dias: ["Lunes", "Miercoles", "Viernes"],
  publico: false,
  activo: true,
  notificaciones: []
  // ❌ NO tiene icon ni color
}
```

---

## 🧪 Cómo Probar la Edición

### Paso 1: Abrir la aplicación
```
http://localhost:5173
```

### Paso 2: Localizar un hábito
- Ve a la sección "Hábitos del día" o "Mis Hábitos"
- Encuentra cualquier tarjeta de hábito

### Paso 3: Hacer clic en editar
- Haz clic en el icono de lápiz (✏️) en la esquina superior derecha de la tarjeta
- Se abrirá el modal de edición con los datos actuales

### Paso 4: Modificar datos
- Cambia el nombre: `"Nuevo nombre del hábito"`
- Cambia el icono: Selecciona otro (ej: 📚 book)
- Cambia el color: Selecciona otro (ej: verde)
- Cambia la frecuencia: De "Diaria" a "Semanal"
- Selecciona días: Lunes, Miércoles, Viernes

### Paso 5: Guardar
- Haz clic en **"Guardar"**
- Deberías ver: "¡Hábito actualizado exitosamente!"

### Paso 6: Verificar
1. **Frontend:** El hábito se actualiza inmediatamente en la UI
2. **Backend:** Recarga la página (F5) - los cambios persisten
3. **localStorage:** El icono y color se mantienen

---

## 📝 Logs de Debug

Con los logs implementados, verás en la consola:

```
📝 Actualizando hábito: 68ea584a2617670c3a4375d2
📤 Datos a enviar: {
  "usuario": "68ea57f5fc52f3058c8233ab",
  "nombre": "Hacer ejercicio actualizado",
  "dificultad": "media",
  "fecha_inicio": "2025-10-11",
  "tipo_frecuencia": "Semanal",
  "dias": ["Lunes", "Miercoles", "Viernes"],
  "publico": false,
  "activo": true,
  "notificaciones": []
}
```

Si hay un error:
```
❌ Error al actualizar: {descripcion: Array(1), categoria: Array(1)}
```

---

## 🚨 Validaciones Implementadas

### En el Modal:

```javascript
// EditHabitModal.jsx - handleSubmit()
if (!formData.icon) {
  alert('Por favor selecciona un icono');
  return;
}

if (!formData.color) {
  alert('Por favor selecciona un color');
  return;
}

if (formData.frequency === 'semanal' && selectedDays.length === 0) {
  alert('Por favor selecciona al menos un día de la semana');
  return;
}
```

### En el Mapeo:

```javascript
// api.js - mapHabitoToBackend()
// Solo agregar descripción si no está vacía
if (frontendHabito.description && frontendHabito.description.trim() !== '') {
  data.descripcion = frontendHabito.description;
}

// Solo agregar categoría si existe Y es un ObjectId válido
if (frontendHabito.category && frontendHabito.category.length === 24) {
  data.categoria = frontendHabito.category;
}
```

---

## ✅ Características Implementadas

- [x] Modal de edición pre-llenado con datos actuales
- [x] Actualización de nombre
- [x] Actualización de categoría
- [x] Actualización de icono (localStorage)
- [x] Actualización de color (localStorage)
- [x] Actualización de descripción
- [x] Actualización de frecuencia
- [x] Actualización de días (semanal)
- [x] Conexión con backend (PATCH)
- [x] Sincronización con localStorage
- [x] Actualización inmediata de UI
- [x] Mensajes de éxito/error
- [x] Validaciones de campos
- [x] Logs de debug
- [x] Manejo de errores

---

## 🔄 Comparación: Crear vs Editar

| Acción | Crear Hábito | Editar Hábito |
|--------|--------------|---------------|
| **Modal** | `NewHabitModal` | `EditHabitModal` |
| **Método HTTP** | `POST` | `PATCH` |
| **Endpoint** | `/api/habitos/` | `/api/habitos/{id}/` |
| **Datos iniciales** | Vacíos | Pre-llenados |
| **ID del hábito** | Generado por backend | Existente |
| **localStorage** | Crea nueva entrada | Actualiza entrada |

---

## 🎯 Ejemplo Completo de Uso

### Escenario: Cambiar hábito de diario a semanal

**Estado Inicial:**
```javascript
{
  id: "68ea584a2617670c3a4375d2",
  name: "Meditar",
  frequency: "diario",
  days: [],
  icon: "self_improvement",
  color: "purple"
}
```

**Usuario edita:**
1. Abre modal de edición
2. Cambia frecuencia a "Semanal"
3. Selecciona días: Lunes, Miércoles, Viernes
4. Cambia icono a "book"
5. Guarda

**Estado Final:**
```javascript
{
  id: "68ea584a2617670c3a4375d2",
  name: "Meditar",
  frequency: "semanal",
  days: ["Lunes", "Miercoles", "Viernes"],
  icon: "book",
  color: "purple"
}
```

**Backend recibe:**
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "nombre": "Meditar",
  "tipo_frecuencia": "Semanal",
  "dias": ["Lunes", "Miercoles", "Viernes"],
  ...
}
```

**localStorage actualiza:**
```json
{
  "68ea584a2617670c3a4375d2": {
    "icon": "book",
    "color": "purple"
  }
}
```

---

## 📁 Archivos Involucrados

1. **`EditHabitModal.jsx`** - Componente del modal de edición
2. **`App.jsx`** - Lógica de `handleEditHabit()` y `openEditModal()`
3. **`api.js`** - Función `updateHabito()` y `mapHabitoToBackend()`
4. **`localStorage.js`** - Funciones `saveVisualData()`
5. **`HabitCard.jsx`** - Botón de editar
6. **`HabitsView.jsx`** - Pasa `onEditHabit` a las tarjetas

---

**Fecha:** 11 de octubre de 2025  
**Estado:** ✅ COMPLETAMENTE FUNCIONAL  
**Versión:** 1.0 - Django + React + MongoDB
