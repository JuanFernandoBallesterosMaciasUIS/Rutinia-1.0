// Configuración de la API
const API_BASE_URL = 'http://localhost:8000/api';

// Helper para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error en la petición');
  }
  return response.json();
};

// ==================== HÁBITOS ====================

/**
 * Obtener todos los hábitos del usuario
 * @param {string} usuarioId - ID del usuario (opcional, si no se usa autenticación)
 * @returns {Promise<Array>} Lista de hábitos
 */
export const getHabitos = async (usuarioId = null) => {
  const url = usuarioId 
    ? `${API_BASE_URL}/habitos/?usuario=${usuarioId}`
    : `${API_BASE_URL}/habitos/`;
  
  const response = await fetch(url);
  return handleResponse(response);
};

/**
 * Obtener un hábito específico por ID
 * @param {string} id - ID del hábito
 * @returns {Promise<Object>} Hábito
 */
export const getHabito = async (id) => {
  const response = await fetch(`${API_BASE_URL}/habitos/${id}/`);
  return handleResponse(response);
};

/**
 * Crear un nuevo hábito
 * @param {Object} habitoData - Datos del hábito
 * @returns {Promise<Object>} Hábito creado
 */
export const createHabito = async (habitoData) => {
  const response = await fetch(`${API_BASE_URL}/habitos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(habitoData),
  });
  return handleResponse(response);
};

/**
 * Actualizar un hábito existente
 * @param {string} id - ID del hábito
 * @param {Object} habitoData - Datos actualizados
 * @returns {Promise<Object>} Hábito actualizado
 */
export const updateHabito = async (id, habitoData) => {
  const response = await fetch(`${API_BASE_URL}/habitos/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(habitoData),
  });
  return handleResponse(response);
};

/**
 * Eliminar un hábito
 * @param {string} id - ID del hábito
 * @returns {Promise<void>}
 */
export const deleteHabito = async (id) => {
  const response = await fetch(`${API_BASE_URL}/habitos/${id}/`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Error al eliminar el hábito');
  }
};

// ==================== REGISTROS DE HÁBITOS ====================

/**
 * Obtener registros de hábitos (completados)
 * @param {string} habitoId - ID del hábito (opcional)
 * @returns {Promise<Array>} Lista de registros
 */
export const getRegistros = async (habitoId = null) => {
  const url = habitoId
    ? `${API_BASE_URL}/registros/?habito=${habitoId}`
    : `${API_BASE_URL}/registros/`;
  
  const response = await fetch(url);
  return handleResponse(response);
};

/**
 * Crear un registro de hábito (marcar como completado)
 * @param {Object} registroData - { habito: id, fecha: 'YYYY-MM-DD', estado: true }
 * @returns {Promise<Object>} Registro creado
 */
export const createRegistro = async (registroData) => {
  const response = await fetch(`${API_BASE_URL}/registros/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registroData),
  });
  return handleResponse(response);
};

/**
 * Actualizar un registro de hábito
 * @param {string} id - ID del registro
 * @param {Object} registroData - Datos actualizados
 * @returns {Promise<Object>} Registro actualizado
 */
export const updateRegistro = async (id, registroData) => {
  const response = await fetch(`${API_BASE_URL}/registros/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registroData),
  });
  return handleResponse(response);
};

/**
 * Eliminar un registro de hábito
 * @param {string} id - ID del registro
 * @returns {Promise<void>}
 */
export const deleteRegistro = async (id) => {
  const response = await fetch(`${API_BASE_URL}/registros/${id}/`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Error al eliminar el registro');
  }
};

// ==================== CATEGORÍAS ====================

/**
 * Obtener todas las categorías
 * @returns {Promise<Array>} Lista de categorías
 */
export const getCategorias = async () => {
  const response = await fetch(`${API_BASE_URL}/categorias/`);
  return handleResponse(response);
};

/**
 * Crear una nueva categoría
 * @param {Object} categoriaData - { nombre: string }
 * @returns {Promise<Object>} Categoría creada
 */
export const createCategoria = async (categoriaData) => {
  const response = await fetch(`${API_BASE_URL}/categorias/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoriaData),
  });
  return handleResponse(response);
};

// ==================== HELPERS ====================

/**
 * Mapear datos del frontend al formato del backend
 * @param {Object} frontendHabito - Hábito con formato del frontend
 * @param {string} usuarioId - ID del usuario (temporal, hasta tener auth)
 * @returns {Object} Hábito en formato backend
 */
export const mapHabitoToBackend = (frontendHabito, usuarioId = '507f1f77bcf86cd799439011') => {
  return {
    usuario: usuarioId,
    categoria: frontendHabito.category || null, // ID de categoría
    nombre: frontendHabito.name,
    descripcion: frontendHabito.description || '',
    dificultad: 'media', // Valor por defecto
    fecha_inicio: new Date().toISOString().split('T')[0], // Fecha actual YYYY-MM-DD
    tipo_frecuencia: frontendHabito.frequency,
    dias: frontendHabito.frequency === 'semanal' ? frontendHabito.days : [],
    publico: false,
    activo: true,
    notificaciones: []
  };
};

/**
 * Mapear datos del backend al formato del frontend
 * @param {Object} backendHabito - Hábito del backend
 * @param {Object} visualData - Datos visuales del localStorage (color, icono)
 * @returns {Object} Hábito en formato frontend
 */
export const mapHabitoToFrontend = (backendHabito, visualData = {}) => {
  return {
    id: backendHabito.id,
    name: backendHabito.nombre,
    category: backendHabito.categoria?.nombre || backendHabito.categoria || '',
    icon: visualData.icon || 'fitness_center',
    color: visualData.color || 'blue',
    description: backendHabito.descripcion || '',
    frequency: backendHabito.tipo_frecuencia,
    days: backendHabito.dias || [],
    // Campos adicionales del backend
    dificultad: backendHabito.dificultad,
    fecha_inicio: backendHabito.fecha_inicio,
    publico: backendHabito.publico,
    activo: backendHabito.activo
  };
};
