import { useState, useEffect } from 'react';
import ProgressCard from './ProgressCard';
import { getProgresosMultiples } from '../services/api';

const ProgressDashboard = ({ habitos }) => {
  const [progresos, setProgresos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos'); // 'todos', 'alto', 'medio', 'bajo'
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchProgresos = async () => {
    if (!habitos || habitos.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const habitoIds = habitos.map(h => h.id);
      const progresosData = await getProgresosMultiples(habitoIds);
      setProgresos(progresosData);
    } catch (error) {
      console.error('Error al cargar progresos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    fetchProgresos();
  }, [habitos, refreshKey]);

  // Recargar datos cuando el componente se monta (útil al cambiar de vista)
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const getProgresoPromedio = () => {
    if (progresos.length === 0) return 0;
    
    const suma = progresos.reduce((acc, p) => {
      if (p.semanal && p.semanal.progreso_semanal !== undefined) {
        return acc + p.semanal.progreso_semanal;
      }
      return acc;
    }, 0);
    
    return Math.round(suma / progresos.length);
  };

  const getHabitosFiltrados = () => {
    if (filtro === 'todos') return habitos;
    
    return habitos.filter(habito => {
      const progreso = progresos.find(p => p.id === habito.id);
      if (!progreso || !progreso.semanal) return false;
      
      const porcentaje = progreso.semanal.progreso_semanal;
      
      if (filtro === 'alto') return porcentaje >= 70;
      if (filtro === 'medio') return porcentaje >= 40 && porcentaje < 70;
      if (filtro === 'bajo') return porcentaje < 40;
      
      return true;
    });
  };

  const habitosFiltrados = getHabitosFiltrados();
  const progresoPromedio = getProgresoPromedio();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!habitos || habitos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <span className="material-icons text-gray-300 text-6xl sm:text-8xl mb-4">
            insights
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
            No hay hábitos para mostrar
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Crea tu primer hábito para ver tu progreso aquí
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Card */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-4 sm:p-6 text-white relative">
            {/* Botón de actualizar en la esquina superior derecha */}
            <button
              onClick={handleRefresh}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="Actualizar datos"
              disabled={loading}
            >
              <span className={`material-icons ${loading ? 'animate-spin' : ''}`}>
                refresh
              </span>
            </button>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm opacity-90 mb-1">Progreso Promedio</p>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-3xl sm:text-4xl font-bold">{progresoPromedio}%</span>
                  <span className="material-icons text-2xl">trending_up</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm opacity-90 mb-1">Total de Hábitos</p>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-3xl sm:text-4xl font-bold">{habitos.length}</span>
                  <span className="material-icons text-2xl">emoji_events</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm opacity-90 mb-1">Activos Esta Semana</p>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-3xl sm:text-4xl font-bold">
                    {progresos.filter(p => p.semanal && p.semanal.completados > 0).length}
                  </span>
                  <span className="material-icons text-2xl">check_circle</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max sm:min-w-0">
            <button
              onClick={() => setFiltro('todos')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                filtro === 'todos'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Todos ({habitos.length})
            </button>
            <button
              onClick={() => setFiltro('alto')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                filtro === 'alto'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Alto Rendimiento (≥70%)
            </button>
            <button
              onClick={() => setFiltro('medio')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                filtro === 'medio'
                  ? 'bg-yellow-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Rendimiento Medio (40-69%)
            </button>
            <button
              onClick={() => setFiltro('bajo')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                filtro === 'bajo'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Necesita Atención (&lt;40%)
            </button>
          </div>
        </div>

        {/* Grid de Progress Cards */}
        {habitosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {habitosFiltrados.map(habito => (
              <ProgressCard key={habito.id} habito={habito} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
            <span className="material-icons text-gray-300 text-5xl sm:text-6xl mb-4">
              filter_alt_off
            </span>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              No hay hábitos en esta categoría
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Intenta con otro filtro para ver tus hábitos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressDashboard;
