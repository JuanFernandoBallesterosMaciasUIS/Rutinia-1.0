// Sidebar toggle functionality
const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const appContainer = document.getElementById('app-container');
const sidebarOverlay = document.getElementById('sidebar-overlay');

// ========== GESTIÓN DE HÁBITOS DEL DÍA ==========
// Datos de ejemplo de hábitos (en producción vendrían del backend)
const habitsData = [
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
        color: 'yellow',
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

// Registro de hábitos completados (formato: fecha -> [ids de hábitos])
const completedHabits = JSON.parse(localStorage.getItem('completedHabits')) || {};

// Función para obtener el día de la semana en español
function getDayOfWeek(date = new Date()) {
    const days = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
    return days[date.getDay()];
}

// Función para obtener la fecha actual en formato YYYY-MM-DD
function getCurrentDateString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Función para verificar si un hábito aplica al día actual
function habitAppliesToToday(habit) {
    const today = new Date();
    const currentDay = getDayOfWeek(today);
    
    if (habit.frequency === 'diario') {
        return true;
    } else if (habit.frequency === 'semanal') {
        return habit.days.includes(currentDay);
    } else if (habit.frequency === 'mensual') {
        // Para mensual, solo mostrar el primer día del mes (puedes ajustar esta lógica)
        return today.getDate() === 1;
    }
    return false;
}

// Función para verificar si un hábito está completado hoy
function isHabitCompletedToday(habitId) {
    const dateStr = getCurrentDateString();
    return completedHabits[dateStr]?.includes(habitId) || false;
}

// Función para marcar/desmarcar hábito como completado
function toggleHabitCompletion(habitId) {
    const dateStr = getCurrentDateString();
    
    if (!completedHabits[dateStr]) {
        completedHabits[dateStr] = [];
    }
    
    const index = completedHabits[dateStr].indexOf(habitId);
    if (index > -1) {
        // Desmarcar
        completedHabits[dateStr].splice(index, 1);
    } else {
        // Marcar como completado
        completedHabits[dateStr].push(habitId);
    }
    
    // Guardar en localStorage
    localStorage.setItem('completedHabits', JSON.stringify(completedHabits));
    
    // Actualizar la vista
    renderTodayHabits();
}

// Función para renderizar los hábitos del día
function renderTodayHabits() {
    const habitsGrid = document.querySelector('.habits-grid');
    if (!habitsGrid) return;
    
    // Filtrar hábitos que aplican hoy
    const todayHabits = habitsData.filter(habit => habitAppliesToToday(habit));
    
    habitsGrid.innerHTML = '';
    
    if (todayHabits.length === 0) {
        habitsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <span class="material-icons text-6xl text-subtext-light dark:text-subtext-dark mb-4">event_available</span>
                <p class="text-xl text-subtext-light dark:text-subtext-dark">No hay hábitos para hoy</p>
                <p class="text-sm text-subtext-light dark:text-subtext-dark mt-2">¡Disfruta tu día libre!</p>
            </div>
        `;
        return;
    }
    
    todayHabits.forEach(habit => {
        const isCompleted = isHabitCompletedToday(habit.id);
        
        // Usar el componente reutilizable
        const habitCard = createHabitCard(habit, {
            showCompleteButton: true,
            isCompleted: isCompleted,
            onComplete: toggleHabitCompletion,
            onEdit: openEditModal
        });
        
        habitsGrid.appendChild(habitCard);
    });
}

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

// Inicializar hábitos del día cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    renderTodayHabits();
});

// ========== MODAL DE NUEVO HÁBITO ==========
const addHabitButton = document.getElementById('add-habit-button');
const newHabitModal = document.getElementById('new-habit-modal');
const closeModalButton = document.getElementById('close-modal');
const cancelButton = document.getElementById('cancel-button');
const habitForm = document.getElementById('habit-form');
const modalContent = document.getElementById('modal-content');

// Variables para selección de icono y color
let selectedIcon = null;
let selectedColor = null;
let selectedDays = [];
let editSelectedIcon = null;
let editSelectedColor = null;
let editSelectedDays = [];
let currentEditHabitId = null;

// Abrir modal
if (addHabitButton) {
    addHabitButton.addEventListener('click', (e) => {
        e.preventDefault();
        newHabitModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
        
        // Animación de entrada
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 10);
    });
}

// Cerrar modal
function closeModal() {
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        newHabitModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restaurar scroll
        habitForm.reset();
        selectedIcon = null;
        selectedColor = null;
        selectedDays = [];
        
        // Resetear selecciones visuales
        document.querySelectorAll('.icon-option').forEach(btn => {
            btn.classList.remove('border-primary', 'bg-primary', 'bg-opacity-10');
        });
        document.querySelectorAll('.color-option').forEach(btn => {
            btn.classList.remove('ring-4', 'ring-primary');
        });
        document.querySelectorAll('.day-option').forEach(btn => {
            btn.classList.remove('border-primary', 'bg-primary', 'text-white');
        });
        
        // Ocultar selector de días
        document.getElementById('days-selector')?.classList.add('hidden');
    }, 200);
}

if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

if (cancelButton) {
    cancelButton.addEventListener('click', closeModal);
}

// Cerrar modal al hacer click fuera
newHabitModal?.addEventListener('click', (e) => {
    if (e.target === newHabitModal) {
        closeModal();
    }
});

// Prevenir que clicks dentro del modal lo cierren
modalContent?.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Selección de icono
const iconOptions = document.querySelectorAll('.icon-option');
iconOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover selección anterior
        iconOptions.forEach(btn => {
            btn.classList.remove('border-primary', 'bg-primary', 'bg-opacity-10');
        });
        
        // Agregar selección al botón actual
        option.classList.add('border-primary', 'bg-primary', 'bg-opacity-10');
        
        // Guardar icono seleccionado
        selectedIcon = option.dataset.icon;
        document.getElementById('selected-icon').value = selectedIcon;
    });
});

// Selección de color
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover selección anterior
        colorOptions.forEach(btn => {
            btn.classList.remove('ring-4', 'ring-primary');
        });
        
        // Agregar selección al botón actual
        option.classList.add('ring-4', 'ring-primary');
        
        // Guardar color seleccionado
        selectedColor = option.dataset.color;
        document.getElementById('selected-color').value = selectedColor;
    });
});

// Mostrar/ocultar selector de días según frecuencia
const frequencySelect = document.getElementById('habit-frequency');
const daysSelector = document.getElementById('days-selector');

frequencySelect?.addEventListener('change', (e) => {
    if (e.target.value === 'semanal') {
        daysSelector?.classList.remove('hidden');
        // Resetear días seleccionados
        selectedDays = [];
        document.querySelectorAll('.day-option').forEach(btn => {
            btn.classList.remove('border-primary', 'bg-primary', 'text-white');
        });
    } else {
        daysSelector?.classList.add('hidden');
        selectedDays = [];
    }
});

// Selección de días de la semana
const dayOptions = document.querySelectorAll('.day-option');
dayOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        
        const day = option.dataset.day;
        
        // Toggle selección
        if (selectedDays.includes(day)) {
            // Deseleccionar
            selectedDays = selectedDays.filter(d => d !== day);
            option.classList.remove('border-primary', 'bg-primary', 'text-white');
        } else {
            // Seleccionar
            selectedDays.push(day);
            option.classList.add('border-primary', 'bg-primary', 'text-white');
        }
        
        // Actualizar input hidden
        document.getElementById('selected-days').value = selectedDays.join(',');
    });
});

// Envío del formulario
habitForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validar que se haya seleccionado icono y color
    if (!selectedIcon) {
        alert('Por favor selecciona un icono');
        return;
    }
    
    if (!selectedColor) {
        alert('Por favor selecciona un color');
        return;
    }
    
    // Validar frecuencia
    const frequency = document.getElementById('habit-frequency').value;
    if (!frequency) {
        alert('Por favor selecciona una frecuencia');
        return;
    }
    
    // Validar que si es semanal, se haya seleccionado al menos un día
    if (frequency === 'semanal' && selectedDays.length === 0) {
        alert('Por favor selecciona al menos un día de la semana');
        return;
    }
    
    // Obtener datos del formulario
    const formData = {
        name: document.getElementById('habit-name').value,
        category: document.getElementById('habit-category').value,
        icon: selectedIcon,
        color: selectedColor,
        description: document.getElementById('habit-description').value,
        frequency: frequency,
        days: frequency === 'semanal' ? selectedDays : [],
    };
    
    console.log('Nuevo hábito:', formData);
    
    // Aquí se enviaría al backend
    // Por ahora, agregamos el hábito al array local
    const newHabit = {
        id: habitsData.length + 1,
        ...formData,
        streak: 0
    };
    habitsData.push(newHabit);
    
    // Actualizar vista
    renderTodayHabits();
    
    // Cerrar modal
    closeModal();
    
    // Mostrar mensaje de éxito
    showSuccessMessage('¡Hábito creado exitosamente!');
});

// Función para mostrar mensaje de éxito
function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2';
    toast.innerHTML = `
        <span class="material-icons">check_circle</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// ========== MODAL DE EDITAR HÁBITO ==========
const editHabitModal = document.getElementById('edit-habit-modal');
const editModalContent = document.getElementById('edit-modal-content');
const closeEditModalButton = document.getElementById('close-edit-modal');
const cancelEditButton = document.getElementById('cancel-edit-button');
const deleteHabitButton = document.getElementById('delete-habit-button');
const editHabitForm = document.getElementById('edit-habit-form');

// Abrir modal de edición
function openEditModal(habitData) {
    currentEditHabitId = habitData.id;
    
    // Llenar formulario con datos actuales
    document.getElementById('edit-habit-id').value = habitData.id;
    document.getElementById('edit-habit-name').value = habitData.name;
    document.getElementById('edit-habit-category').value = habitData.category;
    document.getElementById('edit-habit-frequency').value = habitData.frequency;
    
    // Seleccionar icono
    editSelectedIcon = habitData.icon;
    document.getElementById('edit-selected-icon').value = habitData.icon;
    document.querySelectorAll('.edit-icon-option').forEach(btn => {
        btn.classList.remove('border-primary', 'bg-primary', 'bg-opacity-10');
        if (btn.dataset.icon === habitData.icon) {
            btn.classList.add('border-primary', 'bg-primary', 'bg-opacity-10');
        }
    });
    
    // Seleccionar color
    editSelectedColor = habitData.color;
    document.getElementById('edit-selected-color').value = habitData.color;
    document.querySelectorAll('.edit-color-option').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-primary');
        if (btn.dataset.color === habitData.color) {
            btn.classList.add('ring-4', 'ring-primary');
        }
    });
    
    // Manejar días si es semanal
    const editDaysSelector = document.getElementById('edit-days-selector');
    if (habitData.frequency === 'semanal') {
        editDaysSelector.classList.remove('hidden');
        editSelectedDays = habitData.days ? habitData.days.split(',').filter(d => d) : [];
        document.getElementById('edit-selected-days').value = editSelectedDays.join(',');
        
        document.querySelectorAll('.edit-day-option').forEach(btn => {
            btn.classList.remove('border-primary', 'bg-primary', 'text-white');
            if (editSelectedDays.includes(btn.dataset.day)) {
                btn.classList.add('border-primary', 'bg-primary', 'text-white');
            }
        });
    } else {
        editDaysSelector.classList.add('hidden');
        editSelectedDays = [];
    }
    
    // Mostrar modal
    editHabitModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        editModalContent.style.transform = 'scale(1)';
        editModalContent.style.opacity = '1';
    }, 10);
}

