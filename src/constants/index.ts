// ============================================================================
// CONSTANTES CENTRALIZADAS - Portal Aduana Chile
// ============================================================================

import { SelectOption } from '../types';

// ============================================================================
// SELECT OPTIONS
// ============================================================================

export const TIPO_DOCUMENTO_OPTIONS: SelectOption[] = [
  { label: '[Sin Filtro]', value: '' as string },
  { label: 'C GUÍA TIME', value: 'C_GUIA_TIME' as string },
  { label: 'C LISTA DE CARGA', value: 'C_LISTA_DE_CARGA' as string },
  { label: 'MANIFIESTO COURIER', value: 'MANIFIESTO_COURIER' as string }
];

export const GRUPO_DOCUMENTO_OPTIONS: SelectOption[] = [
  { label: '[Sin Filtro]', value: '' as string },
  { label: 'Courier', value: 'COURIER' as string },
  { label: 'Marítimo', value: 'MARITIMO' as string },
  { label: 'Aéreo', value: 'AEREO' as string }
];

export const TIPO_LOCACION_OPTIONS: SelectOption[] = [
  { label: '[Sin Filtro]', value: '' as string },
  { label: 'Puerto', value: 'PUERTO' as string },
  { label: 'Aeropuerto', value: 'AEROPUERTO' as string },
  { label: 'Terminal', value: 'TERMINAL' as string }
];

export const ROL_OPTIONS: SelectOption[] = [
  { label: '[Sin Filtro]', value: '' as string },
  { label: 'Consignante', value: 'CONSIGNANTE' as string },
  { label: 'Consignatario', value: 'CONSIGNATARIO' as string },
  { label: 'Transportista', value: 'TRANSPORTISTA' as string },
  { label: 'Naviera', value: 'NAVIERA' as string }
];

export const TIPO_FECHA_OPTIONS: SelectOption[] = [
  { label: 'FECHA DE ARRIBO', value: 'FECHA_DE_ARRIBO' as string },
  { label: 'FECHA DE EMISIÓN', value: 'FECHA_DE_EMISION' as string },
  { label: 'FECHA DE CREACIÓN', value: 'FECHA_DE_CREACION' as string },
  { label: 'FECHA DE VENCIMIENTO', value: 'FECHA_DE_VENCIMIENTO' as string }
];

export const TIPO_RELACION_OPTIONS: SelectOption[] = [
  { label: 'TODOS', value: 'TODOS' as string },
  { label: 'REFERENCIA', value: 'REFERENCIA' as string },
  { label: 'RELACIONADO', value: 'RELACIONADO' as string }
];

export const TIPO_OPERACION_OPTIONS: SelectOption[] = [
  { label: 'TODAS', value: 'TODAS' as string },
  { label: 'IMPORTACIÓN', value: 'IMPORTACION' as string },
  { label: 'EXPORTACIÓN', value: 'EXPORTACION' as string },
  { label: 'TRÁNSITO', value: 'TRANSITO' as string }
];

// ============================================================================
// FILTRO POR OPTIONS
// ============================================================================

export const FILTRO_POR_OPTIONS = [
  { id: 'todos', label: 'Todos' },
  { id: 'tipo', label: 'Tipo' },
  { id: 'grupo', label: 'Grupo' }
];

// ============================================================================
// DATE FORMATS
// ============================================================================

export const DATE_FORMAT = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  FULL: 'YYYY-MM-DD HH:mm:ss',
  PLACEHOLDER: 'dd/MM/yyyy'
};

// ============================================================================
// PAGINATION
// ============================================================================

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  DEFAULT_PAGE: 1
};

// ============================================================================
// API ENDPOINTS (para futura implementación)
// ============================================================================

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  DOCUMENTOS: '/api/documentos',
  MANIFIESTOS: '/api/manifiestos',
  GUIAS: '/api/guias',
  FALTAS_SOBRAS: '/api/faltas-sobras',
  USUARIOS: '/api/usuarios'
};

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Credenciales incorrectas. Por favor, intente nuevamente.',
  NETWORK_ERROR: 'Error de conexión. Por favor, verifique su conexión a internet.',
  SERVER_ERROR: 'Error en el servidor. Por favor, intente más tarde.',
  VALIDATION_ERROR: 'Por favor, verifique los datos ingresados.',
  UNAUTHORIZED: 'No tiene permisos para realizar esta acción.',
  SESSION_EXPIRED: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
  REQUIRED_FIELD: 'Este campo es requerido',
  INVALID_EMAIL: 'Email inválido',
  INVALID_DATE: 'Fecha inválida',
  DATE_RANGE_ERROR: 'La fecha desde debe ser menor a la fecha hasta'
};

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  LOGOUT_SUCCESS: 'Sesión cerrada exitosamente',
  DATA_SAVED: 'Datos guardados exitosamente',
  DATA_DELETED: 'Datos eliminados exitosamente',
  EXPORT_SUCCESS: 'Exportación completada exitosamente'
};

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf']
};

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  USER: 'portal_aduana_user',
  TOKEN: 'portal_aduana_token',
  THEME: 'portal_aduana_theme',
  LAST_ROUTE: 'portal_aduana_last_route'
};

// ============================================================================
// ROUTES
// ============================================================================

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  BUSQUEDA_DOCUMENTOS: '/busqueda-documentos',
  CONSULTA_MARCAS: '/consulta-marcas',
  CIERRE_MANIFIESTO: '/cierre-manifiesto',
  CONSULTA_FALTAS_SOBRAS: '/consulta-faltas-sobras',
  PASSWORD_RECOVERY: '/recuperar-password'
};

// ============================================================================
// ROLES Y PERMISOS
// ============================================================================

export const USER_ROLES = {
  ADMIN: 'admin',
  OPERADOR: 'operador',
  SUPERVISOR: 'supervisor',
  TEST: 'test'
};

export const PERMISSIONS = {
  VIEW_DOCUMENTOS: ['admin', 'operador', 'supervisor', 'test'],
  EDIT_DOCUMENTOS: ['admin', 'operador'],
  DELETE_DOCUMENTOS: ['admin'],
  VIEW_MANIFIESTOS: ['admin', 'operador', 'supervisor', 'test'],
  EDIT_MANIFIESTOS: ['admin', 'operador'],
  EXPORT_DATA: ['admin', 'operador', 'supervisor']
};

// ============================================================================
// TIMEOUT CONFIGURATIONS
// ============================================================================

export const TIMEOUT_CONFIG = {
  API_REQUEST: 30000, // 30 segundos
  SESSION_WARNING: 25 * 60 * 1000, // 25 minutos
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos
  DEBOUNCE_SEARCH: 300 // 300ms
};

// ============================================================================
// MOCK DATA FLAG (para desarrollo)
// ============================================================================

export const USE_MOCK_DATA = true; // Cambiar a false cuando se integre con API real

