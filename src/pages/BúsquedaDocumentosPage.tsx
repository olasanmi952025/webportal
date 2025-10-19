/**
 * Página de Búsqueda de Documentos
 * 
 * Permite buscar documentos aduaneros con múltiples filtros:
 * - Tipo y grupo de documento
 * - Usuario creador
 * - Locación
 * - Participante y rol
 * - Rango de fechas
 * 
 * @version 2.0 - Refactorizada con mejores prácticas
 */

import React, { useMemo } from 'react';
import { Button } from '../ui/atoms/Button';
import { Select } from '../ui/atoms/Select';
import { Checkbox } from '../ui/atoms/Checkbox';
import { SearchInput } from '../ui/molecule/SearchInput';
import { DataTable } from '../ui/organism/DataTable';
import { Header } from '../ui/organism/DataTable/dataTable.types';
import { DetallesDocumentoModal } from '../components';
import { PageHeader, DateRangeFilter } from '../components/common';
import { useFilters, useModal } from '../hooks';
import { mockDocumentos } from '../services/mockDataService';
import { sanitizeString } from '../utils';
import {
  TIPO_DOCUMENTO_OPTIONS,
  GRUPO_DOCUMENTO_OPTIONS,
  TIPO_LOCACION_OPTIONS,
  ROL_OPTIONS,
  TIPO_FECHA_OPTIONS
} from '../constants';
import type { Documento } from '../types';

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface DocumentosFilters extends Record<string, any> {
  filtroPor: string;
  grupoDocumento: string;
  tipoDocumento: string;
  numeroReferencia: string;
  soloActivos: boolean;
  usuarioCreador: string;
  todosUsuarios: boolean;
  locacion: string;
  todasLocaciones: boolean;
  tipoLocacion: string;
  participante: string;
  todosParticipantes: boolean;
  rol: string;
  fechaDesde: string;
  fechaHasta: string;
  tipoFecha: string;
}

// ============================================================================
// CONSTANTES
// ============================================================================

const INITIAL_FILTERS: DocumentosFilters = {
  filtroPor: 'todos',
  grupoDocumento: '',
  tipoDocumento: '',
  numeroReferencia: '',
  soloActivos: true,
  usuarioCreador: '',
  todosUsuarios: true,
  locacion: '',
  todasLocaciones: true,
  tipoLocacion: '',
  participante: '',
  todosParticipantes: true,
  rol: '',
  fechaDesde: '12/10/2025',
  fechaHasta: '18/10/2025',
  tipoFecha: 'FECHA_DE_ARRIBO'
};