// Cerrar modal de edición
function closeEditModal() {
    editModalContent.style.transform = 'scale(0.95)';
    editModalContent.style.opacity = '0';
    
    setTimeout(() => {
        editHabitModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        editHabitForm.reset();
        editSelectedIcon = null;
        editSelectedColor = null;
        editSelectedDays = [];
        currentEditHabitId = null;
        
        // Resetear selecciones visuales
        document.querySelectorAll('.edit-icon-option').forEach(btn => {
            btn.classList.remove('border-primary', 'bg-primary', 'bg-opacity-10');
        });
        document.querySelectorAll('.edit-color-option').forEach(btn => {
            btn.classList.remove('ring-4', 'ring-primary');
        });
        document.querySelectorAll('.edit-day-option').forEach(btn => {
            btn.classList.remove('border-primary', 'bg-primary', 'text-white');
        });
        document.getElementById('edit-days-selector')?.classList.add('hidden');
    }, 200);
}

// Event listeners para abrir modal de edición
document.addEventListener('click', (e) => {
    if (e.target.closest('.edit-habit-btn')) {
        const button = e.target.closest('.edit-habit-btn');
        const habitData = {
            id: button.closest('[data-habit-id]')?.dataset.habitId,
            name: button.dataset.name,
            category: button.dataset.category,
            icon: button.dataset.icon,
            color: button.dataset.color,
            frequency: button.dataset.frequency,
            days: button.dataset.days || ''
        };
        openEditModal(habitData);
    }
});

