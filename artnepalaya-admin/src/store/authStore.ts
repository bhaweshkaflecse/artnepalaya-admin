import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('adminToken'),
  setToken: (token) => {
    localStorage.setItem('adminToken', token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    set({ token: null });
  },
}));