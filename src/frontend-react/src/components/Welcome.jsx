import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGoToLogin = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/login');
    }, 300);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-4xl w-full text-center space-y-8">
        
        {/* Logo con letra R + Título Rutinia */}
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo horizontal: Icono R + Texto utinia */}
          <div className="flex items-center gap-4 transform hover:scale-105 transition-transform duration-300">
            {/* Cuadrado morado con letra R con degradado */}
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 rounded-3xl shadow-xl flex items-center justify-center">
              <span className="text-white text-6xl font-black">R</span>
            </div>
            
            {/* Texto utinia con degradado morado a azul */}
            <h1 className="text-7xl font-black bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              utinia
            </h1>
          </div>
          
          {/* Subtítulo */}
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tu aplicación de seguimiento de hábitos
          </p>
        </div>

        {/* Descripción Básica */}
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Bienvenido a Rutinia. Esta es la página de inicio.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            🚧 Página en desarrollo - Los desarrolladores pueden personalizar esta sección
          </p>
        </div>

        {/* Botón para ir al Login */}
        <div className="pt-6">
          <button
            onClick={handleGoToLogin}
            disabled={isTransitioning}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Ir al Login</span>
            <span className="material-icons">arrow_forward</span>
          </button>
        </div>

        {/* Sección para desarrolladores */}
        <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            📝 Notas para Desarrolladores
          </h3>
          <ul className="text-left text-sm text-gray-600 dark:text-gray-400 space-y-2 max-w-xl mx-auto">
            <li>• Puedes agregar más secciones aquí (características, testimonios, etc.)</li>
            <li>• Personaliza los colores y el diseño según necesites</li>
            <li>• La estructura básica ya está lista para expandir</li>
            <li>• Ruta: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/welcome</code></li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Rutinia - Versión Beta
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

