import React from 'react';
import { Button } from '../../ui/atoms/Button';
import { TabPanel } from '../../ui/atoms/TabPanel';
import { DatePicker } from '../../ui/atoms/DatePicker';
import { Select } from '../../ui/atoms/Select';
import { Checkbox } from '../../ui/atoms/Checkbox';
import { DataTable } from '../../ui/organism/DataTable';
import { Header } from '../../ui/organism/DataTable/dataTable.types';

interface DocumentoDetalle {
  id: string;
  tipoDocumento: string;
  numero: string;
  fechaCreacion: string;
  creador: string;
  version: string;
  activo: string;
  fechaEmision?: string;
  emisor?: string;
  numeroReferencia?: string;
  numeroVuelo?: string;
  puertoEmbarque?: string;
  fechaZarpe?: string;
  destinoFinal?: string;
  sitioAtraque?: string;
  puertoDesembarque?: string;
  fechaArribo?: string;
  itinerario?: string;
}

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
  usuario: string;
  fechaCreacion: string;
}

interface Observacion extends Record<string, unknown> {
  id: string;
  tipoObservacion: string;
  fecha: string;
  observacion: string;
  loginUsuario: string;
}

interface DetallesDocumentoModalProps {
  documento: DocumentoDetalle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DetallesDocumentoModal: React.FC<DetallesDocumentoModalProps> = ({
  documento,
  isOpen,
  onClose
}) => {
  if (!isOpen || !documento) return null;

  // Datos mock para documentos relacionados
  const documentosRelacionados: DocumentoRelacionado[] = [
    {
      id: 'doc1',
      tipoRelacion: 'Relacionado',
      fechaRelacion: '2025-10-06',
      tipoDocumento: 'MANIFIESTO',
      numeroDocumento: 'MFT001',
      emisor: 'EMISOR TEST',
      fechaEmision: '2025-10-06',
      version: '1',
      fechaInicioVersion: '2025-10-06'
    },
    {
      id: 'doc2',
      tipoRelacion: 'Dependiente',
      fechaRelacion: '2025-10-06',
      tipoDocumento: 'GUIA',
      numeroDocumento: 'GUI001',
      emisor: 'EMISOR TEST 2',
      fechaEmision: '2025-10-06',
      version: '1',
      fechaInicioVersion: '2025-10-06'
    }
  ];

  // Datos mock para operaciones
  const operaciones: Operacion[] = [
    {
      id: 'op1',
      numeroReferencia: 'REF001',
      numero: 'OP001',
      fechaInicio: '2025-10-06 10:00:00',
      fechaTermino: '2025-10-06 18:00:00',
      tipoOperacion: 'CREACION',
      estado: 'Activa',
      usuario: 'ymendez',
      fechaCreacion: '2025-10-06 10:00:00'
    },
    {
      id: 'op2',
      numeroReferencia: 'REF002',
      numero: 'OP002',
      fechaInicio: '2025-10-06 11:00:00',
      fechaTermino: '2025-10-06 19:00:00',
      tipoOperacion: 'MODIFICACION',
      estado: 'Completada',
      usuario: 'ymendez',
      fechaCreacion: '2025-10-06 11:00:00'
    },
    {
      id: 'op3',
      numeroReferencia: 'REF003',
      numero: 'OP003',
      fechaInicio: '2025-10-06 12:00:00',
      fechaTermino: '2025-10-06 20:00:00',
      tipoOperacion: 'ELIMINACION',
      estado: 'En Proceso',
      usuario: 'ymendez',
      fechaCreacion: '2025-10-06 12:00:00'
    },
    {
      id: 'op4',
      numeroReferencia: 'REF004',
      numero: 'OP004',
      fechaInicio: '2025-10-06 13:00:00',
      fechaTermino: '2025-10-06 21:00:00',
      tipoOperacion: 'CREACION',
      estado: 'Activa',
      usuario: 'ymendez',
      fechaCreacion: '2025-10-06 13:00:00'
    },
    {
      id: 'op5',
      numeroReferencia: 'REF005',
      numero: 'OP005',
      fechaInicio: '2025-10-06 14:00:00',
      fechaTermino: '2025-10-06 22:00:00',
      tipoOperacion: 'MODIFICACION',
      estado: 'Completada',
      usuario: 'ymendez',
      fechaCreacion: '2025-10-06 14:00:00'
    }
  ];

  // Datos mock para observaciones
  const observaciones: Observacion[] = [
    {
      id: 'obs1',
      tipoObservacion: 'General',
      fecha: '2025-10-06',
      observacion: 'Documento procesado correctamente',
      loginUsuario: 'ymendez'
    },
    {
      id: 'obs2',
      tipoObservacion: 'Validación',
      fecha: '2025-10-06',
      observacion: 'Validación de datos completada',
      loginUsuario: 'ymendez'
    }
  ];

  // Headers para documentos relacionados
  const headersDocumentosRelacionados: Header<DocumentoRelacionado>[] = [
    {
      key: 'tipoRelacion',
      label: 'Tipo Relación',
      sortable: true,
      align: 'left'
    },
    {
      key: 'fechaRelacion',
      label: 'Fecha Relación',
      sortable: true,
      align: 'left'
    },
    {
      key: 'tipoDocumento',
      label: 'Tipo Documento',
      sortable: true,
      align: 'left'
    },
    {
      key: 'numeroDocumento',
      label: 'Número Documento',
      sortable: true,
      align: 'left'
    },
    {
      key: 'emisor',
      label: 'Emisor',
      sortable: true,
      align: 'left'
    },
    {
      key: 'fechaEmision',
      label: 'Fecha Emisión',
      sortable: true,
      align: 'left'
    },
    {
      key: 'version',
      label: 'Versión',
      sortable: true,
      align: 'center'
    },
    {
      key: 'fechaInicioVersion',
      label: 'Fecha Inicio Versión',
      sortable: true,
      align: 'left'
    }
  ];

  // Headers para operaciones
  const headersOperaciones: Header<Operacion>[] = [
    {
      key: 'numeroReferencia',
      label: 'Número Referencia',
      sortable: true,
      align: 'left'
    },
    {
      key: 'numero',
      label: 'Número',
      sortable: true,
      align: 'left'
    },
    {
      key: 'fechaInicio',
      label: 'Fecha Inicio',
      sortable: true,
      align: 'left'
    },
    {
      key: 'fechaTermino',
      label: 'Fecha Término',
      sortable: true,
      align: 'left'
    },
    {
      key: 'tipoOperacion',
      label: 'Tipo Operación',
      sortable: true,
      align: 'left'
    },
    {
      key: 'estado',
      label: 'Estado',
      sortable: true,
      align: 'center'
    },
    {
      key: 'usuario',
      label: 'Usuario',
      sortable: true,
      align: 'left'
    },
    {
      key: 'fechaCreacion',
      label: 'Fecha Creación',
      sortable: true,
      align: 'left'
    }
  ];

  // Headers para observaciones
  const headersObservaciones: Header<Observacion>[] = [
    {
      key: 'tipoObservacion',
      label: 'Tipo Observación',
      sortable: true,
      align: 'left'
    },
    {
      key: 'fecha',
      label: 'Fecha',
      sortable: true,
      align: 'left'
    },
    {
      key: 'observacion',
      label: 'Observación',
      sortable: true,
      align: 'left'
    },
    {
      key: 'loginUsuario',
      label: 'Usuario',
      sortable: true,
      align: 'left'
    }
  ];

  const tabs = [
    {
      id: 'datos-generales',
      label: 'Datos Generales',
      content: (
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            {/* Información Principal */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">N° Manifiesto COURIER : {documento.numero}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Fecha Emisión:</span>
                    <span className="text-sm text-blue-900">{documento.fechaEmision || documento.fechaCreacion}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Emisor:</span>
                    <span className="text-sm text-blue-900">{documento.emisor || documento.creador}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">N° Referencia Original:</span>
                    <span className="text-sm text-blue-900">{documento.numeroReferencia || 'MFTOC_JJ0610251'}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Nro. Vuelo:</span>
                    <span className="text-sm text-blue-900">{documento.numeroVuelo || '033'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Puerto de Embarque:</span>
                    <span className="text-sm text-blue-900">{documento.puertoEmbarque || 'MIAMI'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Fecha Zarpe estimado:</span>
                    <span className="text-sm text-blue-900">{documento.fechaZarpe || '11/10/2025 12:45'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información Adicional */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Destino Final: Sitio Atraque:</span>
                    <span className="text-sm text-gray-900 text-right">{documento.sitioAtraque || ''}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Puerto de Desembarque:</span>
                    <span className="text-sm text-gray-900 text-right">{documento.puertoDesembarque || 'SANTIAGO'}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Fecha Arribo estimada:</span>
                    <span className="text-sm text-gray-900 text-right">{documento.fechaArribo || '11/10/2025 12:45'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Itinerario:</span>
                    <span className="text-sm text-gray-900 text-right">{documento.itinerario || ''}</span>
                  </div>
                </div>
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
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-medium text-[#111111] mb-2">Tipo Relación:</label>
                  <Select
                    options={[
                      { label: '[TODOS]', value: '' },
                      { label: 'Relacionado', value: 'RELACIONADO' },
                      { label: 'Dependiente', value: 'DEPENDIENTE' }
                    ]}
                    value=""
                    onChange={() => {}}
                    placeholder="Selecciona tipo de relación"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-medium text-[#111111] mb-2">Documento participa como:</label>
                  <div className="flex space-x-4">
                    <Checkbox
                      id="referenciado"
                      checked={true}
                      onChange={() => {}}
                      label="Referenciado"
                    />
                    <Checkbox
                      id="referencia-a"
                      checked={true}
                      onChange={() => {}}
                      label="Referencia a"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-end">
                    <Button
                      onClick={() => console.log('Buscar documentos relacionados')}
                      className="bg-[#006FB3] hover:bg-[#005a9c] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 w-full max-w-xs"
                    >
                      Buscar
                    </Button>
                  </div>
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
                headers={headersDocumentosRelacionados}
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
          <div className="space-y-6">
            
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
                      value=""
                      onChange={() => {}}
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
                      value=""
                      onChange={() => {}}
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
                      options={[
                        { label: '[TODOS]', value: '' },
                        { label: 'CREACION', value: 'CREACION' },
                        { label: 'MODIFICACION', value: 'MODIFICACION' },
                        { label: 'ELIMINACION', value: 'ELIMINACION' }
                      ]}
                      value=""
                      onChange={() => {}}
                      placeholder="Seleccionar tipo"
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Botón Buscar */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-[#111111] mb-2">
                    &nbsp;
                  </label>
                  <div className="w-full">
                    <Button
                      onClick={() => console.log('Buscar operaciones')}
                      className="w-full bg-[#006FB3] hover:bg-[#005a9c] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200"
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
        </div>
      )
    },
    {
      id: 'observaciones',
      label: 'Observaciones',
      content: (
        <div className="p-4 sm:p-6 bg-blue-50">
          <div className="overflow-x-auto">
            <DataTable
              headers={headersObservaciones}
              data={observaciones}
              pageSize={10}
              showPagination={false}
            />
          </div>
        </div>
      )
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          {/* Header del Modal */}
          <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-[#111111]">
                  {documento.tipoDocumento}: {documento.numero} vs{documento.version}
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
          <div className="bg-white">
            {/* Header de información */}
            <div className="px-4 sm:px-6 py-4 bg-[#006FB3]">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">
                  Detalles de Documento
                </h4>
                <Button
                  onClick={() => console.log('Export XML')}
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
              tabs={tabs} 
              defaultTab="datos-generales"
              className="min-h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
