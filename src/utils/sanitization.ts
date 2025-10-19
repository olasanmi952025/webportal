// ============================================================================
// UTILIDADES DE SANITIZACIÓN - Portal Aduana Chile
// Protección contra XSS y sanitización de inputs
// ============================================================================

/**
 * Escapa caracteres HTML para prevenir XSS
 */
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Sanitiza input de texto eliminando caracteres peligrosos
 */
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  // Elimina caracteres de control y no imprimibles
  // eslint-disable-next-line no-control-regex
  let sanitized = input.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  
  // Elimina scripts y tags HTML
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<[^>]+>/g, '');
  
  // Trim espacios
  sanitized = sanitized.trim();
  
  return sanitized;
};

/**
 * Sanitiza input numérico
 */
export const sanitizeNumber = (input: string | number): number | null => {
  if (typeof input === 'number') return input;
  if (typeof input !== 'string') return null;
  
  const cleaned = input.replace(/[^\d.-]/g, '');
  const num = parseFloat(cleaned);
  
  return isNaN(num) ? null : num;
};

/**
 * Sanitiza email
 */
export const sanitizeEmail = (email: string): string => {
  if (typeof email !== 'string') return '';
  
  // Convierte a minúsculas y elimina espacios
  let sanitized = email.toLowerCase().trim();
  
  // Elimina caracteres no permitidos en emails
  sanitized = sanitized.replace(/[^a-z0-9@._-]/g, '');
  
  return sanitized;
};

/**
 * Sanitiza URL
 */
export const sanitizeUrl = (url: string): string => {
  if (typeof url !== 'string') return '';
  
  try {
    const urlObj = new URL(url);
    
    // Solo permite http y https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return '';
    }
    
    return urlObj.toString();
  } catch {
    return '';
  }
};

/**
 * Sanitiza objeto completo (recursivo)
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized = {} as T;
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      
      if (value === null || value === undefined) {
        sanitized[key] = value;
      } else if (typeof value === 'string') {
        sanitized[key] = sanitizeString(value) as any;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        sanitized[key] = sanitizeObject(value);
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map((item: any) => 
          typeof item === 'string' ? sanitizeString(item) :
          typeof item === 'object' ? sanitizeObject(item) :
          item
        ) as any;
      } else {
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized;
};

/**
 * Sanitiza parámetros de query string
 */
export const sanitizeQueryParams = (params: Record<string, any>): Record<string, string> => {
  const sanitized: Record<string, string> = {};
  
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (value !== null && value !== undefined) {
        sanitized[key] = encodeURIComponent(String(value));
      }
    }
  }
  
  return sanitized;
};

/**
 * Sanitiza filename para prevenir path traversal
 */
export const sanitizeFilename = (filename: string): string => {
  if (typeof filename !== 'string') return '';
  
  // Elimina path separators y caracteres especiales
  // eslint-disable-next-line no-useless-escape
  let sanitized = filename.replace(/[\/\\:*?"<>|]/g, '');
  
  // Elimina .. para prevenir path traversal
  sanitized = sanitized.replace(/\.\./g, '');
  
  // Limita longitud
  if (sanitized.length > 255) {
    sanitized = sanitized.substring(0, 255);
  }
  
  return sanitized.trim();
};

/**
 * Sanitiza input de fecha
 */
export const sanitizeDate = (date: string): string => {
  if (typeof date !== 'string') return '';
  
  // Solo permite números y /
  const sanitized = date.replace(/[^\d/]/g, '');
  
  // Limita formato DD/MM/YYYY
  if (sanitized.length > 10) {
    return sanitized.substring(0, 10);
  }
  
  return sanitized;
};

/**
 * Sanitiza RUT
 */
export const sanitizeRUT = (rut: string): string => {
  if (typeof rut !== 'string') return '';
  
  // Solo permite números, K y guión
  let sanitized = rut.toUpperCase().replace(/[^0-9K-]/g, '');
  
  // Limita longitud (RUT máximo: 12 caracteres con formato)
  if (sanitized.length > 12) {
    sanitized = sanitized.substring(0, 12);
  }
  
  return sanitized;
};

