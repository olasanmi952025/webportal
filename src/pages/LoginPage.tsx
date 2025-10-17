import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/atoms/Button';
import { Input } from '../ui/atoms/Input';
import { useAuthStore } from '../stores';

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // La redirección al dashboard se maneja automáticamente en el store
      navigate('/dashboard');
    } catch (error) {
      console.error('Error de login:', error);
      alert('Credenciales incorrectas. Use: admin@aduana.cl / admin123');
    }
  };

  const handlePasswordRecovery = () => {
    navigate('/recovery-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      {/* Fondo con patrón de aduana */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-600/10 to-blue-800/10"></div>
      </div>
      
      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Panel de login */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header con logo gubernamental */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-6 text-center">
            {/* Logo Gobierno de Chile */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-3">
                {/* Escudo chileno simplificado */}
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-1 top-0 w-3 h-10 sm:w-4 sm:h-12 bg-red-500 rounded-r-lg"></div>
                </div>
                <div className="text-white">
                  <h1 className="text-base sm:text-lg font-bold">Gobierno de Chile</h1>
                  <p className="text-xs sm:text-sm opacity-90">Aduana de Chile</p>
                </div>
              </div>
            </div>
            
            {/* Título */}
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ingreso al Sistema
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm">
              Portal de couriers
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 sm:space-y-6">
            {/* Campo Identificación */}
            <div>
              <label htmlFor="email" className="block text-sm text-left font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Ingrese su identificación"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                required
              />
            </div>

            {/* Campo Clave */}
            <div>
              <label htmlFor="password" className="block text-sm text-left font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingrese su clave"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                type="submit"
                variant="primary"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                    Ingresando...
                  </div>
                ) : (
                  'Ingresar al Sistema'
                )}
              </Button>
              
              <Button
                type="button"
                onClick={handlePasswordRecovery}
                variant="outline"
                className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
              >
                Recuperar Clave
              </Button>
            </div>
          </form>

          {/* Footer con información adicional */}
          <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">
                <strong>Información de Seguridad:</strong>
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Los siguientes datos se obtienen desde otros sistemas de la organización. 
                Si estos datos son erróneos, por favor póngase en contacto con el 
                administrador del sistema.
              </p>
            </div>
          </div>
        </div>

        {/* Elementos decorativos de aduana */}
        <div className="absolute -top-10 -left-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
        
        {/* Iconos de aduana flotantes */}
        <div className="absolute top-16 sm:top-20 left-6 sm:left-10 text-white/20">
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div className="absolute bottom-16 sm:bottom-20 right-6 sm:right-10 text-white/20">
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
          </svg>
        </div>
      </div>

      {/* Información del sistema */}
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white/60 text-xs">
        <p className="hidden sm:block">WEBPORTAL v2.0</p>
        <p className="hidden sm:block">© 2025 Aduana de Chile - Gobierno de Chile</p>
      </div>
    </div>
  );
};

export default LoginPage;