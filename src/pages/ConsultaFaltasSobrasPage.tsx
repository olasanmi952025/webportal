import React, { useState } from 'react';
import { Button } from '../ui/atoms/Button';
import { DatePicker } from '../ui/atoms/DatePicker';
import { Input } from '../ui/atoms/Input';
import { Label } from '../ui/atoms/Label';
import { DataTable } from '../ui/organism/DataTable';
import { Header } from '../ui/organism/DataTable/dataTable.types';
import { DetalleFaltasSobrasModal } from '../components/DetalleFaltasSobrasModal';

interface FaltaSobra extends Record<string, unknown> {
  id: string;
  numeroAceptacion: string;
  numeroMaster: string;
  numeroVuelo: string;
  ciaCourier: string;
  pesoGuias: number;
  totalGuias: number;
  guiasConFaltas: number;
  guiasConSobras: number;
}

const ConsultaFaltasSobrasPage: React.FC = () => {
  // Estados para filtros
  const [fechaEmisionDesde, setFechaEmisionDesde] = useState('01/10/2025');
  const [fechaEmisionHasta, setFechaEmisionHasta] = useState('16/10/2025');
  const [numeroManifiesto, setNumeroManifiesto] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);
  
  // Estados para modal
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState(false);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState<any>(null);

  // Datos mock para faltas y sobras
  const faltasSobras: FaltaSobra[] = [
    {
      id: '1',
      numeroAceptacion: '84790',
      numeroMaster: '789444',
      numeroVuelo: '033',
      ciaCourier: 'MENDEZ TRONCOSO, YERKO WILLIAM',
      pesoGuias: 12.0,
      totalGuias: 4,
      guiasConFaltas: 1,
      guiasConSobras: 0
    }
  ];

  // Headers para la tabla
  const headersFaltasSobras: Header<FaltaSobra>[] = [
    {
      key: 'numeroAceptacion',
      label: 'Nro. Aceptación',
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
      key: 'ciaCourier',
      label: 'Cia. Courier',
      sortable: true,
      align: 'center'
    },
    {
      key: 'pesoGuias',
      label: 'Peso Guías',
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
      key: 'guiasConFaltas',
      label: 'Guías Con Faltas.',
      sortable: true,
      align: 'center'
    },
    {
      key: 'guiasConSobras',
      label: 'Guías con Sobras.',
      sortable: true,
      align: 'center'
    },
    {
      key: 'acciones',
      label: 'Acciones',
      sortable: false,
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleVerDetalle(row)}
            className="flex items-center justify-center text-xs px-2 py-1 border-blue-300 text-blue-600 hover:bg-blue-50"
            title="Ver detalle"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
        </div>
      )
    }
  ];

  // Handlers
  const handleBuscar = () => {
    console.log('Buscando faltas y sobras...', {
      fechaEmisionDesde,
      fechaEmisionHasta,
      numeroManifiesto
    });
    setMostrarResultados(true);
  };

  const handleCancelar = () => {
    setMostrarResultados(false);
  };

  const handleVerDetalle = (faltaSobra: FaltaSobra) => {
    // Datos mock del detalle
    const detalleMock = {
      numeroManifiesto: faltaSobra.numeroAceptacion,
      ciaCourier: faltaSobra.ciaCourier,
      numeroMaster: faltaSobra.numeroMaster,
      numeroVuelo: faltaSobra.numeroVuelo,
      fechaEmision: '2025-10-06 00:00:00.0',
      puertoEmbarque: 'MIAMI',
      fechaArribo: '2025-10-18 15:04:00.0',
      totalPesoOriginal: 600.0,
      totalPesoConFyS: 0.0,
      totalBultosOriginal: 12,
      totalBultosConFyS: 0,
      guias: [] // Sin guías por ahora, se puede agregar datos mock si es necesario
    };
    
    setDetalleSeleccionado(detalleMock);
    setMostrarModalDetalle(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-2">Consulta Faltas y Sobras</h1>
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
                <h3 className="text-white text-left font-semibold text-sm">Información Importante</h3>
                <p className="text-white text-xs opacity-90">
                  Consulte las faltas y sobras registradas en el período seleccionado. Utilice los filtros de fecha para ajustar el rango de búsqueda.
                </p>
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
                  Fecha Emisión Desde:
                </Label>
                <DatePicker
                  value={fechaEmisionDesde}
                  onChange={setFechaEmisionDesde}
                  placeholder="dd/MM/yyyy"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="fecha-hasta" className="text-white mb-2">
                  Fecha Emisión Hasta:
                </Label>
                <DatePicker
                  value={fechaEmisionHasta}
                  onChange={setFechaEmisionHasta}
                  placeholder="dd/MM/yyyy"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="numero-manifiesto" className="text-white mb-2">
                  Nº de Manifiesto:
                </Label>
                <Input
                  id="numero-manifiesto"
                  type="text"
                  value={numeroManifiesto}
                  onChange={(e) => setNumeroManifiesto(e.target.value)}
                  className="w-full"
                  placeholder="Ingrese número de manifiesto"
                />
              </div>
              <div className="flex flex-col justify-end lg:col-start-3">
                <Button
                  onClick={handleBuscar}
                  className="bg-[#FE6565] hover:bg-[#FE6565] hover:bg-opacity-90 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm w-full"
                >
                  Consultar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Resultados */}
        {mostrarResultados && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Botón Volver */}
            <div className="flex justify-start mb-6">
              <Button
                onClick={handleCancelar}
                variant="outline"
                className="border-[#A8B7C7] text-[#4A4A4A] hover:bg-[#EEEEEE] hover:border-[#8A8A8A] px-6 py-2 rounded-lg font-semibold transition-all duration-200"
              >
                ← Volver
              </Button>
            </div>

            {/* Header de resultados */}
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-[#111111] text-left">
                  Listas de Carga Encontradas: {faltasSobras.length}
                </h2>
              </div>
            </div>
            
            {/* Tabla */}
            <div className="overflow-x-auto -mx-6">
              <div className="min-w-max">
                <DataTable
                  headers={headersFaltasSobras}
                  data={faltasSobras}
                  pageSize={10}
                  showPagination={true}
                  paginationSize="sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Detalle */}
      <DetalleFaltasSobrasModal
        detalle={detalleSeleccionado}
        isOpen={mostrarModalDetalle}
        onClose={() => {
          setMostrarModalDetalle(false);
          setDetalleSeleccionado(null);
        }}
      />
    </div>
  );
};

export default ConsultaFaltasSobrasPage;

