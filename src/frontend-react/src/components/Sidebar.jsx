function Sidebar({ isOpen, onClose, darkMode, onToggleDarkMode, onLogout, usuario, onEditProfile }) {
  return (
    <div 
      className={`fixed top-0 left-0 h-full w-64 bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col p-6 shadow-xl`}
    >
      <div className="flex flex-col items-center mb-8 px-2">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 mb-4 flex items-center justify-center overflow-hidden shadow-lg">
          <span className="material-icons text-white text-5xl">account_circle</span>
        </div>
        <h2 className="font-bold text-base text-center leading-tight mb-1 text-text-light dark:text-text-dark">
          {usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario'}
        </h2>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 break-all px-1">
          {usuario?.correo || 'correo@ejemplo.com'}
        </p>
      </div>
      
      <nav className="flex flex-col space-y-2 flex-grow">
        <button 
          className="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={onToggleDarkMode}
        >
          <span className="material-icons mr-4">{darkMode ? 'light_mode' : 'dark_mode'}</span>
          <span>Modo {darkMode ? 'Claro' : 'Oscuro'}</span>
        </button>
        <button 
          className="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left" 
          onClick={onEditProfile}
        >
          <span className="material-icons mr-4">edit</span>
          <span>Editar perfil</span>
        </button>
        <button 
          className="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative text-left" 
        >
          <span className="material-icons mr-4">notifications</span>
          <span>Notificaciones</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </button>
      </nav>
      
      <div className="mt-auto">
        <button 
          className="w-full flex items-center p-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors" 
          onClick={onLogout}
        >
          <span className="material-icons mr-4">logout</span>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
