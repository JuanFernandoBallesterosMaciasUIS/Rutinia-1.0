/**
 * Servicio para gestionar datos visuales de hábitos en localStorage
 * (color, icono, etc. que no se envían al backend)
 */

const VISUAL_DATA_KEY = 'habitos_visual_data';
const COMPLETED_HABITS_KEY = 'completedHabits';

// ==================== DATOS VISUALES ====================

/**
 * Obtener todos los datos visuales de hábitos
 * @returns {Object} Objeto con id de hábito como clave y datos visuales como valor
 */
export const getVisualData = () => {
  const data = localStorage.getItem(VISUAL_DATA_KEY);
  return data ? JSON.parse(data) : {};
};

/**
 * Guardar datos visuales de un hábito
 * @param {string} habitoId - ID del hábito
 * @param {Object} visualData - { icon: string, color: string }
 */
export const saveVisualData = (habitoId, visualData) => {
  const allData = getVisualData();
  allData[habitoId] = {
    icon: visualData.icon,
    color: visualData.color
  };
  localStorage.setItem(VISUAL_DATA_KEY, JSON.stringify(allData));
};

/**
 * Obtener datos visuales de un hábito específico
 * @param {string} habitoId - ID del hábito
 * @returns {Object} { icon: string, color: string }
 */
export const getHabitoVisualData = (habitoId) => {
  const allData = getVisualData();
  return allData[habitoId] || { icon: 'fitness_center', color: 'blue' };
};

/**
 * Eliminar datos visuales de un hábito
 * @param {string} habitoId - ID del hábito
 */
export const deleteVisualData = (habitoId) => {
  const allData = getVisualData();
  delete allData[habitoId];
  localStorage.setItem(VISUAL_DATA_KEY, JSON.stringify(allData));
};

// ==================== HÁBITOS COMPLETADOS ====================

/**
 * Obtener todos los hábitos completados
 * @returns {Object} { 'YYYY-MM-DD': [habitoId1, habitoId2, ...] }
 */
export const getCompletedHabits = () => {
  const data = localStorage.getItem(COMPLETED_HABITS_KEY);
  return data ? JSON.parse(data) : {};
};

/**
 * Guardar hábitos completados
 * @param {Object} completedHabits - { 'YYYY-MM-DD': [habitoId1, habitoId2, ...] }
 */
export const saveCompletedHabits = (completedHabits) => {
  localStorage.setItem(COMPLETED_HABITS_KEY, JSON.stringify(completedHabits));
};

/**
 * Marcar/desmarcar un hábito como completado en una fecha
 * @param {string} habitoId - ID del hábito
 * @param {string} date - Fecha en formato YYYY-MM-DD
 * @param {boolean} completed - true para marcar, false para desmarcar
 */
export const toggleHabitCompletion = (habitoId, date, completed) => {
  const completedHabits = getCompletedHabits();
  
  if (!completedHabits[date]) {
    completedHabits[date] = [];
  }
  
  if (completed) {
    // Agregar si no existe
    if (!completedHabits[date].includes(habitoId)) {
      completedHabits[date].push(habitoId);
    }
  } else {
    // Remover
    completedHabits[date] = completedHabits[date].filter(id => id !== habitoId);
  }
  
  saveCompletedHabits(completedHabits);
  return completedHabits;
};

/**
 * Verificar si un hábito está completado en una fecha
 * @param {string} habitoId - ID del hábito
 * @param {string} date - Fecha en formato YYYY-MM-DD
 * @returns {boolean}
 */
export const isHabitCompleted = (habitoId, date) => {
  const completedHabits = getCompletedHabits();
  return completedHabits[date]?.includes(habitoId) || false;
};

/**
 * Limpiar todos los datos de localStorage
 */
export const clearAllData = () => {
  localStorage.removeItem(VISUAL_DATA_KEY);
  localStorage.removeItem(COMPLETED_HABITS_KEY);
};
