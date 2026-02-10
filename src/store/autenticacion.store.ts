import { create } from "zustand";
import { CerrarSesion, IniciarSesion, obtenerUsuario, registrarUsuario } from "@/services/auth.service";
import { getUserFriendlyError } from "@/utils/errors";

interface User {
    id: string;
    username: string;
}

interface AuthStore {
    user: User | null;
    username: string | null;

    loading: boolean;
    checking: boolean;
    error: string | null;
    isAuthenticated: boolean;

    registrar: (username: string, password: string) => Promise<boolean>;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;

}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    username: null,

    loading: false,
    checking: true,
    error: null,
    isAuthenticated: false,

    login: async (username, password) => {
        try {
            set({ loading: true, error: null });

            const res = await IniciarSesion(username, password);

            set({
                user: res.user,
                username: res.user.username,
                isAuthenticated: true,
                loading: false,
            });

            return true;
        } catch (err) {
            const { message } = getUserFriendlyError(err, "Error en login");
            set({
                error: message,
                loading: false,
                isAuthenticated: false,
            });
            return false;
        }
    },

    logout: async () => {
        try {
            await CerrarSesion();
        } catch {
            // aunque falle backend, limpiamos estado
        }

        set({
            user: null,
            username: null,
            isAuthenticated: false,
        });
    },

    checkAuth: async () => {
        try {
            set({ checking: true });

            const res = await obtenerUsuario();

            set({
                user: res.user,
                username: res.user.username,
                isAuthenticated: true,
                checking: false,
            });
        } catch {
            set({
                user: null,
                username: null,
                isAuthenticated: false,
                checking: false,
            });
        }
    },
    registrar: async (username, password) => {
        try {
            set({ loading: true, error: null });

            const res = await registrarUsuario(username, password);

            set({
                user: res.user,
                username: res.user.username,
                isAuthenticated: true,
                loading: false,
            });

            return true;
        } catch (err) {
            const { message } = getUserFriendlyError(err, "Error en login");
            set({
                error: message,
                loading: false,
                isAuthenticated: false,
            });
            return false;
        }
    },
}));
