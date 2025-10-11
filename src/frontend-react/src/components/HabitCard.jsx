function HabitCard({ habit, isCompleted, onToggleComplete, onEdit }) {
  const getColorClasses = (color) => {
    const colorMap = {
      indigo: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-500',
      green: 'bg-green-100 dark:bg-green-900 text-green-500',
      blue: 'bg-blue-100 dark:bg-blue-900 text-blue-500',
      purple: 'bg-purple-100 dark:bg-purple-900 text-purple-500',
      red: 'bg-red-100 dark:bg-red-900 text-red-500',
      yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-500',
      pink: 'bg-pink-100 dark:bg-pink-900 text-pink-500',
      orange: 'bg-orange-100 dark:bg-orange-900 text-orange-500'
    };
    return colorMap[color] || colorMap.blue;
  };

  const handleComplete = (e) => {
    e.stopPropagation();
    onToggleComplete(habit.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(habit);
  };

  return (
    <div 
      className={`habit-card bg-card-light dark:bg-card-dark rounded-large p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
        isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-4 rounded-xl ${getColorClasses(habit.color)}`}>
          <span className="material-icons text-3xl">{habit.icon}</span>
        </div>
        <button
          onClick={handleEdit}
          className="text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
        >
          <span className="material-icons">more_vert</span>
        </button>
      </div>

      <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
        {habit.name}
      </h3>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-subtext-light dark:text-subtext-dark">
          {habit.category}
        </span>
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-subtext-light dark:text-subtext-dark capitalize">
          {habit.frequency}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-icons text-orange-500 text-lg">local_fire_department</span>
          <span className="text-sm font-semibold text-subtext-light dark:text-subtext-dark">
            {habit.streak} días
          </span>
        </div>
        
        <button
          onClick={handleComplete}
          className={`p-2 rounded-full transition-all ${
            isCompleted
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 hover:bg-green-500 hover:text-white'
          }`}
        >
          <span className="material-icons">
            {isCompleted ? 'check' : 'check'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default HabitCard;
