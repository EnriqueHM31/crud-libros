import { getAllCategories } from "@/services/categorias.service";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CategoriasState = {
    isLoading: boolean;
    error: Error | null;
    categories: string[];
    selectedCategory: string | null;
    modalMode: "create" | "edit" | "view" | null;
    isModalOpen: boolean;

    setIsLoading: (isLoading: boolean) => void;
    setError: (error: Error | null) => void;
    obtenerCategorias: () => void;
    seleccionarCategoria: (category: string) => void;
    setModalMode: (modalMode: "create" | "edit" | "view" | null) => void;
};

export const useCategoriasStore = create<CategoriasState>()(
    persist(
        (set) => ({
            isLoading: false,
            error: null,
            categories: [],
            selectedCategory: null,
            modalMode: null,
            isModalOpen: false,

            setIsLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),
            obtenerCategorias: async () => {
                set({ isLoading: true });
                try {
                    const { data } = await getAllCategories();
                    set({ categories: data });
                } catch (error) {
                    set({ error: error as Error });
                } finally {
                    set({ isLoading: false });
                }
            },
            seleccionarCategoria: (category) => {
                set({ selectedCategory: category });
            },
            setModalMode: (modalMode) => set({ modalMode }),
        }),
        {
            name: "categorias-store",
            partialize: (state) => ({
                isLoading: state.isLoading,
                error: state.error,
                categories: state.categories,
                selectedCategory: state.selectedCategory,
                modalMode: state.modalMode,
                isModalOpen: state.isModalOpen,
            }),
        }
    )
);  