import type { GoogleBook } from "@/types/libro";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useAuthStore } from "./autenticacion.store";

export interface LibroFav {
    book: GoogleBook;
    read: boolean;
}

interface FavoritosStore {
    favoritos: LibroFav[];

    agregarFavorito: (libro: GoogleBook) => void;
    quitarFavorito: (id: string) => void;
    toggleLeido: (id: string) => void;

    esFavorito: (id: string) => boolean;
    totalFavoritos: () => number;

    cargarFavoritosUsuario: () => void;
}

export const getStorageKey = () => {
    const { user } = useAuthStore.getState();
    if (!user) return "libros-favoritos-anon";
    return `libros-favoritos-${user.username || user.id}`;
};

export const useFavoritosStore = create<FavoritosStore>()(
    persist(
        (set, get) => ({
            favoritos: [],

            cargarFavoritosUsuario: () => {
                const key = getStorageKey();
                const data = localStorage.getItem(key);
                if (data) {
                    const parsed = JSON.parse(data);
                    set({ favoritos: parsed.state?.favoritos || [] });
                } else {
                    set({ favoritos: [] });
                }
            },

            agregarFavorito: (libro) => {
                if (!libro?.id) return;

                const { user } = useAuthStore.getState();
                if (!user) {
                    toast.error("Inicia sesión para agregar favoritos");
                    return;
                }

                const existe = get().favoritos.find((l) => l.book.id === libro.id);
                if (existe) {
                    toast.error("Ya está en favoritos");
                    return;
                }

                set({
                    favoritos: [...get().favoritos, { book: libro, read: false }],
                });

                toast.success(`Libro ${libro.volumeInfo.title} agregado`);
            },

            quitarFavorito: (id) => {
                const { user } = useAuthStore.getState();
                if (!user) return;

                const libro = get().favoritos.find((l) => l.book.id === id);
                if (!libro) return;

                set({
                    favoritos: get().favoritos.filter((l) => l.book.id !== id),
                });

                toast.info(`Libro eliminado`);
            },

            toggleLeido: (id) => {
                const libro = get().favoritos.find((l) => l.book.id === id);
                if (!libro) return;

                const nuevo = !libro.read;

                set({
                    favoritos: get().favoritos.map((l) =>
                        l.book.id === id ? { ...l, read: nuevo } : l
                    ),
                });
            },

            esFavorito: (id) => {
                return get().favoritos.some((l) => l.book.id === id);
            },

            totalFavoritos: () => get().favoritos.length,
        }),
        {
            name: getStorageKey(),
            storage: createJSONStorage(() => localStorage),
        }
    )
);
