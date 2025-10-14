# 🎬 Guía Visual de Animaciones - Rutinia

## 🔐 Flujo de Inicio de Sesión

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1️⃣  PANTALLA DE LOGIN APARECE                         │
│     ↓ Fade-in (0.6s)                                   │
│     ┌──────────────────────────────────────┐           │
│     │        🎯 Rutinia                     │           │
│     │        ↑ Slide-down (0.6s)           │           │
│     └──────────────────────────────────────┘           │
│                                                         │
│     ┌──────────────────────────────────────┐           │
│     │  📧 Correo                            │           │
│     │  🔒 Contraseña                        │           │
│     │  [Iniciar Sesión →]                  │           │
│     │  ↑ Slide-up (0.7s)                   │           │
│     └──────────────────────────────────────┘           │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  2️⃣  USUARIO HACE CLIC EN BOTÓN                        │
│                                                         │
│     ┌──────────────────────────────────────┐           │
│     │  [🔄 Cargando...]                    │           │
│     │     ↑ Spinner girando                │           │
│     └──────────────────────────────────────┘           │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  3️⃣  ÉXITO EN AUTENTICACIÓN                            │
│                                                         │
│     ┌──────────────────────────────────────┐           │
│     │  [✅ ¡Bienvenido!]                   │           │
│     │     ↑ Verde + Check animado          │           │
│     └──────────────────────────────────────┘           │
│                                                         │
│     ⏱️  Espera 800ms                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  4️⃣  TRANSICIÓN AL CONTENIDO PRINCIPAL                 │
│     ↓ Content fade-in (0.8s)                           │
│                                                         │
│     ╔═════════════════════════════════════╗            │
│     ║  🏠 Dashboard                        ║            │
│     ║  📊 Hábitos del día                 ║            │
│     ║  ✨ Contenido con fade-in           ║            │
│     ╚═════════════════════════════════════╝            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🚪 Flujo de Cierre de Sesión

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1️⃣  USUARIO EN APLICACIÓN                             │
│                                                         │
│     ╔═════════════════════════════════════╗            │
│     ║  📱 Sidebar                          ║            │
│     ║  ┌────────────────────────┐         ║            │
│     ║  │ 👤 Usuario              │         ║            │
│     ║  │ 🌙 Modo Oscuro          │         ║            │
│     ║  │ ✏️  Editar perfil       │         ║            │
│     ║  │ ───────────────         │         ║            │
│     ║  │ 🚪 Cerrar sesión        │ ← Click ║            │
│     ║  └────────────────────────┘         ║            │
│     ╚═════════════════════════════════════╝            │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  2️⃣  BOTÓN MUESTRA ESTADO DE CIERRE                    │
│                                                         │
│     ╔═════════════════════════════════════╗            │
│     ║  ┌────────────────────────┐         ║            │
│     ║  │ 🔄 Cerrando sesión...  │         ║            │
│     ║  │    ↑ Spinner + Escala  │         ║            │
│     ║  └────────────────────────┘         ║            │
│     ╚═════════════════════════════════════╝            │
│                                                         │
│     ⏱️  Animación (300ms)                               │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  3️⃣  CONTENIDO HACE FADE-OUT                           │
│     ↓ Fade-out + Scale (0.5s)                          │
│                                                         │
│     ╔═════════════════════════════════════╗            │
│     ║  🏠 Dashboard (desapareciendo)      ║            │
│     ║  📊 Opacidad: 1 → 0                 ║            │
│     ║  📐 Escala: 1 → 0.95                ║            │
│     ╚═════════════════════════════════════╝            │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  4️⃣  RETORNO A PANTALLA DE LOGIN                       │
│     ↓ Fade-in (0.6s)                                   │
│                                                         │
│     ┌──────────────────────────────────────┐           │
│     │        🎯 Rutinia                     │           │
│     │                                       │           │
│     │  📧 Correo                            │           │
│     │  🔒 Contraseña                        │           │
│     │  [Iniciar Sesión →]                  │           │
│     │  ↑ Animaciones de entrada            │           │
│     └──────────────────────────────────────┘           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## ⚡ Timeline de Animaciones

### Inicio de Sesión
```
Tiempo  │ Animación
────────┼─────────────────────────────────────────
0ms     │ ▶️ Fade-in del fondo comienza
0ms     │ ▶️ Slide-down del título "Rutinia"
100ms   │ ▶️ Slide-up del formulario (delay)
600ms   │ ✅ Todas las animaciones completadas
        │
[Usuario interactúa y hace submit]
        │
0ms     │ ▶️ Spinner en botón
        │ ... Llamada a API ...
API ✅   │ ▶️ Botón cambia a verde + check
800ms   │ ▶️ Transición a contenido principal
800ms   │ ▶️ Content fade-in comienza
1600ms  │ ✅ Todo completado
```

### Cierre de Sesión
```
Tiempo  │ Animación
────────┼─────────────────────────────────────────
0ms     │ ▶️ Click en botón logout
0ms     │ ▶️ Spinner + cambio de texto
300ms   │ ▶️ Fade-out del contenido
800ms   │ ✅ Contenido desaparecido
800ms   │ ▶️ Estado limpiado
800ms   │ ▶️ Login fade-in comienza
1400ms  │ ✅ Login completamente visible
```

## 🎨 Detalles de Animación por Elemento

### Título "Rutinia"
```css
Animación: slideDown
Duración: 0.6s
Easing: ease-out
Efecto: translateY(-20px) → translateY(0)
        opacity: 0 → 1
```

### Formulario Principal
```css
Animación: slideUp
Duración: 0.7s
Delay: 0.1s
Easing: ease-out
Efecto: translateY(30px) → translateY(0)
        opacity: 0 → 1
```

### Contenedor General
```css
Animación: scaleIn
Duración: 0.5s
Easing: cubic-bezier(0.34, 1.56, 0.64, 1)
Efecto: scale(0.9) → scale(1)
        opacity: 0 → 1
Nota: Rebote sutil al final
```

### Botón de Submit (Éxito)
```css
Estado: Success
Color: bg-green-500
Icono: check_circle (animado)
Texto: "¡Bienvenido!"
Duración visible: 800ms
```

### Contenido Principal
```css
Animación: contentFadeIn
Duración: 0.8s
Easing: ease-out
Efecto: translateY(10px) → translateY(0)
        opacity: 0 → 1
```

### Fade-out (Logout)
```css
Animación: fadeOut
Duración: 0.5s
Easing: ease-in
Efecto: scale(1) → scale(0.95)
        opacity: 1 → 0
Forwards: true (mantiene estado final)
```

## 🎯 Estados del Botón Submit

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Normal    │ →   │  Cargando   │ →   │   Éxito     │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ Morado      │     │ Morado      │     │ Verde       │
│ Arrow →     │     │ Spinner 🔄  │     │ Check ✅    │
│ Hover: ↑    │     │ Disabled    │     │ Disabled    │
└─────────────┘     └─────────────┘     └─────────────┘
```

## 💡 Mejores Prácticas Implementadas

✅ **Duración apropiada**: 300-800ms para transiciones
✅ **Easing natural**: ease-out para entradas, ease-in para salidas
✅ **Feedback visual**: Estados claros (cargando, éxito, error)
✅ **No bloquea UI**: Animaciones asíncronas
✅ **Performance**: Usa transform y opacity (GPU)
✅ **Consistencia**: Mismo estilo en toda la app
✅ **Sutileza**: No distrae del contenido

---

**📝 Nota**: Todas las animaciones se pueden probar en la aplicación iniciando y cerrando sesión.
