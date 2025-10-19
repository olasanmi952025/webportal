/**
 * Página de Consulta de Marcas
 * 
 * Permite consultar manifiestos courier marcados y ver sus guías asociadas.
 * Incluye filtros de fecha y funcionalidad para exportar resultados.
 * 
 * @version 2.0 - Refactorizada con mejores prácticas
 */

import React, { useState, useMemo } from 'react';
import { 
  FiltrosFecha, 
  ManifiestosTable, 
  GuiasModal, 
  DetallesGuiaModal
} from '../components';
import { PageHeader, InfoBanner } from '../components/common';
import { useModal } from '../hooks';
import { mockManifiestos, mockGuias } from '../services/mockDataService';
import type { Guia } from '../types';

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const ConsultaMarcasPage: React.FC = () => {
  // ============================================================================
  // ESTADOS
  // ============================================================================
  
  const [fechaInicio, setFechaInicio] = useState('01/10/2025');
  const [fechaTermino, setFechaTermino] = useState('31/10/2025');
  const [guiasAsociadas, setGuiasAsociadas] = useState<Guia[]>([]);

  // Estados para filtros de tabs (mantener para compatibilidad con modal)
  const [tipoRelacion, setTipoRelacion] = useState('TODOS');
  const [referenciado, setReferenciado] = useState(false);
  const [referenciaA, setReferenciaA] = useState(false);
  const [fechaInicioOperaciones, setFechaInicioOperaciones] = useState('');
  const [fechaTerminoOperaciones, setFechaTerminoOperaciones] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('TODAS');
  const [acordeonAbierto, setAcordeonAbierto] = useState<string | null>('participantes');

  // ============================================================================
  // HOOKS DE MODALES
  // ============================================================================
  
  const guiasModal = useModal();
  const detallesGuiaModal = useModal<Guia>();

  // ============================================================================
  // DATOS MOCK
  // ============================================================================

  const manifiestos = useMemo(() => mockManifiestos as any[], []);

  // Datos mock para detalles de guía (en producción vendría de API)
  const detallesGuiaMock = useMemo(() => ({
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
  }), []);

  const documentosRelacionados = useMemo(() => [{
    id: '1',
    tipoRelacion: 'REFERENCIA',
    fechaRelacion: '07/10/2025 00:00',
    tipoDocumento: 'MFTOC',
    numeroDocumento: '84790',
    emisor: 'MENDEZ TRONCOSO, YERKO WILLIAM',
    fechaEmision: '06/10/2025 00:00',
    version: '0',
    fechaInicioVersion: '2025-10-06 15:08:20.0'
  }], []);

  const operaciones = useMemo(() => [{
    id: '1',
    numeroReferencia: 'OP001',
    numero: '001',
    fechaInicio: '06/10/2025',
    fechaTermino: '08/10/2025',
    tipoOperacion: 'Operacion de Transporte',
    estado: 'Activa',
    descripcion: 'Operación de transporte de mercadería'
  }], []);

  const participantes = useMemo(() => [{
    id: '1',
    rol: 'CONSIGNANTE',
    nombreDigitado: 'Empresa Ejemplo S.A.',
    tipoId: 'RUT',
    numeroId: '12.345.678-9',
    fechaParticipacion: '06/10/2025',
    nombreRegistradoAduana: 'EMPRESA EJEMPLO SA'
  }], []);

  const prorrogas = useMemo(() => [{
    id: '1',
    fechaProrroga: '10/10/2025',
    fechaVencimiento: '20/10/2025',
    observacion: 'Prórroga autorizada',
    fechaVencimientoAnterior: '15/10/2025'
  }], []);

  const locaciones = useMemo(() => [{
    id: '1',
    tipoLocacion: 'PUERTO',
    locacion: 'Valparaíso',
    codigo: 'VAL001',
    orden: '1'
  }], []);

  const fechas = useMemo(() => [{
    id: '1',
    tipoFecha: 'FECHA DE ARRIBO',
    fecha: '06/10/2025'
  }], []);

  const estados = useMemo(() => [{
    id: '1',
    tipoEstado: 'ACTIVO',
    fechaActivacion: '06/10/2025',
    usuario: 'ymendez',
    observaciones: 'Estado activo'
  }], []);

  const observaciones = useMemo(() => [{
    id: '1',
    tipoObservacion: 'GENERAL',
    fecha: '06/10/2025',
    observacion: 'Observación general del documento',
    loginUsuario: 'ymendez'
  }], []);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Maneja el click en ver guías de un manifiesto
   */
  const handleVerGuias = (manifiesto: any) => {
    // En producción, esto sería una llamada a API
    setGuiasAsociadas(mockGuias as Guia[]);
    guiasModal.openModal(manifiesto);
  };

  /**
   * Maneja el click en ver detalles de una guía
   */
  const handleVerDetallesGuia = (guia: any) => {
    detallesGuiaModal.openModal(guia);
    guiasModal.closeModal();
  };

  /**
   * Cierra el modal de detalles de guía
   */
  const handleCerrarDetallesGuia = () => {
    detallesGuiaModal.closeModal();
    guiasModal.openModal(); // Vuelve al modal de guías
  };

  /**
   * Maneja la búsqueda de manifiestos con filtros de fecha
   */
  const handleBuscar = () => {
    console.log('Buscando manifiestos...', {
      fechaInicio,
      fechaTermino
    });
  };

  /**
   * Maneja la exportación de datos
   */
  const handleExportXML = () => {
    console.log('Exportando manifiestos a XML...');
  };

  /**
   * Maneja la búsqueda de documentos relacionados
   */
  const handleBuscarDocumentos = () => {
    console.log('Buscando documentos relacionados...');
  };

  /**
   * Maneja la búsqueda de operaciones
   */
  const handleBuscarOperaciones = () => {
    console.log('Buscando operaciones...');
  };

  /**
   * Toggle del acordeón
   */
  const handleToggleAcordeon = (seccion: string) => {
    setAcordeonAbierto(acordeonAbierto === seccion ? null : seccion);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <PageHeader title="Consulta de Marcas" />

        {/* Banner informativo */}
        <InfoBanner
          title="Información Importante"
          message="Los manifiestos mostrados corresponden al período seleccionado. Utilice los filtros de fecha para ajustar el rango de búsqueda."
          variant="info"
        />

        {/* Filtro de fechas */}
        <FiltrosFecha
          fechaInicio={fechaInicio}
          fechaTermino={fechaTermino}
          onFechaInicioChange={setFechaInicio}
          onFechaTerminoChange={setFechaTermino}
          onBuscar={handleBuscar}
        />

        {/* Tabla de manifiestos */}
        <ManifiestosTable
          manifiestos={manifiestos}
          onVerManifiesto={handleVerGuias}
          onExportXML={handleExportXML}
        />
      </div>

      {/* Modal de Guías Asociadas */}
      <GuiasModal
        isOpen={guiasModal.isOpen}
        guias={guiasAsociadas as any}
        onClose={guiasModal.closeModal}
        onVerDetalles={handleVerDetallesGuia}
        onExportXML={() => console.log('Export XML guías')}
      />

      {/* Modal Detalles de Guía */}
      <DetallesGuiaModal
        isOpen={detallesGuiaModal.isOpen}
        guiaSeleccionada={detallesGuiaModal.data}
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
