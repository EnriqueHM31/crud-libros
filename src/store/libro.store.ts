import { createBook, deleteBook, getAllBooks, updateBook } from "@/services/books.service";
import { toast } from "sonner";
import { create } from "zustand";
import LIBROS from "../data/mook.json";
import type { GoogleBook, GoogleBooksResponse, VolumeInfo } from "../types/libro";

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
    editBook: (id: string, updatedBook: VolumeInfo) => void;
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

                set({
                    books: response.data, // ✅ aquí está el array
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

    createBook: async (newBook) => {
        const { data, message } = (await createBook(newBook)) as { data: GoogleBook; message: string };

        toast.success(message ?? "Libro creado correctamente");
        set((state) => ({
            books: [...state.books, data], // ✅ aquí está el array
            isModalOpen: false,
            modalMode: "view",
        }));
    },

    editBook: async (id, updatedFields) => {
        console.log({ updatedFields });
        const { data, message } = (await updateBook(updatedFields, id)) as { data: GoogleBook; message: string };

        toast.success(message ?? "Libro actualizado correctamente");
        set((state) => ({
            books: state.books.map((book) =>
                book.id === id
                    ? {
                        ...book,
                        ...data,
                        volumeInfo: {
                            ...book.volumeInfo,
                            ...data.volumeInfo,
                        },
                    }
                    : book
            ),
            selectedBook:
                state.selectedBook?.id === id
                    ? {
                        ...state.selectedBook,
                        ...data,
                        volumeInfo: {
                            ...state.selectedBook.volumeInfo,
                            ...data.volumeInfo,
                        },
                    }
                    : state.selectedBook,
            modalMode: "view",
        }));
    },

    deleteBook: async (id) => {
        const { data, message } = (await deleteBook(id)) as { data: GoogleBook; message: string };

        toast.success(message ?? "Libro eliminado correctamente");

        set((state) => ({
            books: state.books.filter((book) => book.id !== data.id),
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
