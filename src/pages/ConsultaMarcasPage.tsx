import React, { useState } from 'react';
import { 
  FiltrosFecha, 
  ManifiestosTable, 
  GuiasModal, 
  DetallesGuiaModal
} from '../components';

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

interface Guia {
  numeroGuia: string;
  motivoMarca: string;
  resultadoSeleccionDetalle: string;
}

const ConsultaMarcasPage: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState('01/10/2025');
  const [fechaTermino, setFechaTermino] = useState('31/10/2025');
  const [mostrarModalGuias, setMostrarModalGuias] = useState(false);
  const [mostrarDetallesGuia, setMostrarDetallesGuia] = useState(false);
  const [guiaSeleccionada, setGuiaSeleccionada] = useState<any>(null);
  const [guiasAsociadas, setGuiasAsociadas] = useState<Guia[]>([]);

  // Estados para filtros de documentos relacionados
  const [tipoRelacion, setTipoRelacion] = useState('TODOS');
  const [referenciado, setReferenciado] = useState(false);
  const [referenciaA, setReferenciaA] = useState(false);

  // Estados para filtros de operaciones
  const [fechaInicioOperaciones, setFechaInicioOperaciones] = useState('');
  const [fechaTerminoOperaciones, setFechaTerminoOperaciones] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('TODAS');

  // Estado para acordeón
  const [acordeonAbierto, setAcordeonAbierto] = useState<string | null>('participantes');

  // Datos mock para manifiestos
  const manifiestos: Manifiesto[] = [
    {
      nroAceptacion: '84790',
      nroRefOriginal: 'REF001',
      emisor: 'MENDEZ TRONCOSO, YERKO WILLIAM',
      fechaAceptacion: '06/10/2025',
      fechaConformacion: '06/10/2025',
      totalGuias: 4,
      totalGuiasMarcadas: 2,
      totalGuiasRevisadas: '1'
    },
    {
      nroAceptacion: '84791',
      nroRefOriginal: 'REF002',
      emisor: 'EMPRESA TRANSPORTE S.A.',
      fechaAceptacion: '07/10/2025',
      fechaConformacion: '07/10/2025',
      totalGuias: 3,
      totalGuiasMarcadas: 1,
      totalGuiasRevisadas: '2'
    },
    {
      nroAceptacion: '84792',
      nroRefOriginal: 'REF003',
      emisor: 'LOGISTICA CHILE LTDA.',
      fechaAceptacion: '08/10/2025',
      fechaConformacion: '08/10/2025',
      totalGuias: 5,
      totalGuiasMarcadas: 3,
      totalGuiasRevisadas: '0'
    }
  ];

  // Datos mock para guías
  const guiasMock: Guia[] = [
    {
      numeroGuia: 'GTIME-IVAD-06102025014',
      motivoMarca: 'R-RETENCION',
      resultadoSeleccionDetalle: 'Más Info.'
    },
    {
      numeroGuia: 'GTIME-IVAD-06102025015',
      motivoMarca: 'R-FISCALIZACION',
      resultadoSeleccionDetalle: 'Más Info.'
    },
    {
      numeroGuia: 'GTIME-IVAD-06102025016',
      motivoMarca: 'R-DOCUMENTACION',
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
  const documentosRelacionados = [
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

  // Datos mock para operaciones
  const operaciones = [
    {
      id: '1',
      numeroReferencia: 'OP001',
      numero: '001',
      fechaInicio: '06/10/2025',
      fechaTermino: '08/10/2025',
      tipoOperacion: 'Operacion de Transporte',
      estado: 'Activa',
      descripcion: 'Operación de transporte de carga'
    },
    {
      id: '2',
      numeroReferencia: 'OP002',
      numero: '002',
      fechaInicio: '07/10/2025',
      fechaTermino: '09/10/2025',
      tipoOperacion: 'Operacion de Almacen',
      estado: 'Completada',
      descripcion: 'Operación de almacenamiento temporal'
    },
    {
      id: '3',
      numeroReferencia: 'OP003',
      numero: '003',
      fechaInicio: '08/10/2025',
      fechaTermino: '10/10/2025',
      tipoOperacion: 'Operación de Fiscalización',
      estado: 'En Proceso',
      descripcion: 'Operación de fiscalización aduanera'
    },
    {
      id: '4',
      numeroReferencia: 'OP004',
      numero: '004',
      fechaInicio: '09/10/2025',
      fechaTermino: '11/10/2025',
      tipoOperacion: 'TRANSITO',
      estado: 'Activa',
      descripcion: 'Operación de tránsito aduanero'
    },
    {
      id: '5',
      numeroReferencia: 'OP005',
      numero: '005',
      fechaInicio: '10/10/2025',
      fechaTermino: '12/10/2025',
      tipoOperacion: 'Operacion de ACOPIO',
      estado: 'Pendiente',
      descripcion: 'Operación de acopio de mercancías'
    }
  ];

  // Datos mock para observaciones
  const observaciones = [
    {
      id: 'obs1',
      tipoObservacion: 'GENERAL',
      fecha: '2025-10-16',
      observacion: 'GRAL',
      loginUsuario: 'ymendez'
    },
    {
      id: 'obs2',
      tipoObservacion: 'Costumer to Customer',
      fecha: '2025-10-16',
      observacion: 'C2C',
      loginUsuario: 'ymendez'
    },
    {
      id: 'obs3',
      tipoObservacion: 'MOTIVO',
      fecha: '2025-10-16',
      observacion: 'qa',
      loginUsuario: 'ymendez'
    },
    {
      id: 'obs4',
      tipoObservacion: 'Faltantes',
      fecha: '2025-10-16',
      observacion: 'QA',
      loginUsuario: 'ymendez'
    }
  ];

  // Datos mock para participantes
  const participantes = [
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
    },
    {
      id: 'part4',
      rol: 'Naviera',
      nombreDigitado: 'MENDEZ TRONCOSO, YERKO WILLIAM',
      tipoId: 'RUT',
      numeroId: '22222222-2',
      fechaParticipacion: '06/10/2025',
      nombreRegistradoAduana: 'MENDEZ TRONCOSO, YERKO WILLIAM'
    }
  ];

  // Datos mock para prorrogas
  const prorrogas = [
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
    },
    {
      id: 'pror3',
      fechaProrroga: '15/10/2025',
      fechaVencimiento: '20/10/2025',
      observacion: 'Tercera prorroga por revisión adicional',
      fechaVencimientoAnterior: '18/10/2025'
    }
  ];

  // Datos mock para locaciones
  const locaciones = [
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
  const fechas = [
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
  const estados = [
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
    },
    {
      id: 'est4',
      tipoEstado: 'Retenido',
      fechaActivacion: '07/10/2025 14:45:20',
      usuario: 'ymendez',
      observaciones: 'Documento retenido por inspección'
    },
    {
      id: 'est5',
      tipoEstado: 'Fiscalizado',
      fechaActivacion: '08/10/2025 11:20:45',
      usuario: 'ymendez',
      observaciones: 'Documento fiscalizado'
    },
    {
      id: 'est6',
      tipoEstado: 'Liberado',
      fechaActivacion: '08/10/2025 16:55:10',
      usuario: 'ymendez',
      observaciones: 'Documento liberado'
    }
  ];

  // Handlers
  const handleBuscar = () => {
    console.log('Buscando manifiestos...');
  };

  const handleExportXML = () => {
    console.log('Exportando XML de manifiestos...');
  };

  const handleCerrarModal = () => {
    setMostrarModalGuias(false);
    setGuiasAsociadas([]);
  };

  const handleCerrarDetallesGuia = () => {
    setMostrarDetallesGuia(false);
    setGuiaSeleccionada(null);
  };

  const handleExportXMLGuias = () => {
    console.log('Exportando XML de guías...');
  };

  const handleBuscarDocumentos = () => {
    console.log('Buscando documentos relacionados...');
  };

  const handleBuscarOperaciones = () => {
    console.log('Buscando operaciones...');
  };

  const handleToggleAcordeon = (seccion: string) => {
    setAcordeonAbierto(acordeonAbierto === seccion ? null : seccion);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-2">Consulta de Marcas</h1>
          <div className="mt-2 w-20 h-1 bg-gradient-to-r from-[#006FB3] to-[#FE6565] rounded-full"></div>
        </div>

        {/* Filtro de fechas */}
        <FiltrosFecha
          fechaInicio={fechaInicio}
          fechaTermino={fechaTermino}
          onFechaInicioChange={setFechaInicio}
          onFechaTerminoChange={setFechaTermino}
          onBuscar={handleBuscar}
        />

        {/* Resultados */}
        <ManifiestosTable
          manifiestos={manifiestos}
          onVerManifiesto={(manifiesto) => {
            setGuiasAsociadas(guiasMock);
            setMostrarModalGuias(true);
          }}
          onExportXML={handleExportXML}
        />

        {/* Información adicional */}
        <div className="mt-4 sm:mt-6 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Información Importante
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Los manifiestos mostrados corresponden al período seleccionado. 
                  Utilice los filtros de fecha para ajustar el rango de búsqueda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Guías Asociadas */}
      <GuiasModal
        isOpen={mostrarModalGuias}
        guias={guiasAsociadas}
        onClose={handleCerrarModal}
        onVerDetalles={(guia) => {
          setGuiaSeleccionada(guia);
          setMostrarDetallesGuia(true);
        }}
        onExportXML={handleExportXMLGuias}
      />

      {/* Modal Detalles de Guía */}
      <DetallesGuiaModal
        isOpen={mostrarDetallesGuia}
        guiaSeleccionada={guiaSeleccionada}
        detallesGuiaMock={detallesGuiaMock}
        documentosRelacionados={documentosRelacionados}
        operaciones={operaciones}
        participantes={participantes}
        prorrogas={prorrogas}
        locaciones={locaciones}
        fechas={fechas}
        estados={estados}
        observaciones={observaciones}
        tipoRelacion={tipoRelacion}
        referenciado={referenciado}
        referenciaA={referenciaA}
        fechaInicioOperaciones={fechaInicioOperaciones}
        fechaTerminoOperaciones={fechaTerminoOperaciones}
        tipoOperacion={tipoOperacion}
        acordeonAbierto={acordeonAbierto}
        onClose={handleCerrarDetallesGuia}
        onTipoRelacionChange={setTipoRelacion}
        onReferenciadoChange={setReferenciado}
        onReferenciaAChange={setReferenciaA}
        onFechaInicioOperacionesChange={setFechaInicioOperaciones}
        onFechaTerminoOperacionesChange={setFechaTerminoOperaciones}
        onTipoOperacionChange={setTipoOperacion}
        onBuscarDocumentos={handleBuscarDocumentos}
        onBuscarOperaciones={handleBuscarOperaciones}
        onToggleAcordeon={handleToggleAcordeon}
        onExportXML={() => console.log('Export XML detalles')}
      />
    </div>
  );
};

export default ConsultaMarcasPage;