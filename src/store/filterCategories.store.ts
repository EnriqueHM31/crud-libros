import { create } from "zustand";
import { useCategoriasStore } from "./categorias.store";
import type { CategoriesFiltersState } from "@/types/store";

export const useCategoriesFiltersStore = create<CategoriesFiltersState>((set) => ({
    searchCategoria: "",
    categoriasFiltradas: [],

    setSearchCategoria: (searchCategoria) => set({ searchCategoria }),

    filtrarCategorias: (searchCategoria) => {
        const { categorias } = useCategoriasStore.getState();

        const filtradas = categorias.filter((categoria) => categoria.nombre.toLowerCase().includes(searchCategoria.toLowerCase()));

        set({
            categoriasFiltradas: filtradas,
            searchCategoria,
        });
    },

    resetFilters: () => {
        const { categorias } = useCategoriasStore.getState();

        set({
            searchCategoria: "",
            categoriasFiltradas: categorias,
        });
    },
}));
