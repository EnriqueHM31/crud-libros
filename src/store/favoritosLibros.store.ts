import type { GoogleBook } from "@/types/libro";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LibroFav {
    book: GoogleBook;
    read: boolean;
}

interface FavoritosStore {
    favoritos: LibroFav[]; // TODO: Cambiar nombre

    agregarFavorito: (libro: GoogleBook) => void;
    quitarFavorito: (id: string) => void;
    toggleLeido: (id: string) => void;

    esFavorito: (id: string) => boolean;
    totalFavoritos: () => number;
}

export const useFavoritosStore = create<FavoritosStore>()(
    persist(
        (set, get) => ({
            favoritos: [],

            agregarFavorito: (libro) => {
                console.log({ libro });
                if (!libro || !libro.id) return;

                const existe = get().favoritos.find((l) => l.book.id === libro.id);
                if (existe) return;

                set({
                    favoritos: [...get().favoritos, { book: libro, read: false }],
                });
            },

            quitarFavorito: (id) => {
                set({
                    favoritos: get().favoritos.filter((l) => l.book.id !== id),
                });
            },

            toggleLeido: (id) => {
                set({
                    favoritos: get().favoritos.map((l) => (l.book.id === id ? { ...l, read: !l.read } : l)),
                });
            },

            esFavorito: (id) => {
                if (!id) return false;
                return get().favoritos.some((l) => l.book.id === id);
            },

            totalFavoritos: () => {
                return get().favoritos.length;
            },
        }),
        {
            name: "libros-favoritos-storage",
        }
    )
);
