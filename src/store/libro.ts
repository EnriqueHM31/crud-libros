import { create } from "zustand";
import type { GoogleBook, GoogleBooksResponse } from "../types/libro";
import LIBROS from "../data/mook.json";
import { getAllBooks } from "@/services/books.service";

/* =========================
   TIPOS
========================= */

type ModalMode = "view" | "edit" | "create";

interface BooksState {
    /* data */
    books: GoogleBook[];
    selectedBook: GoogleBook | null;

    /* modal */
    isModalOpen: boolean;
    modalMode: ModalMode;

    /* paginación / búsqueda */
    query: string;
    page: number;
    hasMore: boolean;

    /* estado */
    isLoading: boolean;
    error: string | null;

    /* acciones */
    cargarLibros: () => Promise<void>;
    searchBooks: (query: string) => Promise<void>;

    openBookModal: (book: GoogleBook) => void;
    openEditBook: (book: GoogleBook) => void;
    openCreateBook: () => void;
    closeBookModal: () => void;

    createBook: (book: GoogleBook) => void;
    editBook: (id: string, updatedBook: Partial<GoogleBook>) => void;
    deleteBook: (id: string) => void;

    clearBooks: () => void;

    backBooks: () => void;
}

/* =========================
   CONSTANTES
========================= */

const MAX_RESULTS = 12;

/* =========================
   STORE
========================= */

export const useBooksStore = create<BooksState>((set) => ({
    /* =========================
       STATE INICIAL
    ========================= */

    books: [],
    selectedBook: null,

    isModalOpen: false,
    modalMode: "view",

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

        setTimeout(async () => {

            try {
                const response = await getAllBooks();

                const { data } = response;

                set({
                    books: data,
                    isLoading: false,
                });
            } catch (err) {
                set({
                    error: (err as Error).message,
                    isLoading: false,
                });
            }
        }, 500);
    },

    /* =========================
       BUSCAR LIBROS
    ========================= */

    searchBooks: async (query) => {
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
        if (!book) return;

        set({
            selectedBook: book,
            isModalOpen: true,
            modalMode: "view",
        });
    },

    openEditBook: (book) => {
        set({
            selectedBook: book,
            isModalOpen: true,
            modalMode: "edit",
        });
    },

    openCreateBook: () => {
        set({
            selectedBook: null,
            isModalOpen: true,
            modalMode: "create",
        });
    },

    closeBookModal: () => {
        set({
            selectedBook: null,
            isModalOpen: false,
            modalMode: "view",
        });
    },

    /* =========================
       CRUD
    ========================= */

    createBook: (newBook) => {
        set((state) => ({
            books: [newBook, ...state.books],
            isModalOpen: false,
            modalMode: "view",
        }));
    },

    editBook: (id, updatedFields) => {
        set((state) => ({
            books: state.books.map((book) =>
                book.id === id
                    ? {
                        ...book,
                        ...updatedFields,
                        volumeInfo: {
                            ...book.volumeInfo,
                            ...updatedFields.volumeInfo,
                        },
                    }
                    : book
            ),
            selectedBook:
                state.selectedBook?.id === id
                    ? {
                        ...state.selectedBook,
                        ...updatedFields,
                        volumeInfo: {
                            ...state.selectedBook.volumeInfo,
                            ...updatedFields.volumeInfo,
                        },
                    }
                    : state.selectedBook,
            modalMode: "view",
        }));
    },

    deleteBook: (id) => {
        set((state) => ({
            books: state.books.filter((book) => book.id !== id),
            selectedBook: null,
            isModalOpen: false,
            modalMode: "view",
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
            modalMode: "view",
            query: "",
            page: 0,
            hasMore: true,
            isLoading: false,
            error: null,
        });
    },

    backBooks: () => {
        set({
            selectedBook: null,
            isModalOpen: false,
            modalMode: "view",
        });
    },
}));
