import React from 'react';
import { Button } from '../ui/atoms/Button';
import { Badge } from '../ui/atoms/Badge';
import { Table } from '../ui/atoms/Table';
import { useAduanaStore, useAuthStore } from '../stores';

const DashboardPage: React.FC = () => {
  const { operaciones, isLoading, fetchOperaciones } = useAduanaStore();
  const { user } = useAuthStore();

  React.useEffect(() => {
    fetchOperaciones();
  }, [fetchOperaciones]);

  const getEstadoBadge = (estado: string) => {
    const variants = {
      completado: 'success',
      en_proceso: 'info',
      pendiente: 'danger',
      rechazado: 'error',
    } as const;
    
    return (
      <Badge variant={variants[estado as keyof typeof variants] || 'info'}>
        {estado.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const headers = [
    { key: 'numeroOperacion' as const, label: 'N° Operación', sortable: true },
    { key: 'tipoOperacion' as const, label: 'Tipo', sortable: true },
    { key: 'cliente' as const, label: 'Cliente', sortable: true },
    { key: 'valor' as const, label: 'Valor', sortable: true },
    { key: 'estado' as const, label: 'Estado', sortable: false },
    { key: 'fechaCreacion' as const, label: 'Fecha Creación', sortable: true },
  ];

  const data = operaciones.map(op => ({
    ...op,
    valor: `$${op.valor.toLocaleString()}`,
    fechaCreacion: op.fechaCreacion.toLocaleDateString(),
    estado: getEstadoBadge(op.estado),
  }));

  return (
    <div className="p-4 sm:p-6">
      {/* Header del dashboard */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Dashboard Empresas Courier</h1>
        <p className="text-gray-600 text-base sm:text-lg">Bienvenido, {user?.name}</p>
        <div className="mt-2 w-20 h-1 bg-gradient-to-r from-blue-600 to-red-500 rounded-full"></div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-700">Total Operaciones</h3>
              <p className="text-2xl sm:text-3xl font-bold text-blue-900 mt-1 sm:mt-2">{operaciones.length}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg sm:text-2xl">📦</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-700">En Proceso</h3>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 sm:mt-2">
                {operaciones.filter(op => op.estado === 'en_proceso').length}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg sm:text-2xl">⏳</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-700">Completadas</h3>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1 sm:mt-2">
                {operaciones.filter(op => op.estado === 'completado').length}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-lg sm:text-2xl">✅</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-700">Pendientes</h3>
              <p className="text-2xl sm:text-3xl font-bold text-red-500 mt-1 sm:mt-2">
                {operaciones.filter(op => op.estado === 'pendiente').length}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-lg sm:text-2xl">⚠️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de operaciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-900">Operaciones Recientes</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
              >
                Exportar
              </Button>
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
              >
                Nueva Operación
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando operaciones...</p>
            </div>
          ) : (
            <Table headers={headers} data={data} />
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4">Accesos Rápidos</h3>
          <div className="space-y-2 sm:space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
            >
              🏷️ Consulta Marcas
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
            >
              📄 Consulta Documentos
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
            >
              📦 Cierre de Manifiesto Courier
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4">Información del Sistema</h3>
          <div className="space-y-2 text-xs sm:text-sm text-gray-600">
            <p><strong>Usuario:</strong> {user?.name}</p>
            <p><strong>Rol:</strong> {user?.role}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Última conexión:</strong> {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
