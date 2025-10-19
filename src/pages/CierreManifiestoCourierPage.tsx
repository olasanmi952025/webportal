import React, { useState } from 'react';
import { Button } from '../ui/atoms/Button';
import { DatePicker } from '../ui/atoms/DatePicker';
import { Input } from '../ui/atoms/Input';
import { Label } from '../ui/atoms/Label';
import { Badge } from '../ui/atoms/Badge';
import { Alert } from '../ui/atoms/Alert';
import { Checkbox } from '../ui/atoms/Checkbox';
import { DataTable } from '../ui/organism/DataTable';
import { Header } from '../ui/organism/DataTable/dataTable.types';

interface Manifiesto extends Record<string, unknown> {
  id: string;
  numeroAceptacion: string;
  numeroMaster: string;
  numeroVuelo: string;
  totalGuias: number;
  fechaAceptacion: string;
  ciaCourier: string;
  seleccionado: boolean;
}

const CierreManifiestoCourierPage: React.FC = () => {
  // Estados para filtros
  const [fechaAceptacionDesde, setFechaAceptacionDesde] = useState('01/10/2025');
  const [fechaAceptacionHasta, setFechaAceptacionHasta] = useState('16/10/2025');
  const [numeroAceptacion, setNumeroAceptacion] = useState('');
  const [numeroVuelo, setNumeroVuelo] = useState('');
  const [emisor, setEmisor] = useState('MENDEZ TRONCOSO, YERKO');
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Estados para selección
  const [manifiestosSeleccionados, setManifiestosSeleccionados] = useState<string[]>([]);
  const [seleccionarTodos, setSeleccionarTodos] = useState(false);

  // Estado para modal de confirmación
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  // Datos mock para manifiestos
  const manifiestos: Manifiesto[] = [
    {
      id: '1',
      numeroAceptacion: '84790',
      numeroMaster: 'MASTER001',
      numeroVuelo: '033',
      totalGuias: 4,
      fechaAceptacion: '06/10/2025',
      ciaCourier: 'MENDEZ TRONCOSO, YERKO WILLIAM',
      seleccionado: false
    },
    {
      id: '2',
      numeroAceptacion: '84791',
      numeroMaster: 'MASTER002',
      numeroVuelo: '034',
      totalGuias: 3,
      fechaAceptacion: '07/10/2025',
      ciaCourier: 'EMPRESA TRANSPORTE S.A.',
      seleccionado: false
    },
    {
      id: '3',
      numeroAceptacion: '84792',
      numeroMaster: 'MASTER003',
      numeroVuelo: '035',
      totalGuias: 5,
      fechaAceptacion: '08/10/2025',
      ciaCourier: 'LOGISTICA CHILE LTDA.',
      seleccionado: false
    }
  ];

  // Headers para la tabla de manifiestos
  const headersManifiestos: Header<Manifiesto>[] = [
    {
      key: 'seleccionado',
      label: '',
      sortable: false,
      align: 'center',
      render: (row: Manifiesto) => (
        <div className="flex items-center justify-center">
          <Checkbox
            id={`checkbox-${row.id}`}
            checked={manifiestosSeleccionados.includes(row.id)}
            onChange={(checked) => handleSeleccionarManifiesto(row.id, checked)}
          />
        </div>
      )
    },
    {
      key: 'numeroAceptacion',
      label: 'Número de Aceptación',
      sortable: true,
      align: 'center'
    },
    {
      key: 'numeroMaster',
      label: 'Nro. Master',
      sortable: true,
      align: 'center'
    },
    {
      key: 'numeroVuelo',
      label: 'Nro Vuelo',
      sortable: true,
      align: 'center'
    },
    {
      key: 'totalGuias',
      label: 'Total Guías',
      sortable: true,
      align: 'center'
    },
    {
      key: 'fechaAceptacion',
      label: 'Fecha Aceptación',
      sortable: true,
      align: 'center'
    },
    {
      key: 'ciaCourier',
      label: 'Cia Courier',
      sortable: true,
      align: 'center'
    }
  ];

  // Handlers
  const handleBuscar = () => {
    console.log('Buscando manifiestos...', {
      fechaAceptacionDesde,
      fechaAceptacionHasta,
      numeroAceptacion,
      numeroVuelo,
      emisor
    });
    setMostrarResultados(true);
  };

  const handleSeleccionarManifiesto = (id: string, seleccionado: boolean) => {
    if (seleccionado) {
      setManifiestosSeleccionados([...manifiestosSeleccionados, id]);
    } else {
      setManifiestosSeleccionados(manifiestosSeleccionados.filter(manifiestoId => manifiestoId !== id));
    }
  };

  const handleSeleccionarTodos = (seleccionado: boolean) => {
    setSeleccionarTodos(seleccionado);
    if (seleccionado) {
      setManifiestosSeleccionados(manifiestos.map(m => m.id));
    } else {
      setManifiestosSeleccionados([]);
    }
  };

  const handleCerrarManifiesto = () => {
    setMostrarConfirmacion(true);
  };

  const handleConfirmarCierre = () => {
    console.log('Cerrando manifiestos seleccionados:', manifiestosSeleccionados);
    setMostrarConfirmacion(false);
    // Aquí iría la lógica para cerrar los manifiestos
  };

  const handleCancelar = () => {
    setMostrarResultados(false);
    setManifiestosSeleccionados([]);
    setSeleccionarTodos(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-2">Conformación Manifiesto Courier</h1>
          <div className="mt-2 w-32 h-1.5 bg-gradient-to-r from-[#006FB3] to-[#FE6565] rounded-full shadow-sm"></div>
        </div>

        {/* Banner informativo */}
        <div className="bg-gradient-to-r from-[#006FB3] to-[#FE6565] rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Información Importante</h3>
                <p className="text-white text-xs opacity-90">Seleccione los manifiestos que desea cerrar para proceder con la conformación.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
              <div className="w-2 h-2 bg-white bg-opacity-25 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Formulario de filtros */}
        {!mostrarResultados && (
          <div className="bg-[#006FB3] rounded-lg shadow-sm border border-[#006FB3] p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="fecha-desde" className="text-white mb-2">
                  Fecha de Aceptación desde:
                </Label>
                <DatePicker
                  value={fechaAceptacionDesde}
                  onChange={setFechaAceptacionDesde}
                  placeholder="dd/MM/yyyy"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="fecha-hasta" className="text-white mb-2">
                  Fecha de Aceptación hasta:
                </Label>
                <DatePicker
                  value={fechaAceptacionHasta}
                  onChange={setFechaAceptacionHasta}
                  placeholder="dd/MM/yyyy"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="numero-aceptacion" className="text-white mb-2">
                  Número de Aceptación:
                </Label>
                <Input
                  id="numero-aceptacion"
                  type="text"
                  value={numeroAceptacion}
                  onChange={(e) => setNumeroAceptacion(e.target.value)}
                  className="w-full"
                  placeholder="Ingrese número de aceptación"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="numero-vuelo" className="text-white mb-2">
                  Nº Vuelo:
                </Label>
                <Input
                  id="numero-vuelo"
                  type="text"
                  value={numeroVuelo}
                  onChange={(e) => setNumeroVuelo(e.target.value)}
                  className="w-full"
                  placeholder="Ingrese número de vuelo"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="emisor" className="text-white mb-2">
                  Emisor:
                </Label>
                <Input
                  id="emisor"
                  type="text"
                  value={emisor}
                  onChange={(e) => setEmisor(e.target.value)}
                  className="w-full"
                  placeholder="Ingrese emisor"
                />
              </div>
              <div className="flex flex-col justify-end">
                <Button
                  onClick={handleBuscar}
                  className="bg-[#FE6565] hover:bg-[#FE6565] hover:bg-opacity-90 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm"
                >
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Resultados */}
        {mostrarResultados && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header de resultados */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#111111] text-left">
                    Total de manifiestos: {manifiestos.length}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="info" size="sm">Activos</Badge>
                    <Badge variant="error" size="sm">Pendientes</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Checkbox
                    id="seleccionar-todos"
                    label="Seleccionar Todos"
                    checked={seleccionarTodos}
                    onChange={handleSeleccionarTodos}
                  />
                </div>
              </div>
            </div>
            
            {/* Tabla de manifiestos */}
            <div className="overflow-x-auto">
              <div className="min-w-max">
                <DataTable
                  headers={headersManifiestos}
                  data={manifiestos}
                  pageSize={10}
                  showPagination={true}
                  paginationSize="sm"
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="p-4 sm:p-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#006FB3] rounded-full"></div>
                    <span className="text-sm font-medium text-[#4A4A4A]">Seleccionados: {manifiestosSeleccionados.length}</span>
                  </div>
                  <div className="w-px h-4 bg-[#A8B7C7]"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#FE6565] rounded-full"></div>
                    <span className="text-sm font-medium text-[#4A4A4A]">Total: {manifiestos.length}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    onClick={handleCerrarManifiesto}
                    disabled={manifiestosSeleccionados.length === 0}
                    className="bg-[#006FB3] hover:bg-[#006FB3] hover:bg-opacity-90 disabled:bg-[#A8B7C7] disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm"
                  >
                    Cerrar Manifiesto
                  </Button>
                  <Button
                    onClick={handleCancelar}
                    variant="outline"
                    className="border-[#A8B7C7] text-[#4A4A4A] hover:bg-[#EEEEEE] hover:border-[#8A8A8A] px-6 py-2 rounded-lg font-semibold transition-all duration-200"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      <Alert
        isOpen={mostrarConfirmacion}
        onClose={() => setMostrarConfirmacion(false)}
        textDescription={`¿Está seguro de que desea cerrar ${manifiestosSeleccionados.length} manifiesto(s) seleccionado(s)?`}
        labelConfirm="Sí, Cerrar"
        labelDismiss="Cancelar"
        onHandleConfirm={handleConfirmarCierre}
      />
    </div>
  );
};

export default CierreManifiestoCourierPage;
