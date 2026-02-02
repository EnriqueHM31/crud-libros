import { useCategoriasStore } from "../../../store/categorias";
import CategoryForm from "./CategoriaForm";

export default function CategoryModal() {
    const {
        isModalOpen,
        modalMode,
        selectedCategory,
        closeModal,
        submitCreate,
        submitEdit,
    } = useCategoriasStore();

    if (!modalMode) return null;

    return (
        <CategoryForm
            isOpen={isModalOpen}
            type={modalMode}
            initialData={
                modalMode === "edit"
                    ? {
                        nombre: selectedCategory?.nombre ?? "",
                        descripcion: selectedCategory?.descripcion ?? "",
                    }
                    : undefined
            }
            onClose={closeModal}
            onSubmit={(data) =>
                modalMode === "create"
                    ? submitCreate(data as { nombre: string; descripcion: string })
                    : submitEdit(data)
            }
        />
    );
}
