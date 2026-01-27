import { create } from "zustand";

interface BooksFiltersState {
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

export const useBooksFiltersStore = create<BooksFiltersState>((set) => ({
    search: "",
    category: "",
    author: "",
    language: "",
    maxPages: null,

    setSearch: (search) => set({ search }),
    setCategory: (category) => set({ category }),
    setAuthor: (author) => set({ author }),
    setLanguage: (language) => set({ language }),
    setMaxPages: (maxPages) => set({ maxPages }),

    resetFilters: () =>
        set({
            search: "",
            category: "",
            author: "",
            language: "",
            maxPages: null,
        }),
}));
