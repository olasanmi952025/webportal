import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/atoms/Button';
import { useAuthStore, useAppStore } from '../stores';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Consulta Marcas', href: '/consulta-marcas', icon: '🏷️' },
    { name: 'Consulta Documentos', href: '/consulta-documentos', icon: '📄' },
    { name: 'Cierre de Manifiesto Courier', href: '/cierre-manifiesto', icon: '📦' },
    { name: 'Consulta Faltas y Sobras', href: '/consulta-faltas-sobras', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-blue-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Header con logo gubernamental */}
        <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            {/* Escudo chileno simplificado */}
            <div className="relative">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-1 top-0 w-3 h-10 bg-red-500 rounded-r-lg"></div>
            </div>
            <div className="text-white">
              <h1 className="text-sm font-bold">Gobierno de Chile</h1>
              <p className="text-xs opacity-90">Aduana de Chile</p>
            </div>
          </div>
        </div>
        
        {/* Sección Empresas Courier */}
        <div className="px-4 py-4">
          <h2 className="text-white text-sm font-semibold mb-4">Empresas Courier</h2>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.href
                    ? 'bg-red-500 text-white'
                    : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                }`}
              >
                <span className="mr-3 text-xs">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Cerrar Sesión */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={logout}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 rounded-md transition-colors"
          >
            <span className="truncate">Cerrar Sesión</span>
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSidebar}
                className="mr-2 sm:mr-4 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                ☰
              </Button>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {navigation.find(item => item.href === location.pathname)?.name || 'Portal Aduana Chile'}
              </h2>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">Bienvenido, {user?.name}</span>
              <span className="text-xs sm:text-sm text-gray-600 sm:hidden">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
