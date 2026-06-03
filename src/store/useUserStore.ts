import { create } from "zustand";

const API_BASE = "/api";
// const API_BASE = 'http://localhost:3001/';

interface ProfileData {
  email?: string;
  username?: string;
  name?: string;
  middleName?: string;
  surname?: string;
  role?: string;
}

interface UserState {
  updateProfile: (data: ProfileData) => void;
  updateRole: (role: string) => void;
  id: string | null;
  email: string | null;
  username: string | null;
  name: string | null; // ← ДОБАВИТЬ!
  surname: string | null; // ← ДОБАВИТЬ!
  middleName: string | null; // ← ДОБАВИТЬ!
  role: string | null;
  isAuthenticated: boolean;
  login: (id: string, email: string, username: string, role?: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  email: null,
  username: null,
  name: null, // ← ДОБАВИТЬ!
  surname: null, // ← ДОБАВИТЬ!
  middleName: null, // ← ДОБАВИТЬ!
  role: null,
  isAuthenticated: false,

  login: (id, email, username, role = "user") => {
    set({
      id,
      email,
      username,
      name: null,
      surname: null,
      middleName: null,
      role,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("user");
    set({
      id: null,
      email: null,
      username: null,
      name: null, // ← ОЧИСТИТЬ!
      surname: null, // ← ОЧИСТИТЬ!
      middleName: null, // ← ОЧИСТИТЬ!
      role: null,
      isAuthenticated: false,
    });
  },

  hydrate: () => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
      const { id, email, username, name, surname, middleName, role } =
        JSON.parse(saved);
      set({
        id,
        email,
        username,
        name: name || null,
        surname: surname || null,
        middleName: middleName || null,
        role: role || null,
        isAuthenticated: true,
      });
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        // localStorage.removeItem("user");
      }
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
        ...(data.role && { role: data.role }),
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
          role: newUser.role,
        }),
      );

      return newUser;
    });
  },

  updateRole: (role: string) => {
    set((state) => {
      const newState = { ...state, role };

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: state.id,
          email: state.email,
          username: state.username,
          name: state.name,
          surname: state.surname,
          middleName: state.middleName,
          role: role,
        }),
      );

      return newState;
    });
  },
}));
