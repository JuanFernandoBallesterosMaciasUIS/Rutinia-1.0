import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGoToLogin = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/login');
    }, 500); // Mantener sincronía con la guía (500ms)
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-10 transition-all duration-500 ${
        isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 animate-fade-in'
      }`}
    >
      <main className="relative w-full max-w-6xl">
        {/* Hero: grid 2 columnas en desktop */}
        <section className="grid items-center gap-10 lg:grid-cols-2">
          {/* Columna Izquierda: Branding + texto + CTA */}
          <div className="text-center lg:text-left space-y-6">
            {/* Logo + Marca */}
            <div className="flex items-center justify-center lg:justify-start select-none">
              <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg ring-1 ring-white/60 dark:ring-white/10 mr-2">
                <span className="text-white font-black text-4xl md:text-5xl leading-none drop-shadow">R</span>
              </div>
              <h1 className="text-[2.75rem] md:text-[3.5rem] leading-none font-black bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent tracking-tight -ml-1">
                utinia
              </h1>
            </div>

            {/* Título y subtítulo */}
            <div className="space-y-3">
              <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Construye mejores hábitos, un día a la vez
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                Registra tus rutinas, visualiza tu progreso y mantén la motivación con rachas y logros. Todo desde una interfaz simple y moderna.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={handleGoToLogin}
                disabled={isTransitioning}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Comenzar ahora"
              >
                <span>Comenzar ahora</span>
                <span className="material-icons transform transition-transform duration-300 group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>

              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 md:px-7 py-3 rounded-lg font-semibold bg-white/70 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all"
              >
                <span>Ver características</span>
                <span className="material-icons text-purple-500">expand_more</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Mockups flotantes (solo desktop) */}
          <div className="relative hidden lg:block">
            {/* Círculos decorativos */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-400/30 dark:bg-purple-700/30 rounded-full blur-3xl animate-gentle-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/30 dark:bg-indigo-700/30 rounded-full blur-3xl animate-gentle-pulse" style={{ animationDelay: '0.8s' }} />

            {/* Tarjeta 1 - Ejercicio */}
            <div className="animate-float [animation-delay:0s]">
              <div className="relative mx-auto w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-5 transform hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/90 text-white flex items-center justify-center shadow-md">
                      <span className="material-icons">fitness_center</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Ejercicio</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">30 min • Diario</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">Racha: 7</span>
                </div>
                <div className="mt-4 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-green-400 to-emerald-500" />
                </div>
              </div>
            </div>

            {/* Tarjeta 2 - Lectura */}
            <div className="animate-float [animation-delay:0.6s] absolute left-10 top-1/2">
              <div className="w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/90 text-white flex items-center justify-center shadow-md">
                    <span className="material-icons">menu_book</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Lectura</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">20 pág • Tardes</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Progreso semanal</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">85%</span>
                </div>
              </div>
            </div>

            {/* Tarjeta 3 - Meditación */}
            <div className="animate-float [animation-delay:1.2s] absolute right-4 bottom-4">
              <div className="w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/90 text-white flex items-center justify-center shadow-md">
                    <span className="material-icons">self_improvement</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Meditación</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">10 min • Mañanas</p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-purple-600 dark:text-purple-400 font-semibold">Racha: 21 días</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 md:mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 Rutinia — Versión Beta</p>
        </footer>
      </main>
    </div>
  );
}

export default Welcome;

