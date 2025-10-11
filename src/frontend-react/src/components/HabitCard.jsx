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
      className={`habit-card bg-card-light dark:bg-card-dark rounded-lg sm:rounded-large p-3 sm:p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
        isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-4">
        <div className={`p-2 sm:p-4 rounded-lg sm:rounded-xl ${getColorClasses(habit.color)}`}>
          <span className="material-icons text-xl sm:text-3xl">{habit.icon}</span>
        </div>
        <button
          onClick={handleEdit}
          className="text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
        >
          <span className="material-icons text-lg sm:text-2xl">more_vert</span>
        </button>
      </div>

      <h3 className="text-sm sm:text-xl font-bold text-text-light dark:text-text-dark mb-1 sm:mb-2 line-clamp-2">
        {habit.name}
      </h3>
      
      <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4 flex-wrap">
        <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-subtext-light dark:text-subtext-dark">
          {habit.category}
        </span>
        <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-subtext-light dark:text-subtext-dark capitalize">
          {habit.frequency}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="material-icons text-orange-500 text-sm sm:text-lg">local_fire_department</span>
          <span className="text-xs sm:text-sm font-semibold text-subtext-light dark:text-subtext-dark">
            {habit.streak} días
          </span>
        </div>
        
        <button
          onClick={handleComplete}
          className={`p-1.5 sm:p-2 rounded-full transition-all ${
            isCompleted
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 hover:bg-green-500 hover:text-white'
          }`}
        >
          <span className="material-icons text-lg sm:text-2xl">
            {isCompleted ? 'check' : 'check'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default HabitCard;
