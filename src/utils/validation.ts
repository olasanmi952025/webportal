// ============================================================================
// UTILIDADES DE VALIDACIÓN - Portal Aduana Chile
// ============================================================================

import { VALIDATION_RULES, ERROR_MESSAGES } from '../constants';
import type { ValidationError, FormValidation } from '../types';

/**
 * Valida un email
 */
export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

/**
 * Valida la longitud mínima de una contraseña
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

/**
 * Valida que un campo no esté vacío
 */
export const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return true;
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value);
};

/**
 * Valida formato de fecha DD/MM/YYYY
 */
export const validateDateFormat = (date: string): boolean => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(date)) return false;

  const [, day, month, year] = date.match(regex) || [];
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;
  if (y < 1900 || y > 2100) return false;

  // Validar días del mes
  const daysInMonth = new Date(y, m, 0).getDate();
  return d <= daysInMonth;
};

/**
 * Valida que fecha desde sea menor que fecha hasta
 */
export const validateDateRange = (fechaDesde: string, fechaHasta: string): boolean => {
  if (!validateDateFormat(fechaDesde) || !validateDateFormat(fechaHasta)) {
    return false;
  }

  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const desde = parseDate(fechaDesde);
  const hasta = parseDate(fechaHasta);

  return desde <= hasta;
};

/**
 * Valida un formulario completo
 */
export const validateForm = (
  fields: Record<string, any>,
  rules: Record<string, (value: any) => boolean | string>
): FormValidation => {
  const errors: ValidationError[] = [];

  Object.keys(rules).forEach(fieldName => {
    const validator = rules[fieldName];
    const value = fields[fieldName];
    const result = validator(value);

    if (result !== true) {
      errors.push({
        field: fieldName,
        message: typeof result === 'string' ? result : ERROR_MESSAGES.VALIDATION_ERROR
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida tamaño de archivo
 */
export const validateFileSize = (file: File): boolean => {
  return file.size <= VALIDATION_RULES.MAX_FILE_SIZE;
};

/**
 * Valida tipo de archivo
 */
export const validateFileType = (file: File): boolean => {
  return VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(file.type);
};

/**
 * Valida RUT chileno
 */
export const validateRUT = (rut: string): boolean => {
  // Limpia el RUT
  const cleanRUT = rut.replace(/[^0-9kK]/g, '');
  if (cleanRUT.length < 2) return false;

  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1).toUpperCase();

  // Calcula el dígito verificador
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const calculatedDV = 11 - (sum % 11);
  let expectedDV = calculatedDV === 11 ? '0' : calculatedDV === 10 ? 'K' : calculatedDV.toString();

  return dv === expectedDV;
};

/**
 * Formatea RUT chileno
 */
export const formatRUT = (rut: string): string => {
  const cleanRUT = rut.replace(/[^0-9kK]/g, '');
  if (cleanRUT.length < 2) return rut;

  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1);

  // Formatea el cuerpo con puntos
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedBody}-${dv}`;
};

