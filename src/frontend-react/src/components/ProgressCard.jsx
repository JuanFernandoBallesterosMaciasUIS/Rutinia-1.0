import { useState, useEffect } from 'react';
import { getProgresoSemanal, getProgresoMensual } from '../services/api';

const ProgressCard = ({ habito }) => {
  const [progresoSemanal, setProgresoSemanal] = useState(null);
  const [progresoMensual, setProgresoMensual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vistaActual, setVistaActual] = useState('semanal'); // 'semanal' o 'mensual'

  useEffect(() => {
    const fetchProgreso = async () => {
      if (!habito || !habito.id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const [semanal, mensual] = await Promise.all([
          getProgresoSemanal(habito.id),
          getProgresoMensual(habito.id)
        ]);
        
        setProgresoSemanal(semanal);
        setProgresoMensual(mensual);
      } catch (err) {
        console.error('Error al obtener progreso:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgreso();
  }, [habito]);

  const getProgressColor = (progreso) => {
    if (progreso >= 80) return 'bg-green-500';
    if (progreso >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressTextColor = (progreso) => {
    if (progreso >= 80) return 'text-green-600';
    if (progreso >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl shadow-md p-4 sm:p-6 border border-red-200">
        <p className="text-red-600 text-sm">Error: {error}</p>
      </div>
    );
  }

  const progresoActual = vistaActual === 'semanal' ? progresoSemanal : progresoMensual;
  
  if (!progresoActual) return null;

  const progresoPorcentaje = vistaActual === 'semanal' 
    ? progresoActual.progreso_semanal 
    : progresoActual.progreso_mensual;

  const completados = progresoActual.completados;
  const total = vistaActual === 'semanal' 
    ? progresoActual.total || 7 // Usar el total del backend, fallback a 7
    : progresoActual.registros_totales;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header con nombre del hábito */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="material-icons text-white text-2xl sm:text-3xl">
              {habito.icon || 'fitness_center'}
            </span>
            <h3 className="text-white font-bold text-base sm:text-lg truncate max-w-[150px] sm:max-w-none">
              {habito.name}
            </h3>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getProgressTextColor(progresoPorcentaje)} bg-white`}>
            {Math.round(progresoPorcentaje)}%
          </div>
        </div>
      </div>

      {/* Tabs para cambiar vista */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setVistaActual('semanal')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            vistaActual === 'semanal'
              ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          📅 Semanal
        </button>
        <button
          onClick={() => setVistaActual('mensual')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            vistaActual === 'mensual'
              ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          📆 Mensual
        </button>
      </div>

      {/* Body con progreso */}
      <div className="p-4 sm:p-6">
        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              {completados} de {total} completados
            </span>
            <span className={`text-sm sm:text-base font-bold ${getProgressTextColor(progresoPorcentaje)}`}>
              {Math.round(progresoPorcentaje)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getProgressColor(progresoPorcentaje)}`}
              style={{ width: `${Math.min(progresoPorcentaje, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="material-icons text-indigo-600 text-lg">calendar_today</span>
              <span className="text-xs text-gray-500 uppercase font-semibold">Período</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
              {vistaActual === 'semanal' 
                ? `${new Date(progresoSemanal.inicio_semana).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} - ${new Date(progresoSemanal.fin_semana).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}`
                : `${new Date(progresoMensual.inicio_mes).toLocaleDateString('es-ES', { month: 'long' })}`
              }
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="material-icons text-green-600 text-lg">check_circle</span>
              <span className="text-xs text-gray-500 uppercase font-semibold">Completados</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">
              {completados}
              <span className="text-sm sm:text-base text-gray-500 ml-1">/ {total}</span>
            </p>
          </div>
        </div>

        {/* Mensaje motivacional */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          {progresoPorcentaje >= 80 && (
            <div className="flex items-center space-x-2 text-green-600">
              <span className="material-icons text-lg">emoji_events</span>
              <p className="text-xs sm:text-sm font-medium">¡Excelente progreso! Sigue así 🎉</p>
            </div>
          )}
          {progresoPorcentaje >= 50 && progresoPorcentaje < 80 && (
            <div className="flex items-center space-x-2 text-yellow-600">
              <span className="material-icons text-lg">trending_up</span>
              <p className="text-xs sm:text-sm font-medium">¡Buen trabajo! Puedes lograrlo 💪</p>
            </div>
          )}
          {progresoPorcentaje < 50 && (
            <div className="flex items-center space-x-2 text-orange-600">
              <span className="material-icons text-lg">flag</span>
              <p className="text-xs sm:text-sm font-medium">¡Vamos! Tú puedes mejorar 🚀</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
