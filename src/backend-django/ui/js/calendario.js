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

// ========== CALENDARIO ==========
let currentDate = new Date();
let selectedDate = new Date();
let currentView = 'month'; // 'month' o 'week'

// Hábitos de ejemplo (en producción vendrían del backend)
const habitsData = [
    {
        id: 1,
        name: 'Hacer ejercicio',
        icon: 'fitness_center',
        color: 'indigo',
        frequency: 'diario',
        days: []
    },
    {
        id: 2,
        name: 'Leer un libro',
        icon: 'book',
        color: 'green',
        frequency: 'diario',
        days: []
    },
    {
        id: 3,
        name: 'Beber agua',
        icon: 'local_drink',
        color: 'blue',
        frequency: 'diario',
        days: []
    },
    {
        id: 4,
        name: 'Meditar',
        icon: 'self_improvement',
        color: 'purple',
        frequency: 'semanal',
        days: ['lun', 'mie', 'vie']
    }
];

// Registro de hábitos completados (en producción vendría del backend)
const completedHabits = {
    // Formato: 'YYYY-MM-DD': [habitId1, habitId2, ...]
    '2025-10-08': [1, 2, 3],
    '2025-10-07': [1, 3],
    '2025-10-09': [1, 2, 3, 4]
};

// Nombres de los meses
const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Nombres cortos de los días
const dayNamesShort = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];

// Función para formatear fecha como YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Función para verificar si un hábito aplica en un día específico
function habitAppliesToDay(habit, date) {
    if (habit.frequency === 'diario') {
        return true;
    }
    
    if (habit.frequency === 'semanal') {
        const dayName = dayNamesShort[date.getDay()];
        return habit.days.includes(dayName);
    }
    
    if (habit.frequency === 'mensual') {
        return date.getDate() === 1;
    }
    
    return false;
}

// Función para obtener el progreso de un día
function getDayProgress(date) {
    const dateStr = formatDate(date);
    const completed = completedHabits[dateStr] || [];
    
    // Obtener hábitos que aplican ese día
    const applicableHabits = habitsData.filter(habit => habitAppliesToDay(habit, date));
    
    if (applicableHabits.length === 0) return { total: 0, completed: 0, percentage: 0 };
    
    const completedCount = applicableHabits.filter(habit => 
        completed.includes(habit.id)
    ).length;
    
    return {
        total: applicableHabits.length,
        completed: completedCount,
        percentage: Math.round((completedCount / applicableHabits.length) * 100)
    };
}

// Función para renderizar el calendario
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Actualizar título
    document.getElementById('current-month-year').textContent = 
        `${monthNames[month]} ${year}`;
    
    // Obtener primer y último día del mes
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Obtener día de la semana del primer día (0 = domingo)
    const firstDayOfWeek = firstDay.getDay();
    
    // Obtener número de días del mes
    const daysInMonth = lastDay.getDate();
    
    // Contenedor de días
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';
    
    // Agregar días vacíos antes del primer día
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'aspect-square';
        calendarDays.appendChild(emptyDay);
    }
    
    // Agregar días del mes
    const today = new Date();
    const todayStr = formatDate(today);
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = formatDate(date);
        const isToday = dateStr === todayStr;
        const isSelected = dateStr === formatDate(selectedDate);
        const progress = getDayProgress(date);
        
        const dayElement = document.createElement('div');
        dayElement.className = `aspect-square rounded-lg border-2 ${
            isSelected 
                ? 'border-primary bg-primary bg-opacity-10' 
                : 'border-gray-200 dark:border-gray-700'
        } p-2 cursor-pointer hover:border-primary transition-all flex flex-col`;
        
        // Número del día
        const dayNumber = document.createElement('div');
        dayNumber.className = `text-sm font-semibold ${
            isToday 
                ? 'text-primary' 
                : 'text-text-light dark:text-text-dark'
        } mb-1`;
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Indicador de progreso
        if (progress.total > 0) {
            const progressBar = document.createElement('div');
            progressBar.className = 'flex-1 flex flex-col justify-end';
            
            const progressBarBg = document.createElement('div');
            progressBarBg.className = 'w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden';
            
            const progressBarFill = document.createElement('div');
            progressBarFill.className = `h-full ${
                progress.percentage === 100 ? 'bg-green-500' : 'bg-primary'
            } rounded-full transition-all`;
            progressBarFill.style.width = `${progress.percentage}%`;
            
            progressBarBg.appendChild(progressBarFill);
            progressBar.appendChild(progressBarBg);
            
            // Texto de progreso
            const progressText = document.createElement('div');
            progressText.className = 'text-xs text-center text-subtext-light dark:text-subtext-dark mt-1';
            progressText.textContent = `${progress.completed}/${progress.total}`;
            progressBar.appendChild(progressText);
            
            dayElement.appendChild(progressBar);
        }
        
        // Event listener para seleccionar día
        dayElement.addEventListener('click', () => {
            selectedDate = date;
            renderCalendar();
            renderHabitsForDay(date);
        });
        
        calendarDays.appendChild(dayElement);
    }
}

