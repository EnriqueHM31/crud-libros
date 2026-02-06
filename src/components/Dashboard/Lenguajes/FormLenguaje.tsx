import { useFormLenguajes } from "@/hooks/useFormLenguajes";
import type { LenguajeaFormProps } from "@/types/componentes";
import { AnimatePresence, motion } from "framer-motion";

export default function LenguajeForm({ type = "create", initialData, isOpen, onClose, onSubmit }: LenguajeaFormProps) {
    const { lenguaje, handleChange, handleSubmit, isEdit } = useFormLenguajes({ type, initialData, onSubmit });

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
                                <h2 className="text-primary-dark text-xl font-semibold dark:text-white">{isEdit ? "Editar lenguaje" : "Crear lenguaje"}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {isEdit ? "Actualiza la información del lenguaje" : "Agrega un nuevo lenguaje al sistema"}
                                </p>
                            </div>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                            {/* Nombre */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor={isEdit ? "edit-nombre" : "create-nombre"} className="text-primary text-sm font-medium dark:text-gray-400">
                                    Nombre del lenguaje
                                </label>
                                <input
                                    name="nombre"
                                    type="text"
                                    id={isEdit ? "edit-nombre" : "create-nombre"}
                                    required
                                    value={lenguaje.nombre}
                                    onChange={handleChange}
                                    className="rounded-xl border px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    placeholder="Ej. Español, Portugués"
                                />
                            </div>

                            {/* Descripción */}
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor={isEdit ? "edit-descripcion" : "create-descripcion"}
                                    className="text-primary text-sm font-medium dark:text-gray-400"
                                >
                                    Abreviación del lenguaje
                                </label>
                                <textarea
                                    name="descripcion"
                                    id={isEdit ? "edit-descripcion" : "create-descripcion"}
                                    rows={1}
                                    value={lenguaje.abreviacion}
                                    onChange={handleChange}
                                    className="resize-none rounded-xl border px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    placeholder="Ej. es, pt"
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
                                    {isEdit ? "Guardar cambios" : "Crear Lenguaje"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
