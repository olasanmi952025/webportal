import React from 'react';
import { Button } from '../../ui/atoms/Button';
import { TabPanel } from '../../ui/atoms/TabPanel';
import { DatePicker } from '../../ui/atoms/DatePicker';
import { Select } from '../../ui/atoms/Select';
import { Checkbox } from '../../ui/atoms/Checkbox';
import { DataTable } from '../../ui/organism/DataTable';
import { Header } from '../../ui/organism/DataTable/dataTable.types';
import { MasInformacionAccordion } from '../MasInformacionAccordion/MasInformacionAccordion';

interface DocumentoRelacionado extends Record<string, unknown> {
  id: string;
  tipoRelacion: string;
  fechaRelacion: string;
  tipoDocumento: string;
  numeroDocumento: string;
  emisor: string;
  fechaEmision: string;
  version: string;
  fechaInicioVersion: string;
}

interface Operacion extends Record<string, unknown> {
  id: string;
  numeroReferencia: string;
  numero: string;
  fechaInicio: string;
  fechaTermino: string;
  tipoOperacion: string;
  estado: string;
}

interface Participante extends Record<string, unknown> {
  id: string;
  rol: string;
  nombreDigitado: string;
  tipoId: string;
  numeroId: string;
  fechaParticipacion: string;
  nombreRegistradoAduana: string;
}

interface Prorroga extends Record<string, unknown> {
  id: string;
  fechaProrroga: string;
  fechaVencimiento: string;
  observacion: string;
  fechaVencimientoAnterior: string;
}

interface Locacion extends Record<string, unknown> {
  id: string;
  tipoLocacion: string;
  locacion: string;
  codigo: string;
  orden: string;
}

interface Fecha extends Record<string, unknown> {
  id: string;
  tipoFecha: string;
  fecha: string;
}

interface Estado extends Record<string, unknown> {
  id: string;
  tipoEstado: string;
  fechaActivacion: string;
  usuario: string;
  observaciones: string;
}

interface Observacion extends Record<string, unknown> {
  id: string;
  tipoObservacion: string;
  fecha: string;
  observacion: string;
  loginUsuario: string;
}

interface DetallesGuiaModalProps {
  isOpen: boolean;
  guiaSeleccionada: any;
  detallesGuiaMock: any;
  documentosRelacionados: DocumentoRelacionado[];
  operaciones: Operacion[];
  participantes: Participante[];
  prorrogas: Prorroga[];
  locaciones: Locacion[];
  fechas: Fecha[];
  estados: Estado[];
  observaciones: Observacion[];
  tipoRelacion: string;
  referenciado: boolean;
  referenciaA: boolean;
  fechaInicioOperaciones: string;
  fechaTerminoOperaciones: string;
  tipoOperacion: string;
  acordeonAbierto: string | null;
  onClose: () => void;
  onTipoRelacionChange: (value: string) => void;
  onReferenciadoChange: (value: boolean) => void;
  onReferenciaAChange: (value: boolean) => void;
  onFechaInicioOperacionesChange: (value: string) => void;
  onFechaTerminoOperacionesChange: (value: string) => void;
  onTipoOperacionChange: (value: string) => void;
  onBuscarDocumentos: () => void;
  onBuscarOperaciones: () => void;
  onToggleAcordeon: (seccion: string) => void;
  onExportXML: () => void;
}

