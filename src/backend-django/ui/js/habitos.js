// ========== CONFIGURACIÓN INICIAL ==========
// Sidebar toggle functionality
const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

function toggleSidebar() {
    sidebar.classList.toggle('-translate-x-full');
    if (sidebarOverlay) {
        sidebarOverlay.classList.toggle('hidden');
    }
}

if (menuButton) {
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        toggleSidebar();
    });
}

document.addEventListener('click', (e) => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile && !sidebar.contains(e.target) && !menuButton?.contains(e.target)) {
        if (!sidebar.classList.contains('-translate-x-full')) {
            toggleSidebar();
        }
    }
});

sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 1024;
    
    if (!isMobile) {
        sidebar.classList.remove('-translate-x-full');
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('hidden');
        }
    } else {
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

// ========== GESTIÓN DE HÁBITOS ==========
let currentFilter = 'todos';

// Datos de ejemplo (en producción vendrían del backend)
const allHabits = [
    {
        id: 1,
        name: 'Hacer ejercicio',
        category: 'Salud',
        icon: 'fitness_center',
        color: 'indigo',
        frequency: 'diario',
        days: [],
        streak: 7
    },
    {
        id: 2,
        name: 'Leer un libro',
        category: 'Educación',
        icon: 'menu_book',
        color: 'green',
        frequency: 'diario',
        days: [],
        streak: 3
    },
    {
        id: 3,
        name: 'Meditar',
        category: 'Bienestar',
        icon: 'self_improvement',
        color: 'purple',
        frequency: 'semanal',
        days: ['lun', 'mie', 'vie'],
        streak: 2
    },
    {
        id: 4,
        name: 'Revisar finanzas',
        category: 'Finanzas',
        icon: 'account_balance',
        color: 'amber',
        frequency: 'mensual',
        days: [],
        streak: 0
    },
    {
        id: 5,
        name: 'Estudiar programación',
        category: 'Educación',
        icon: 'code',
        color: 'blue',
        frequency: 'diario',
        days: [],
        streak: 15
    },
    {
        id: 6,
        name: 'Yoga',
        category: 'Salud',
        icon: 'spa',
        color: 'pink',
        frequency: 'semanal',
        days: ['mar', 'jue', 'sab'],
        streak: 4
    }
];

// Función para obtener el color en formato Tailwind
function getColorClass(color) {
    const colors = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        red: 'bg-red-500',
        yellow: 'bg-yellow-500',
        pink: 'bg-pink-500',
        indigo: 'bg-indigo-500',
        amber: 'bg-amber-500'
    };
    return colors[color] || 'bg-blue-500';
}

// Función para formatear la frecuencia
function formatFrequency(habit) {
    if (habit.frequency === 'diario') {
        return 'Todos los días';
    } else if (habit.frequency === 'semanal') {
        const dayNames = {
            'lun': 'L', 'mar': 'M', 'mie': 'X', 
            'jue': 'J', 'vie': 'V', 'sab': 'S', 'dom': 'D'
        };
        const days = habit.days.map(d => dayNames[d]).join(', ');
        return `Semanal: ${days}`;
    } else if (habit.frequency === 'mensual') {
        return 'Mensual';
    }
    return habit.frequency;
}

// Función para renderizar todos los hábitos
function renderAllHabits(filter = 'todos') {
    const container = document.getElementById('all-habits-grid');
    const noHabitsMessage = document.getElementById('no-habits-message');
    
    // Filtrar hábitos
    let filteredHabits = allHabits;
    if (filter !== 'todos') {
        filteredHabits = allHabits.filter(habit => habit.frequency === filter);
    }
    
    // Mostrar mensaje si no hay hábitos
    if (filteredHabits.length === 0) {
        container.classList.add('hidden');
        noHabitsMessage.classList.remove('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    noHabitsMessage.classList.add('hidden');
    container.innerHTML = '';
    
    filteredHabits.forEach(habit => {
        // Usar el componente reutilizable
        const habitCard = createHabitCard(habit, {
            showCompleteButton: false,
            onEdit: openEditModal
        });
        
        container.appendChild(habitCard);
    });
}

// Función para abrir modal de edición (redirige a index.html por ahora)
function openEditModal(habitId) {
    // En una implementación completa, aquí se abriría el modal de edición
    // Por ahora, redirigimos a la página principal
    console.log('Editar hábito:', habitId);
    window.location.href = 'index.html';
}

// Event listeners para filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Actualizar estilos de botones
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.className = 'filter-btn px-4 py-2 rounded-lg bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors whitespace-nowrap';
        });
        btn.className = 'filter-btn px-4 py-2 rounded-lg bg-primary text-white font-semibold whitespace-nowrap';
        
        // Actualizar filtro
        const filter = btn.dataset.filter;
        currentFilter = filter;
        renderAllHabits(filter);
    });
});

// Botón para crear nuevo hábito (footer)
document.getElementById('add-habit-button')?.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderAllHabits();
});
