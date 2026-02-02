import { getAllCategories } from "@/services/categorias.service";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Categoria {
    id: `${string}-${string}-${string}-${string}`;
    nombre: string;
    descripcion: string;
}

export type CategoriasState = {
    categorias: Categoria[];
    isLoading: boolean;
    error: string | null;
    selectedCategory: Categoria | null;
    modalMode: "create" | "edit" | "view" | null;
    isModalOpen: boolean;

    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    obtenerCategorias: () => void;
    seleccionarCategoria: (category: Categoria) => void;
    setModalMode: (modalMode: "create" | "edit" | "view" | null) => void;
};

export const useCategoriasStore = create<CategoriasState>()(
    persist(
        (set) => ({
            isLoading: false,
            error: null,
            categorias: [],
            selectedCategory: null,
            modalMode: null,
            isModalOpen: false,

            setIsLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),
            obtenerCategorias: async () => {
                set({ isLoading: true });
                try {
                    const { data } = (await getAllCategories()) as { data: Categoria[] };
                    set({ categorias: data });
                } catch (error) {
                    set({ error: error as string });
                } finally {
                    set({ isLoading: false });
                }
            },
            seleccionarCategoria: (category: Categoria) => {
                set({ selectedCategory: category });
            },
            setModalMode: (modalMode) => set({ modalMode }),
        }),
        {
            name: "categorias-store",
            partialize: (state) => ({
                isLoading: state.isLoading,
                error: state.error,
                categorias: state.categorias,
                selectedCategory: state.selectedCategory,
                modalMode: state.modalMode,
                isModalOpen: state.isModalOpen,
            }),
        }
    )
);
