import React, { useState } from 'react';
import { Button } from '../ui/atoms/Button';
import { DatePicker } from '../ui/atoms/DatePicker';
import { DataTable } from '../ui/organism/DataTable';
import { TabPanel } from '../ui/atoms/TabPanel';
import { Select } from '../ui/atoms/Select';
import { Checkbox } from '../ui/atoms/Checkbox';
import { Table } from '../ui/atoms/Table';
import { Header } from '../ui/organism/DataTable/dataTable.types';

interface Manifiesto extends Record<string, unknown> {
  nroAceptacion: string;
  nroRefOriginal: string;
  emisor: string;
  fechaAceptacion: string;
  fechaConformacion: string;
  totalGuias: number;
  totalGuiasMarcadas: number;
  totalGuiasRevisadas: string;
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
  seleccionar?: boolean;
}

const ConsultaMarcasPage: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState('01/10/2025');
  const [fechaTermino, setFechaTermino] = useState('31/10/2025');
  const [manifiestoSeleccionado, setManifiestoSeleccionado] = useState('84790');
  const [mostrarModalGuias, setMostrarModalGuias] = useState(false);
  const [mostrarDetallesGuia, setMostrarDetallesGuia] = useState(false);
  const [guiaSeleccionada, setGuiaSeleccionada] = useState<any>(null);
  const [guiasAsociadas, setGuiasAsociadas] = useState<any[]>([]);
  
  // Estados para filtros de documentos relacionados
  const [tipoRelacion, setTipoRelacion] = useState('REFERENCIA');
  const [referenciado, setReferenciado] = useState(true);
  const [referenciaA, setReferenciaA] = useState(true);

  // Datos mock de manifiestos
  const manifiestos: Manifiesto[] = [
    {
      nroAceptacion: '84789',
      nroRefOriginal: 'MFTOC_JJ0610251',
      emisor: 'MENDEZ TRONCOSO, YERKO WILLIAM',
      fechaAceptacion: '06-10-2025 12:46',
      fechaConformacion: '11-10-2025 18:45',
      totalGuias: 1,
      totalGuiasMarcadas: 0,
      totalGuiasRevisadas: ''
    },
    {
      nroAceptacion: '84790',
      nroRefOriginal: 'MFTOC_JJ0610252',
      emisor: 'MENDEZ TRONCOSO, YERKO WILLIAM',
      fechaAceptacion: '06-10-2025 15:08',
      fechaConformacion: '10-10-2025 09:52',
      totalGuias: 4,
      totalGuiasMarcadas: 4,
      totalGuiasRevisadas: ''
    },
    {
      nroAceptacion: '84803',
      nroRefOriginal: 'MFTOC_MA_1010_1',
      emisor: 'MENDEZ TRONCOSO, YERKO WILLIAM',
      fechaAceptacion: '10-10-2025 11:56',
      fechaConformacion: '11-10-2025 17:55',
      totalGuias: 1,
      totalGuiasMarcadas: 0,
      totalGuiasRevisadas: ''
    }
  ];

  // Datos mock de guías asociadas
  const guiasMock = [
    {
      numeroGuia: 'GTIME-IVAD-06102025014',
      motivoMarca: 'PARTIDA-DECLARACIÓN 00.23 (DIPS sin advalorem)',
      resultadoSeleccionDetalle: 'Más Info.'
    },
    {
      numeroGuia: 'GTIME-IVAD-06102025012',
      motivoMarca: 'LIBRE-LIBRE',
      resultadoSeleccionDetalle: 'Más Info.'
    },
    {
      numeroGuia: 'GTIME-IVAD-06102025008',
      motivoMarca: 'R-RETENCION',
      resultadoSeleccionDetalle: 'Más Info.'
    },
    {
      numeroGuia: 'GTIME-IVAD-06102025007',
      motivoMarca: 'R-RETENCION',
      resultadoSeleccionDetalle: 'Más Info.'
    }
  ];

  // Datos mock para detalles de guía
  const detallesGuiaMock = {
    numeroGuia: 'GTIME-IVAD-06102025014',
    naviera: 'MENDEZ TRONCOSO, YERKO WILLIAM',
    consignante: 'rut generico ERRAZURIZ 755',
    transportista: 'MENDEZ TRONCOSO, YERKO WILLIAM ERRAZURIZ 755',
    lugarRecepcion: '',
    puertoDescarga: 'Arturo Merino Benitez (Santiago)',
    creador: 'ymendez',
    totalItem: 1,
    totalBultos: 3.0,
    totalPeso: '150.0 KGM',
    lugarEmision: '',
    fechaEmision: '06/10/2025',
    consignatario: 'rut generico Direccion rut prueba',
    puertoCarga: 'Tocumen International (Panama City)',
    lugarDestino: '',
    fechaCreacion: '06/10/2025',
    totalVolumen: 0.0
  };

  // Datos mock para documentos relacionados
  const documentosRelacionados: DocumentoRelacionado[] = [
    {
      id: '1',
      tipoRelacion: 'REFERENCIA',
      fechaRelacion: '07/10/2025 00:00',
      tipoDocumento: 'MFTOC',
      numeroDocumento: '84790',
      emisor: 'MENDEZ TRONCOSO, YERKO WILLIAM',
      fechaEmision: '06/10/2025 00:00',
      version: '0',
      fechaInicioVersion: '2025-10-06 15:08:20.0'
    }
  ];

  // Opciones para el select de tipo relación
  const opcionesTipoRelacion = [
    { label: 'REFERENCIA', value: 'REFERENCIA' },
    { label: 'ANEXO', value: 'ANEXO' },
    { label: 'COMPLEMENTO', value: 'COMPLEMENTO' }
  ];

  // Headers para la tabla de documentos relacionados
  const headersDocumentos: Header<DocumentoRelacionado>[] = [
    {
      key: 'seleccionar',
      label: 'Seleccionar',
      sortable: false,
      render: (row: DocumentoRelacionado) => (
        <input type="radio" name="documento" defaultChecked className="text-blue-600 focus:ring-blue-500" />
      )
    },
    {
      key: 'tipoRelacion',
      label: 'Tipo Relación',
      sortable: true,
      render: (row: DocumentoRelacionado) => (
        <div className="flex items-center">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
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
      label: 'Nº Documento',
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

  // Headers de la tabla de guías
  const headersGuias: Header<any>[] = [
    {
      key: 'numeroGuia',
      label: 'Numero Guía',
      sortable: true
    },
    {
      key: 'motivoMarca',
      label: 'Motivo Marca',
      sortable: true
    },
    {
      key: 'seleccion',
      label: 'Selección',
      sortable: false,
      render: (row: any) => (
        <div className="flex items-center justify-center">
          <span>-</span>
        </div>
      )
    },
    {
      key: 'detalles',
      label: 'Detalles',
      sortable: false,
      render: (row: any) => (
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setGuiaSeleccionada(row);
              setMostrarDetallesGuia(true);
            }}
            className="flex items-center justify-center text-xs px-2 py-1 border-blue-300 text-blue-600 hover:bg-blue-50"
            title="Ver detalles"
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

  // Headers de la tabla
  const headers: Header<Manifiesto>[] = [
    {
      key: 'nroAceptacion',
      label: 'Nro. Aceptación',
      sortable: true
    },
    {
      key: 'nroRefOriginal',
      label: 'Nro. Ref Original',
      sortable: true
    },
    {
      key: 'emisor',
      label: 'Emisor',
      sortable: true
    },
    {
      key: 'fechaAceptacion',
      label: 'Fecha Aceptación',
      sortable: true
    },
    {
      key: 'fechaConformacion',
      label: 'Fecha Conformación',
      sortable: true
    },
    {
      key: 'totalGuias',
      label: 'Total Guías',
      sortable: true
    },
    {
      key: 'totalGuiasMarcadas',
      label: 'Total Guías Marcadas',
      sortable: true,
    },
    {
      key: 'totalGuiasRevisadas',
      label: 'Total Guías Revisadas',
      sortable: true,
      render: (row) => row.totalGuiasRevisadas || '-'
    },
    {
      key: 'acciones',
      label: 'Acciones',
      sortable: false,
      render: (row) => (
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setManifiestoSeleccionado(row.nroAceptacion);
              setGuiasAsociadas(guiasMock);
              setMostrarModalGuias(true);
            }}
            className="flex items-center justify-center text-xs px-2 py-1 border-blue-300 text-blue-600 hover:bg-blue-50"
            title="Ver manifiesto"
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

  const handleBuscar = () => {
    console.log('Buscando manifiestos desde:', fechaInicio, 'hasta:', fechaTermino);
  };

  const handleExportXML = () => {
    console.log('Exportando XML para manifiesto:', manifiestoSeleccionado);
  };

  const handleCerrarModal = () => {
    setMostrarModalGuias(false);
    setGuiasAsociadas([]);
  };

  const handleExportXMLGuias = () => {
    console.log('Exportando XML para guías asociadas');
  };

  const handleCerrarDetallesGuia = () => {
    setMostrarDetallesGuia(false);
    setGuiaSeleccionada(null);
  };

  const handleBuscarDocumentos = () => {
    console.log('Buscando documentos relacionados con filtros:', {
      tipoRelacion,
      referenciado,
      referenciaA
    });
  };

  // Contenido del tab panel de detalles
  const tabsDetalles = [
    {
      id: 'datos-generales',
      label: 'Datos Generales',
      content: (
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
      )
    },
    {
      id: 'documentos-relacionados',
      label: 'Documentos Relacionados',
      content: (
        <div className="space-y-6">
          {/* Filtros */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Filtros de Búsqueda</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-blue-900 mb-2">Tipo Relación:</label>
                <Select
                  options={opcionesTipoRelacion}
                  value={tipoRelacion}
                  onChange={setTipoRelacion}
                  placeholder="Selecciona tipo de relación"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-blue-900 mb-2">Documento participa como:</label>
                <div className="flex space-x-4">
                  <Checkbox
                    id="referenciado"
                    label="Referenciado"
                    checked={referenciado}
                    onChange={setReferenciado}
                  />
                  <Checkbox
                    id="referencia-a"
                    label="Referencia a"
                    checked={referenciaA}
                    onChange={setReferenciaA}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleBuscarDocumentos}
                  variant="primary"
                  size="md"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Buscar
                </Button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-4 sm:px-6 py-4 bg-blue-600">
              <div className="flex items-center justify-center">
                <h4 className="text-white font-medium">
                  Documentos Relacionados encontrados: {documentosRelacionados.length}
                </h4>
              </div>
            </div>

            {/* Tabla de documentos usando componente Table */}
            <Table
              headers={headersDocumentos}
              data={documentosRelacionados}
              emptyState={{
                title: "No hay documentos relacionados",
                description: "No se encontraron documentos relacionados con los filtros aplicados."
              }}
            />
          </div>

          {/* Información adicional */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Información sobre Documentos Relacionados
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Esta sección muestra los documentos relacionados con la guía courier actual. 
                    Puede filtrar por tipo de relación y función del documento para encontrar información específica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'operaciones',
      label: 'Operaciones',
      content: (
        <div className="text-center py-8 text-gray-500">
          <p>No hay operaciones disponibles</p>
        </div>
      )
    },
    {
      id: 'mas-informacion',
      label: 'Más Información',
      content: (
        <div className="text-center py-8 text-gray-500">
          <p>Información adicional no disponible</p>
        </div>
      )
    }
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Consulta de Marcas</h1>
        <div className="mt-2 w-20 h-1 bg-gradient-to-r from-blue-600 to-red-500 rounded-full"></div>
      </div>

      {/* Filtro de fechas */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-1">
            <DatePicker
              label="Fecha Inicio"
              value={fechaInicio}
              onChange={setFechaInicio}
              placeholder="[dd/MM/yyyy]"
              required
            />
          </div>
          
          <div className="flex-1">
            <DatePicker
              label="Fecha Término"
              value={fechaTermino}
              onChange={setFechaTermino}
              placeholder="[dd/MM/yyyy]"
              required
            />
          </div>
          
          <div className="flex-1">
            <Button
              onClick={handleBuscar}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200 h-12"
            >
              Manifiestos
            </Button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-900 text-left">
              Manifiestos Courier Encontrados: {manifiestos.length}
            </h2>
            <Button
              onClick={handleExportXML}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm sm:text-base px-4 py-2"
            >
              Exportar
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <DataTable 
              headers={headers} 
              data={manifiestos}
              pageSize={5}
              showPagination={true}
              paginationSize="sm"
            />
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-4 sm:mt-6 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-2 sm:ml-3">
            <h3 className="text-xs sm:text-sm font-medium text-blue-800">
              Información sobre Consulta de Marcas
            </h3>
            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-blue-700">
              <p>
                Esta funcionalidad permite consultar los manifiestos courier y sus marcas asociadas. 
                Seleccione un manifiesto para ver más detalles o exportar la información en formato XML.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Guías Asociadas */}
      {mostrarModalGuias && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center  min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={handleCerrarModal}
            ></div>

            {/* Modal */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              {/* Header del Modal */}
              <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
                    Guías Asociadas
                  </h3>
                  <button
                    onClick={handleCerrarModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Contenido del Modal */}
              <div className="bg-white">
                {/* Header de la tabla */}
                <div className="px-4 sm:px-6 py-4 bg-blue-600">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">
                      Guías Courier Encontrados: {guiasAsociadas.length}
                    </h4>
                    <Button
                      onClick={handleExportXMLGuias}
                      variant="outline"
                      size="sm"
                      className="text-[#0ea5e9] hover:text-[#0ea5e9] text-sm font-medium border-blue-200 hover:border-white"
                      title="Export XML"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </Button>
                  </div>
                </div>

                {/* Tabla de guías */}
                <div className="overflow-x-auto">
                  <DataTable 
                    headers={headersGuias} 
                    data={guiasAsociadas}
                    pageSize={10}
                    showPagination={false}
                  />
                </div>
              </div>

              {/* Footer del Modal */}
              <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4">
                {/* Sin botón Volver */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalles de Guía */}
      {mostrarDetallesGuia && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={handleCerrarDetallesGuia}
            ></div>

            {/* Modal */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
              {/* Header del Modal */}
              <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
                    C GUÍA TIME: {guiaSeleccionada?.numeroGuia || 'GTIME-IVAD-06102025014'} vs1
                  </h3>
                  <button
                    onClick={handleCerrarDetallesGuia}
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
                <div className="px-4 sm:px-6 py-4 bg-blue-600">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">
                      Detalles de Guía Courier
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#0ea5e9] hover:text-[#0ea5e9] text-sm font-medium border-blue-200 hover:border-white"
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
      )}
    </div>
  );
};

export default ConsultaMarcasPage;
