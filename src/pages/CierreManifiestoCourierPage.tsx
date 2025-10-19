/**
 * Página de Cierre de Manifiesto Courier
 * 
 * Permite buscar y seleccionar manifiestos para cerrarlos en lote.
 * Incluye filtros de fecha, número de manifiesto y vuelo.
 * 
 * @version 2.0 - Refactorizada con mejores prácticas
 */

import React, { useMemo } from 'react';
import { Button } from '../ui/atoms/Button';
import { Input } from '../ui/atoms/Input';
import { Label } from '../ui/atoms/Label';
import { Badge } from '../ui/atoms/Badge';
import { Alert } from '../ui/atoms/Alert';
import { Checkbox } from '../ui/atoms/Checkbox';
import { DataTable } from '../ui/organism/DataTable';
import { Header } from '../ui/organism/DataTable/dataTable.types';
import { PageHeader, InfoBanner, DateRangeFilter } from '../components/common';
import { useFilters, useModal, useTableSelection } from '../hooks';
import { mockManifiestos } from '../services/mockDataService';
import { sanitizeString } from '../utils';
import type { Manifiesto } from '../types';

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface ManifiestoFilters extends Record<string, any> {
  fechaAceptacionDesde: string;
  fechaAceptacionHasta: string;
  numeroAceptacion: string;
  numeroVuelo: string;
}

// ============================================================================
// CONSTANTES
// ============================================================================

const INITIAL_FILTERS: ManifiestoFilters = {
  fechaAceptacionDesde: '01/10/2025',
  fechaAceptacionHasta: '16/10/2025',
  numeroAceptacion: '',
  numeroVuelo: ''
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const CierreManifiestoCourierPage: React.FC = () => {
  // ============================================================================
  // HOOKS
  // ============================================================================
  
  const {
    filters,
    updateFilter,
    hasSearched,
    search,
    clearSearch
  } = useFilters<ManifiestoFilters>(INITIAL_FILTERS);

  const selection = useTableSelection(mockManifiestos);
  
  const confirmModal = useModal();

  // ============================================================================
  // DATOS
  // ============================================================================

  const manifiestos = useMemo(() => {
    return mockManifiestos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSearched]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Maneja la búsqueda de manifiestos
   * Sanitiza los inputs antes de buscar
   */
  const handleBuscar = () => {
    const sanitizedNumero = sanitizeString(filters.numeroAceptacion);
    const sanitizedVuelo = sanitizeString(filters.numeroVuelo);
    
    if (sanitizedNumero !== filters.numeroAceptacion) {
      updateFilter('numeroAceptacion', sanitizedNumero);
    }
    if (sanitizedVuelo !== filters.numeroVuelo) {
      updateFilter('numeroVuelo', sanitizedVuelo);
    }

    console.log('Buscando manifiestos...', {
      fechaAceptacionDesde: filters.fechaAceptacionDesde,
      fechaAceptacionHasta: filters.fechaAceptacionHasta,
      numeroAceptacion: sanitizedNumero,
      numeroVuelo: sanitizedVuelo
    });

    search();
  };

  /**
   * Maneja el click en cerrar manifiesto
   * Abre el modal de confirmación
   */
  const handleCerrarManifiesto = () => {
    confirmModal.openModal({
      count: selection.selectedCount
    });
  };

  /**
   * Confirma el cierre de manifiestos seleccionados
   */
  const handleConfirmarCierre = () => {
    console.log('Cerrando manifiestos seleccionados:', selection.selectedIds);
    confirmModal.closeModal();
    // Aquí iría la llamada a API para cerrar manifiestos
  };

  /**
   * Maneja el click en cancelar
   * Vuelve a mostrar filtros y limpia selección
   */
  const handleCancelar = () => {
    clearSearch();
    selection.clearSelection();
  };

  // ============================================================================
  // CONFIGURACIÓN DE TABLA
  // ============================================================================

  const tableHeaders = useMemo<Header<Manifiesto>[]>(() => [
    {
      key: 'seleccionado' as keyof Manifiesto,
      label: '',
      sortable: false,
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center">
          <Checkbox
            id={`checkbox-${row.id}`}
            checked={selection.isSelected(row.id)}
            onChange={(checked) => selection.toggleSelection(row.id)}
            aria-label={`Seleccionar manifiesto ${row.numeroAceptacion}`}
          />
        </div>
      )
    },
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
      label: 'Cia. Courier',
      sortable: true,
      align: 'center'
    }
  ], [selection]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <PageHeader title="Cierre de Manifiesto Courier" />

        {/* Banner informativo */}
        <InfoBanner
          title="Información Importante"
          message="Seleccione los manifiestos que desea cerrar. Utilice los filtros de fecha para ajustar el rango de búsqueda."
          variant="info"
        />

        {/* Formulario de filtros */}
        {!hasSearched && (
          <div className="bg-[#006FB3] rounded-lg shadow-sm border border-[#006FB3] p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Filtros de fecha */}
              <div className="lg:col-span-2">
                <DateRangeFilter
                  fechaDesde={filters.fechaAceptacionDesde}
                  fechaHasta={filters.fechaAceptacionHasta}
                  onFechaDesdeChange={(value) => updateFilter('fechaAceptacionDesde', value)}
                  onFechaHastaChange={(value) => updateFilter('fechaAceptacionHasta', value)}
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
                  value={filters.numeroAceptacion}
                  onChange={(e) => updateFilter('numeroAceptacion', e.target.value)}
                  className="w-full"
                  placeholder="Ingrese número de manifiesto"
                  maxLength={50}
                />
              </div>

              {/* Número de Vuelo */}
              <div className="flex flex-col">
                <Label htmlFor="numero-vuelo" className="text-white mb-2">
                  Nº Vuelo:
                </Label>
                <Input
                  id="numero-vuelo"
                  type="text"
                  value={filters.numeroVuelo}
                  onChange={(e) => updateFilter('numeroVuelo', e.target.value)}
                  className="w-full"
                  placeholder="Ingrese número de vuelo"
                  maxLength={20}
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
                    checked={selection.allSelected}
                    onChange={selection.toggleAll}
                  />
                </div>
              </div>
            </div>

            {/* Tabla de manifiestos */}
            <div className="overflow-x-auto">
              <div className="min-w-max">
                <DataTable
                  headers={tableHeaders}
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
                    <span className="text-sm font-medium text-[#4A4A4A]">
                      Seleccionados: {selection.selectedCount}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-[#A8B7C7]"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#FE6565] rounded-full"></div>
                    <span className="text-sm font-medium text-[#4A4A4A]">
                      Total: {manifiestos.length}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    onClick={handleCerrarManifiesto}
                    disabled={selection.selectedCount === 0}
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
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.closeModal}
        textDescription={`¿Está seguro de que desea cerrar ${selection.selectedCount} manifiesto(s) seleccionado(s)?`}
        labelConfirm="Sí, Cerrar"
        labelDismiss="Cancelar"
        onHandleConfirm={handleConfirmarCierre}
      />
    </div>
  );
};

export default CierreManifiestoCourierPage;
