import { deleteCategory } from "@/services/categorias.service";
import { createLanguage, getAllLanguages, updateLanguage } from "@/services/lenguajes.service";
import type { ModalMode } from "@/types/store";
import { isApiError } from "@/utils/errors";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Lenguaje {
    id: string;
    nombre: string;
    abreviacion: string;
}

interface LenguajesState {
    lenguajes: Lenguaje[];
    isModalOpen: boolean;
    modalMode: ModalMode;
    selectedLanguage: Lenguaje | null;
    isLoading: boolean;
    error: string | null;

    obtenerLenguajes: () => Promise<void>;
    openCreateModal: () => void;
    openEditModal: (lenguaje: Lenguaje) => void;
    closeModal: () => void;

    submitCreate: (data: Omit<Lenguaje, "id">) => Promise<void>;
    submitEdit: (data: Partial<Omit<Lenguaje, "id">>) => Promise<void>;
    submitDelete: (id: string) => Promise<void>;

}

export const useLenguajesStore = create<LenguajesState>()(
    persist(
        (set, get) => ({
            lenguajes: [],
            isLoading: false,
            error: null,

            isModalOpen: false,
            modalMode: null,
            selectedLanguage: null,

            obtenerLenguajes: async () => {
                set({ isLoading: true });

                try {
                    const { data } = await getAllLanguages();
                    set({ lenguajes: data, error: null });
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

            openCreateModal: () =>
                set({
                    modalMode: "create",
                    isModalOpen: true,
                    selectedLanguage: null,
                }),

            openEditModal: (lenguaje) =>
                set({
                    modalMode: "edit",
                    isModalOpen: true,
                    selectedLanguage: lenguaje,
                }),

            closeModal: () =>
                set({
                    isModalOpen: false,
                    modalMode: null,
                    selectedLanguage: null,
                }),

            submitCreate: async (data) => {
                const { data: newLenguage, message } = (await createLanguage(data)) as {
                    data: { id: string; nombre: string; abreviacion: string };
                    message: string;
                };

                toast.success(message ?? "Categoria creada correctamente");
                set((state) => ({
                    lenguajes: [
                        ...state.lenguajes,
                        {
                            ...newLenguage,
                        },
                    ],
                }));

                get().closeModal();
            },

            submitEdit: async (data) => {
                const { selectedLanguage } = get();
                if (!selectedLanguage) return;

                const { data: lenguajeModificado, message } = await updateLanguage({ id: selectedLanguage.id, lenguaje: data }) as {
                    data: { id: string; nombre: string; abreviacion: string };
                    message: string;
                };

                toast.success(message ?? "Categoria actualizada correctamente");
                set((state) => ({
                    lenguajes: state.lenguajes.map((cat) => (cat.id === lenguajeModificado.id ? { ...cat, ...data } : cat)),
                }));

                get().closeModal();
            },

            submitDelete: async (id: string) => {
                const { data, message } = (await deleteCategory(id)) as { data: { id: string, nombre: string, abreviacion: string }; message: string };

                set((state) => ({
                    lenguajes: state.lenguajes.filter((cat) => cat.id !== data.id),
                }));

                toast.success(message ?? "Categoria eliminada correctamente");
                get().closeModal();
            },
        }),
        {
            name: "lenguajes-store"
        }
    )
);