// Cerrar modal de edición
if (closeEditModalButton) {
    closeEditModalButton.addEventListener('click', closeEditModal);
}

if (cancelEditButton) {
    cancelEditButton.addEventListener('click', closeEditModal);
}

// Cerrar al hacer click fuera
editHabitModal?.addEventListener('click', (e) => {
    if (e.target === editHabitModal) {
        closeEditModal();
    }
});

editModalContent?.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Selección de icono en modal de edición
const editIconOptions = document.querySelectorAll('.edit-icon-option');
editIconOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        
        editIconOptions.forEach(btn => {
            btn.classList.remove('border-primary', 'bg-primary', 'bg-opacity-10');
        });
        
        option.classList.add('border-primary', 'bg-primary', 'bg-opacity-10');
        editSelectedIcon = option.dataset.icon;
        document.getElementById('edit-selected-icon').value = editSelectedIcon;
    });
});

// Selección de color en modal de edición
const editColorOptions = document.querySelectorAll('.edit-color-option');
editColorOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        
        editColorOptions.forEach(btn => {
            btn.classList.remove('ring-4', 'ring-primary');
        });
        
        option.classList.add('ring-4', 'ring-primary');
        editSelectedColor = option.dataset.color;
        document.getElementById('edit-selected-color').value = editSelectedColor;
    });
});

