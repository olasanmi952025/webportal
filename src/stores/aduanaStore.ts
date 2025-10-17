import { create } from 'zustand';

// Store para datos de aduana
interface AduanaData {
  id: string;
  numeroOperacion: string;
  tipoOperacion: string;
  estado: 'pendiente' | 'en_proceso' | 'completado' | 'rechazado';
  fechaCreacion: Date;
  fechaActualizacion: Date;
  cliente: string;
  valor: number;
}

interface AduanaState {
  operaciones: AduanaData[];
  filtros: {
    estado?: string;
    tipoOperacion?: string;
    fechaDesde?: Date;
    fechaHasta?: Date;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchOperaciones: () => Promise<void>;
  addOperacion: (operacion: Omit<AduanaData, 'id' | 'fechaCreacion' | 'fechaActualizacion'>) => void;
  updateOperacion: (id: string, updates: Partial<AduanaData>) => void;
  deleteOperacion: (id: string) => void;
  setFiltros: (filtros: Partial<AduanaState['filtros']>) => void;
  setPagination: (pagination: Partial<AduanaState['pagination']>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAduanaStore = create<AduanaState>((set, get) => ({
  operaciones: [],
  filtros: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  isLoading: false,
  error: null,
  
  fetchOperaciones: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockOperaciones: AduanaData[] = [
        {
          id: '1',
          numeroOperacion: 'OP-2024-001',
          tipoOperacion: 'Importación',
          estado: 'completado',
          fechaCreacion: new Date('2024-01-15'),
          fechaActualizacion: new Date('2024-01-16'),
          cliente: 'Empresa ABC',
          valor: 15000,
        },
        {
          id: '2',
          numeroOperacion: 'OP-2024-002',
          tipoOperacion: 'Exportación',
          estado: 'en_proceso',
          fechaCreacion: new Date('2024-01-16'),
          fechaActualizacion: new Date('2024-01-17'),
          cliente: 'Empresa XYZ',
          valor: 25000,
        },
        {
          id: '3',
          numeroOperacion: 'OP-2024-003',
          tipoOperacion: 'Importación',
          estado: 'pendiente',
          fechaCreacion: new Date('2024-01-17'),
          fechaActualizacion: new Date('2024-01-17'),
          cliente: 'Empresa DEF',
          valor: 8000,
        },
      ];
      
      set({ 
        operaciones: mockOperaciones,
        pagination: { ...get().pagination, total: mockOperaciones.length },
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Error al cargar las operaciones',
        isLoading: false 
      });
    }
  },
  
  addOperacion: (operacion) => set((state) => ({
    operaciones: [
      ...state.operaciones,
      {
        ...operacion,
        id: Math.random().toString(36).substr(2, 9),
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      }
    ]
  })),
  
  updateOperacion: (id, updates) => set((state) => ({
    operaciones: state.operaciones.map(op => 
      op.id === id 
        ? { ...op, ...updates, fechaActualizacion: new Date() }
        : op
    )
  })),
  
  deleteOperacion: (id) => set((state) => ({
    operaciones: state.operaciones.filter(op => op.id !== id)
  })),
  
  setFiltros: (filtros) => set((state) => ({
    filtros: { ...state.filtros, ...filtros }
  })),
  
  setPagination: (pagination) => set((state) => ({
    pagination: { ...state.pagination, ...pagination }
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
