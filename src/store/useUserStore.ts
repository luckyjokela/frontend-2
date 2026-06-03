import { create } from "zustand";

const API_BASE = "/api";
// const API_BASE = 'http://localhost:3001/';

interface ProfileData {
  email?: string;
  username?: string;
  name?: string;
  middleName?: string;
  surname?: string;
}
interface UserState {
  updateProfile: (data: ProfileData) => void;
  id: string | null;
  email: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (id: string, email: string, username: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  email: null,
  username: null,
  isAuthenticated: false,

  login: (id, email, username) => {
    set({ id, email, username, isAuthenticated: true });
  },

  logout: async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("user");
    set({ id: null, email: null, username: null, isAuthenticated: false });
  },

  hydrate: () => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const { id, email, username } = JSON.parse(saved);
      set({ id, email, username, isAuthenticated: true });
    }
  },

  updateProfile: (data) => {
    set((state) => {
      const newUser = {
        ...state,
        ...(data.email && { email: data.email }),
        ...(data.username && { username: data.username }),
        ...(data.name !== undefined && { name: data.name }),
        ...(data.middleName !== undefined && { middleName: data.middleName }),
        ...(data.surname !== undefined && { surname: data.surname }),
      };

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: state.id,
          email: newUser.email,
          username: newUser.username,
          name: newUser.name,
          surname: newUser.surname,
          middleName: newUser.middleName,
        }),
      );

      return newUser;
    });
  },
}));
