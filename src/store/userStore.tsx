import { create } from "zustand";
import { useEffect } from "react";

interface UserState {
  isAuthenticated: boolean;
  loginState: () => void;
  logoutState: () => void;
}

const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  loginState: () => {
    set({ isAuthenticated: true });
    localStorage.setItem("isAuthenticated", "true");
  },
  logoutState: () => {
    set({ isAuthenticated: false });
    localStorage.setItem("isAuthenticated", "false");
  },
}));

export const useUserStoreLocalStorage = () => {
  const store = useUserStore();

  useEffect(() => {
    const isAuthenticatedFromStorage = localStorage.getItem("isAuthenticated") === "true";

    // Si el estado actual no coincide con el almacenado, actualizamos el estado
    if (store.isAuthenticated !== isAuthenticatedFromStorage) {
      if (isAuthenticatedFromStorage) {
        store.loginState(); // El usuario está autenticado
      } else {
        store.logoutState(); // El usuario no está autenticado
      }
    }
  }, [store.isAuthenticated]);

  return store;
};
