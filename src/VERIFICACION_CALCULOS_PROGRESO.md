# 🔍 Verificación de Cálculos de Progreso

**Fecha de Revisión:** 12 de octubre de 2025  
**Objetivo:** Validar que los cálculos de progreso sean correctos en backend y frontend

---

## 📊 Análisis del Backend (Django)

### **Endpoint: `progreso_semanal`**

**Ubicación:** `src/backend-django/rutinia/core/views.py` (líneas 134-166)

**Lógica de Cálculo:**

```python
# Rango: Lunes a Domingo de la semana actual
inicio_semana = hoy - timedelta(days=hoy.weekday())  # lunes
fin_semana = inicio_semana + timedelta(days=6)        # domingo

# Total esperado según frecuencia:
if habito.tipo_frecuencia == "Diaria":
    total = 7  # 7 días de la semana

elif habito.tipo_frecuencia == "Semanal":
    total = len(habito.dias)  # Número de días específicos
    
else:
    total = 0  # No implementado para mensual
```

**Fórmula de Progreso:**
```python
completados = registros.filter(estado=True).count()
progreso = (completados / total * 100) if total > 0 else 0
```

---

### **Endpoint: `progreso_mensual`**

**Ubicación:** `src/backend-django/rutinia/core/views.py` (líneas 168-201)

**Lógica de Cálculo:**

```python
# Rango: Primer y último día del mes actual
inicio_mes = hoy.replace(day=1)
_, ultimo_dia = calendar.monthrange(hoy.year, hoy.month)
fin_mes = hoy.replace(day=ultimo_dia)

# Total esperado según frecuencia:
if habito.tipo_frecuencia == "Diaria":
    total = ultimo_dia  # Total de días del mes (28, 29, 30 o 31)

elif habito.tipo_frecuencia == "Semanal":
    semanas_mes = calendar.monthcalendar(hoy.year, hoy.month)
    total = len(habito.dias) * len(semanas_mes)  # Días específicos × semanas
    
else:
    total = 0  # No implementado
```

**Fórmula de Progreso:**
```python
completados = registros.filter(estado=True).count()
progreso = (completados / total * 100) if total > 0 else 0
```

---

## ✅ Análisis del Frontend (React)

### **Componente: `ProgressCard`**

**Ubicación:** `src/frontend-react/src/components/ProgressCard.jsx`

**Lógica de Visualización:**

```javascript
// Se obtienen los datos del backend
const [semanal, mensual] = await Promise.all([
  getProgresoSemanal(habito.id),
  getProgresoMensual(habito.id)
]);

// Se extrae el porcentaje calculado por el backend
const progresoPorcentaje = vistaActual === 'semanal' 
  ? progresoActual.progreso_semanal    // Ya viene calculado
  : progresoActual.progreso_mensual;   // Ya viene calculado

// NO se recalcula, solo se muestra
```

**⚠️ PROBLEMA DETECTADO:**

En la línea 73-75 del `ProgressCard.jsx`:

```javascript
const total = vistaActual === 'semanal' 
  ? 7 // ❌ ASUME siempre 7 días (incorrecto para hábitos semanales)
  : progresoActual.registros_totales;
```

**Esto es incorrecto porque:**
- Si el hábito es **Semanal** con días específicos (ej: Lunes, Miércoles, Viernes), el total debería ser **3**, no **7**
- El backend calcula correctamente usando `len(habito.dias)`, pero el frontend asume 7

---

### **Componente: `ProgressDashboard`**

**Ubicación:** `src/frontend-react/src/components/ProgressDashboard.jsx`

**Lógica de Estadísticas:**

```javascript
const getProgresoPromedio = () => {
  const suma = progresos.reduce((acc, p) => {
    if (p.semanal && p.semanal.progreso_semanal !== undefined) {
      return acc + p.semanal.progreso_semanal;
    }
    return acc;
  }, 0);
  
  return Math.round(suma / progresos.length);
};
```

**✅ CORRECTO:** Usa los porcentajes ya calculados por el backend

---

## 🧪 Casos de Prueba

### **Caso 1: Hábito Diario**

**Configuración:**
- `tipo_frecuencia`: "Diaria"
- `dias`: [] (no aplica)

**Semana Actual:**
- **Total esperado:** 7 días (Lunes a Domingo)
- **Registros completados:** 5
- **Progreso esperado:** `(5 / 7) * 100 = 71.43%`

