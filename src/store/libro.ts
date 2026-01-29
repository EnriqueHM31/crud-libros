import { create } from "zustand";
import type { GoogleBook, GoogleBooksResponse } from "../types/libro";
import LIBROS from "../data/mook.json";

/* =========================
   TIPOS
========================= */

interface BooksState {
    books: GoogleBook[];
    selectedBook: GoogleBook | null;

    /* modal */
    isModalOpen: boolean;

    query: string;
    page: number;
    hasMore: boolean;

    isLoading: boolean;
    error: string | null;

    /* acciones */
    searchBooks: (query: string) => Promise<void>;
    cargarLibros: () => Promise<void>;

    openBookModal: (book: GoogleBook) => void;
    closeBookModal: () => void;

    editBook: (book: GoogleBook) => void;
    deleteBook: (id: string) => void;

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

    isModalOpen: false,

    query: "",
    page: 0,
    hasMore: true,

    isLoading: false,
    error: null,

    /* =========================
       CARGAR LIBROS (MOCK)
    ========================= */

    cargarLibros: async () => {
        set({ isLoading: true });

        setTimeout(() => {
            const data = LIBROS as GoogleBooksResponse;

            set({
                books: data.items ?? [],
                page: 1,
                hasMore: (data.items?.length ?? 0) === MAX_RESULTS,
                isLoading: false,
            });
        }, 500);
    },

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
                hasMore: (data.items?.length ?? 0) === MAX_RESULTS,
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
       MODAL
    ========================= */

    openBookModal: (book) => {
        set({
            selectedBook: book,
            isModalOpen: true,
        });
    },

    closeBookModal: () => {
        set({
            selectedBook: null,
            isModalOpen: false,
        });
    },

    /* =========================
       EDITAR / ELIMINAR
    ========================= */

    editBook: (updatedBook) => {
        set((state) => ({
            books: state.books.map((book) => (book.id === updatedBook.id ? updatedBook : book)),
            selectedBook: updatedBook,
        }));
    },

    deleteBook: (id) => {
        set((state) => ({
            books: state.books.filter((book) => book.id !== id),
            selectedBook: null,
            isModalOpen: false,
        }));
    },

    /* =========================
       LIMPIAR STORE
    ========================= */

    clearBooks: () => {
        set({
            books: [],
            selectedBook: null,
            isModalOpen: false,
            query: "",
            page: 0,
            hasMore: true,
            isLoading: false,
            error: null,
        });
    },
}));