// Función para renderizar la vista semanal
function renderWeekView() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    
    // Obtener el inicio de la semana (domingo)
    const currentDay = new Date(year, month, day);
    const dayOfWeek = currentDay.getDay();
    const weekStart = new Date(currentDay);
    weekStart.setDate(currentDay.getDate() - dayOfWeek);
    
    // Actualizar título con el rango de la semana
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const startMonth = monthNames[weekStart.getMonth()];
    const endMonth = monthNames[weekEnd.getMonth()];
    const startDay = weekStart.getDate();
    const endDay = weekEnd.getDate();
    
    if (weekStart.getMonth() === weekEnd.getMonth()) {
        document.getElementById('current-month-year').textContent = 
            `${startDay} - ${endDay} de ${startMonth} ${year}`;
    } else {
        document.getElementById('current-month-year').textContent = 
            `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
    }
    
    // Contenedor de días
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';
    
    const today = new Date();
    const todayStr = formatDate(today);
    
    // Renderizar los 7 días de la semana
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        const dateStr = formatDate(date);
        const isToday = dateStr === todayStr;
        const isSelected = dateStr === formatDate(selectedDate);
        const progress = getDayProgress(date);
        
        const dayElement = document.createElement('div');
        dayElement.className = `rounded-lg border-2 ${
            isSelected 
                ? 'border-primary bg-primary bg-opacity-10' 
                : 'border-gray-200 dark:border-gray-700'
        } p-3 cursor-pointer hover:border-primary transition-all flex flex-col min-h-[120px]`;
        
        // Número del día
        const dayNumber = document.createElement('div');
        dayNumber.className = `text-lg font-semibold ${
            isToday 
                ? 'text-primary' 
                : 'text-text-light dark:text-text-dark'
        } mb-2`;
        dayNumber.textContent = date.getDate();
        dayElement.appendChild(dayNumber);
        
        // Indicador de progreso
        if (progress.total > 0) {
            const progressBar = document.createElement('div');
            progressBar.className = 'flex-1 flex flex-col justify-end';
            
            const progressBarBg = document.createElement('div');
            progressBarBg.className = 'w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2';
            
            const progressBarFill = document.createElement('div');
            progressBarFill.className = `h-full ${
                progress.percentage === 100 ? 'bg-green-500' : 'bg-primary'
            } rounded-full transition-all`;
            progressBarFill.style.width = `${progress.percentage}%`;
            
            progressBarBg.appendChild(progressBarFill);
            progressBar.appendChild(progressBarBg);
            
            // Texto de progreso
            const progressText = document.createElement('div');
            progressText.className = 'text-sm text-center text-subtext-light dark:text-subtext-dark';
            progressText.textContent = `${progress.completed}/${progress.total}`;
            progressBar.appendChild(progressText);
            
            dayElement.appendChild(progressBar);
        }
        
        // Event listener para seleccionar día
        dayElement.addEventListener('click', () => {
            selectedDate = date;
            renderWeekView();
            renderHabitsForDay(date);
        });
        
        calendarDays.appendChild(dayElement);
    }
}

// Función para renderizar hábitos del día seleccionado
function renderHabitsForDay(date) {
    const dateStr = formatDate(date);
    const completed = completedHabits[dateStr] || [];
    
    // Actualizar título
    const dayOfMonth = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    document.getElementById('selected-date-title').textContent = 
        `Hábitos del ${dayOfMonth} de ${month} de ${year}`;
    
    // Obtener hábitos que aplican ese día
    const applicableHabits = habitsData.filter(habit => habitAppliesToDay(habit, date));
    
    const container = document.getElementById('habits-for-day');
    container.innerHTML = '';
    
    if (applicableHabits.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-subtext-light dark:text-subtext-dark">
                <span class="material-icons text-5xl mb-2">event_busy</span>
                <p>No hay hábitos programados para este día</p>
            </div>
        `;
        return;
    }
    
    const colorClasses = {
        indigo: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-500',
        green: 'bg-green-100 dark:bg-green-900 text-green-500',
        blue: 'bg-blue-100 dark:bg-blue-900 text-blue-500',
        purple: 'bg-purple-100 dark:bg-purple-900 text-purple-500',
        red: 'bg-red-100 dark:bg-red-900 text-red-500',
        yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-500',
        pink: 'bg-pink-100 dark:bg-pink-900 text-pink-500',
        orange: 'bg-orange-100 dark:bg-orange-900 text-orange-500',
    };
    
    applicableHabits.forEach(habit => {
        const isCompleted = completed.includes(habit.id);
        
        const habitElement = document.createElement('div');
        habitElement.className = `bg-background-light dark:bg-background-dark rounded-lg p-4 flex items-center justify-between ${
            isCompleted ? 'opacity-75' : ''
        }`;
        
        habitElement.innerHTML = `
            <div class="flex items-center gap-3 flex-1">
                <div class="w-10 h-10 rounded-lg ${colorClasses[habit.color]} flex items-center justify-center flex-shrink-0">
                    <span class="material-icons text-lg">${habit.icon}</span>
                </div>
                <span class="font-semibold text-text-light dark:text-text-dark ${
                    isCompleted ? 'line-through' : ''
                }">${habit.name}</span>
            </div>
            <button class="toggle-habit-btn p-2 rounded-lg ${
                isCompleted 
                    ? 'text-green-500' 
                    : 'text-gray-400 dark:text-gray-600 hover:text-primary'
            } transition-colors" data-habit-id="${habit.id}" data-date="${dateStr}">
                <span class="material-icons">${
                    isCompleted ? 'check_circle' : 'radio_button_unchecked'
                }</span>
            </button>
        `;
        
        container.appendChild(habitElement);
    });
    
    // Agregar event listeners para toggle
    document.querySelectorAll('.toggle-habit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const habitId = parseInt(btn.dataset.habitId);
            const dateStr = btn.dataset.date;
            toggleHabitCompletion(habitId, dateStr);
        });
    });
}

