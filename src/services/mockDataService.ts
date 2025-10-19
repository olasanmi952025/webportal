// ============================================================================
// SERVICIO DE DATOS MOCK - Portal Aduana Chile
// Este servicio simula llamadas a API y debe ser reemplazado con llamadas reales
// ============================================================================

import type {
  Documento,
  Manifiesto,
  Guia,
  FaltaSobra,
  DocumentoRelacionado,
  Operacion
} from '../types';

// ============================================================================
// MOCK DATA - DOCUMENTOS
// ============================================================================

export const mockDocumentos: Documento[] = [
  {
    id: '1',
    tipoDocumento: 'C LISTA DE CARGA',
    numero: '84803',
    fechaCreacion: '2025-10-10 11:56:09.0',
    creador: 'ymendez',
    version: '0',
    activo: 'S'
  },
  {
    id: '2',
    tipoDocumento: 'C LISTA DE CARGA',
    numero: '84789',
    fechaCreacion: '2025-10-06 12:46:58.0',
    creador: 'ymendez',
    version: '0',
    activo: 'S'
  },
  {
    id: '3',
    tipoDocumento: 'C LISTA DE CARGA',
    numero: '84817',
    fechaCreacion: '2025-10-16 11:21:30.0',
    creador: 'ymendez',
    version: '0',
    activo: 'S'
  },
  {
    id: '4',
    tipoDocumento: 'C LISTA DE CARGA',
    numero: '84790',
    fechaCreacion: '2025-10-06 15:08:20.0',
    creador: 'ymendez',
    version: '0',
    activo: 'S'
  }
];

// ============================================================================
// MOCK DATA - MANIFIESTOS
// ============================================================================

export const mockManifiestos: Manifiesto[] = [
  {
    id: '1',
    nroAceptacion: '84790',
    nroRefOriginal: 'REF001',
    numeroAceptacion: '84790',
    numeroMaster: '789444',
    numeroVuelo: '033',
    emisor: 'MENDEZ TRONCOSO, YERKO WILLIAM',
    fechaAceptacion: '06/10/2025',
    fechaConformacion: '06/10/2025',
    totalGuias: 4,
    totalGuiasMarcadas: 2,
    totalGuiasRevisadas: '1',
    ciaCourier: 'MENDEZ TRONCOSO, YERKO WILLIAM',
    seleccionado: false
  },
  {
    id: '2',
    nroAceptacion: '84791',
    nroRefOriginal: 'REF002',
    numeroAceptacion: '84791',
    numeroMaster: '789445',
    numeroVuelo: '034',
    emisor: 'EMPRESA TRANSPORTE S.A.',
    fechaAceptacion: '07/10/2025',
    fechaConformacion: '07/10/2025',
    totalGuias: 3,
    totalGuiasMarcadas: 1,
    totalGuiasRevisadas: '2',
    ciaCourier: 'EMPRESA TRANSPORTE S.A.',
    seleccionado: false
  },
  {
    id: '3',
    nroAceptacion: '84792',
    nroRefOriginal: 'REF003',
    numeroAceptacion: '84792',
    numeroMaster: '789446',
    numeroVuelo: '035',
    emisor: 'LOGISTICA CHILE LTDA.',
    fechaAceptacion: '08/10/2025',
    fechaConformacion: '08/10/2025',
    totalGuias: 5,
    totalGuiasMarcadas: 3,
    totalGuiasRevisadas: '0',
    ciaCourier: 'LOGISTICA CHILE LTDA.',
    seleccionado: false
  }
];

// ============================================================================
// MOCK DATA - GUIAS
// ============================================================================

