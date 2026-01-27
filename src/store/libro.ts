import { create } from "zustand";
import type { GoogleBook, GoogleBooksResponse } from "../types/libro";
import LIBROS from "../data/mook.json";
/* =========================
TIPOS
========================= */

interface BooksState {
    books: GoogleBook[];
    selectedBook: GoogleBook | null;

    query: string;
    page: number;
    hasMore: boolean;

    isLoading: boolean;
    error: string | null;

    /* acciones */
    searchBooks: (query: string) => Promise<void>;
    selectBook: (book: GoogleBook | null) => void;
    clearBooks: () => void;
}

/* =========================
   CONSTANTES
========================= */

const MAX_RESULTS = 12;

/* =========================
   STORE
========================= */

export const useBooksStore = create<BooksState>((set) => ({
    books: [],
    selectedBook: null,

    query: "",
    page: 0,
    hasMore: true,

    isLoading: false,
    error: null,

    /* =========================
       BUSCAR LIBROS
    ========================= */

    searchBooks: async (query: string) => {
        if (!query.trim()) return;

        set({
            isLoading: true,
            error: null,
            books: [],
            query,
            page: 0,
            hasMore: true,
        });

        try {
            const data = LIBROS as GoogleBooksResponse;

            set({
                books: data.items ?? [],
                page: 1,
                hasMore:
                    (data.items?.length ?? 0) === MAX_RESULTS,
                isLoading: false,
            });
        } catch (err) {
            set({
                error: (err as Error).message,
                isLoading: false,
            });
        }
    },


    /* =========================
       SELECCIONAR LIBRO
    ========================= */

    selectBook: (book) => {
        set({ selectedBook: book });
    },

    /* =========================
       LIMPIAR STORE
    ========================= */

    clearBooks: () => {
        set({
            books: [],
            selectedBook: null,
            query: "",
            page: 0,
            hasMore: true,
            isLoading: false,
            error: null,
        });
    },
}));
