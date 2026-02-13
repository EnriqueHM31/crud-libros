import type { GoogleBook } from "@/types/libro";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useAuthStore } from "./autenticacion.store";

/* ========================= */

export interface LibroFav {
    book: GoogleBook;
    read: boolean;
    username: string; // dueño del favorito
}

interface FavoritosStore {
    favoritos: LibroFav[];
    usernameActivo: string | null;

    setUsuario: (username: string | null) => void;

    agregarFavorito: (libro: GoogleBook) => void;
    quitarFavorito: (id: string) => void;
    toggleLeido: (id: string) => void;

    esFavorito: (id: string) => boolean;
    totalFavoritos: () => number;

    limpiarFavoritos: () => void;
}

/* ========================= */

export const useFavoritosStore = create<FavoritosStore>()(
    persist(
        (set, get) => ({
            favoritos: [],
            usernameActivo: null,

            /* ========= SYNC USER ========= */

            setUsuario: (username) => {
                set({ usernameActivo: username });
            },

            /* ========= CRUD ========= */

            agregarFavorito: (libro) => {
                if (!libro?.id) return;

                const autenticado = useAuthStore.getState().isAuthenticated;

                if (!autenticado) {
                    toast.error("Debes estar autenticado para añadir libros a favoritos");
                    return;
                }

                const username = get().usernameActivo;
                if (!username) {
                    toast.error("");
                    return;
                }

                const existe = get().favoritos.find((l) => l.book.id === libro.id && l.username === username);

                if (existe) {
                    toast.error("Ya está en favoritos");
                    return;
                }

                set({
                    favoritos: [...get().favoritos, { book: libro, read: false, username }],
                });

                toast.success(`Libro ${libro.volumeInfo.title} agregado`);
            },

            quitarFavorito: (id) => {
                const username = get().usernameActivo;
                if (!username) return;

                set({
                    favoritos: get().favoritos.filter((l) => !(l.book.id === id && l.username === username)),
                });

                toast.info("Libro eliminado");
            },

            toggleLeido: (id) => {
                const username = get().usernameActivo;
                if (!username) return;

                set({
                    favoritos: get().favoritos.map((l) => (l.book.id === id && l.username === username ? { ...l, read: !l.read } : l)),
                });
            },

            /* ========= SELECTORS ========= */

            esFavorito: (id) => {
                const username = get().usernameActivo;
                if (!username) return false;

                return get().favoritos.some((l) => l.book.id === id && l.username === username);
            },

            totalFavoritos: () => {
                const username = get().usernameActivo;
                if (!username) return 0;

                return get().favoritos.filter((l) => l.username === username).length;
            },

            limpiarFavoritos: () => {
                const username = get().usernameActivo;
                if (!username) return;

                set({
                    favoritos: get().favoritos.filter((l) => l.username !== username),
                });
            },
        }),
        {
            name: "favoritos",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
