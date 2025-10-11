import { useState, useEffect } from 'react';
import { availableIcons, availableColors, categories, frequencies, daysOfWeek } from '../data/habitsData';

function EditHabitModal({ isOpen, onClose, onSubmit, onDelete, habitData }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    icon: '',
    color: '',
    description: '',
    frequency: '',
    days: []
  });

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    if (isOpen && habitData) {
      setFormData({
        id: habitData.id,
        name: habitData.name,
        category: habitData.category,
        icon: habitData.icon,
        color: habitData.color,
        description: habitData.description || '',
        frequency: habitData.frequency,
        days: habitData.days || []
      });
      setSelectedIcon(habitData.icon);
      setSelectedColor(habitData.color);
      setSelectedDays(habitData.days || []);
    }
  }, [isOpen, habitData]);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setFormData({ ...formData, icon });
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setFormData({ ...formData, color });
  };

  const handleDayToggle = (day) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newDays);
    setFormData({ ...formData, days: newDays });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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

  const getIconColorClass = (iconName) => {
    const icon = availableIcons.find(i => i.name === iconName);
    const colorMap = {
      indigo: 'text-indigo-500',
      green: 'text-green-500',
      blue: 'text-blue-500',
      purple: 'text-purple-500',
      red: 'text-red-500',
      yellow: 'text-yellow-500',
      pink: 'text-pink-500',
      orange: 'text-orange-500',
      gray: 'text-gray-600',
      brown: 'text-brown-500'
    };
    return icon ? colorMap[icon.color] || 'text-gray-600' : 'text-gray-600';
  };

  const getColorBgClass = (color) => {
    const colorMap = {
      indigo: 'bg-indigo-100 dark:bg-indigo-900',
      green: 'bg-green-100 dark:bg-green-900',
      blue: 'bg-blue-100 dark:bg-blue-900',
      purple: 'bg-purple-100 dark:bg-purple-900',
      red: 'bg-red-100 dark:bg-red-900',
      yellow: 'bg-yellow-100 dark:bg-yellow-900',
      pink: 'bg-pink-100 dark:bg-pink-900',
      orange: 'bg-orange-100 dark:bg-orange-900'
    };
    return colorMap[color] || colorMap.blue;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card-light dark:bg-card-dark rounded-large p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Editar Hábito</h2>
          <button 
            className="text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark"
            onClick={onClose}
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre del hábito */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Nombre del hábito *
            </label>
            <input 
              type="text" 
              required
              placeholder="Ej: Hacer ejercicio"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Categoría *
            </label>
            <select 
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Icono */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Icono *
            </label>
            <div className="grid grid-cols-6 gap-2">
              {availableIcons.map(icon => (
                <button 
                  key={icon.name}
                  type="button"
                  onClick={() => handleIconSelect(icon.name)}
                  className={`p-3 rounded-lg border-2 hover:border-primary transition-all ${
                    selectedIcon === icon.name
                      ? 'border-primary bg-primary bg-opacity-10'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <span className={`material-icons ${getIconColorClass(icon.name)}`}>
                    {icon.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Color *
            </label>
            <div className="grid grid-cols-8 gap-2">
              {availableColors.map(color => (
                <button 
                  key={color}
                  type="button"
                  onClick={() => handleColorSelect(color)}
                  className={`w-10 h-10 rounded-lg border-2 hover:scale-110 transition-transform ${getColorBgClass(color)} ${
                    selectedColor === color
                      ? 'ring-4 ring-primary'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Frecuencia */}
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Frecuencia *
            </label>
            <select 
              required
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="">Selecciona la frecuencia</option>
              {frequencies.map(freq => (
                <option key={freq.value} value={freq.value}>{freq.label}</option>
              ))}
            </select>
          </div>

          {/* Selector de días (solo visible cuando es semanal) */}
          {formData.frequency === 'semanal' && (
            <div>
              <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                Días de la semana *
              </label>
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map(day => (
                  <button 
                    key={day.value}
                    type="button"
                    onClick={() => handleDayToggle(day.value)}
                    className={`px-2 py-3 rounded-lg border-2 hover:border-primary transition-all text-center ${
                      selectedDays.includes(day.value)
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <span className="text-xs font-semibold">{day.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-subtext-light dark:text-subtext-dark mt-2">
                Selecciona al menos un día
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => onDelete(formData.id)}
              className="px-6 py-3 rounded-lg border-2 border-red-500 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 transition-all"
            >
              Eliminar
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHabitModal;
