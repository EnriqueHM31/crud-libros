import type { GoogleBook } from "@/types/libro";
import { toast } from "sonner";
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
                if (existe) {
                    toast.error("Ya estás en favoritos");
                    return;
                };

                set({
                    favoritos: [...get().favoritos, { book: libro, read: false }],
                });
                toast.success(`Libro ${libro.volumeInfo.title} agregado a favoritos`);
            },

            quitarFavorito: (id) => {

                const libro = get().favoritos.find(l => l.book.id === id);

                // si no existe en favoritos, no hacer nada
                if (!libro) return;
                set({
                    favoritos: get().favoritos.filter((l) => l.book.id !== id),
                });

                toast.info(`Libro ${libro.book.volumeInfo.title} eliminado de favoritos`);
            },

            toggleLeido: (id) => {

                const favoritos = get().favoritos;

                const libro = favoritos.find(l => l.book.id === id);

                // si no existe en favoritos, no hacer nada
                if (!libro) return;

                const nuevoEstado = !libro.read;

                set({
                    favoritos: favoritos.map(l =>
                        l.book.id === id ? { ...l, read: nuevoEstado } : l
                    ),
                });

                // toast según estado
                if (nuevoEstado) {
                    toast.success("Libro marcado como leído");
                } else {
                    toast.info("Libro marcado como no leído");
                }
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