const FILTRO_POR_OPTIONS = [
  { id: 'grupo-documento', label: 'Grupo Documento', value: 'grupo-documento' },
  { id: 'tipo-documento', label: 'Tipo Documento', value: 'tipo-documento' },
  { id: 'todos', label: 'Todos', value: 'todos' }
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const BusquedaDocumentosPage: React.FC = () => {
  // ============================================================================
  // HOOKS
  // ============================================================================
  
  const {
    filters,
    updateFilter,
    hasSearched,
    search,
    clearSearch
  } = useFilters<DocumentosFilters>(INITIAL_FILTERS);

  const detalleModal = useModal<Documento>();

  // ============================================================================
  // DATOS
  // ============================================================================

  const documentos = useMemo(() => {
    return mockDocumentos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSearched]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Maneja la búsqueda de documentos
   * Sanitiza los inputs antes de buscar
   */
  const handleBuscar = () => {
    const sanitizedNumeroRef = sanitizeString(filters.numeroReferencia);
    const sanitizedUsuario = sanitizeString(filters.usuarioCreador);
    const sanitizedLocacion = sanitizeString(filters.locacion);
    const sanitizedParticipante = sanitizeString(filters.participante);
    
    console.log('Buscando documentos...', {
      ...filters,
      numeroReferencia: sanitizedNumeroRef,
      usuarioCreador: sanitizedUsuario,
      locacion: sanitizedLocacion,
      participante: sanitizedParticipante
    });

    search();
  };

  /**
   * Maneja el click en volver
   */
  const handleVolver = () => {
    clearSearch();
  };


  // ============================================================================
  // CONFIGURACIÓN DE TABLA
  // ============================================================================

  const tableHeaders = useMemo<Header<Documento>[]>(() => {
    const handleVerDetalles = (documento: Documento) => {
      detalleModal.openModal(documento);
    };
    
    return [
    {
      key: 'tipoDocumento',
      label: 'Tipo Documento',
      sortable: true,
      align: 'center'
    },
    {
      key: 'numero',
      label: 'Número',
      sortable: true,
      align: 'center',
      render: (row) => (
        <span className="text-[#006FB3] underline cursor-pointer hover:text-[#005a9c]">
          {row.numero}
        </span>
      )
    },
    {
      key: 'fechaCreacion',
      label: 'Fecha Creación',
      sortable: true,
      align: 'center'
    },
    {
      key: 'creador',
      label: 'Creador',
      sortable: true,
      align: 'center'
    },
    {
      key: 'version',
      label: 'Versión',
      sortable: true,
      align: 'center'
    },
    {
      key: 'activo',
      label: 'Activo',
      sortable: true,
      align: 'left'
    },
    {
      key: 'acciones' as keyof Documento,
      label: 'Acciones',
      sortable: false,
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleVerDetalles(row)}
            className="flex items-center justify-center text-xs px-2 py-1 border-blue-300 text-blue-600 hover:bg-blue-50"
            title="Ver Datos"
            aria-label={`Ver detalles del documento ${row.numero}`}
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
  }, [detalleModal]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <PageHeader title="Búsqueda de Documentos" />

        {/* Formulario de búsqueda */}
        {!hasSearched ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Filtrar por */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#111111] mb-4">Filtrar por:</h3>
              <div className="flex flex-wrap gap-6">
                {FILTRO_POR_OPTIONS.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      id={option.id}
                      name="filtro-por"
                      value={option.value}
                      checked={filters.filtroPor === option.value}
                      onChange={(e) => updateFilter('filtroPor', e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor={option.id} className="text-sm font-medium text-[#111111]">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Campos de filtro */}
            <div className="space-y-6">
              {/* Primera fila: Documentos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#111111] mb-2 text-left">
                    Grupo Documento:
                  </label>
                  <Select
                    options={GRUPO_DOCUMENTO_OPTIONS as any}
                    value={filters.grupoDocumento}
                    onChange={(value) => updateFilter('grupoDocumento', value)}
                    placeholder="[Sin Filtro]"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#111111] mb-2 text-left">
                    Tipo Documento:
                  </label>
                  <Select
                    options={TIPO_DOCUMENTO_OPTIONS as any}
                    value={filters.tipoDocumento}
                    onChange={(value) => updateFilter('tipoDocumento', value)}
                    placeholder="[Sin Filtro]"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#111111] mb-2 text-left">
                    Número Referencia:
                  </label>
                  <input
                    type="text"
                    value={filters.numeroReferencia}
                    onChange={(e) => updateFilter('numeroReferencia', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FB3] focus:border-transparent"
                    placeholder="Ingrese número de referencia"
                    maxLength={50}
                  />
                </div>
              </div>

              {/* Segunda fila: Usuario */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#111111] mb-2 text-left">
                    Usuario Creador:
                  </label>
                  <div className="flex items-center gap-4">
                    <SearchInput
                      value={filters.usuarioCreador}
                      onChange={(value) => updateFilter('usuarioCreador', value)}
                      placeholder="Ingrese usuario"
                      className="flex-1"
                      onSearch={() => console.log('Buscar usuario')}
                      onClear={() => updateFilter('usuarioCreador', '')}
                    />
                    <div className="flex items-center gap-4">
                      <Checkbox
                        id="solo-activos"
                        label="Sólo Activos"
                        checked={filters.soloActivos}
                        onChange={(checked) => updateFilter('soloActivos', checked)}
                      />
                      <Checkbox
                        id="todos-usuarios"
                        label="Todos"
                        checked={filters.todosUsuarios}
                        onChange={(checked) => updateFilter('todosUsuarios', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tercera fila: Locación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#111111] mb-2 text-left">
                    Locación:
                  </label>
                  <div className="flex items-center gap-2">
                    <SearchInput
                      value={filters.locacion}
                      onChange={(value) => updateFilter('locacion', value)}
                      placeholder="Ingrese locación"
                      className="flex-1"
                      onSearch={() => console.log('Buscar locación')}
                      onClear={() => updateFilter('locacion', '')}
                    />
                    <Checkbox
                      id="todas-locaciones"
                      label="Todas"
                      checked={filters.todasLocaciones}
                      onChange={(checked) => updateFilter('todasLocaciones', checked)}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#111111] mb-2 text-left">
                    Tipo Locación:
                  </label>
                  <Select
                    options={TIPO_LOCACION_OPTIONS as any}
                    value={filters.tipoLocacion}
                    onChange={(value) => updateFilter('tipoLocacion', value)}
                    placeholder="[Sin Filtro]"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Cuarta fila: Participante */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#111111] mb-2 text-left">
                    Participante:
                  </label>
                  <div className="flex items-center gap-2">
                    <SearchInput
                      value={filters.participante}
                      onChange={(value) => updateFilter('participante', value)}
                      placeholder="Ingrese participante"
                      className="flex-1"
                      onSearch={() => console.log('Buscar participante')}
                      onClear={() => updateFilter('participante', '')}
                    />
                    <Checkbox
                      id="todos-participantes"
                      label="Todos"
                      checked={filters.todosParticipantes}
                      onChange={(checked) => updateFilter('todosParticipantes', checked)}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#111111] mb-2 text-left">
                    Rol:
                  </label>
                  <Select
                    options={ROL_OPTIONS as any}
                    value={filters.rol}
                    onChange={(value) => updateFilter('rol', value)}
                    placeholder="[Sin Filtro]"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Quinta fila: Fechas */}
              <div className="grid grid-cols-1 gap-4">
                <DateRangeFilter
                  fechaDesde={filters.fechaDesde}
                  fechaHasta={filters.fechaHasta}
                  onFechaDesdeChange={(value) => updateFilter('fechaDesde', value)}
                  onFechaHastaChange={(value) => updateFilter('fechaHasta', value)}
                  labelDesde="Desde:"
                  labelHasta="Hasta:"
                  showError={false}
                  className="grid-cols-1 md:grid-cols-3"
                />
                <div className="flex flex-col md:col-start-3">
                  <label className="text-sm font-medium text-[#111111] mb-2 text-left">
                    Tipo Fecha:
                  </label>
                  <Select
                    options={TIPO_FECHA_OPTIONS as any}
                    value={filters.tipoFecha}
                    onChange={(value) => updateFilter('tipoFecha', value)}
                    placeholder="Seleccionar tipo"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Botón de búsqueda */}
            <div className="flex justify-end mt-8">
              <Button
                onClick={handleBuscar}
                className="bg-[#006FB3] hover:bg-[#005a9c] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
              >
                Buscar
              </Button>
            </div>
          </div>
        ) : (
          <>
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

            {/* Tabla de resultados */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header de resultados */}
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#111111] text-left">
                    Documentos encontrados: {documentos.length}
                  </h2>
                  <Button
                    onClick={() => console.log('Export XML')}
                    variant="outline"
                    className="border-[#A8B7C7] text-[#4A4A4A] hover:bg-[#EEEEEE] hover:border-[#8A8A8A] px-6 py-2 rounded-lg font-semibold transition-all duration-200"
                  >
                    Exportar
                  </Button>
                </div>
              </div>

              {/* Tabla */}
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  <DataTable
                    headers={tableHeaders}
                    data={documentos}
                    pageSize={5}
                    showPagination={true}
                    paginationSize="sm"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal de Detalles */}
      <DetallesDocumentoModal
        documento={detalleModal.data}
        isOpen={detalleModal.isOpen}
        onClose={detalleModal.closeModal}
      />
    </div>
  );
};

export default BusquedaDocumentosPage;