// Función para marcar/desmarcar hábito como completado
function toggleHabitCompletion(habitId, dateStr) {
    if (!completedHabits[dateStr]) {
        completedHabits[dateStr] = [];
    }
    
    const index = completedHabits[dateStr].indexOf(habitId);
    if (index > -1) {
        // Desmarcar
        completedHabits[dateStr].splice(index, 1);
    } else {
        // Marcar
        completedHabits[dateStr].push(habitId);
    }
    
    // Aquí se enviaría al backend
    console.log('Hábito actualizado:', { habitId, dateStr, completed: index === -1 });
    
    // Actualizar vistas
    if (currentView === 'month') {
        renderCalendar();
    } else {
        renderWeekView();
    }
    renderHabitsForDay(selectedDate);
}

// Cambio de vista
document.getElementById('month-view-btn').addEventListener('click', () => {
    currentView = 'month';
    document.getElementById('month-view-btn').className = 'px-4 py-2 rounded-lg bg-primary text-white font-semibold';
    document.getElementById('week-view-btn').className = 'px-4 py-2 rounded-lg bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors';
    renderCalendar();
});

document.getElementById('week-view-btn').addEventListener('click', () => {
    currentView = 'week';
    document.getElementById('week-view-btn').className = 'px-4 py-2 rounded-lg bg-primary text-white font-semibold';
    document.getElementById('month-view-btn').className = 'px-4 py-2 rounded-lg bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors';
    renderWeekView();
});

// Navegación (mes o semana según la vista)
document.getElementById('prev-month').addEventListener('click', () => {
    if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    } else {
        currentDate.setDate(currentDate.getDate() - 7);
        renderWeekView();
    }
});

document.getElementById('next-month').addEventListener('click', () => {
    if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    } else {
        currentDate.setDate(currentDate.getDate() + 7);
        renderWeekView();
    }
});

// Inicializar calendario
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    renderHabitsForDay(selectedDate);
});

// Redirigir al hacer clic en agregar hábito
document.getElementById('add-habit-button')?.addEventListener('click', () => {
    window.location.href = 'index.html';
});