export const DetallesGuiaModal: React.FC<DetallesGuiaModalProps> = ({
  isOpen,
  guiaSeleccionada,
  detallesGuiaMock,
  documentosRelacionados,
  operaciones,
  participantes,
  prorrogas,
  locaciones,
  fechas,
  estados,
  observaciones,
  tipoRelacion,
  referenciado,
  referenciaA,
  fechaInicioOperaciones,
  fechaTerminoOperaciones,
  tipoOperacion,
  acordeonAbierto,
  onClose,
  onTipoRelacionChange,
  onReferenciadoChange,
  onReferenciaAChange,
  onFechaInicioOperacionesChange,
  onFechaTerminoOperacionesChange,
  onTipoOperacionChange,
  onBuscarDocumentos,
  onBuscarOperaciones,
  onToggleAcordeon,
  onExportXML
}) => {
  // Opciones para el select de tipo relación
  const opcionesTipoRelacion = [
    { label: '[TODOS]', value: 'TODOS' },
    { label: 'REFERENCIA', value: 'REFERENCIA' },
    { label: 'DOCUMENTO MADRE', value: 'DOCUMENTO MADRE' },
    { label: 'MANIFIESTO ANTERIOR', value: 'MANIFIESTO ANTERIOR' },
    { label: 'BL ANTERIOR', value: 'BL ANTERIOR' },
    { label: 'BL CUBREFALTA', value: 'BL CUBREFALTA' },
    { label: 'FLETE', value: 'FLETE' },
    { label: 'ANEXO', value: 'ANEXO' },
    { label: 'COMPLEMENTO', value: 'COMPLEMENTO' }
  ];

  // Opciones para el select de tipo operación
  const opcionesTipoOperacion = [
    { label: '[Todas]', value: 'TODAS' },
    { label: 'Operacion de Transporte', value: 'Operacion de Transporte' },
    { label: 'Operacion de Almacen', value: 'Operacion de Almacen' },
    { label: 'Operación de Fiscalización', value: 'Operación de Fiscalización' },
    { label: 'TRANSITO', value: 'TRANSITO' },
    { label: 'Operacion de ACOPIO', value: 'Operacion de ACOPIO' }
  ];

  // Headers para la tabla de documentos relacionados
  const headersDocumentos: Header<DocumentoRelacionado>[] = [
    {
      key: 'tipoRelacion',
      label: 'Tipo Relación',
      sortable: true,
      render: (row: DocumentoRelacionado) => (
        <div className="flex items-center">
          <span className="text-sm text-gray-900">{row.tipoRelacion}</span>
        </div>
      )
    },
    {
      key: 'fechaRelacion',
      label: 'Fecha Relación',
      sortable: true
    },
    {
      key: 'tipoDocumento',
      label: 'Tipo Documento',
      sortable: true
    },
    {
      key: 'numeroDocumento',
      label: 'N° Documento',
      sortable: true
    },
    {
      key: 'emisor',
      label: 'Emisor',
      sortable: true
    },
    {
      key: 'fechaEmision',
      label: 'Fecha Emisión',
      sortable: true
    },
    {
      key: 'version',
      label: 'Versión',
      sortable: true
    },
    {
      key: 'fechaInicioVersion',
      label: 'Fecha Inicio Versión',
      sortable: true
    }
  ];

  // Headers para la tabla de operaciones
  const headersOperaciones: Header<Operacion>[] = [
    {
      key: 'numeroReferencia',
      label: 'Número Referencia',
      sortable: true
    },
    {
      key: 'numero',
      label: 'Número',
      sortable: true
    },
    {
      key: 'estado',
      label: 'Activa',
      sortable: true,
      render: (row: Operacion) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          row.estado === 'Activa' ? 'bg-green-100 text-green-800' :
          row.estado === 'Completada' ? 'bg-blue-100 text-blue-800' :
          row.estado === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.estado}
        </span>
      )
    },
    {
      key: 'fechaInicio',
      label: 'Fecha Inicio',
      sortable: true
    },
    {
      key: 'fechaTermino',
      label: 'Fecha Término',
      sortable: true
    }
  ];

  // Contenido del tab panel de detalles
  const tabsDetalles = [
    {
      id: 'datos-generales',
      label: 'Datos Generales',
      content: (
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            {/* Información Principal */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Información Principal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Nº Guía Courier:</span>
                  <span className="text-sm font-semibold text-blue-900">{detallesGuiaMock.numeroGuia}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Naviera:</span>
                  <span className="text-sm text-blue-900">{detallesGuiaMock.naviera}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Consignante:</span>
                  <span className="text-sm text-blue-900">{detallesGuiaMock.consignante}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Transportista:</span>
                  <span className="text-sm text-blue-900">{detallesGuiaMock.transportista}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Puerto Descarga:</span>
                  <span className="text-sm text-blue-900">{detallesGuiaMock.puertoDescarga}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Creador:</span>
                  <span className="text-sm text-blue-900">{detallesGuiaMock.creador}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Fecha Emisión:</span>
                  <span className="text-sm text-blue-900">{detallesGuiaMock.fechaEmision}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Consignatario:</span>
                  <span className="text-sm text-blue-900">{detallesGuiaMock.consignatario}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Puerto Carga:</span>
                  <span className="text-sm text-blue-900">{detallesGuiaMock.puertoCarga}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Fecha Creación:</span>
                  <span className="text-sm text-blue-900">{detallesGuiaMock.fechaCreacion}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Lugar Recepción:</span>
                  <span className="text-sm text-gray-500">{detallesGuiaMock.lugarRecepcion || 'No especificado'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-sm font-medium text-blue-700">Lugar Destino:</span>
                  <span className="text-sm text-gray-500">{detallesGuiaMock.lugarDestino || 'No especificado'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-blue-600">{detallesGuiaMock.totalItem}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bultos</p>
                  <p className="text-2xl font-bold text-green-600">{detallesGuiaMock.totalBultos}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Peso</p>
                  <p className="text-2xl font-bold text-orange-600">{detallesGuiaMock.totalPeso}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Total Volumen</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">{detallesGuiaMock.totalVolumen}</span>
            </div>
          </div>
          </div>
        </div>
      )
    },
    {
      id: 'documentos-relacionados',
      label: 'Documentos Relacionados',
      content: (
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            {/* Filtros */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-[#111111] mb-4">Filtros de Búsqueda</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#111111] mb-2">Tipo Relación:</label>
                <Select
                  options={opcionesTipoRelacion}
                  value={tipoRelacion}
                  onChange={onTipoRelacionChange}
                  placeholder="Selecciona tipo de relación"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#111111] mb-2">Documento participa como:</label>
                <div className="flex space-x-4">
                  <Checkbox
                    id="referenciado"
                    label="Referenciado"
                    checked={referenciado}
                    onChange={onReferenciadoChange}
                  />
                  <Checkbox
                    id="referencia-a"
                    label="Referencia a"
                    checked={referenciaA}
                    onChange={onReferenciaAChange}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={onBuscarDocumentos}
                  variant="primary"
                  size="md"
                  className="w-full bg-[#006FB3] hover:bg-[#005a9c] text-white"
                >
                  Buscar
                </Button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-4 sm:px-6 py-4 bg-blue-600">
              <div className="flex items-center justify-start">
                <h4 className="text-white font-medium text-left">
                  Documentos Relacionados encontrados: {documentosRelacionados.length}
                </h4>
              </div>
            </div>

            {/* Tabla de documentos usando DataTable */}
            <DataTable
              headers={headersDocumentos}
              data={documentosRelacionados}
              pageSize={10}
              showPagination={false}
            />
          </div>

          {/* Información adicional */}
          </div>
        </div>
      )
    },
    {
      id: 'operaciones',
      label: 'Operaciones',
      content: (
        <div className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-[#111111] mb-6">Operaciones</h3>
          
          {/* Formulario de filtros */}
          <div className="bg-white border border-[#A8B7C7] rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Fecha Inicio */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Fecha Inicio
                </label>
                <div className="w-full">
                  <DatePicker
                    value={fechaInicioOperaciones}
                    onChange={onFechaInicioOperacionesChange}
                    placeholder="Seleccionar fecha"
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Fecha Término */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Fecha Término
                </label>
                <div className="w-full">
                  <DatePicker
                    value={fechaTerminoOperaciones}
                    onChange={onFechaTerminoOperacionesChange}
                    placeholder="Seleccionar fecha"
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Tipo de Operación */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Tipo de Operación
                </label>
                <div className="w-full">
                  <Select
                    options={opcionesTipoOperacion}
                    value={tipoOperacion}
                    onChange={onTipoOperacionChange}
                    placeholder="Seleccionar tipo"
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Botón Buscar */}
              <div className="flex flex-col justify-end">
                <div className="w-full">
                  <Button
                    onClick={onBuscarOperaciones}
                    variant="primary"
                    className="w-full bg-[#006FB3] hover:bg-[#005a9c] text-white py-2"
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="bg-white border border-[#A8B7C7] rounded-lg">
            <div className="px-6 py-4 border-b border-[#A8B7C7]">
              <h4 className="text-sm font-medium text-[#111111]">
                Operaciones Encontradas: {operaciones.length}
              </h4>
            </div>

            {/* Tabla de operaciones */}
            <DataTable
              headers={headersOperaciones}
              data={operaciones}
              pageSize={10}
              showPagination={false}
            />
          </div>
        </div>
      )
    },
    {
      id: 'mas-informacion',
      label: 'Más Información',
      content: (
        <div className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-[#111111] mb-6">Más Información</h3>
          
          <MasInformacionAccordion
            participantes={participantes}
            prorrogas={prorrogas}
            locaciones={locaciones}
            fechas={fechas}
            estados={estados}
            observaciones={observaciones}
            acordeonAbierto={acordeonAbierto}
            onToggleAcordeon={onToggleAcordeon}
          />
        </div>
      )
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      <div className="relative w-full max-w-6xl max-h-[95vh] mx-auto">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-h-[95vh] flex flex-col">
          {/* Header del Modal */}
          <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-[#111111]">
                  C GUÍA TIME: {guiaSeleccionada?.numeroGuia || 'GTIME-IVAD-06102025014'} vs1
                </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido del Modal con TabPanel */}
          <div className="bg-white overflow-y-auto flex-1">
            {/* Header de información */}
            <div className="px-4 sm:px-6 py-4 bg-[#006FB3]">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">
                  Detalles de Guía Courier
                </h4>
                <Button
                  onClick={onExportXML}
                  variant="outline"
                  className="text-[#006FB3] hover:text-[#006FB3] text-sm font-medium border-[#A8B7C7] hover:border-white py-2"
                  title="Exportar XML"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </Button>
              </div>
            </div>

            <TabPanel 
              tabs={tabsDetalles} 
              defaultTab="datos-generales"
              className="min-h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
