import { createCategory, deleteCategory, getAllCategories, updateCategory } from "@/services/categorias.service";
import { isApiError } from "@/utils/errors";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Categoria {
    id: string;
    nombre: string;
    descripcion: string;
}

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

export const useCategoriasStore = create<CategoriasState>()(
    persist(
        (set, get) => ({
            categorias: [],
            isLoading: false,
            error: null,

            isModalOpen: false,
            modalMode: null,
            selectedCategory: null,

            /* =========================
               FETCH
            ========================= */
            obtenerCategorias: async () => {
                set({ isLoading: true });

                try {
                    const { data } = await getAllCategories();
                    set({ categorias: data, error: null });
                } catch (err: unknown) {
                    let message = "Error al obtener categorías";

                    if (err instanceof Error) {
                        message = err.message;
                    } else if (isApiError(err)) {
                        message = err.response?.data?.message ?? message;
                    }

                    set({ error: message });
                } finally {
                    set({ isLoading: false });
                }
            },

            /* =========================
               MODAL CONTROL
            ========================= */
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

            /* =========================
               SUBMIT ACTIONS
            ========================= */
            submitCreate: async (data) => {
                console.log("CREATE", data);

                const { data: newCategory, message } = (await createCategory(data)) as { data: { nombre: string; descripcion: string, id: string }, message: string };

                toast.success(message ?? "Categoria creada correctamente");
                set((state) => ({
                    categorias: [
                        {
                            ...newCategory
                        },
                        ...state.categorias,
                    ],
                }));

                get().closeModal();
            },

            submitEdit: async (data) => {
                const { selectedCategory } = get();
                if (!selectedCategory) return;

                console.log("EDIT", data);

                const { data: updatedCategory, message } = (await updateCategory(selectedCategory.id, data)) as { data: { nombre: string; descripcion: string, id: string }, message: string };

                toast.success(message ?? "Categoria actualizada correctamente");
                set((state) => ({
                    categorias: state.categorias.map((cat) => (cat.id === updatedCategory.id ? { ...cat, ...data } : cat)),
                }));

                get().closeModal();
            },
            submitDelete: async (id: string) => {
                console.log("DELETE", id);

                const { data, message } = (await deleteCategory(id)) as { data: { nombre: string; descripcion: string, id: string }, message: string };

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
