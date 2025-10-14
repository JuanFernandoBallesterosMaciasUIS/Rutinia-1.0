import { useState, useEffect } from 'react';

/**
 * Componente de transición para animaciones de autenticación
 * Proporciona animaciones suaves al iniciar y cerrar sesión
 */
const AuthTransition = ({ children, isAuthenticated, onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Iniciar animación de entrada
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationComplete]);

  return (
    <div
      className={`
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
    >
      {children}
    </div>
  );
};

export default AuthTransition;
