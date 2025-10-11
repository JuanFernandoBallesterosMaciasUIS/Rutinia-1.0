import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HabitCard from './components/HabitCard';
import NewHabitModal from './components/NewHabitModal';
import EditHabitModal from './components/EditHabitModal';
import Calendar from './components/Calendar';
import HabitsView from './components/HabitsView';
import { habitsData as initialHabitsData } from './data/habitsData';

// Componente simple de Toast
function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleShowToast = (event) => {
      const id = Date.now();
      const newToast = { id, message: event.detail.message };
      setToasts(prev => [...prev, newToast]);
      
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, 3000);
    };

    window.addEventListener('showToast', handleShowToast);
    return () => window.removeEventListener('showToast', handleShowToast);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right"
        >
          <span className="material-icons">check_circle</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('today'); // 'today', 'calendar', 'habits', 'analytics'
  const [showNewHabitModal, setShowNewHabitModal] = useState(false);
  const [showEditHabitModal, setShowEditHabitModal] = useState(false);
  const [currentEditHabit, setCurrentEditHabit] = useState(null);
  const [habitsData, setHabitsData] = useState(initialHabitsData);
  const [completedHabits, setCompletedHabits] = useState(() => {
    const saved = localStorage.getItem('completedHabits');
    return saved ? JSON.parse(saved) : {};
  });

  // Cargar tema guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Funciones para obtener día y fecha
  const getDayOfWeek = (date = new Date()) => {
    const days = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
    return days[date.getDay()];
  };

  const getCurrentDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Verificar si un hábito aplica al día actual
  const habitAppliesToToday = (habit) => {
    const today = new Date();
    const currentDay = getDayOfWeek(today);
    
    if (habit.frequency === 'diario') {
      return true;
    } else if (habit.frequency === 'semanal') {
      return habit.days.includes(currentDay);
    } else if (habit.frequency === 'mensual') {
      return today.getDate() === 1;
    }
    return false;
  };

  // Verificar si un hábito está completado hoy
  const isHabitCompletedToday = (habitId) => {
    const dateStr = getCurrentDateString();
    return completedHabits[dateStr]?.includes(habitId) || false;
  };

  // Toggle completar hábito
  const toggleHabitCompletion = (habitId, dateStr = null) => {
    const date = dateStr || getCurrentDateString();
    const newCompletedHabits = { ...completedHabits };
    
    if (!newCompletedHabits[date]) {
      newCompletedHabits[date] = [];
    }
    
    const index = newCompletedHabits[date].indexOf(habitId);
    if (index > -1) {
      newCompletedHabits[date].splice(index, 1);
    } else {
      newCompletedHabits[date].push(habitId);
    }
    
    setCompletedHabits(newCompletedHabits);
    localStorage.setItem('completedHabits', JSON.stringify(newCompletedHabits));
  };

  // Obtener hábitos del día
  const todayHabits = habitsData.filter(habit => habitAppliesToToday(habit));

  // Manejar creación de nuevo hábito
  const handleCreateHabit = (newHabitData) => {
    const newHabit = {
      id: habitsData.length + 1,
      ...newHabitData,
      streak: 0
    };
    setHabitsData([...habitsData, newHabit]);
    setShowNewHabitModal(false);
    showSuccessMessage('¡Hábito creado exitosamente!');
  };

  // Manejar edición de hábito
  const handleEditHabit = (editedHabitData) => {
    const updatedHabits = habitsData.map(habit =>
      habit.id === editedHabitData.id ? { ...habit, ...editedHabitData } : habit
    );
    setHabitsData(updatedHabits);
    setShowEditHabitModal(false);
    setCurrentEditHabit(null);
    showSuccessMessage('¡Hábito actualizado exitosamente!');
  };

  // Manejar eliminación de hábito
  const handleDeleteHabit = (habitId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este hábito?')) {
      const updatedHabits = habitsData.filter(habit => habit.id !== habitId);
      setHabitsData(updatedHabits);
      setShowEditHabitModal(false);
      setCurrentEditHabit(null);
      showSuccessMessage('Hábito eliminado exitosamente');
    }
  };

  // Abrir modal de edición
  const openEditModal = (habit) => {
    setCurrentEditHabit(habit);
    setShowEditHabitModal(true);
  };

  // Mostrar mensaje de éxito
  const showSuccessMessage = (message) => {
    const event = new CustomEvent('showToast', { detail: { message } });
    window.dispatchEvent(event);
  };

  return (
    <div className="relative w-full min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modal para crear nuevo hábito */}
      <NewHabitModal
        isOpen={showNewHabitModal}
        onClose={() => setShowNewHabitModal(false)}
        onSubmit={handleCreateHabit}
      />

      {/* Modal para editar hábito */}
      {currentEditHabit && (
        <EditHabitModal
          isOpen={showEditHabitModal}
          onClose={() => {
            setShowEditHabitModal(false);
            setCurrentEditHabit(null);
          }}
          onSubmit={handleEditHabit}
          onDelete={handleDeleteHabit}
          habitData={currentEditHabit}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64 transition-all duration-300 ease-in-out min-h-screen">
        {/* Header fijo con título de sección */}
        <header className="sticky top-0 z-20 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button 
                  className="relative p-2 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="material-icons text-text-light dark:text-text-dark">menu</span>
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></span>
                </button>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-light dark:text-text-dark">
                  {currentView === 'today' && 'Hábitos del día'}
                  {currentView === 'calendar' && 'Calendario'}
                  {currentView === 'habits' && 'Mis Hábitos'}
                  {currentView === 'analytics' && 'Análisis'}
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal con padding para header y footer */}
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <div>
            {currentView === 'today' && (
              <>
                
                {/* Grid de hábitos */}
                <div className="habits-grid">
                  {todayHabits.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <span className="material-icons text-6xl text-subtext-light dark:text-subtext-dark mb-4">event_available</span>
                      <p className="text-xl text-subtext-light dark:text-subtext-dark">No hay hábitos para hoy</p>
                      <p className="text-sm text-subtext-light dark:text-subtext-dark mt-2">¡Disfruta tu día libre!</p>
                    </div>
                  ) : (
                    todayHabits.map(habit => (
                      <HabitCard
                        key={habit.id}
                        habit={habit}
                        isCompleted={isHabitCompletedToday(habit.id)}
                        onToggleComplete={toggleHabitCompletion}
                        onEdit={openEditModal}
                      />
                    ))
                  )}
                </div>
              </>
            )}

            {currentView === 'calendar' && (
              <Calendar 
                habitsData={habitsData}
                completedHabits={completedHabits}
                onToggleHabit={toggleHabitCompletion}
              />
            )}

            {currentView === 'habits' && (
              <HabitsView 
                habits={habitsData}
                onEditHabit={handleEditHabit}
                onDeleteHabit={handleDeleteHabit}
              />
            )}

            {currentView === 'analytics' && (
              <>
                <div className="text-center py-12 text-subtext-light dark:text-subtext-dark">
                  <span className="material-icons text-6xl mb-4">analytics</span>
                  <p className="text-xl">Estadísticas y análisis</p>
                  <p className="text-sm mt-2">Próximamente...</p>
                </div>
              </>
            )}
          </div>
        </main>

        {/* Footer Navigation */}
        <Footer 
          onAddHabit={() => setShowNewHabitModal(true)}
          currentView={currentView}
          onChangeView={setCurrentView}
        />
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default App;