**Backend:**
```python
total = 7  # ✅ Correcto
completados = 5
progreso = (5 / 7 * 100) = 71.43%  # ✅ Correcto
```

**Frontend:**
```javascript
total = 7  // ✅ Correcto para este caso
progresoPorcentaje = 71.43  // ✅ Correcto (viene del backend)
```

**✅ RESULTADO:** **CORRECTO**

---

### **Caso 2: Hábito Semanal (Días específicos)**

**Configuración:**
- `tipo_frecuencia`: "Semanal"
- `dias`: ["Lunes", "Miércoles", "Viernes"] (3 días)

**Semana Actual:**
- **Total esperado:** 3 días
- **Registros completados:** 2
- **Progreso esperado:** `(2 / 3) * 100 = 66.67%`

**Backend:**
```python
total = len(habito.dias) = 3  # ✅ Correcto
completados = 2
progreso = (2 / 3 * 100) = 66.67%  # ✅ Correcto
```

**Frontend (ProgressCard):**
```javascript
// Recibe del backend:
progresoPorcentaje = 66.67  // ✅ Correcto

// Pero calcula el total localmente:
total = 7  // ❌ INCORRECTO (debería ser 3)

// Muestra: "2 de 7 completados" ❌ INCORRECTO
// Debería mostrar: "2 de 3 completados"
```

**❌ RESULTADO:** **INCORRECTO EN FRONTEND** - El porcentaje es correcto, pero el texto "X de Y" es engañoso

---

### **Caso 3: Hábito Semanal Mensual**

**Configuración:**
- `tipo_frecuencia`: "Semanal"
- `dias`: ["Lunes", "Miércoles"] (2 días)
- **Mes:** Octubre 2025 (5 semanas según `calendar.monthcalendar`)

**Mes Actual:**
- **Total esperado:** `2 días × 5 semanas = 10 registros`
- **Registros completados:** 7
- **Progreso esperado:** `(7 / 10) * 100 = 70%`

**Backend:**
```python
semanas_mes = calendar.monthcalendar(2025, 10)  # 5 semanas
total = len(habito.dias) * len(semanas_mes) = 2 * 5 = 10  # ✅ Correcto
completados = 7
progreso = (7 / 10 * 100) = 70%  # ✅ Correcto
```

**Frontend (ProgressCard):**
```javascript
// Recibe del backend:
progresoPorcentaje = 70  // ✅ Correcto
total = progresoActual.registros_totales = 10  // ✅ Correcto

// Muestra: "7 de 10 completados" ✅ CORRECTO
```

**✅ RESULTADO:** **CORRECTO**

---

## 🚨 PROBLEMAS IDENTIFICADOS

### **❌ Problema 1: Cálculo incorrecto del total semanal en Frontend**

**Ubicación:** `ProgressCard.jsx` líneas 73-75

**Código Actual:**
```javascript
const total = vistaActual === 'semanal' 
  ? 7 // ❌ Siempre asume 7 días
  : progresoActual.registros_totales;
```

**Por qué es incorrecto:**
- Para hábitos **Diarios**: ✅ Es correcto (7 días)
- Para hábitos **Semanales** con días específicos: ❌ Es incorrecto
  - Ejemplo: Si el hábito es solo Lunes y Viernes → total debería ser 2, no 7

**Impacto:**
- El **porcentaje** se muestra correctamente (viene del backend)
- El **texto "X de Y completados"** es engañoso
- El **usuario ve información incorrecta** sobre cuántos días debería completar

---

### **⚠️ Problema 2: Backend no devuelve el total semanal**

**Ubicación:** `views.py` línea 158

**Código Actual:**
```python
return Response({
    "habito_id": str(habito.id),
    "habito": habito.nombre,
    "inicio_semana": inicio_semana,
    "fin_semana": fin_semana,
    "progreso_semanal": round(progreso, 2),
    "completados": completados
    # ❌ Falta: "total": total
})
```

**Por qué es problema:**
- El frontend no sabe cuál es el total esperado para la semana
- Tiene que **asumir** que siempre son 7 días
- No puede mostrar correctamente "X de Y" para hábitos semanales

---

## ✅ SOLUCIONES PROPUESTAS

### **Solución 1: Agregar campo `total` en respuesta del backend**

**Modificar:** `views.py` endpoint `progreso_semanal`

