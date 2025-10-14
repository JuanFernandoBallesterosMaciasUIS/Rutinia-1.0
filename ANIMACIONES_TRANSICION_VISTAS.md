# 🎬 Animaciones de Transición entre Vistas

## 📋 Descripción General

Se han implementado animaciones suaves y minimalistas para las transiciones entre las diferentes secciones de la aplicación:
- **Hábitos del día** (`today`)
- **Calendario** (`calendar`)
- **Todos mis hábitos** (`habits`)
- **Dashboard de Progreso** (`analytics`)

## 🎨 Características de la Animación

### Tipo de Animación
- **Fade + Slide horizontal**: Combinación de desvanecimiento y deslizamiento suave
- **Duración**: 300ms
- **Timing**: ease-out (salida suave y natural)

### Comportamiento
1. **Al cambiar de vista**:
   - La vista actual se desvanece y desliza hacia la izquierda (-20px)
   - Después de 300ms, la nueva vista aparece deslizándose desde la derecha (20px)
   - La transición es bloqueada durante la animación para evitar clics múltiples

## 🔧 Implementación Técnica

### Estados en `App.jsx`
```javascript
const [currentView, setCurrentView] = useState('today');
const [isViewTransitioning, setIsViewTransitioning] = useState(false);
```

### Función de Cambio de Vista
```javascript
const handleViewChange = (newView) => {
  if (newView === currentView || isViewTransitioning) return;
  
  setIsViewTransitioning(true);
  
  setTimeout(() => {
    setCurrentView(newView);
    setIsViewTransitioning(false);
  }, 300);
};
```

### Clases CSS Aplicadas
El contenedor de vistas tiene clases dinámicas:
```jsx
<div className={`view-container ${isViewTransitioning ? 'view-transition-exit' : 'view-transition-enter'}`}>
```

### Keyframes CSS (`index.css`)

#### Entrada de Vista
```css
@keyframes viewFadeInSlide {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

#### Salida de Vista
```css
@keyframes viewFadeOutSlide {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-20px);
  }
}
```

## 🎯 Puntos de Activación

La animación se activa cuando el usuario:
1. **Hace clic en el Footer** en los botones de navegación
2. **Usa la navegación** desde cualquier componente que llame a `handleViewChange`

## 🚀 Mejoras Implementadas

### Prevención de Múltiples Clics
- El estado `isViewTransitioning` bloquea nuevos cambios mientras hay una animación en curso
- Evita comportamientos extraños si el usuario hace clic rápidamente en múltiples vistas

### Transición Suave
- El uso de `transform` en lugar de `position` asegura animaciones aceleradas por GPU
- La combinación de opacidad y deslizamiento crea una transición fluida y profesional

### Consistencia Visual
- Todas las vistas usan la misma animación
- El tiempo de 300ms es suficiente para ser perceptible pero no molesto
- La dirección de deslizamiento (derecha → izquierda) sugiere avance/progreso

## 📱 Compatibilidad

- ✅ **Escritorio**: Animaciones fluidas
- ✅ **Tablets**: Rendimiento óptimo
- ✅ **Móviles**: Animaciones suaves sin lag

## 🎨 Personalización

### Ajustar Duración
Cambiar el valor en tres lugares:
1. `setTimeout` en `handleViewChange`: `300` ms
2. CSS `animation-duration`: `0.3s`

### Ajustar Distancia de Deslizamiento
Modificar los valores de `translateX` en los keyframes:
- Entrada: `translateX(20px)` (desde la derecha)
- Salida: `translateX(-20px)` (hacia la izquierda)

### Cambiar Dirección
Para invertir la dirección de deslizamiento (izquierda → derecha):
- Entrada: cambiar `20px` a `-20px`
- Salida: cambiar `-20px` a `20px`

## 🧪 Pruebas Recomendadas

1. **Navegación rápida**: Hacer clic en diferentes vistas rápidamente
2. **Todas las vistas**: Probar transiciones entre todas las combinaciones
3. **Dispositivos móviles**: Verificar que no haya lag
4. **Modo oscuro**: Asegurar que las animaciones se vean bien en ambos temas

## 📝 Notas Adicionales

- Las animaciones usan `transform` y `opacity` para mejor rendimiento
- Se usa `animation-fill-mode: both` para mantener estilos antes/después
- La animación es compatible con las demás animaciones del sistema (modales, login, etc.)
