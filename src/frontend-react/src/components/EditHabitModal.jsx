import { useState, useEffect } from 'react';
import { availableIcons, availableColors, categories, frequencies, daysOfWeek } from '../data/habitsData';

const EditHabitModal = ({ isOpen, onClose, onSubmit, onDelete, habitData }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    icon: '',
    color: '',
    description: '',
    frequency: 'diario',
    days: []
  });

  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  // Pre-llenar formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen && habitData) {
      setFormData({
        id: habitData.id,
        name: habitData.name,
        category: habitData.category || '',
        icon: habitData.icon,
        color: habitData.color,
        description: habitData.description || '',
        frequency: habitData.frequency?.toLowerCase() || 'diario',
        days: habitData.days || []
      });
      setSelectedIcon(habitData.icon);
      setSelectedColor(habitData.color);
      setSelectedDays(habitData.days || []);
    }
  }, [isOpen, habitData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setFormData(prev => ({ ...prev, icon }));
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setFormData(prev => ({ ...prev, color }));
  };

  const handleDayToggle = (day) => {
    let newDays;
    if (selectedDays.includes(day)) {
      newDays = selectedDays.filter(d => d !== day);
    } else {
      newDays = [...selectedDays, day];
    }
    setSelectedDays(newDays);
    setFormData(prev => ({ ...prev, days: newDays }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.icon) {
      alert('Por favor selecciona un icono');
      return;
    }

    if (!formData.color) {
      alert('Por favor selecciona un color');
      return;
    }

    if (formData.frequency === 'semanal' && selectedDays.length === 0) {
      alert('Por favor selecciona al menos un día de la semana');
      return;
    }

    onSubmit(formData);
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este hábito?')) {
      onDelete(formData.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card-light dark:bg-card-dark rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card-light dark:bg-card-dark border-b border-gray-200 dark:border-gray-700 p-6 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
              Editar Hábito
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <span className="material-icons text-text-light dark:text-text-dark">close</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Nombre del hábito *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ej: Hacer ejercicio"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Sin categoría</option>
              <option value="salud">Salud</option>
              <option value="productividad">Productividad</option>
              <option value="finanzas">Finanzas</option>
              <option value="relaciones">Relaciones</option>
              <option value="creatividad">Creatividad</option>
            </select>
          </div>

          {/* Selector de Icono */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Icono *
            </label>
            <div className="grid grid-cols-6 gap-2">
              {availableIcons.map((iconObj) => (
                <button
                  key={iconObj.name}
                  type="button"
                  onClick={() => handleIconSelect(iconObj.name)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedIcon === iconObj.name
                      ? 'border-primary bg-primary bg-opacity-10'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary'
                  }`}
                >
                  <span className="material-icons text-2xl text-text-light dark:text-text-dark">
                    {iconObj.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selector de Color */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Color *
            </label>
            <div className="grid grid-cols-6 gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorSelect(color)}
                  className={`h-12 rounded-lg border-2 transition-all ${
                    selectedColor === color
                      ? 'border-text-light dark:border-text-dark scale-110'
                      : 'border-transparent hover:scale-105'
                  } bg-${color}-500`}
                />
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Agrega una descripción opcional..."
            />
          </div>

          {/* Frecuencia */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Frecuencia
            </label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="diario">Diario</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
            </select>
          </div>

          {/* Selector de días (solo si es semanal) */}
          {formData.frequency === 'semanal' && (
            <div>
              <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                Días de la semana *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {weekDays.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedDays.includes(day)
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-icons">delete</span>
              <span>Eliminar</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-text-light dark:text-text-dark font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHabitModal;
