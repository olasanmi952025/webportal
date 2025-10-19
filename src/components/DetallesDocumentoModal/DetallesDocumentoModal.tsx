import React from 'react';
import { Button } from '../../ui/atoms/Button';
import { TabPanel } from '../../ui/atoms/TabPanel';
import { DatePicker } from '../../ui/atoms/DatePicker';
import { Select } from '../../ui/atoms/Select';
import { Checkbox } from '../../ui/atoms/Checkbox';
import { DataTable } from '../../ui/organism/DataTable';
import { Header } from '../../ui/organism/DataTable/dataTable.types';
import { MasInformacionAccordion } from '../MasInformacionAccordion/MasInformacionAccordion';

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
  estado: string;
}

interface Observacion extends Record<string, unknown> {
  id: string;
  tipoObservacion: string;
  fecha: string;
  observacion: string;
  loginUsuario: string;
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
  // Estado para el acordeón
  const [acordeonAbierto, setAcordeonAbierto] = React.useState<string | null>('participantes');

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
      fechaInicio: '06/10/2025',
      fechaTermino: '08/10/2025',
      estado: 'Activa'
    },
    {
      id: 'op2',
      numeroReferencia: 'REF002',
      numero: 'OP002',
      fechaInicio: '07/10/2025',
      fechaTermino: '09/10/2025',
      estado: 'Completada'
    },
    {
      id: 'op3',
      numeroReferencia: 'REF003',
      numero: 'OP003',
      fechaInicio: '08/10/2025',
      fechaTermino: '10/10/2025',
      estado: 'En Proceso'
    },
    {
      id: 'op4',
      numeroReferencia: 'REF004',
      numero: 'OP004',
      fechaInicio: '09/10/2025',
      fechaTermino: '11/10/2025',
      estado: 'Activa'
    },
    {
      id: 'op5',
      numeroReferencia: 'REF005',
      numero: 'OP005',
      fechaInicio: '10/10/2025',
      fechaTermino: '12/10/2025',
      estado: 'Completada'
    }
  ];

  // Datos mock para participantes
  const participantes: Participante[] = [
    {
      id: 'part1',
      rol: 'Consignante',
      nombreDigitado: 'MENDEZ TRONCOSO, YERKO WILLIAM',
      tipoId: 'RUT',
      numeroId: '12345678-9',
      fechaParticipacion: '06/10/2025',
      nombreRegistradoAduana: 'MENDEZ TRONCOSO, YERKO WILLIAM'
    },
    {
      id: 'part2',
      rol: 'Consignatario',
      nombreDigitado: 'rut generico Direccion rut prueba',
      tipoId: 'RUT',
      numeroId: '98765432-1',
      fechaParticipacion: '06/10/2025',
      nombreRegistradoAduana: 'rut generico Direccion rut prueba'
    },
    {
      id: 'part3',
      rol: 'Transportista',
      nombreDigitado: 'MENDEZ TRONCOSO, YERKO WILLIAM ERRAZURIZ 755',
      tipoId: 'RUT',
      numeroId: '11111111-1',
      fechaParticipacion: '06/10/2025',
      nombreRegistradoAduana: 'MENDEZ TRONCOSO, YERKO WILLIAM ERRAZURIZ 755'
    }
  ];

  // Datos mock para prorrogas
  const prorrogas: Prorroga[] = [
    {
      id: 'pror1',
      fechaProrroga: '10/10/2025',
      fechaVencimiento: '15/10/2025',
      observacion: 'Prorroga por demora en documentación',
      fechaVencimientoAnterior: '10/10/2025'
    },
    {
      id: 'pror2',
      fechaProrroga: '12/10/2025',
      fechaVencimiento: '18/10/2025',
      observacion: 'Segunda prorroga por inspección',
      fechaVencimientoAnterior: '15/10/2025'
    }
  ];

  // Datos mock para locaciones
  const locaciones: Locacion[] = [
    {
      id: 'loc1',
      tipoLocacion: 'Puerto de Embarque',
      locacion: 'Tocumen International (Panama City)',
      codigo: 'PTY',
      orden: '1'
    },
    {
      id: 'loc2',
      tipoLocacion: 'Puerto de Desembarque',
      locacion: 'Arturo Merino Benitez (Santiago)',
      codigo: 'SCL',
      orden: '2'
    }
  ];

  // Datos mock para fechas
  const fechas: Fecha[] = [
    {
      id: 'fecha1',
      tipoFecha: 'Fecha de Emisión',
      fecha: '06/10/2025'
    },
    {
      id: 'fecha2',
      tipoFecha: 'Fecha de Zarpe',
      fecha: '07/10/2025'
    }
  ];

  // Datos mock para estados
  const estados: Estado[] = [
    {
      id: 'est1',
      tipoEstado: 'Creado',
      fechaActivacion: '06/10/2025 15:08:20',
      usuario: 'ymendez',
      observaciones: 'Documento creado inicialmente'
    },
    {
      id: 'est2',
      tipoEstado: 'En Proceso',
      fechaActivacion: '06/10/2025 16:30:15',
      usuario: 'ymendez',
      observaciones: 'Documento en proceso de revisión'
    },
    {
      id: 'est3',
      tipoEstado: 'Marcado',
      fechaActivacion: '07/10/2025 09:15:30',
      usuario: 'ymendez',
      observaciones: 'Documento marcado para revisión'
    }
  ];

  // Datos mock para observaciones
  const observaciones: Observacion[] = [
    {
      id: 'obs1',
      tipoObservacion: 'General',
      fecha: '2025-10-16',
      observacion: 'Documento procesado correctamente',
      loginUsuario: 'ymendez'
    },
    {
      id: 'obs2',
      tipoObservacion: 'Validación',
      fecha: '2025-10-16',
      observacion: 'Validación de datos completada',
      loginUsuario: 'ymendez'
    }
  ];

  // Handler para toggle del acordeón
  const handleToggleAcordeon = (seccion: string) => {
    setAcordeonAbierto(acordeonAbierto === seccion ? null : seccion);
  };

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
            onToggleAcordeon={handleToggleAcordeon}
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
          <div className="bg-white overflow-y-auto flex-1">
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
