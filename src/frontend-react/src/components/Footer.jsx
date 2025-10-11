function Footer({ onAddHabit }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 lg:left-64 bg-card-light dark:bg-card-dark p-2 sm:p-3 shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.1)] z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center text-primary p-2 transition-all hover:scale-110">
            <span className="material-icons text-xl sm:text-2xl">today</span>
            <span className="text-xs sm:text-sm font-medium">hoy</span>
          </button>
          <a 
            href="#calendario" 
            className="flex flex-col items-center text-subtext-light dark:text-subtext-dark p-2 hover:text-primary transition-all hover:scale-110"
          >
            <span className="material-icons text-xl sm:text-2xl">calendar_today</span>
            <span className="text-xs sm:text-sm">calendario</span>
          </a>
          <button 
            onClick={onAddHabit}
            className="bg-primary text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center -translate-y-6 sm:-translate-y-8 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <span className="material-icons" style={{ fontSize: '28px' }}>add</span>
          </button>
          <a 
            href="#habitos" 
            className="flex flex-col items-center text-subtext-light dark:text-subtext-dark p-2 hover:text-primary transition-all hover:scale-110"
          >
            <span className="material-icons text-xl sm:text-2xl">checklist</span>
            <span className="text-xs sm:text-sm">hábitos</span>
          </a>
          <button className="flex flex-col items-center text-subtext-light dark:text-subtext-dark p-2 hover:text-primary transition-all hover:scale-110">
            <span className="material-icons text-xl sm:text-2xl">analytics</span>
            <span className="text-xs sm:text-sm">Análisis</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
