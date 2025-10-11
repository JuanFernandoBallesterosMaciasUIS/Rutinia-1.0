import { useState } from 'react';
import HabitCard from './HabitCard';

const HabitsView = ({ habits, onEditHabit, onDeleteHabit }) => {
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
    const baseClass = 'px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors';
    if (currentFilter === filter) {
      return `${baseClass} bg-primary text-white`;
    }
    return `${baseClass} bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filtros */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          className={getFilterButtonClass('todos')}
          onClick={() => setCurrentFilter('todos')}
        >
          Todos
        </button>
        <button
          className={getFilterButtonClass('diario')}
          onClick={() => setCurrentFilter('diario')}
        >
          Diarios
        </button>
        <button
          className={getFilterButtonClass('semanal')}
          onClick={() => setCurrentFilter('semanal')}
        >
          Semanales
        </button>
        <button
          className={getFilterButtonClass('mensual')}
          onClick={() => setCurrentFilter('mensual')}
        >
          Mensuales
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
              habit={habit}
              onEdit={onEditHabit}
              onDelete={onDeleteHabit}
              showCompleteButton={false}
            />
          ))}
        </div>
      )}

      {/* Información adicional */}
      {filteredHabits.length > 0 && (
        <div className="mt-6 p-4 bg-card-light dark:bg-card-dark rounded-lg">
          <div className="flex flex-wrap gap-4 text-sm text-subtext-light dark:text-subtext-dark">
            <div className="flex items-center gap-2">
              <span className="material-icons text-lg">checklist</span>
              <span>
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
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span>{habits.filter(h => h.frequency === 'diario').length} diarios</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span>{habits.filter(h => h.frequency === 'semanal').length} semanales</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  <span>{habits.filter(h => h.frequency === 'mensual').length} mensuales</span>
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
