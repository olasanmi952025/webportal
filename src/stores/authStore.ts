import { create } from 'zustand';

// Store para autenticación
interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: AuthState['user']) => void;
  setLoading: (loading: boolean) => void;
}

// Mock users para demostración
const mockUsers = [
  { 
    id: '1', 
    email: 'admin@aduana.cl', 
    password: 'admin123', 
    name: 'Administrador Aduana',
    role: 'admin'
  },
  { 
    id: '2', 
    email: 'operador@aduana.cl', 
    password: 'operador123', 
    name: 'Operador Aduana',
    role: 'operador'
  },
  { 
    id: '3', 
    email: 'supervisor@aduana.cl', 
    password: 'supervisor123', 
    name: 'Supervisor Aduana',
    role: 'supervisor'
  },
  { 
    id: '4', 
    email: 'test@aduana.cl', 
    password: 'test123', 
    name: 'Usuario Test',
    role: 'test'
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Buscar usuario en mock data
      const mockUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (mockUser) {
        const user = {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role
        };
        
        set({ 
          user, 
          isAuthenticated: true, 
          isLoading: false 
        });
      } else {
        set({ isLoading: false });
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },
  
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
