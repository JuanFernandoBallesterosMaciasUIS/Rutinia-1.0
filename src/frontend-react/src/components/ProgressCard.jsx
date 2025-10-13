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
      
      // Log para ver la estructura del hábito
      console.log('Estructura del hábito:', habito);
      
      setLoading(true);
      setError(null);
      
      try {
        const [semanal, mensual] = await Promise.all([
          getProgresoSemanal(habito.id),
          getProgresoMensual(habito.id)
        ]);
        
        // Log para debugging
        console.log('Progreso semanal para', habito.name, ':', {
          inicio: semanal.inicio_semana,
          fin: semanal.fin_semana,
          completados: semanal.completados,
          total: semanal.total,
          progreso: semanal.progreso_semanal
        });
        
        console.log('Progreso mensual para', habito.name, ':', mensual);
        console.log('Campos del progreso mensual:', {
          inicio: mensual.inicio_mes,
          fin: mensual.fin_mes,
          completados: mensual.completados,
          total: mensual.total,
          registros_totales: mensual.registros_totales,
          progreso: mensual.progreso_mensual,
          todosLosCampos: Object.keys(mensual)
        });
        
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

  // Calcular el porcentaje de progreso
  const completados = progresoActual.completados;
  
  // Calcular el total correcto en el frontend si el backend envía 0
  let total = vistaActual === 'semanal' 
    ? progresoActual.total 
    : (progresoActual.total || progresoActual.registros_totales || 0);

  // Si el total es 0, calcularlo basándose en la frecuencia del hábito
  if (total === 0 && habito.frequency) {
    if (vistaActual === 'semanal') {
      // Calcular total semanal
      if (habito.frequency === 'diario' || habito.frequency === 'Diario') {
        total = 7; // Todos los días de la semana
      } else if (habito.frequency === 'semanal' || habito.frequency === 'Semanal') {
        total = habito.days && habito.days.length > 0 ? habito.days.length : 1;
      } else if (habito.frequency === 'mensual' || habito.frequency === 'Mensual') {
        total = 1; // Una vez por semana para hábitos mensuales
      }
    } else {
      // Calcular total mensual
      const hoy = new Date();
      const diasEnMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
      
      if (habito.frequency === 'diario' || habito.frequency === 'Diario') {
        total = diasEnMes; // Todos los días del mes
      } else if (habito.frequency === 'semanal' || habito.frequency === 'Semanal') {
        // Aproximadamente 4 semanas por mes
        const diasPorSemana = habito.days && habito.days.length > 0 ? habito.days.length : 1;
        total = Math.ceil(diasEnMes / 7) * diasPorSemana;
      } else if (habito.frequency === 'mensual' || habito.frequency === 'Mensual') {
        total = 1; // Una vez al mes
      }
    }
  }

  // Debug: ver qué valores estamos usando
  console.log(`[${habito.name}] Vista: ${vistaActual}, Completados: ${completados}, Total: ${total}`);
  console.log(`[${habito.name}] Objeto completo progresoActual:`, JSON.stringify(progresoActual, null, 2));

  // Usar el porcentaje del backend, pero recalcular si es necesario
  let progresoPorcentaje = vistaActual === 'semanal' 
    ? progresoActual.progreso_semanal 
    : progresoActual.progreso_mensual;

  // Si el porcentaje es 0 pero hay completados, recalcular
  if (progresoPorcentaje === 0 && completados > 0 && total > 0) {
    progresoPorcentaje = (completados / total) * 100;
  }

  // Asegurarse de que no sea NaN
  if (isNaN(progresoPorcentaje)) {
    progresoPorcentaje = 0;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header con nombre del hábito */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 sm:p-6">
        <div className="flex items-center space-x-3">
          <span className="material-icons text-white text-2xl sm:text-3xl">
            {habito.icon || 'fitness_center'}
          </span>
          <h3 className="text-white font-bold text-base sm:text-lg truncate max-w-[150px] sm:max-w-none">
            {habito.name}
          </h3>
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
            <p className="text-xs sm:text-sm font-medium text-gray-800">
              {vistaActual === 'semanal' 
                ? (() => {
                    // Parsear fechas correctamente (YYYY-MM-DD)
                    const [yearInicio, mesInicio, diaInicio] = progresoSemanal.inicio_semana.split('-').map(Number);
                    const [yearFin, mesFin, diaFin] = progresoSemanal.fin_semana.split('-').map(Number);
                    
                    const inicio = new Date(yearInicio, mesInicio - 1, diaInicio);
                    const fin = new Date(yearFin, mesFin - 1, diaFin);
                    
                    // Formatear como "6 - 12 de octubre"
                    const nombreMesInicio = inicio.toLocaleDateString('es-ES', { month: 'long' });
                    const nombreMesFin = fin.toLocaleDateString('es-ES', { month: 'long' });
                    
                    if (nombreMesInicio === nombreMesFin) {
                      return `${diaInicio} - ${diaFin} de ${nombreMesInicio}`;
                    } else {
                      return `${diaInicio} ${inicio.toLocaleDateString('es-ES', { month: 'short' })} - ${diaFin} ${fin.toLocaleDateString('es-ES', { month: 'short' })}`;
                    }
                  })()
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
      </div>
    </div>
  );
};

export default ProgressCard;
