// Sidebar toggle functionality
const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const appContainer = document.getElementById('app-container');
const sidebarOverlay = document.getElementById('sidebar-overlay');

// Función para abrir/cerrar sidebar en móvil
function toggleSidebar() {
    sidebar.classList.toggle('-translate-x-full');
    if (sidebarOverlay) {
        sidebarOverlay.classList.toggle('hidden');
    }
}

// Botón de menú (solo visible en móvil)
if (menuButton) {
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });
}

// Click en overlay para cerrar sidebar en móvil
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        toggleSidebar();
    });
}

// Cerrar sidebar al hacer click fuera (solo móvil)
document.addEventListener('click', (e) => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile && !sidebar.contains(e.target) && !menuButton?.contains(e.target)) {
        if (!sidebar.classList.contains('-translate-x-full')) {
            toggleSidebar();
        }
    }
});

// Prevenir que clicks dentro del sidebar lo cierren
sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 1024;
    
    if (!isMobile) {
        // En pantallas grandes, asegurar que el sidebar esté visible
        sidebar.classList.remove('-translate-x-full');
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('hidden');
        }
    } else {
        // En móvil, asegurar que el sidebar esté oculto por defecto
        if (!sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.add('-translate-x-full');
            if (sidebarOverlay) {
                sidebarOverlay.classList.add('hidden');
            }
        }
    }
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const html = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.classList.add('dark');
    themeText.textContent = 'Tema: claro';
} else {
    html.classList.remove('dark');
    themeText.textContent = 'Tema: oscuro';
}

themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    html.classList.toggle('dark');
    
    if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeText.textContent = 'Tema: claro';
    } else {
        localStorage.setItem('theme', 'light');
        themeText.textContent = 'Tema: oscuro';
    }
});

// Animaciones de hover para las tarjetas de hábitos
document.addEventListener('DOMContentLoaded', () => {
    const habitCards = document.querySelectorAll('.habits-grid > div');
    
    habitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
