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
  console.log('📤 Enviando al backend:', JSON.stringify(habitoData, null, 2));
  const response = await fetch(`${API_BASE_URL}/habitos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(habitoData),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('❌ Error del backend:', errorData);
  }
  
  return handleResponse(response);
};

/**
 * Actualizar un hábito existente
 * @param {string} id - ID del hábito
 * @param {Object} habitoData - Datos actualizados
 * @returns {Promise<Object>} Hábito actualizado
 */
export const updateHabito = async (id, habitoData) => {
  console.log('📝 Actualizando hábito:', id);
  console.log('📤 Datos a enviar:', JSON.stringify(habitoData, null, 2));
  
  const response = await fetch(`${API_BASE_URL}/habitos/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(habitoData),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('❌ Error al actualizar:', errorData);
  }
  
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
  // Normalizar frecuencia
  const frecuencia = (frontendHabito.frequency || 'diario').toLowerCase();
  const tipo_frecuencia = frecuencia === 'diario' ? 'Diaria' : 
                          frecuencia === 'semanal' ? 'Semanal' : 
                          frecuencia === 'mensual' ? 'Mensual' : 'Diaria';
  
  // Preparar datos básicos
  const data = {
    usuario: usuarioId,
    nombre: frontendHabito.name,
    dificultad: 'media',
    fecha_inicio: new Date().toISOString().split('T')[0],
    tipo_frecuencia: tipo_frecuencia,
    dias: frecuencia === 'semanal' ? (frontendHabito.days || []) : [],
    publico: false,
    activo: true,
    notificaciones: [],
    // ✨ NUEVOS CAMPOS: icono y color
    icono: frontendHabito.icon || 'fitness_center',
    color: frontendHabito.color || 'blue'
  };
  
  // Solo agregar descripción si no está vacía
  if (frontendHabito.description && frontendHabito.description.trim() !== '') {
    data.descripcion = frontendHabito.description;
  }
  
  // Solo agregar categoría si existe Y es un ObjectId válido (24 caracteres hex)
  if (frontendHabito.category && frontendHabito.category.length === 24) {
    data.categoria = frontendHabito.category;
  }
  
  return data;
};

/**
 * Mapear datos del backend al formato del frontend
 * @param {Object} backendHabito - Hábito del backend
 * @returns {Object} Hábito en formato frontend
 */
export const mapHabitoToFrontend = (backendHabito) => {
  // Normalizar frecuencia: "Diaria" -> "diario", "Semanal" -> "semanal", "Mensual" -> "mensual"
  const normalizeFrequency = (freq) => {
    if (!freq) return 'diario';
    const lower = freq.toLowerCase();
    if (lower === 'diaria') return 'diario';
    if (lower === 'semanal') return 'semanal';
    if (lower === 'mensual') return 'mensual';
    return lower;
  };

  // Normalizar categoría: Extraer nombre si es objeto, convertir a lowercase con guiones
  const normalizeCategory = (cat) => {
    console.log('🔍 Categoría del backend:', cat);
    console.log('🔍 Tipo de categoría:', typeof cat);
    
    if (!cat) return '';
    
    // Si es un objeto con nombre, usar el nombre
    const categoryName = typeof cat === 'object' ? cat.nombre : cat;
    if (!categoryName) return '';
    
    // Convertir a lowercase y reemplazar espacios con guiones
    const normalized = categoryName.toLowerCase().replace(/\s+/g, '-');
    console.log('✅ Categoría normalizada:', normalized);
    return normalized;
  };

  return {
    id: backendHabito.id,
    name: backendHabito.nombre,
    category: normalizeCategory(backendHabito.categoria),
    // ✨ Ahora icon y color vienen del backend
    icon: backendHabito.icono || 'fitness_center',
    color: backendHabito.color || 'blue',
    description: backendHabito.descripcion || '',
    frequency: normalizeFrequency(backendHabito.tipo_frecuencia),
    days: backendHabito.dias || [],
    // Campos adicionales del backend
    dificultad: backendHabito.dificultad,
    fecha_inicio: backendHabito.fecha_inicio,
    publico: backendHabito.publico,
    activo: backendHabito.activo
  };
};