export const mockGuias: Guia[] = [
  {
    id: '1',
    numeroGuia: 'GTIME-IVAD-06102025014',
    motivoMarca: 'R-RETENCION',
    resultadoSeleccionDetalle: 'Más Info.',
    naviera: 'MENDEZ TRONCOSO, YERKO WILLIAM',
    consignante: 'rut generico ERRAZURIZ 755',
    consignatario: 'rut generico Direccion rut prueba',
    transportista: 'MENDEZ TRONCOSO, YERKO WILLIAM ERRAZURIZ 755',
    puertoCarga: 'Tocumen International (Panama City)',
    puertoDescarga: 'Arturo Merino Benitez (Santiago)',
    fechaEmision: '06/10/2025',
    fechaCreacion: '06/10/2025',
    creador: 'ymendez',
    lugarRecepcion: '',
    lugarDestino: '',
    totalItem: 1,
    totalBultos: 3.0,
    totalPeso: '150.0 KGM',
    totalVolumen: 0.0
  },
  {
    id: '2',
    numeroGuia: 'GTIME-IVAD-06102025015',
    motivoMarca: 'R-FISCALIZACION',
    resultadoSeleccionDetalle: 'Más Info.'
  },
  {
    id: '3',
    numeroGuia: 'GTIME-IVAD-06102025016',
    motivoMarca: 'R-DOCUMENTACION',
    resultadoSeleccionDetalle: 'Más Info.'
  },
  {
    id: '4',
    numeroGuia: 'GTIME-IVAD-06102025007',
    motivoMarca: 'R-RETENCION',
    resultadoSeleccionDetalle: 'Más Info.'
  }
];

// ============================================================================
// MOCK DATA - FALTAS Y SOBRAS
// ============================================================================

export const mockFaltasSobras: FaltaSobra[] = [
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

// ============================================================================
// MOCK DATA - DOCUMENTOS RELACIONADOS
// ============================================================================

export const mockDocumentosRelacionados: DocumentoRelacionado[] = [
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

// ============================================================================
// MOCK DATA - OPERACIONES
// ============================================================================

export const mockOperaciones: Operacion[] = [
  {
    id: '1',
    numeroReferencia: 'REF-001',
    numero: 'OP-001',
    fechaInicio: '01/10/2025',
    fechaTermino: '10/10/2025',
    tipoOperacion: 'IMPORTACIÓN',
    estado: 'ACTIVO'
  }
];

// ============================================================================
// API SIMULATION FUNCTIONS
// ============================================================================

/**
 * Simula un delay de red
 */
const simulateNetworkDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Simula una respuesta exitosa de API
 */
const simulateApiSuccess = async <T>(data: T, delay: number = 500): Promise<T> => {
  await simulateNetworkDelay(delay);
  return data;
};

/**
 * Simula una respuesta de error de API
 */
const simulateApiError = async (message: string, delay: number = 500): Promise<never> => {
  await simulateNetworkDelay(delay);
  throw new Error(message);
};

// ============================================================================
// MOCK API SERVICE
// ============================================================================

export const mockApiService = {
  // Documentos
  getDocumentos: async (filters?: any) => {
    return simulateApiSuccess(mockDocumentos);
  },

  getDocumentoById: async (id: string) => {
    const documento = mockDocumentos.find(d => d.id === id);
    if (!documento) {
      return simulateApiError('Documento no encontrado');
    }
    return simulateApiSuccess(documento);
  },

  // Manifiestos
  getManifiestos: async (filters?: any) => {
    return simulateApiSuccess(mockManifiestos);
  },

  getManifiestoById: async (id: string) => {
    const manifiesto = mockManifiestos.find(m => m.id === id);
    if (!manifiesto) {
      return simulateApiError('Manifiesto no encontrado');
    }
    return simulateApiSuccess(manifiesto);
  },

  // Guías
  getGuias: async (filters?: any) => {
    return simulateApiSuccess(mockGuias);
  },

  getGuiaById: async (id: string) => {
    const guia = mockGuias.find(g => g.id === id);
    if (!guia) {
      return simulateApiError('Guía no encontrada');
    }
    return simulateApiSuccess(guia);
  },

  // Faltas y Sobras
  getFaltasSobras: async (filters?: any) => {
    return simulateApiSuccess(mockFaltasSobras);
  },

  // Documentos Relacionados
  getDocumentosRelacionados: async (documentoId: string) => {
    return simulateApiSuccess(mockDocumentosRelacionados);
  },

  // Operaciones
  getOperaciones: async (filters?: any) => {
    return simulateApiSuccess(mockOperaciones);
  }
};

export default mockApiService;

