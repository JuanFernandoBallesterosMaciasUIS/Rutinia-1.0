// Datos de ejemplo de hábitos (en producción vendrían del backend Django)
export const habitsData = [
  {
    id: 1,
    name: 'Hacer ejercicio',
    category: 'Salud',
    icon: 'fitness_center',
    color: 'indigo',
    frequency: 'diario',
    days: [],
    streak: 7
  },
  {
    id: 2,
    name: 'Leer un libro',
    category: 'Educación',
    icon: 'book',
    color: 'green',
    frequency: 'diario',
    days: [],
    streak: 3
  },
  {
    id: 3,
    name: 'Meditar',
    category: 'Bienestar',
    icon: 'self_improvement',
    color: 'purple',
    frequency: 'semanal',
    days: ['lun', 'mie', 'vie'],
    streak: 2
  },
  {
    id: 4,
    name: 'Revisar finanzas',
    category: 'Finanzas',
    icon: 'laptop',
    color: 'yellow',
    frequency: 'mensual',
    days: [],
    streak: 0
  },
  {
    id: 5,
    name: 'Estudiar programación',
    category: 'Educación',
    icon: 'laptop',
    color: 'blue',
    frequency: 'diario',
    days: [],
    streak: 15
  },
  {
    id: 6,
    name: 'Yoga',
    category: 'Salud',
    icon: 'self_improvement',
    color: 'pink',
    frequency: 'semanal',
    days: ['mar', 'jue', 'sab'],
    streak: 4
  }
];

// Iconos disponibles para los hábitos
export const availableIcons = [
  { name: 'fitness_center', color: 'indigo' },
  { name: 'book', color: 'green' },
  { name: 'local_drink', color: 'blue' },
  { name: 'self_improvement', color: 'purple' },
  { name: 'restaurant', color: 'red' },
  { name: 'bedtime', color: 'indigo' },
  { name: 'directions_run', color: 'orange' },
  { name: 'laptop', color: 'gray' },
  { name: 'music_note', color: 'pink' },
  { name: 'brush', color: 'yellow' },
  { name: 'pets', color: 'brown' },
  { name: 'favorite', color: 'red' }
];

// Colores disponibles
export const availableColors = [
  'indigo',
  'green',
  'blue',
  'purple',
  'red',
  'yellow',
  'pink',
  'orange'
];

// Categorías disponibles
export const categories = [
  { value: 'salud', label: 'Salud' },
  { value: 'desarrollo-personal', label: 'Desarrollo Personal' },
  { value: 'bienestar', label: 'Bienestar' },
  { value: 'productividad', label: 'Productividad' },
  { value: 'social', label: 'Social' },
  { value: 'otro', label: 'Otro' }
];

// Frecuencias disponibles
export const frequencies = [
  { value: 'diario', label: 'Diario' },
  { value: 'semanal', label: 'Semanal' },
  { value: 'mensual', label: 'Mensual' }
];

// Días de la semana
export const daysOfWeek = [
  { value: 'lun', label: 'L' },
  { value: 'mar', label: 'M' },
  { value: 'mie', label: 'M' },
  { value: 'jue', label: 'J' },
  { value: 'vie', label: 'V' },
  { value: 'sab', label: 'S' },
  { value: 'dom', label: 'D' }
];
