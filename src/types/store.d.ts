import type React from "react";
import type { Categoria } from "./categoria";
import type { GoogleBook, VolumeInfo } from "./libro";
import type { theme } from "@/constants/theme";

type ModalMode = "create" | "edit" | null;

export type CategoriasState = {
    categorias: Categoria[];
    isLoading: boolean;
    error: string | null;

    // modal
    isModalOpen: boolean;
    modalMode: ModalMode;
    selectedCategory: Categoria | null;

    // actions
    obtenerCategorias: () => Promise<void>;
    openCreateModal: () => void;
    openEditModal: (categoria: Categoria) => void;
    closeModal: () => void;

    submitCreate: (data: Omit<Categoria, "id">) => Promise<void>;
    submitEdit: (data: Partial<Omit<Categoria, "id">>) => Promise<void>;
    submitDelete: (id: string) => Promise<void>;
};

export interface CategoriesFiltersState {
    searchCategoria: string;
    categoriasFiltradas: Categoria[];

    setSearchCategoria: (value: string) => void;
    filtrarCategorias: (value: string) => void;
    resetFilters: () => void;
}

export interface BooksFiltersState {
    search: string;
    category: string;
    author: string;
    language: string;
    maxPages: number | null;

    setSearch: (value: string) => void;
    setCategory: (value: string) => void;
    setAuthor: (value: string) => void;
    setLanguage: (value: string) => void;
    setMaxPages: (value: number | null) => void;

    resetFilters: () => void;
}

export type ModalModeBook = "view" | "edit" | "create";

export interface BooksState {
    /* data */
    books: GoogleBook[];
    selectedBook: GoogleBook | null;

    /* modal */
    isModalOpen: boolean;
    modalMode: ModalModeBook;

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

export type MenuKey = typeof menuItems[number]["key"];

export type MenuItem = {
    key: MenuKey;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

interface MenuState {
    menuItems: MenuItem[];
    currentMenu: MenuKey;
    isOpen: boolean;

    setMenu: (menu: MenuKey) => void;
    setIsOpen: (open: boolean) => void;
}

type ThemeMode = keyof typeof theme;

export interface ThemeState {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
}
