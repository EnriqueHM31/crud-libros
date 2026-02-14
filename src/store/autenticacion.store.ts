import { create } from "zustand";
import { CerrarSesion, IniciarSesion, obtenerUsuario, registrarUsuario } from "@/services/auth.service";
import { getUserFriendlyError } from "@/utils/errors";
import { toast } from "sonner";
import { useFavoritosStore } from "./favoritosLibros.store";

interface User {
    id: string;
    username: string;
    correo: string;
}

interface AuthStore {
    user: User | null;
    username: string | null;

    loading: boolean;
    checking: boolean;
    error: string | null;
    isAuthenticated: boolean;

    registrar: ({ username, password, correo }: { username: string; password: string; correo: string }) => Promise<{ ok: boolean }>;
    login: (username: string, password: string) => Promise<{ ok: boolean }>;
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

            const { username: Usuario, id, correo } = data;
            set({
                user: { id, username: Usuario, correo },
                username: Usuario,
                isAuthenticated: true,
                loading: false,
            });

            toast.success(message ?? "Sesión iniciada correctamente");
            useFavoritosStore.getState().setUsuario(Usuario);
            return { ok: true };
        } catch (err) {
            const { message } = getUserFriendlyError(err, "Error en login");
            set({
                error: message,
                loading: false,
                isAuthenticated: false,
            });
            return { ok: false };
        }
    },

    logout: async () => {
        try {
            const { message, data } = await CerrarSesion();

            toast.success(message ?? "Sesión cerrada correctamente");
            useFavoritosStore.getState().setUsuario(data.username);
            set({ user: null, username: null, isAuthenticated: false });
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

            const { data } = await obtenerUsuario();

            const { username: Usuario, id, correo } = data;

            set({
                user: { id, username: Usuario, correo },
                username: Usuario,
                isAuthenticated: true,
                checking: false,
            });
        } catch (err) {
            set({
                user: null,
                username: null,
                isAuthenticated: false,
                checking: false,
                error: err instanceof Error ? err.message : "Error en autenticación",
            });
        }
    },
    registrar: async ({ username, password, correo }) => {
        try {
            set({ loading: true, error: null });

            const response = await registrarUsuario({ username, password, correo });
            const { data, message } = response;

            const { username: Usuario, id, correo: Correo } = data;
            set({
                user: { id, username: Usuario, correo: Correo },
                username: Usuario,
                isAuthenticated: true,
                loading: false,
                error: null,
            });

            toast.success(message ?? "Registro exitoso");
            return { ok: true };
        } catch (err) {
            const { message } = getUserFriendlyError(err, "Error en login");
            set({
                error: message,
                loading: false,
                isAuthenticated: false,
            });
            return { ok: false };
        }
    },
}));
