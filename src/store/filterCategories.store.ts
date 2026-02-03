import { create } from "zustand";
import { useCategoriasStore } from "./categorias.store";

interface Categoria {
    id: string;
    nombre: string;
    descripcion: string;
}

interface CategoriesFiltersState {
    searchCategoria: string;
    categoriasFiltradas: Categoria[];

    setSearchCategoria: (value: string) => void;
    filtrarCategorias: (value: string) => void;
    resetFilters: () => void;
}

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
