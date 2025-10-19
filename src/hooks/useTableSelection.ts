import { useState, useCallback, useMemo } from 'react';

/**
 * Hook personalizado para manejar selección de elementos en tablas
 * @param items - Array de items con id
 * @returns {Object} - Estado y funciones para controlar la selección
 */
export function useTableSelection<T extends { id: string }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  }, []);

  const toggleAll = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedIds(items.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  }, [items]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isSelected = useCallback((id: string) => {
    return selectedIds.includes(id);
  }, [selectedIds]);

  const allSelected = useMemo(() => {
    return items.length > 0 && selectedIds.length === items.length;
  }, [items.length, selectedIds.length]);

  const selectedItems = useMemo(() => {
    return items.filter(item => selectedIds.includes(item.id));
  }, [items, selectedIds]);

  return {
    selectedIds,
    selectedItems,
    selectedCount: selectedIds.length,
    allSelected,
    isSelected,
    toggleSelection,
    toggleAll,
    clearSelection
  };
}

