import { useLenguajesStore } from "@/store/lenguajes.store";
import LenguajeForm from "./FormLenguaje";

export default function LenguajeModal() {
    const { isModalOpen, modalMode, selectedLanguage, closeModal, submitCreate, submitEdit } = useLenguajesStore();

    if (!modalMode) return null;

    return (
        <LenguajeForm
            isOpen={isModalOpen}
            type={modalMode}
            initialData={
                modalMode === "edit"
                    ? {
                          nombre: selectedLanguage?.nombre ?? "",
                          abreviacion: selectedLanguage?.abreviacion ?? "",
                      }
                    : undefined
            }
            onClose={closeModal}
            onSubmit={(data) => (modalMode === "create" ? submitCreate(data as { nombre: string; abreviacion: string }) : submitEdit(data))}
        />
    );
}
