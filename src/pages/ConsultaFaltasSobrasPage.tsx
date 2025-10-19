/**
 * Página de Consulta de Faltas y Sobras
 * 
 * Esta página permite consultar las faltas y sobras registradas en los manifiestos.
 * Incluye filtros de fecha y número de manifiesto.
 * 
 * @version 2.0 - Refactorizada con mejores prácticas
 */

import React, { useMemo } from 'react';
import { Button } from '../ui/atoms/Button';
import { Input } from '../ui/atoms/Input';
import { Label } from '../ui/atoms/Label';
import { DataTable } from '../ui/organism/DataTable';
import { Header } from '../ui/organism/DataTable/dataTable.types';
import { DetalleFaltasSobrasModal } from '../components/DetalleFaltasSobrasModal';
import { PageHeader, InfoBanner, DateRangeFilter } from '../components/common';
import { useFilters, useModal } from '../hooks';
import { mockFaltasSobras } from '../services/mockDataService';
import { sanitizeString } from '../utils';
import type { FaltaSobra, DetalleFaltaSobra } from '../types';

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface FaltasSobrasFilters extends Record<string, any> {
  fechaEmisionDesde: string;
  fechaEmisionHasta: string;
  numeroManifiesto: string;
}

// ============================================================================
// CONSTANTES
// ============================================================================

const INITIAL_FILTERS: FaltasSobrasFilters = {
  fechaEmisionDesde: '01/10/2025',
  fechaEmisionHasta: '16/10/2025',
  numeroManifiesto: ''
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const ConsultaFaltasSobrasPage: React.FC = () => {
  // ============================================================================
  // HOOKS
  // ============================================================================
  
  const {
    filters,
    updateFilter,
    hasSearched,
    search,
    clearSearch
  } = useFilters<FaltasSobrasFilters>(INITIAL_FILTERS);

  const detalleModal = useModal<DetalleFaltaSobra>();

  // ============================================================================
  // DATOS
  // ============================================================================

  // En producción, esto sería una llamada a API con los filtros
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const faltasSobras = useMemo(() => {
    // mockApiService devuelve una Promise, pero para el ejemplo usamos datos síncronos
    return mockFaltasSobras;
  }, [hasSearched]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Maneja la búsqueda de faltas y sobras
   * Sanitiza los inputs antes de buscar
   */
  const handleBuscar = () => {
    // Sanitizar inputs antes de buscar
    const sanitizedNumero = sanitizeString(filters.numeroManifiesto);
    
    if (sanitizedNumero !== filters.numeroManifiesto) {
      updateFilter('numeroManifiesto', sanitizedNumero);
    }

    console.log('Buscando faltas y sobras...', {
      fechaEmisionDesde: filters.fechaEmisionDesde,
      fechaEmisionHasta: filters.fechaEmisionHasta,
      numeroManifiesto: sanitizedNumero
    });

    search();
  };

  /**
   * Maneja el click en volver
   * Limpia la búsqueda y vuelve a mostrar filtros
   */
  const handleVolver = () => {
    clearSearch();
  };

  /**
   * Maneja el click en ver detalle
   * Abre el modal con los datos del detalle
   */
  const handleVerDetalle = (faltaSobra: FaltaSobra) => {
    // En producción, esto sería una llamada a API
    const detalleMock: DetalleFaltaSobra = {
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
      guias: []
    };

    detalleModal.openModal(detalleMock);
  };

  // ============================================================================
  // CONFIGURACIÓN DE TABLA
  // ============================================================================

  const tableHeaders = useMemo<Header<FaltaSobra>[]>(() => [
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
      key: 'acciones' as keyof FaltaSobra,
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
            aria-label={`Ver detalle de ${row.numeroAceptacion}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
        </div>
      )
    }
  ], []);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <PageHeader title="Consulta Faltas y Sobras" />

        {/* Banner informativo */}
        <InfoBanner
          title="Información Importante"
          message="Consulte las faltas y sobras registradas en el período seleccionado. Utilice los filtros de fecha para ajustar el rango de búsqueda."
          variant="info"
        />

        {/* Formulario de filtros */}
        {!hasSearched && (
          <div className="bg-[#006FB3] rounded-lg shadow-sm border border-[#006FB3] p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Filtros de fecha */}
              <div className="lg:col-span-2">
                <DateRangeFilter
                  fechaDesde={filters.fechaEmisionDesde}
                  fechaHasta={filters.fechaEmisionHasta}
                  onFechaDesdeChange={(value) => updateFilter('fechaEmisionDesde', value)}
                  onFechaHastaChange={(value) => updateFilter('fechaEmisionHasta', value)}
                  labelDesde="Fecha Emisión Desde:"
                  labelHasta="Fecha Emisión Hasta:"
                  className="grid-cols-1 md:grid-cols-2 gap-4"
                />
              </div>

              {/* Número de Manifiesto */}
              <div className="flex flex-col">
                <Label htmlFor="numero-manifiesto" className="text-white mb-2">
                  Nº de Manifiesto:
                </Label>
                <Input
                  id="numero-manifiesto"
                  type="text"
                  value={filters.numeroManifiesto}
                  onChange={(e) => updateFilter('numeroManifiesto', e.target.value)}
                  className="w-full"
                  placeholder="Ingrese número de manifiesto"
                  maxLength={50}
                />
              </div>

              {/* Botón Consultar */}
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
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Botón Volver */}
            <div className="flex justify-start mb-6">
              <Button
                onClick={handleVolver}
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
                  headers={tableHeaders}
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
        detalle={detalleModal.data}
        isOpen={detalleModal.isOpen}
        onClose={detalleModal.closeModal}
      />
    </div>
  );
};

export default ConsultaFaltasSobrasPage;