// Mostrar/ocultar selector de días en modal de edición
const editFrequencySelect = document.getElementById('edit-habit-frequency');
const editDaysSelector = document.getElementById('edit-days-selector');

editFrequencySelect?.addEventListener('change', (e) => {
    if (e.target.value === 'semanal') {
        editDaysSelector?.classList.remove('hidden');
        editSelectedDays = [];
        document.querySelectorAll('.edit-day-option').forEach(btn => {
            btn.classList.remove('border-primary', 'bg-primary', 'text-white');
        });
    } else {
        editDaysSelector?.classList.add('hidden');
        editSelectedDays = [];
    }
});

// Selección de días en modal de edición
const editDayOptions = document.querySelectorAll('.edit-day-option');
editDayOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        
        const day = option.dataset.day;
        
        if (editSelectedDays.includes(day)) {
            editSelectedDays = editSelectedDays.filter(d => d !== day);
            option.classList.remove('border-primary', 'bg-primary', 'text-white');
        } else {
            editSelectedDays.push(day);
            option.classList.add('border-primary', 'bg-primary', 'text-white');
        }
        
        document.getElementById('edit-selected-days').value = editSelectedDays.join(',');
    });
});

// Envío del formulario de edición
editHabitForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!editSelectedIcon) {
        alert('Por favor selecciona un icono');
        return;
    }
    
    if (!editSelectedColor) {
        alert('Por favor selecciona un color');
        return;
    }
    
    const frequency = document.getElementById('edit-habit-frequency').value;
    if (!frequency) {
        alert('Por favor selecciona una frecuencia');
        return;
    }
    
    if (frequency === 'semanal' && editSelectedDays.length === 0) {
        alert('Por favor selecciona al menos un día de la semana');
        return;
    }
    
    const formData = {
        id: currentEditHabitId,
        name: document.getElementById('edit-habit-name').value,
        category: document.getElementById('edit-habit-category').value,
        icon: editSelectedIcon,
        color: editSelectedColor,
        frequency: frequency,
        days: frequency === 'semanal' ? editSelectedDays : [],
    };
    
    console.log('Hábito editado:', formData);
    
    // Actualizar en el array local
    const habitIndex = habitsData.findIndex(h => h.id === formData.id);
    if (habitIndex !== -1) {
        habitsData[habitIndex] = { ...habitsData[habitIndex], ...formData };
    }
    
    // Actualizar vista
    renderTodayHabits();
    
    closeEditModal();
    showSuccessMessage('¡Hábito actualizado exitosamente!');
});

// Eliminar hábito
deleteHabitButton?.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres eliminar este hábito?')) {
        // Eliminar del array local
        const habitIndex = habitsData.findIndex(h => h.id === currentEditHabitId);
        if (habitIndex !== -1) {
            habitsData.splice(habitIndex, 1);
        }
        
        // Actualizar vista
        renderTodayHabits();
        
        closeEditModal();
        showSuccessMessage('Hábito eliminado exitosamente');
    }
});
