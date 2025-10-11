# 📝 Ejemplos Completos de JSON para Crear Hábitos

Este documento muestra ejemplos detallados de cómo se envían los datos al backend cuando se crea un hábito con **TODAS** las combinaciones posibles.

---

## 🎨 Valores Disponibles en el Frontend

### Iconos Disponibles (12 opciones):
```javascript
[
  'fitness_center',    // Pesas (ejercicio)
  'book',              // Libro (lectura)
  'local_drink',       // Vaso (agua/hidratación)
  'self_improvement',  // Meditación
  'restaurant',        // Restaurante (comida)
  'bedtime',           // Dormir
  'directions_run',    // Correr
  'laptop',            // Laptop (trabajo/estudio)
  'music_note',        // Música
  'brush',             // Pincel (arte)
  'pets',              // Mascota
  'favorite'           // Corazón (amor/relaciones)
]
```

### Colores Disponibles (8 opciones):
```javascript
[
  'indigo',   // Índigo
  'green',    // Verde
  'blue',     // Azul
  'purple',   // Morado
  'red',      // Rojo
  'yellow',   // Amarillo
  'pink',     // Rosa
  'orange'    // Naranja
]
```

### Frecuencias Disponibles (3 opciones):
```javascript
[
  'diario',    // Todos los días
  'semanal',   // Días específicos de la semana
  'mensual'    // Días específicos del mes
]
```

### Días de la Semana (para frecuencia semanal):
```javascript
[
  'Lunes',
  'Martes',
  'Miercoles',  // Sin tilde
  'Jueves',
  'Viernes',
  'Sabado',     // Sin tilde
  'Domingo'
]
```

---

## 📊 Estructura del JSON que se envía al Backend

### Esquema Actual (SIN icon y color):

```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Nombre del hábito",
  "descripcion": "Descripción del hábito",
  "dificultad": "media",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "diario|semanal|mensual",
  "dias": [],
  "publico": false,
  "activo": true,
  "notificaciones": []
}
```

### Esquema Propuesto (CON icon y color):

```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Nombre del hábito",
  "descripcion": "Descripción del hábito",
  "dificultad": "media",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "diario|semanal|mensual",
  "dias": [],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "fitness_center",
  "color": "blue"
}
```

---

## 🔥 Ejemplos Completos por Frecuencia

### 1️⃣ FRECUENCIA DIARIA

**Característica:** Se ejecuta TODOS los días, array `dias` está vacío.

#### Ejemplo 1: Beber agua 💧
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Beber 8 vasos de agua",
  "descripcion": "Mantener hidratación durante todo el día",
  "dificultad": "facil",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "diario",
  "dias": [],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "local_drink",
  "color": "blue"
}
```

#### Ejemplo 2: Meditar 🧘
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Meditar 10 minutos",
  "descripcion": "Meditación matutina para empezar el día",
  "dificultad": "media",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "diario",
  "dias": [],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "self_improvement",
  "color": "purple"
}
```

#### Ejemplo 3: Dormir bien 😴
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Dormir 8 horas",
  "descripcion": "Acostarse antes de las 11 PM",
  "dificultad": "media",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "diario",
  "dias": [],
  "publico": true,
  "activo": true,
  "notificaciones": [],
  "icono": "bedtime",
  "color": "indigo"
}
```

#### Ejemplo 4: Leer 📚
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Leer 30 minutos",
  "descripcion": "Leer antes de dormir",
  "dificultad": "facil",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "diario",
  "dias": [],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "book",
  "color": "green"
}
```

---

### 2️⃣ FRECUENCIA SEMANAL

**Característica:** Se ejecuta solo ciertos días de la semana, array `dias` contiene días específicos.

#### Ejemplo 1: Gym L-M-V 💪
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Ir al gimnasio",
  "descripcion": "Rutina de pesas y cardio",
  "dificultad": "dificil",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "semanal",
  "dias": ["Lunes", "Miercoles", "Viernes"],
  "publico": true,
  "activo": true,
  "notificaciones": [],
  "icono": "fitness_center",
  "color": "orange"
}
```

#### Ejemplo 2: Correr Martes y Jueves 🏃
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Salir a correr",
  "descripcion": "5km en el parque",
  "dificultad": "media",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "semanal",
  "dias": ["Martes", "Jueves"],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "directions_run",
  "color": "red"
}
```

#### Ejemplo 3: Clase de música Sábados 🎵
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Clase de guitarra",
  "descripcion": "Práctica de guitarra con profesor",
  "dificultad": "media",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "semanal",
  "dias": ["Sabado"],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "music_note",
  "color": "pink"
}
```

#### Ejemplo 4: Trabajar en proyecto Lun-Vie 💻
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Proyecto personal",
  "descripcion": "2 horas de programación",
  "dificultad": "media",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "semanal",
  "dias": ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
  "publico": true,
  "activo": true,
  "notificaciones": [],
  "icono": "laptop",
  "color": "blue"
}
```

