import { create } from "zustand";
import { CerrarSesion, IniciarSesion, obtenerUsuario, registrarUsuario } from "@/services/auth.service";
import { getUserFriendlyError } from "@/utils/errors";
import { toast } from "sonner";

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

    registrar: (username: string, password: string, correo: string) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
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

            const { data, message } = await IniciarSesion(username, password);

            const { username: Usuario, id } = data;
            set({
                user: { id, username: Usuario },
                username: username,
                isAuthenticated: true,
                loading: false,
            });

            toast.success(message ?? "Sesión iniciada correctamente");

        } catch (err) {
            const { message } = getUserFriendlyError(err, "Error en login");
            set({
                error: message,
                loading: false,
                isAuthenticated: false,
            });
        }
    },

    logout: async () => {
        try {
            const { message } = await CerrarSesion();

            toast.success(message ?? "Sesión cerrada correctamente");
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

            const { data, message } = await obtenerUsuario();

            const { username: Usuario, id } = data;

            set({
                user: { id, username: Usuario },
                username: Usuario,
                isAuthenticated: true,
                checking: false,
            });

            toast.success(message ?? "Sesión iniciada correctamente");
        } catch (err) {
            const { message } = getUserFriendlyError(err, "Error en login");
            set({
                user: null,
                username: null,
                isAuthenticated: false,
                checking: false,
                error: message,
            });
        }
    },
    registrar: async (username, password, correo) => {
        try {
            set({ loading: true, error: null });

            const response = await registrarUsuario(username, correo, password);
            const { data, message } = response;

            const { username: Usuario, id } = data;
            set({
                user: { id, username: Usuario },
                username: Usuario,
                isAuthenticated: true,
                loading: false,
            });
            toast.success(message ?? "Sesión iniciada correctamente");
        } catch (err) {
            const { message } = getUserFriendlyError(err, "Error en login");
            set({
                error: message,
                loading: false,
                isAuthenticated: false,
            });
        }
    },
}));
