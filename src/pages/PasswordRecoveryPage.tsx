import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/atoms/Button';
import { Input } from '../ui/atoms/Input';

const PasswordRecoveryPage: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    identificacion: '',
    nombres: '',
    email: '',
    verificarFirma: false,
  });
  const [passwordData, setPasswordData] = useState({
    claveActual: '',
    nuevaClave: '',
    confirmacionClave: '',
  });

  const handleSaveUserData = () => {
    console.log('Guardando datos del usuario:', userData);
    alert('Datos guardados exitosamente');
  };

  const handleChangePassword = () => {
    if (passwordData.nuevaClave !== passwordData.confirmacionClave) {
      alert('Las claves nuevas no coinciden');
      return;
    }
    
    if (passwordData.nuevaClave.length < 6) {
      alert('La nueva clave debe tener al menos 6 caracteres');
      return;
    }

    console.log('Cambiando clave');
    alert('Clave cambiada exitosamente');
    setPasswordData({ claveActual: '', nuevaClave: '', confirmacionClave: '' });
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A132D] via-[#006FB3] to-[#0A132D] p-4">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-[#006FB3]/10 to-[#0A132D]/10"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 mb-4 sm:mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-[#006FB3] to-[#0A132D] px-4 sm:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Logo Gobierno de Chile */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#006FB3] rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#006FB3] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -right-1 top-0 w-3 h-10 sm:w-4 sm:h-12 bg-[#FE6565] rounded-r-lg"></div>
                  </div>
                  <div className="text-white">
                    <h1 className="text-base sm:text-lg font-bold">Gobierno de Chile</h1>
                    <p className="text-xs sm:text-sm opacity-90">Aduana de Chile</p>
                  </div>
                </div>
              </div>
              
              <div className="text-white text-left sm:text-right">
                <h2 className="text-xl sm:text-2xl font-bold">Recuperar Contraseña</h2>
                <p className="text-[#A8B7C7] text-xs sm:text-sm">Gestión de Acceso</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Sección de datos del usuario */}
          <div className="p-4 sm:p-8 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Información Personal</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Identificación */}
              <div>
                <label className="block text-sm text-left font-medium text-[#4A4A4A] mb-2">
                  Identificación
                </label>
                <Input
                  value={userData.identificacion}
                  onChange={(e) => setUserData({ ...userData, identificacion: e.target.value })}
                  placeholder="Ingrese su identificación"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#A8B7C7] rounded-lg focus:ring-2 focus:ring-[#006FB3] focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Nombres */}
              <div>
                <label className="block text-sm text-left font-medium text-[#4A4A4A] mb-2">
                  Nombres
                </label>
                <Input
                  value={userData.nombres}
                  onChange={(e) => setUserData({ ...userData, nombres: e.target.value })}
                  placeholder="Ingrese sus nombres"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#A8B7C7] rounded-lg focus:ring-2 focus:ring-[#006FB3] focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="block text-sm text-left font-medium text-[#4A4A4A] mb-2">
                  E-mail
                </label>
                <Input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  placeholder="Ingrese su email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#A8B7C7] rounded-lg focus:ring-2 focus:ring-[#006FB3] focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Verificar Firma */}
              <div className="sm:col-span-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={userData.verificarFirma}
                    onChange={(e) => setUserData({ ...userData, verificarFirma: e.target.checked })}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#006FB3] border-[#A8B7C7] rounded focus:ring-[#006FB3]"
                  />
                  <span className="text-sm font-medium text-[#4A4A4A]">Verificar Firma</span>
                </label>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
              <Button
                onClick={handleSaveUserData}
                className="bg-[#006FB3] hover:bg-[#005999] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
              >
                Grabar Modificaciones
              </Button>
              <Button
                onClick={handleBackToLogin}
                variant="outline"
                className="px-4 sm:px-6 py-2 sm:py-3 border border-[#A8B7C7] text-[#4A4A4A] hover:bg-[#EEEEEE] rounded-lg transition-all duration-200 text-sm sm:text-base"
              >
                Volver al Login
              </Button>
            </div>
          </div>

          {/* Sección de cambio de clave */}
          <div className="p-4 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Cambio de Clave</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Clave Actual */}
              <div>
                <label className="block text-sm text-left font-medium text-[#4A4A4A] mb-2">
                  Clave Actual
                </label>
                <Input
                  type="password"
                  value={passwordData.claveActual}
                  onChange={(e) => setPasswordData({ ...passwordData, claveActual: e.target.value })}
                  placeholder="Ingrese su clave actual"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#A8B7C7] rounded-lg focus:ring-2 focus:ring-[#006FB3] focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Nueva Clave */}
              <div>
                <label className="block text-sm text-left font-medium text-[#4A4A4A] mb-2">
                  Nueva Clave
                </label>
                <Input
                  type="password"
                  value={passwordData.nuevaClave}
                  onChange={(e) => setPasswordData({ ...passwordData, nuevaClave: e.target.value })}
                  placeholder="Ingrese nueva clave"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#A8B7C7] rounded-lg focus:ring-2 focus:ring-[#006FB3] focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Confirmación Nueva Clave */}
              <div>
                <label className="block text-sm text-left font-medium text-[#4A4A4A] mb-2">
                  Confirmación Nueva Clave
                </label>
                <Input
                  type="password"
                  value={passwordData.confirmacionClave}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmacionClave: e.target.value })}
                  placeholder="Confirme la nueva clave"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#A8B7C7] rounded-lg focus:ring-2 focus:ring-[#006FB3] focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <Button
                onClick={handleChangePassword}
                className="bg-[#006FB3] hover:bg-[#005999] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
              >
                Cambiar Clave
              </Button>
            </div>
          </div>

          {/* Footer con disclaimer */}
          <div className="bg-[#EEEEEE] px-4 sm:px-8 py-4 sm:py-6 border-t border-[#A8B7C7]">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                <strong>Información del Sistema:</strong> Los siguientes datos se obtienen desde otros sistemas de la organización. 
                Si estos datos son erróneos, por favor póngase en contacto con el administrador del sistema.
              </p>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 text-white/20">
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 text-white/20">
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
