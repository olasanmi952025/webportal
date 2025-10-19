import { useState, useEffect } from 'react';
import { TIMEOUT_CONFIG } from '../constants';

/**
 * Hook personalizado para implementar debounce
 * @param value - Valor a debounce
 * @param delay - Tiempo de delay en ms (por defecto usa TIMEOUT_CONFIG.DEBOUNCE_SEARCH)
 * @returns Valor debounced
 */
export function useDebounce<T>(value: T, delay: number = TIMEOUT_CONFIG.DEBOUNCE_SEARCH): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

