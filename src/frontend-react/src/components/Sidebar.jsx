function Sidebar({ isOpen, onClose, darkMode, onToggleDarkMode }) {
  return (
    <div 
      className={`fixed top-0 left-0 h-full w-64 bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col p-6 shadow-xl`}
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mb-4 flex items-center justify-center overflow-hidden">
          <img 
            alt="Foto de perfil" 
            className="w-full h-full object-cover rounded-full" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1azmRfQtcdGrH3vbYZzXAuM1N0sOALbS5UBWjzEocm5LeomZnmmKBfGO6KgssDgSkPvlXO3J_lbQJslLQ7SfMexE2tgiNs-m491_NNKZgpKgPsgtSFGVe2AIrsNXSUdEch3P2rPoAklrAtrjxEX4u0MGTlWNbaVaLu7cQ0VUm8hkFHBPxvpgGkYMDNKpKjJAfR6XZlPJA4hL2sObi3XRQ282l1RwZ1EKq4z33W5VV9D9NALjnbCh379XD08r8QsbY972VJac4uuU"
          />
        </div>
        <p className="font-semibold text-lg">Nombre usuario</p>
      </div>
      
      <nav className="flex flex-col space-y-2 flex-grow">
        <button 
          className="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={onToggleDarkMode}
        >
          <span className="material-icons mr-4">dark_mode</span>
          <span>Tema: {darkMode ? 'claro' : 'oscuro'}</span>
        </button>
        <a 
          className="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" 
          href="#"
        >
          <span className="material-icons mr-4">edit</span>
          <span>Editar perfil</span>
        </a>
        <a 
          className="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative" 
          href="#"
        >
          <span className="material-icons mr-4">notifications</span>
          <span>Notificaciones</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </a>
      </nav>
      
      <div className="mt-auto">
        <a 
          className="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" 
          href="#"
        >
          <span className="material-icons mr-4">logout</span>
          <span>Cerrar sesión</span>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
