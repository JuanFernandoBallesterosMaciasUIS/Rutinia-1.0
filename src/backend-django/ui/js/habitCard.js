// ========== COMPONENTE REUTILIZABLE DE TARJETA DE HÁBITO ==========

/**
 * Crea una tarjeta de hábito con diseño unificado
 * @param {Object} habit - Objeto con los datos del hábito
 * @param {Object} options - Opciones de configuración
 * @returns {HTMLElement} - Elemento div de la tarjeta
 */
function createHabitCard(habit, options = {}) {
    const {
        showCompleteButton = false,
        isCompleted = false,
        onComplete = null,
        onEdit = null
    } = options;
    
    const colorClasses = {
        indigo: 'bg-indigo-500',
        green: 'bg-green-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        red: 'bg-red-500',
        yellow: 'bg-yellow-500',
        pink: 'bg-pink-500',
        amber: 'bg-amber-500',
        orange: 'bg-orange-500'
    };
    
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
            return `${days}`;
        } else if (habit.frequency === 'mensual') {
            return 'Mensual';
        }
        return habit.frequency;
    }
    
    // Crear el elemento de la tarjeta con altura fija
    const habitCard = document.createElement('div');
    const cardClasses = showCompleteButton ? 'habit-card habit-card-with-button' : 'habit-card';
    habitCard.className = `${cardClasses} bg-card-light dark:bg-card-dark rounded-large p-4 sm:p-6 shadow-sm hover:shadow-md transition-all ${
        isCompleted ? 'opacity-60' : ''
    }`;
    habitCard.dataset.habitId = habit.id;
    
    // Estructura HTML de la tarjeta
    habitCard.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div class="w-12 h-12 sm:w-14 sm:h-14 ${colorClasses[habit.color]} rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="material-icons text-white text-2xl sm:text-3xl">${habit.icon}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="habit-title font-semibold text-base sm:text-lg text-text-light dark:text-text-dark truncate cursor-help ${
                        isCompleted ? 'line-through' : ''
                    }" title="${habit.name}">${habit.name}</h3>
                    <p class="text-xs sm:text-sm text-subtext-light dark:text-subtext-dark truncate" title="${habit.category}">${habit.category}</p>
                </div>
            </div>
            <button class="edit-habit-btn p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all flex-shrink-0" data-habit-id="${habit.id}">
                <span class="material-icons text-subtext-light dark:text-subtext-dark text-xl">edit</span>
            </button>
        </div>
        
        <div class="space-y-2 flex-1">
            <div class="flex items-center gap-2 text-xs sm:text-sm text-subtext-light dark:text-subtext-dark">
                <span class="material-icons text-sm sm:text-base">schedule</span>
                <span>${formatFrequency(habit)}</span>
            </div>
            <div class="flex items-center gap-2 text-xs sm:text-sm text-subtext-light dark:text-subtext-dark">
                <span class="material-icons text-sm sm:text-base">local_fire_department</span>
                <span>Racha: ${habit.streak} ${habit.streak === 1 ? 'día' : 'días'}</span>
            </div>
        </div>
        
        ${showCompleteButton ? `
            <button class="complete-habit-btn w-full py-2.5 rounded-lg font-medium transition-all mt-auto ${
                isCompleted 
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                : 'bg-primary text-white hover:shadow-lg'
            }" data-habit-id="${habit.id}">
                <span class="material-icons text-sm align-middle mr-1">${isCompleted ? 'check_circle' : 'radio_button_unchecked'}</span>
                ${isCompleted ? 'Completado' : 'Marcar como hecho'}
            </button>
        ` : ''}
    `;
    
    // Agregar event listeners
    const editBtn = habitCard.querySelector('.edit-habit-btn');
    if (editBtn && onEdit) {
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            onEdit(habit);
        });
    }
    
    if (showCompleteButton) {
        const completeBtn = habitCard.querySelector('.complete-habit-btn');
        if (completeBtn && onComplete) {
            completeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                onComplete(habit.id);
            });
        }
    }
    
    return habitCard;
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createHabitCard };
}
