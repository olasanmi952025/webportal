import { useState, useCallback } from 'react';
import { ModalState } from '../types';

/**
 * Hook personalizado para manejar el estado de modales
 * @template T - Tipo de datos que maneja el modal
 * @returns {Object} - Estado y funciones para controlar el modal
 */
export function useModal<T = any>() {
  const [modalState, setModalState] = useState<ModalState<T>>({
    isOpen: false,
    data: null
  });

  const openModal = useCallback((data?: T) => {
    setModalState({
      isOpen: true,
      data: data || null
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      data: null
    });
  }, []);

  const updateModalData = useCallback((data: T) => {
    setModalState(prev => ({
      ...prev,
      data
    }));
  }, []);

  return {
    isOpen: modalState.isOpen,
    data: modalState.data,
    openModal,
    closeModal,
    updateModalData
  };
}