#### Ejemplo 5: Cocinar saludable Dom 🍽️
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Meal prep dominical",
  "descripcion": "Preparar comidas de la semana",
  "dificultad": "media",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "semanal",
  "dias": ["Domingo"],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "restaurant",
  "color": "yellow"
}
```

---

### 3️⃣ FRECUENCIA MENSUAL

**Característica:** Se ejecuta ciertos días del mes, array `dias` contiene números (ej: ["1", "15", "30"]).

⚠️ **NOTA:** Actualmente el frontend **NO tiene implementada** la selección de días específicos del mes. Solo se usa para hábitos que ocurren "una vez al mes" sin días específicos.

#### Ejemplo 1: Revisión mensual 📋
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Revisión de objetivos",
  "descripcion": "Evaluar progreso mensual",
  "dificultad": "facil",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "mensual",
  "dias": [],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "book",
  "color": "indigo"
}
```

#### Ejemplo 2: Mantenimiento PC 🖥️
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Limpiar computadora",
  "descripcion": "Mantenimiento preventivo mensual",
  "dificultad": "facil",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "mensual",
  "dias": [],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "laptop",
  "color": "green"
}
```

---

## 🎨 Ejemplos de Cada Color con Diferentes Iconos

### Color INDIGO 💜
```json
{
  "nombre": "Hábito con color Indigo",
  "icono": "fitness_center",
  "color": "indigo",
  "tipo_frecuencia": "diario",
  "dias": []
}
```

### Color GREEN 💚
```json
{
  "nombre": "Hábito con color Verde",
  "icono": "book",
  "color": "green",
  "tipo_frecuencia": "diario",
  "dias": []
}
```

### Color BLUE 💙
```json
{
  "nombre": "Hábito con color Azul",
  "icono": "local_drink",
  "color": "blue",
  "tipo_frecuencia": "diario",
  "dias": []
}
```

### Color PURPLE 💜
```json
{
  "nombre": "Hábito con color Morado",
  "icono": "self_improvement",
  "color": "purple",
  "tipo_frecuencia": "diario",
  "dias": []
}
```

### Color RED ❤️
```json
{
  "nombre": "Hábito con color Rojo",
  "icono": "favorite",
  "color": "red",
  "tipo_frecuencia": "diario",
  "dias": []
}
```

### Color YELLOW 💛
```json
{
  "nombre": "Hábito con color Amarillo",
  "icono": "brush",
  "color": "yellow",
  "tipo_frecuencia": "diario",
  "dias": []
}
```

### Color PINK 💗
```json
{
  "nombre": "Hábito con color Rosa",
  "icono": "music_note",
  "color": "pink",
  "tipo_frecuencia": "diario",
  "dias": []
}
```

### Color ORANGE 🧡
```json
{
  "nombre": "Hábito con color Naranja",
  "icono": "directions_run",
  "color": "orange",
  "tipo_frecuencia": "diario",
  "dias": []
}
```

---

## 🔄 Ejemplo de Flujo Completo (Frontend → Backend)

### Paso 1: Usuario llena el formulario

```
Nombre: "Hacer ejercicio"
Descripción: "30 minutos de cardio y pesas"
Categoría: "Salud" (ID: 68e6b0bc62857e0d1e64c3ae)
Icono: 🏋️ fitness_center
Color: 🔵 blue
Frecuencia: Semanal
Días: ☑️ Lunes, ☑️ Miércoles, ☑️ Viernes
```

### Paso 2: Frontend construye objeto

```javascript
// Objeto en el frontend (App.jsx)
const habitoFrontend = {
  name: "Hacer ejercicio",
  description: "30 minutos de cardio y pesas",
  category: "68e6b0bc62857e0d1e64c3ae",
  icon: "fitness_center",
  color: "blue",
  frequency: "semanal",
  days: ["Lunes", "Miercoles", "Viernes"]
}
```

### Paso 3: Se mapea a formato backend (api.js)

```javascript
// Función mapHabitoToBackend() convierte a:
const habitoBackend = {
  usuario: "68ea57f5fc52f3058c8233ab",
  categoria: "68e6b0bc62857e0d1e64c3ae",
  nombre: "Hacer ejercicio",
  descripcion: "30 minutos de cardio y pesas",
  dificultad: "media",
  fecha_inicio: "2025-01-11",
  tipo_frecuencia: "semanal",
  dias: ["Lunes", "Miercoles", "Viernes"],
  publico: false,
  activo: true,
  notificaciones: [],
  // ✅ SI SE IMPLEMENTA OPCIÓN 1:
  icono: "fitness_center",
  color: "blue"
}
```

### Paso 4: Se envía al backend

```javascript
POST http://localhost:8000/api/habitos/
Content-Type: application/json

