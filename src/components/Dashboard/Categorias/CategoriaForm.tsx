import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface CategoryFormProps {
    type?: "create" | "edit";
    initialData?: {
        nombre: string;
        descripcion?: string;
    };
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (<Partial extends { nombre?: string; descripcion?: string }>(data: Partial) => void);
}

export default function CategoryForm({ type = "create", initialData, isOpen, onClose, onSubmit }: CategoryFormProps) {
    const [categoria, setCategoria] = useState(initialData ?? { nombre: "", descripcion: "" });

    const isEdit = type === "edit";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && initialData) {
            // Construir objeto solo con campos que cambiaron
            const updatedFields: Partial<typeof categoria> = {};
            if (categoria.nombre !== initialData.nombre) updatedFields.nombre = categoria.nombre;
            if (categoria.descripcion !== initialData.descripcion) updatedFields.descripcion = categoria.descripcion;

            onSubmit(updatedFields); // Solo enviamos los campos modificados
        } else {
            // Si es create, enviamos todo
            onSubmit({
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
            });
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCategoria((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* MODAL */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="dark:bg-primary-dark w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg"
                    >
                        {/* HEADER */}
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-primary-dark text-xl font-semibold dark:text-white">{isEdit ? "Editar categoría" : "Crear categoría"}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {isEdit ? "Actualiza la información de la categoría" : "Agrega una nueva categoría al sistema"}
                                </p>
                            </div>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                            {/* Nombre */}
                            <div className="flex flex-col gap-1">
                                <label className="text-primary text-sm font-medium dark:text-gray-400">Nombre de la categoría</label>
                                <input
                                    name="nombre"
                                    type="text"
                                    required
                                    value={categoria.nombre}
                                    onChange={handleChange}
                                    className="rounded-xl border px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    placeholder="Ej. Ciencia ficción"
                                />
                            </div>

                            {/* Descripción */}
                            <div className="flex flex-col gap-1">
                                <label className="text-primary text-sm font-medium dark:text-gray-400">Descripción</label>
                                <textarea
                                    name="descripcion"
                                    rows={6}
                                    value={categoria.descripcion}
                                    onChange={handleChange}
                                    className="resize-none rounded-xl border px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    placeholder="La categoria de ciencia ficcion consiste en libros que hablan del futuro ..."
                                />
                            </div>

                            {/* ACTIONS */}
                            <div className="mt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="cursor-pointer rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="bg-primary hover:bg-primary/80 cursor-pointer rounded-xl px-5 py-2 text-sm font-medium text-white dark:bg-blue-600 dark:hover:bg-blue-800"
                                >
                                    {isEdit ? "Guardar cambios" : "Crear categoría"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
