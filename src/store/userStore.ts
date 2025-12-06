import { create } from "zustand";

interface AuthState {
  email: string | null;
  userName: string | null;
  userId: string | null;
  setEmail: (email: string) => void;
  setUserName: (userName: string) => void;
  setUserId: (userId: string) => void;
}

const LOCAL_STORAGE_KEY = "auth";

export const useAuthStore = create<AuthState>((set, get) => ({
  email: localStorage.getItem(`${LOCAL_STORAGE_KEY}_email`) || null,
  userName: localStorage.getItem(`${LOCAL_STORAGE_KEY}_userName`) || null,
  userId: localStorage.getItem(`${LOCAL_STORAGE_KEY}_userId`) || null,

  setEmail: (val) => {
    set({ email: val });
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_email`, val);
  },

  setUserName: (val) => {
    set({ userName: val });
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_userName`, val);
  },

  setUserId: (val) => {
    set({ userId: val });
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_userId`, val);
  },
}));