```python
return Response({
    "habito_id": str(habito.id),
    "habito": habito.nombre,
    "inicio_semana": inicio_semana,
    "fin_semana": fin_semana,
    "progreso_semanal": round(progreso, 2),
    "completados": completados,
    "total": total  # ✅ AGREGAR ESTE CAMPO
})
```

**Beneficios:**
- El frontend recibe el valor correcto
- No necesita hacer suposiciones
- Consistencia entre backend y frontend

---

### **Solución 2: Actualizar frontend para usar el campo `total`**

**Modificar:** `ProgressCard.jsx` líneas 73-75

```javascript
const total = vistaActual === 'semanal' 
  ? progresoActual.total || 7  // ✅ Usar el total del backend, default 7
  : progresoActual.registros_totales;
```

**Beneficios:**
- Muestra correctamente "X de Y completados"
- Compatible con todos los tipos de hábitos
- Fallback a 7 si el backend no envía el campo (retrocompatibilidad)

---

## 📊 Comparación: Antes vs Después

### **Hábito Semanal: Lunes, Miércoles, Viernes (3 días)**

**Escenario:** 2 días completados de 3 esperados

#### **ANTES (Actual):**

**Backend:**
```json
{
  "habito": "Correr",
  "progreso_semanal": 66.67,
  "completados": 2
  // ❌ Falta "total": 3
}
```

**Frontend Muestra:**
- Progreso: **66.67%** ✅ Correcto
- Texto: **"2 de 7 completados"** ❌ Incorrecto

**Problema:** El usuario piensa que necesita completar 7 días cuando en realidad solo son 3

---

#### **DESPUÉS (Con la corrección):**

**Backend:**
```json
{
  "habito": "Correr",
  "progreso_semanal": 66.67,
  "completados": 2,
  "total": 3  // ✅ Agregado
}
```

**Frontend Muestra:**
- Progreso: **66.67%** ✅ Correcto
- Texto: **"2 de 3 completados"** ✅ Correcto

**Beneficio:** Información precisa y transparente para el usuario

---

## 🎯 RECOMENDACIONES

### **1. Corrección Inmediata (Alta Prioridad)**

- ✅ Agregar campo `total` en `progreso_semanal` endpoint
- ✅ Actualizar `ProgressCard.jsx` para usar `progresoActual.total`

### **2. Validaciones Adicionales (Media Prioridad)**

- ⚠️ Validar que `habito.tipo_frecuencia` sea capitalizado correctamente
  - Backend usa: `str.capitalize()` → "Diaria", "Semanal"
  - ¿Qué pasa si en BD está "DIARIA" o "diaria"?
  
- ⚠️ Manejar caso de `tipo_frecuencia = "Mensual"`
  - Actualmente retorna `total = 0` → División por cero protegida, pero progreso siempre 0%

### **3. Mejoras Futuras (Baja Prioridad)**

- 📅 Agregar campo `tipo_frecuencia` en la respuesta para debugging
- 📊 Agregar `dias` (lista de días) en la respuesta para transparencia
- 🧪 Crear tests unitarios para los cálculos
- 📝 Agregar logs de depuración en el backend

---

## 📋 CONCLUSIÓN

### **Estado Actual:**

| Componente | Cálculo de Porcentaje | Display "X de Y" | Estado |
|------------|----------------------|------------------|---------|
| Backend Semanal | ✅ Correcto | N/A | ✅ Funciona bien |
| Backend Mensual | ✅ Correcto | ✅ Correcto (envía total) | ✅ Funciona bien |
| Frontend Semanal | ✅ Correcto (del backend) | ❌ Incorrecto | ⚠️ Necesita corrección |
| Frontend Mensual | ✅ Correcto (del backend) | ✅ Correcto | ✅ Funciona bien |

### **Gravedad del Problema:**

- **🟡 Severidad Media:** No afecta el cálculo del progreso (que es correcto)
- **🎯 Impacto UX:** Usuario recibe información confusa sobre cuántos días debe completar
- **🔧 Facilidad de Corrección:** Muy fácil - solo agregar un campo en backend y usarlo en frontend

### **Acción Recomendada:**

✅ **Implementar Solución 1 y 2** en este orden:
1. Modificar backend para agregar campo `total` en `progreso_semanal`
2. Modificar frontend para usar el nuevo campo
3. Probar con hábitos de tipo Diario y Semanal
4. Verificar que el texto "X de Y" sea correcto

---

**¿Proceder con la corrección?** 🚀
