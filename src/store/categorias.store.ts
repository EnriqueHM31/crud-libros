import { createCategory, deleteCategory, getAllCategories, updateCategory } from "@/services/categorias.service";
import type { CategoriasState } from "@/types/store";
import { getUserFriendlyError } from "@/utils/errors";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCategoriasStore = create<CategoriasState>()(
    persist(
        (set, get) => ({
            categorias: [],
            isLoading: false,
            error: {
                title: null,
                message: null,
            },

            isModalOpen: false,
            modalMode: null,
            selectedCategory: null,

            obtenerCategorias: async () => {
                set({ isLoading: true });

                try {
                    const { data } = await getAllCategories();
                    set({ categorias: data, error: { title: null, message: null } });
                } catch (err: unknown) {
                    const { message, title } = getUserFriendlyError(err, "las Categorias");

                    set({ error: { title: title, message: message } });
                } finally {
                    set({ isLoading: false });
                }
            },

            openCreateModal: () =>
                set({
                    modalMode: "create",
                    isModalOpen: true,
                    selectedCategory: null,
                }),

            openEditModal: (categoria) =>
                set({
                    modalMode: "edit",
                    isModalOpen: true,
                    selectedCategory: categoria,
                }),

            closeModal: () =>
                set({
                    isModalOpen: false,
                    modalMode: null,
                    selectedCategory: null,
                }),

            submitCreate: async (data) => {
                const { data: newCategory, message } = (await createCategory(data)) as {
                    data: { nombre: string; descripcion: string; id: string };
                    message: string;
                };

                toast.success(message ?? "Categoria creada correctamente");
                set((state) => ({
                    categorias: [
                        ...state.categorias,
                        {
                            ...newCategory,
                        },
                    ],
                }));

                get().closeModal();
            },

            submitEdit: async (data) => {
                const { selectedCategory } = get();
                if (!selectedCategory) return;

                const { data: updatedCategory, message } = (await updateCategory(selectedCategory.id, data)) as {
                    data: { nombre: string; descripcion: string; id: string };
                    message: string;
                };

                toast.success(message ?? "Categoria actualizada correctamente");
                set((state) => ({
                    categorias: state.categorias.map((cat) => (cat.id === updatedCategory.id ? { ...cat, ...data } : cat)),
                }));

                get().closeModal();
            },

            submitDelete: async (id: string) => {
                const { data, message } = (await deleteCategory(id)) as { data: { nombre: string; descripcion: string; id: string }; message: string };

                set((state) => ({
                    categorias: state.categorias.filter((cat) => cat.id !== data.id),
                }));

                toast.success(message ?? "Categoria eliminada correctamente");
                get().closeModal();
            },
        }),
        {
            name: "categorias-store",
        }
    )
);
