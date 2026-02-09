import { createBook, deleteBook, getAllBooks, updateBook } from "@/services/libros.service";
import type { BooksState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";
import LIBROS from "../data/mook.json";
import type { GoogleBook, GoogleBooksResponse } from "../types/libro";
import { getUserFriendlyError } from "@/utils/errors";

const MAX_RESULTS = 12;

export const useBooksStore = create<BooksState>((set) => ({
    books: [],
    selectedBook: null,

    isModalOpen: false,
    modalMode: "view",

    query: "",
    page: 0,
    hasMore: true,

    isLoading: false,
    error: {
        title: null,
        message: null,
    },

    cargarLibros: async () => {
        set({ isLoading: true });

        try {
            const { data } = await getAllBooks();

            set({
                books: data,
                isLoading: false,
                error: { title: null, message: null },
            });
        } catch (err) {
            const { message, title } = getUserFriendlyError(err, "los Libros");
            set({
                error: { title: title, message: message },
                isLoading: false,
            });
        }
    },

    searchBooks: async (query) => {
        if (!query.trim()) return;

        set({
            isLoading: true,
            error: { title: null, message: null },
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
            const { message, title } = getUserFriendlyError(err, "los Libros");
            set({
                error: { title: title, message: message },
                isLoading: false,
            });
        }
    },

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

    createBook: async (newBook) => {
        const { data, message } = (await createBook(newBook)) as { data: GoogleBook; message: string };

        toast.success(message ?? "Libro creado correctamente");
        set((state) => ({
            books: [...state.books, data],
            isModalOpen: false,
            modalMode: "view",
        }));
    },

    editBook: async (id, updatedFields) => {
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
            error: { title: null, message: null },
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
