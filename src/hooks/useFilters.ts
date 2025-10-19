import { useState, useCallback } from 'react';
import { SearchFilters } from '../types';

/**
 * Hook personalizado para manejar filtros de búsqueda
 * @template T - Tipo de filtros (debe extender SearchFilters)
 * @param initialFilters - Valores iniciales de los filtros
 * @returns {Object} - Estado y funciones para controlar filtros
 */
export function useFilters<T extends SearchFilters>(initialFilters: T) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [hasSearched, setHasSearched] = useState(false);

  const updateFilter = useCallback(<K extends keyof T>(
    key: K,
    value: T[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<T>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setHasSearched(false);
  }, [initialFilters]);

  const search = useCallback(() => {
    setHasSearched(true);
  }, []);

  const clearSearch = useCallback(() => {
    setHasSearched(false);
  }, []);

  return {
    filters,
    hasSearched,
    updateFilter,
    updateFilters,
    resetFilters,
    search,
    clearSearch
  };
}

