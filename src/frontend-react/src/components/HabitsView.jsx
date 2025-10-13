import { useState } from 'react';
import HabitCard from './HabitCard';

const HabitsView = ({ habits, completedHabits, calculateStreak, onEditHabit, onDeleteHabit }) => {
  const [currentFilter, setCurrentFilter] = useState('todos');

  // Filtrar hábitos según el filtro seleccionado
  const getFilteredHabits = () => {
    if (currentFilter === 'todos') {
      return habits;
    }
    return habits.filter(habit => habit.frequency === currentFilter);
  };

  const filteredHabits = getFilteredHabits();

  // Función para obtener el estilo del botón de filtro
  const getFilterButtonClass = (filter) => {
    const baseClass = 'px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm transition-colors';
    if (currentFilter === filter) {
      return `${baseClass} bg-primary text-white`;
    }
    return `${baseClass} bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={getFilterButtonClass('todos')}
          onClick={() => setCurrentFilter('todos')}
        >
          <span className="flex items-center gap-1.5">
            <span className="material-icons text-base sm:text-lg">apps</span>
            <span>Todos</span>
          </span>
        </button>
        <button
          className={getFilterButtonClass('diario')}
          onClick={() => setCurrentFilter('diario')}
        >
          <span className="flex items-center gap-1.5">
            <span className="material-icons text-base sm:text-lg">today</span>
            <span>Diarios</span>
          </span>
        </button>
        <button
          className={getFilterButtonClass('semanal')}
          onClick={() => setCurrentFilter('semanal')}
        >
          <span className="flex items-center gap-1.5">
            <span className="material-icons text-base sm:text-lg">date_range</span>
            <span>Semanales</span>
          </span>
        </button>
        <button
          className={getFilterButtonClass('mensual')}
          onClick={() => setCurrentFilter('mensual')}
        >
          <span className="flex items-center gap-1.5">
            <span className="material-icons text-base sm:text-lg">calendar_month</span>
            <span>Mensuales</span>
          </span>
        </button>
      </div>

      {/* Grid de hábitos */}
      {filteredHabits.length === 0 ? (
        <div className="text-center py-12">
          <span className="material-icons text-6xl text-subtext-light dark:text-subtext-dark mb-4">
            inbox
          </span>
          <p className="text-xl text-subtext-light dark:text-subtext-dark">
            {currentFilter === 'todos' 
              ? 'No hay hábitos creados' 
              : `No hay hábitos ${currentFilter === 'diario' ? 'diarios' : currentFilter === 'semanal' ? 'semanales' : 'mensuales'}`
            }
          </p>
          <p className="text-sm text-subtext-light dark:text-subtext-dark mt-2">
            {currentFilter === 'todos' 
              ? 'Crea tu primer hábito para comenzar'
              : 'Prueba con otro filtro o crea un nuevo hábito'
            }
          </p>
        </div>
      ) : (
        <div className="habits-grid">
          {filteredHabits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={{
                ...habit,
                streak: calculateStreak ? calculateStreak(habit, completedHabits) : 0
              }}
              onEdit={onEditHabit}
              onDelete={onDeleteHabit}
              showCompleteButton={false}
            />
          ))}
        </div>
      )}

      {/* Información adicional */}
      {filteredHabits.length > 0 && (
        <div className="mt-6 p-4 sm:p-5 bg-card-light dark:bg-card-dark rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-sm text-subtext-light dark:text-subtext-dark">
            <div className="flex items-center gap-2 min-w-fit">
              <span className="material-icons text-lg text-primary">checklist</span>
              <span className="font-medium">
                {currentFilter === 'todos' 
                  ? `Total: ${filteredHabits.length} hábito${filteredHabits.length !== 1 ? 's' : ''}`
                  : `${filteredHabits.length} hábito${filteredHabits.length !== 1 ? 's' : ''} ${
                      currentFilter === 'diario' ? 'diario' : 
                      currentFilter === 'semanal' ? 'semanal' : 
                      'mensual'
                    }${filteredHabits.length !== 1 ? 's' : ''}`
                }
              </span>
            </div>
            {currentFilter === 'todos' && (
              <>
                <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-2 min-w-fit">
                  <span className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></span>
                  <span className="whitespace-nowrap">{habits.filter(h => h.frequency === 'diario').length} diarios</span>
                </div>
                <div className="flex items-center gap-2 min-w-fit">
                  <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></span>
                  <span className="whitespace-nowrap">{habits.filter(h => h.frequency === 'semanal').length} semanales</span>
                </div>
                <div className="flex items-center gap-2 min-w-fit">
                  <span className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></span>
                  <span className="whitespace-nowrap">{habits.filter(h => h.frequency === 'mensual').length} mensuales</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitsView;
