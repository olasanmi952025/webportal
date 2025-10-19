// ============================================================================
// TIPOS COMPARTIDOS - Portal Aduana Chile
// ============================================================================

// User & Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

// Common Data Types
export interface BaseEntity {
  id: string;
}

export interface Manifiesto extends BaseEntity, Record<string, unknown> {
  nroAceptacion: string;
  nroRefOriginal?: string;
  numeroAceptacion?: string;
  numeroMaster: string;
  numeroVuelo: string;
  emisor?: string;
  fechaAceptacion: string;
  fechaConformacion?: string;
  totalGuias: number;
  totalGuiasMarcadas?: number;
  totalGuiasRevisadas?: string;
  ciaCourier: string;
  seleccionado?: boolean;
}

export interface Documento extends BaseEntity, Record<string, unknown> {
  tipoDocumento: string;
  numero: string;
  fechaCreacion: string;
  creador: string;
  version: string;
  activo: string;
}

export interface Guia extends BaseEntity {
  numeroGuia: string;
  motivoMarca?: string;
  resultadoSeleccionDetalle?: string;
  naviera?: string;
  consignante?: string;
  consignatario?: string;
  transportista?: string;
  puertoCarga?: string;
  puertoDescarga?: string;
  fechaEmision?: string;
  fechaCreacion?: string;
  creador?: string;
  lugarRecepcion?: string;
  lugarDestino?: string;
  totalItem?: number;
  totalBultos?: number;
  totalPeso?: string;
  totalVolumen?: number;
}

export interface FaltaSobra extends BaseEntity, Record<string, unknown> {
  numeroAceptacion: string;
  numeroMaster: string;
  numeroVuelo: string;
  ciaCourier: string;
  pesoGuias: number;
  totalGuias: number;
  guiasConFaltas: number;
  guiasConSobras: number;
}

export interface DetalleFaltaSobra {
  numeroManifiesto: string;
  ciaCourier: string;
  numeroMaster: string;
  numeroVuelo: string;
  fechaEmision: string;
  puertoEmbarque: string;
  fechaArribo: string;
  totalPesoOriginal: number;
  totalPesoConFyS: number;
  totalBultosOriginal: number;
  totalBultosConFyS: number;
  guias: GuiaDetalle[];
}

export interface GuiaDetalle {
  numeroGuia: string;
  consignante: string;
  consignatario: string;
  cantidadBultosFaltante: number;
  pesoFaltante: number;
  valorFaltante: number;
  cantidadBultosSobrante: number;
  pesoSobrante: number;
  valorSobrante: number;
  esAnulada: boolean;
}

export interface DocumentoRelacionado extends BaseEntity {
  tipoRelacion: string;
  fechaRelacion: string;
  tipoDocumento: string;
  numeroDocumento: string;
  emisor: string;
  fechaEmision: string;
  version: string;
  fechaInicioVersion: string;
}

export interface Operacion extends BaseEntity {
  numeroReferencia: string;
  numero: string;
  fechaInicio: string;
  fechaTermino: string;
  tipoOperacion: string;
  estado: string;
}

export interface Participante extends BaseEntity {
  rol: string;
  nombreDigitado: string;
  tipoId: string;
  numeroId: string;
  fechaParticipacion: string;
  nombreRegistradoAduana: string;
}

export interface Prorroga extends BaseEntity {
  fechaProrroga: string;
  fechaVencimiento: string;
  observacion: string;
  fechaVencimientoAnterior: string;
}

export interface Locacion extends BaseEntity {
  tipoLocacion: string;
  locacion: string;
  codigo: string;
  orden: string;
}

export interface Fecha extends BaseEntity {
  tipoFecha: string;
  fecha: string;
}

export interface Estado extends BaseEntity {
  tipoEstado: string;
  fechaActivacion: string;
  usuario: string;
  observaciones: string;
}

export interface Observacion extends BaseEntity {
  tipoObservacion: string;
  fecha: string;
  observacion: string;
  loginUsuario: string;
}

// Filter Types
export interface DateRangeFilter {
  fechaDesde: string;
  fechaHasta: string;
}

export interface SearchFilters {
  [key: string]: string | boolean | null | undefined;
}

// Select Options Type
export interface SelectOption {
  label: string;
  value: string | number;
}

// Modal State Types
export interface ModalState<T = any> {
  isOpen: boolean;
  data: T | null;
}

// Page State Types
export interface PageState {
  isLoading: boolean;
  error: string | null;
  showResults: boolean;
}

// API Response Types (for future implementation)
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Table Types
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}
