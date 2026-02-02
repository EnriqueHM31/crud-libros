import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface CategoryFormProps {
    type?: "create" | "edit";
    initialData?: {
        name: string;
        description?: string;
    };
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; description?: string }) => void;
}

export default function CategoryForm({ type = "create", initialData, isOpen, onClose, onSubmit }: CategoryFormProps) {
    const [name, setName] = useState(initialData?.name ?? "");
    const [description, setDescription] = useState(initialData?.description ?? "");

    if (!isOpen) return null;

    const isEdit = type === "edit";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            {/* MODAL */}
            <div className="dark:bg-primary-dark w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
                {/* HEADER */}
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-primary-dark text-xl font-semibold dark:text-white">{isEdit ? "Editar categoría" : "Crear categoría"}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {isEdit ? "Actualiza la información de la categoría" : "Agrega una nueva categoría al sistema"}
                        </p>
                    </div>

                    <button type="button" onClick={onClose} className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10">
                        <FaTimes />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Nombre */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium dark:text-gray-300">Nombre de la categoría</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="rounded-xl border px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
                            placeholder="Ej. Ciencia ficción"
                        />
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium dark:text-gray-300">Descripción</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="resize-none rounded-xl border px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
                            placeholder="Descripción opcional"
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary/80 rounded-xl px-5 py-2 text-sm font-medium text-white dark:bg-blue-600 dark:hover:bg-blue-800"
                        >
                            {isEdit ? "Guardar cambios" : "Crear categoría"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
