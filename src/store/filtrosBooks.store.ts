import { create } from "zustand";
import type { BooksFiltersState } from "@/types/store";


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