{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Hacer ejercicio",
  "descripcion": "30 minutos de cardio y pesas",
  "dificultad": "media",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "semanal",
  "dias": ["Lunes", "Miercoles", "Viernes"],
  "publico": false,
  "activo": true,
  "notificaciones": [],
  "icono": "fitness_center",
  "color": "blue"
}
```

### Paso 5: Backend guarda en MongoDB

```javascript
// Documento MongoDB
{
  _id: ObjectId("68ea584a2617670c3a4375d5"),
  usuario: ObjectId("68ea57f5fc52f3058c8233ab"),
  categoria: ObjectId("68e6b0bc62857e0d1e64c3ae"),
  nombre: "Hacer ejercicio",
  descripcion: "30 minutos de cardio y pesas",
  dificultad: "media",
  fecha_inicio: ISODate("2025-01-11T00:00:00Z"),
  tipo_frecuencia: "semanal",
  dias: ["Lunes", "Miercoles", "Viernes"],
  publico: false,
  activo: true,
  notificaciones: [],
  icono: "fitness_center",    // ✅ Guardado
  color: "blue"                // ✅ Guardado
}
```

---

## 📋 Tabla Resumen de Campos

| Campo | Tipo | ¿Obligatorio? | Valores | Ejemplo |
|-------|------|---------------|---------|---------|
| `usuario` | String (ObjectId) | ✅ Sí | ID de usuario | `"68ea57f5fc52f3058c8233ab"` |
| `categoria` | String (ObjectId) | ✅ Sí | ID de categoría | `"68e6b0bc62857e0d1e64c3ae"` |
| `nombre` | String | ✅ Sí | Max 50 caracteres | `"Hacer ejercicio"` |
| `descripcion` | String | ❌ No | Max 100 caracteres | `"30 min de cardio"` |
| `dificultad` | String | ✅ Sí | `facil`, `media`, `dificil` | `"media"` |
| `fecha_inicio` | String (YYYY-MM-DD) | ✅ Sí | Formato ISO | `"2025-01-11"` |
| `tipo_frecuencia` | String | ✅ Sí | `diario`, `semanal`, `mensual` | `"semanal"` |
| `dias` | Array[String] | ⚠️ Condicional | Días de semana | `["Lunes", "Viernes"]` |
| `publico` | Boolean | ✅ Sí | `true` o `false` | `false` |
| `activo` | Boolean | ✅ Sí | `true` o `false` | `true` |
| `notificaciones` | Array | ✅ Sí | Array de objetos | `[]` |
| `icono` | String | ❌ No | Nombre Material Icon | `"fitness_center"` |
| `color` | String | ❌ No | Color CSS | `"blue"` |

### Notas sobre campos:

- **`dias`**: 
  - Vacío `[]` para frecuencia `diario`
  - Con días `["Lunes", "Miercoles"]` para frecuencia `semanal`
  - Actualmente vacío `[]` para frecuencia `mensual` (no implementado selector de días del mes)

- **`icono` y `color`**: 
  - 🚫 Actualmente **NO existen** en el modelo Django
  - ✅ Se recomienda agregarlos (ver `ANALISIS_ATRIBUTOS_FALTANTES.md`)

---

## 🧪 Ejemplos para Testing

### Test 1: Hábito mínimo (solo campos obligatorios)
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Test mínimo",
  "descripcion": "",
  "dificultad": "media",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "diario",
  "dias": [],
  "publico": false,
  "activo": true,
  "notificaciones": []
}
```

### Test 2: Hábito completo (todos los campos)
```json
{
  "usuario": "68ea57f5fc52f3058c8233ab",
  "categoria": "68e6b0bc62857e0d1e64c3ae",
  "nombre": "Test completo con todos los campos",
  "descripcion": "Descripción detallada del hábito de prueba para validar todos los atributos",
  "dificultad": "dificil",
  "fecha_inicio": "2025-01-11",
  "tipo_frecuencia": "semanal",
  "dias": ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
  "publico": true,
  "activo": true,
  "notificaciones": [],
  "icono": "favorite",
  "color": "pink"
}
```

### Test 3: Todos los iconos
```json
[
  {"nombre": "Test Pesas", "icono": "fitness_center", "color": "indigo"},
  {"nombre": "Test Libro", "icono": "book", "color": "green"},
  {"nombre": "Test Agua", "icono": "local_drink", "color": "blue"},
  {"nombre": "Test Meditación", "icono": "self_improvement", "color": "purple"},
  {"nombre": "Test Comida", "icono": "restaurant", "color": "red"},
  {"nombre": "Test Dormir", "icono": "bedtime", "color": "yellow"},
  {"nombre": "Test Correr", "icono": "directions_run", "color": "orange"},
  {"nombre": "Test Laptop", "icono": "laptop", "color": "pink"},
  {"nombre": "Test Música", "icono": "music_note", "color": "indigo"},
  {"nombre": "Test Arte", "icono": "brush", "color": "green"},
  {"nombre": "Test Mascota", "icono": "pets", "color": "blue"},
  {"nombre": "Test Corazón", "icono": "favorite", "color": "red"}
]
```

---

**Fecha:** 11 de enero de 2025  
**Versión:** 1.0 (Django + React + MongoDB)  
**Autor:** Documentación técnica del proyecto Rutinia
