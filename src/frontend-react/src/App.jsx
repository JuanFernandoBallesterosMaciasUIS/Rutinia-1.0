import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HabitCard from './components/HabitCard';
import NewHabitModal from './components/NewHabitModal';
import EditHabitModal from './components/EditHabitModal';
import Calendar from './components/Calendar';
import HabitsView from './components/HabitsView';
import ProgressDashboard from './components/ProgressDashboard';
import Login from './components/Login';
import EditProfile from './components/EditProfile';
import { habitsData as initialHabitsData } from './data/habitsData';
import * as api from './services/api';
import * as localStorageService from './services/localStorage';

// 🔧 Función helper para normalizar nombres de días
// Convierte abreviaturas ('lun', 'mar') a nombres completos ('Lunes', 'Martes')
const normalizeDayName = (day) => {
  const dayMap = {
    'dom': 'Domingo',
    'lun': 'Lunes',
    'mar': 'Martes',
    'mie': 'Miercoles',
    'jue': 'Jueves',
    'vie': 'Viernes',
    'sab': 'Sabado',
    // También aceptar nombres completos (por si acaso)
    'Domingo': 'Domingo',
    'Lunes': 'Lunes',
    'Martes': 'Martes',
    'Miercoles': 'Miercoles',
    'Jueves': 'Jueves',
    'Viernes': 'Viernes',
    'Sabado': 'Sabado'
  };
  return dayMap[day] || day;
};

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
  // Estado de autenticación
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('today'); // 'today', 'calendar', 'habits', 'analytics'
  const [showNewHabitModal, setShowNewHabitModal] = useState(false);
  const [showEditHabitModal, setShowEditHabitModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [currentEditHabit, setCurrentEditHabit] = useState(null);
  const [habitsData, setHabitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedHabits, setCompletedHabits] = useState(() => {
    return localStorageService.getCompletedHabits();
  });

  // Función auxiliar para obtener el ID del usuario actual
  const getUserId = () => {
    return usuario?.id || usuario?._id || null;
  };

  // Verificar si hay usuario guardado en localStorage al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('usuario');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUsuario(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error al parsear usuario:', error);
        localStorage.removeItem('usuario');
      }
    }
  }, []);

  // Cargar hábitos del backend al iniciar (solo si está autenticado)
  useEffect(() => {
    if (isAuthenticated && usuario) {
      loadHabitsFromBackend();
    }
  }, [isAuthenticated, usuario]);

  // Función para cargar hábitos del backend
  const loadHabitsFromBackend = async () => {
    try {
      setLoading(true);
      
      // Obtener el ID del usuario
      const userId = usuario?.id || usuario?._id;
      
      if (!userId) {
        console.error('❌ No se encontró el ID del usuario');
        setHabitsData([]);
        setLoading(false);
        return;
      }
      
      console.log('🔍 Cargando hábitos para el usuario:', userId);
      
      // Obtener solo los hábitos del usuario actual
      const backendHabits = await api.getHabitos({ usuarioId: userId });
      
      console.log(`✅ Se encontraron ${backendHabits.length} hábitos del usuario`);
      
      // Mapear hábitos del backend al formato frontend
      const mappedHabits = backendHabits.map(habit => 
        api.mapHabitoToFrontend(habit)
      );
      
      setHabitsData(mappedHabits);
    } catch (error) {
      console.error('Error al cargar hábitos:', error);
      setHabitsData([]);
      showErrorMessage('No se pudieron cargar los hábitos. Verifica que el servidor esté corriendo en http://localhost:8000');
    } finally {
      setLoading(false);
    }
  };

  // Cargar tema guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // 🆕 Efecto para inicializar registros del día automáticamente
  useEffect(() => {
    const initializeDailyRecords = async () => {
      if (habitsData.length === 0) return; // Esperar a que carguen los hábitos
      
      const today = getCurrentDateString();
      const currentDay = getDayOfWeek(new Date());
      
      // Obtener hábitos que aplican para hoy (misma lógica que habitAppliesToToday)
      const todayHabitsToInit = habitsData.filter(habit => {
        const frequency = (habit.frequency || '').toLowerCase();
        
        if (frequency === 'diario' || frequency === 'diaria') {
          return true;
        } else if (frequency === 'semanal') {
          // Verificar que el hábito tenga días configurados y que hoy esté incluido
          if (!habit.days || habit.days.length === 0) {
            return false;
          }
          // 🔧 NORMALIZAR LOS DÍAS: Convertir 'lun' -> 'Lunes', etc.
          const normalizedHabitDays = habit.days.map(day => normalizeDayName(day));
          return normalizedHabitDays.includes(currentDay);
        } else if (frequency === 'mensual') {
          // Los hábitos mensuales se muestran todos los días del mes
          // La lógica de "ya completado" se maneja después al consultar el backend
          return true;
        }
        return false;
      });
      
      console.log(`📅 Inicializando registros para ${today}...`);
      console.log(`📋 Hábitos del día: ${todayHabitsToInit.length}`);
      
      // Para cada hábito del día, verificar si ya tiene registro
      for (const habit of todayHabitsToInit) {
        const alreadyCompleted = completedHabits[today]?.includes(habit.id) || false;
        
        // Verificar si el hábito ya tiene registro en el backend
        try {
          const registros = await api.getRegistros(habit.id);
          const registroHoy = registros.find(r => r.fecha === today);
          
          if (!registroHoy) {
            // No existe registro, crear uno en false
            console.log(`➕ Creando registro en false para: ${habit.name}`);
            await api.toggleHabitoCompletado(habit.id, today, false);
          } else {
            console.log(`✓ Registro ya existe para: ${habit.name} (estado: ${registroHoy.estado})`);
            
            // Sincronizar con localStorage si el backend tiene el registro en true
            if (registroHoy.estado && !alreadyCompleted) {
              const newCompletedHabits = localStorageService.toggleHabitCompletion(habit.id, today, true);
              setCompletedHabits(newCompletedHabits);
            }
          }
        } catch (error) {
          console.error(`Error al verificar registro de ${habit.name}:`, error);
        }
      }
    };
    
    // Ejecutar solo cuando cambien los hábitos
    initializeDailyRecords();
  }, [habitsData]); // Solo cuando cambian los hábitos

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

  // Manejar login exitoso
  const handleLoginSuccess = (userData) => {
    setUsuario(userData);
    setIsAuthenticated(true);
    console.log('✅ Usuario autenticado:', userData);
  };

  // Manejar logout
  const handleLogout = () => {
    setUsuario(null);
    setIsAuthenticated(false);
    localStorage.removeItem('usuario');
    setHabitsData([]);
    setCompletedHabits({});
    setCurrentView('today');
    console.log('👋 Sesión cerrada');
  };

  // Manejar actualización de perfil
  const handleUpdateProfile = (updatedUser) => {
    setUsuario(updatedUser);
    console.log('✅ Perfil actualizado:', updatedUser);
    // Mostrar mensaje de éxito
    showSuccessMessage('Perfil actualizado correctamente');
  };

  // Funciones para obtener día y fecha
  const getDayOfWeek = (date = new Date()) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
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
    const todayStr = getCurrentDateString();
    
    // Convertir a minúsculas para comparación
    const frequency = (habit.frequency || '').toLowerCase();
    
    if (frequency === 'diario' || frequency === 'diaria') {
      return true;
    } else if (frequency === 'semanal') {
      // Verificar que el hábito tenga días configurados y que hoy esté incluido
      if (!habit.days || habit.days.length === 0) {
        console.warn(`⚠️ Hábito semanal "${habit.name}" no tiene días configurados`);
        return false;
      }
      
      // 🔧 NORMALIZAR LOS DÍAS: Convertir 'lun' -> 'Lunes', etc.
      const normalizedHabitDays = habit.days.map(day => normalizeDayName(day));
      const applies = normalizedHabitDays.includes(currentDay);
      
      console.log(`📅 Hábito "${habit.name}"`);
      console.log(`   Días originales: [${habit.days.join(', ')}]`);
      console.log(`   Días normalizados: [${normalizedHabitDays.join(', ')}]`);
      console.log(`   Hoy: ${currentDay}`);
      console.log(`   Aplica: ${applies}`);
      
      return applies;
    } else if (frequency === 'mensual') {
      // 🔧 HÁBITOS MENSUALES: Se muestran todos los días del mes hasta que se completen
      // Una vez completado en CUALQUIER día del mes, no se vuelven a mostrar en ese mes
      
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      // Verificar si ya se completó en algún día de este mes
      let completadoEsteMes = false;
      
      for (const dateStr in completedHabits) {
        if (completedHabits[dateStr]?.includes(habit.id)) {
          // Parsear la fecha del registro completado
          const [year, month, day] = dateStr.split('-').map(Number);
          const completedDate = new Date(year, month - 1, day);
          
          // Verificar si es del mismo mes y año
          if (completedDate.getMonth() === currentMonth && 
              completedDate.getFullYear() === currentYear) {
            // Verificar si fue completado en un día ANTERIOR a hoy
            const todayDateOnly = new Date(currentYear, currentMonth, today.getDate());
            const completedDateOnly = new Date(year, month - 1, day);
            
            if (completedDateOnly < todayDateOnly) {
              // Fue completado en un día anterior de este mes
              completadoEsteMes = true;
              break;
            }
          }
        }
      }
      
      // Si ya se completó en un día anterior de este mes, no mostrarlo
      if (completadoEsteMes) {
        return false;
      }
      
      // Si no se ha completado o se completó hoy, mostrarlo
      return true;
    }
    return false;
  };

  // Verificar si un hábito está completado hoy
  const isHabitCompletedToday = (habitId) => {
    const dateStr = getCurrentDateString();
    return completedHabits[dateStr]?.includes(habitId) || false;
  };

  // Toggle completar hábito
  const toggleHabitCompletion = async (habitId, dateStr = null) => {
    const date = dateStr || getCurrentDateString();
    const wasCompleted = completedHabits[date]?.includes(habitId) || false;
    const newStatus = !wasCompleted;
    
    // Actualizar localStorage inmediatamente (optimistic update)
    const newCompletedHabits = localStorageService.toggleHabitCompletion(habitId, date, newStatus);
    setCompletedHabits(newCompletedHabits);
    
    // Sincronizar con backend usando el nuevo endpoint que previene duplicados
    try {
      await api.toggleHabitoCompletado(habitId, date, newStatus);
      showSuccessMessage(newStatus ? '¡Hábito completado! 🎉' : 'Hábito desmarcado');
    } catch (error) {
      console.error('Error al sincronizar con backend:', error);
      // Revertir el cambio en localStorage si falla
      const revertedHabits = localStorageService.toggleHabitCompletion(habitId, date, wasCompleted);
      setCompletedHabits(revertedHabits);
      showErrorMessage('Error al guardar. Intenta de nuevo.');
    }
  };

  // Obtener hábitos del día
  const todayHabits = habitsData.filter(habit => habitAppliesToToday(habit));

  // Manejar creación de nuevo hábito
  const handleCreateHabit = async (newHabitData) => {
    try {
      const userId = getUserId();
      
      if (!userId) {
        showErrorMessage('No se pudo identificar el usuario. Por favor, inicia sesión nuevamente.');
        return;
      }
      
      // ✨ Mapear al formato del backend (INCLUYE icon y color)
      const backendData = api.mapHabitoToBackend(newHabitData, userId);
      
      // Crear en el backend
      const createdHabit = await api.createHabito(backendData);
      
      // ✨ Mapear de vuelta al frontend (icon y color ya vienen del backend)
      const frontendHabit = api.mapHabitoToFrontend(createdHabit);
      setHabitsData([...habitsData, frontendHabit]);
      
      setShowNewHabitModal(false);
      showSuccessMessage('¡Hábito creado exitosamente!');
    } catch (error) {
      console.error('Error al crear hábito:', error);
      showErrorMessage('Error al crear el hábito. Intenta de nuevo.');
    }
  };

  // Manejar edición de hábito
  const handleEditHabit = async (editedHabitData) => {
    try {
      const userId = getUserId();
      
      if (!userId) {
        showErrorMessage('No se pudo identificar el usuario. Por favor, inicia sesión nuevamente.');
        return;
      }
      
      // ✨ Mapear al formato del backend (INCLUYE icon y color)
      const backendData = api.mapHabitoToBackend(editedHabitData, userId);
      
      // Actualizar en el backend
      const updatedHabit = await api.updateHabito(editedHabitData.id, backendData);
      
      // ✨ Actualizar en el estado local (icon y color vienen del backend)
      const frontendHabit = api.mapHabitoToFrontend(updatedHabit);
      const updatedHabits = habitsData.map(habit =>
        habit.id === editedHabitData.id ? frontendHabit : habit
      );
      setHabitsData(updatedHabits);
      
      setShowEditHabitModal(false);
      setCurrentEditHabit(null);
      showSuccessMessage('¡Hábito actualizado exitosamente!');
    } catch (error) {
      console.error('Error al actualizar hábito:', error);
      showErrorMessage('Error al actualizar el hábito. Intenta de nuevo.');
    }
  };

  // Manejar eliminación de hábito
  const handleDeleteHabit = async (habitId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este hábito?')) {
      try {
        // Eliminar del backend
        await api.deleteHabito(habitId);
        
        // ✨ YA NO necesitamos eliminar de localStorage (icon y color están en backend)
        
        // Actualizar estado local
        const updatedHabits = habitsData.filter(habit => habit.id !== habitId);
        setHabitsData(updatedHabits);
        
        setShowEditHabitModal(false);
        setCurrentEditHabit(null);
        showSuccessMessage('Hábito eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar hábito:', error);
        showErrorMessage('Error al eliminar el hábito. Intenta de nuevo.');
      }
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

  // Mostrar mensaje de error
  const showErrorMessage = (message) => {
    const event = new CustomEvent('showToast', { detail: { message } });
    window.dispatchEvent(event);
  };

  return (
    <div className="relative w-full min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Mostrar Login si no está autenticado */}
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Indicador de carga */}
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-card-light dark:bg-card-dark rounded-lg p-8 flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                <p className="text-text-light dark:text-text-dark font-semibold">Cargando hábitos...</p>
              </div>
            </div>
          )}
          
          {/* Sidebar */}
          <Sidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            onLogout={handleLogout}
            usuario={usuario}
            onEditProfile={() => setShowEditProfileModal(true)}
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

      {/* Modal para editar perfil */}
      <EditProfile
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        usuario={usuario}
        onUpdateSuccess={handleUpdateProfile}
      />

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
                  {currentView === 'habits' && 'Todos mis hábitos'}
                  {currentView === 'analytics' && 'Dashboard de Progreso'}
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal con padding para header y footer */}
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-40 sm:pb-36 lg:pb-16">
          <div>
            {currentView === 'today' && (
              <div>
                {/* Grid de hábitos */}
                <div className="habits-grid mb-8">
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
                        onComplete={toggleHabitCompletion}
                        onEdit={openEditModal}
                        showCompleteButton={true}
                      />
                    ))
                  )}
                </div>
              </div>
            )}

            {currentView === 'calendar' && (
              <Calendar 
                habitsData={habitsData}
                completedHabits={completedHabits}
              />
            )}

            {currentView === 'habits' && (
              <HabitsView 
                habits={habitsData}
                onEditHabit={openEditModal}
                onDeleteHabit={handleDeleteHabit}
              />
            )}

            {currentView === 'analytics' && (
              <ProgressDashboard habitos={habitsData} />
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
      </>
      )}
    </div>
  );
}

export default App;
