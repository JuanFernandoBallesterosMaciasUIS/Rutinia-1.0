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
    // Por ahora, solo mostramos un mensaje y agregamos visualmente
    addHabitToGrid(formData);
    
    // Cerrar modal
    closeModal();
    
    // Mostrar mensaje de éxito (opcional)
    showSuccessMessage('¡Hábito creado exitosamente!');
});

// Función para agregar hábito al grid (temporal, hasta conectar con backend)
function addHabitToGrid(habit) {
    const habitsGrid = document.querySelector('.habits-grid');
    
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
    
    const habitCard = document.createElement('div');
    habitCard.className = 'bg-card-light dark:bg-card-dark p-4 sm:p-5 rounded-large shadow-sm hover:shadow-md transition-shadow';
    habitCard.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center flex-1 min-w-0">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${colorClasses[habit.color]} flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <span class="material-icons text-xl sm:text-2xl">${habit.icon}</span>
                </div>
                <div class="min-w-0 flex-1">
                    <p class="font-semibold text-text-light dark:text-text-dark truncate">${habit.name}</p>
                    <p class="text-sm text-subtext-light dark:text-subtext-dark">${habit.category}</p>
                    <p class="text-xs text-subtext-light dark:text-subtext-dark mt-1">Racha: 0 días</p>
                </div>
            </div>
            <button class="text-subtext-light dark:text-subtext-dark hover:text-primary dark:hover:text-primary flex-shrink-0 ml-2">
                <span class="material-icons">edit</span>
            </button>
        </div>
    `;
    
    // Agregar al grid con animación
    habitCard.style.opacity = '0';
    habitCard.style.transform = 'scale(0.9)';
    habitsGrid.appendChild(habitCard);
    
    setTimeout(() => {
        habitCard.style.transition = 'all 0.3s ease';
        habitCard.style.opacity = '1';
        habitCard.style.transform = 'scale(1)';
    }, 10);
}

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
    
    // Aquí se enviaría al backend para actualizar
    updateHabitInGrid(formData);
    
    closeEditModal();
    showSuccessMessage('¡Hábito actualizado exitosamente!');
});

// Función para actualizar hábito en el grid
function updateHabitInGrid(habit) {
    const habitCard = document.querySelector(`[data-habit-id="${habit.id}"]`);
    if (!habitCard) return;
    
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
    
    const iconContainer = habitCard.querySelector('.w-12.h-12, .sm\\:w-14.sm\\:h-14');
    const nameElement = habitCard.querySelector('.font-semibold');
    const categoryElement = habitCard.querySelector('.text-sm');
    const editButton = habitCard.querySelector('.edit-habit-btn');
    
    // Actualizar icono y color
    iconContainer.className = `w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${colorClasses[habit.color]} flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0`;
    iconContainer.querySelector('.material-icons').textContent = habit.icon;
    
    // Actualizar nombre y categoría
    nameElement.textContent = habit.name;
    categoryElement.textContent = habit.category;
    
    // Actualizar data attributes del botón de editar
    editButton.dataset.name = habit.name;
    editButton.dataset.category = habit.category;
    editButton.dataset.icon = habit.icon;
    editButton.dataset.color = habit.color;
    editButton.dataset.frequency = habit.frequency;
    editButton.dataset.days = habit.days.join(',');
}

// Eliminar hábito
deleteHabitButton?.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres eliminar este hábito?')) {
        const habitCard = document.querySelector(`[data-habit-id="${currentEditHabitId}"]`);
        if (habitCard) {
            habitCard.style.transition = 'all 0.3s ease';
            habitCard.style.opacity = '0';
            habitCard.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                habitCard.remove();
            }, 300);
        }
        
        closeEditModal();
        showSuccessMessage('Hábito eliminado exitosamente');
    }
});
