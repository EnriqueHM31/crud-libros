import { containerVariantsEntrada, itemVariantsEntrada } from "@/constants/animaciones";
import { useFilterLenguajes } from "@/hooks/useFilterLenguaje";
import { useLenguajesStore } from "@/store/lenguajes.store";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ListaLenguajes() {
    const { openEditModal, submitDelete } = useLenguajesStore();
    const { lenguajes } = useFilterLenguajes();

    if (!lenguajes || lenguajes.length === 0) return null;

    return (
        <motion.section variants={containerVariantsEntrada} initial="hidden" animate="visible" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lenguajes.map((lenguaje) => (
                <motion.article
                    key={lenguaje.id}
                    variants={itemVariantsEntrada}
                    whileHover={{ x: 6 }}
                    className="group dark:bg-primary-dark hover:bg-primary relative flex flex-col items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm transition hover:text-white hover:shadow-md dark:border-white/10 hover:dark:bg-blue-600"
                >
                    {/* ICONOS */}
                    <div className="absolute top-3 right-3 flex gap-2">
                        <button
                            onClick={() => {
                                openEditModal(lenguaje);
                            }}
                            className="bg-primary group-hover:text-primary cursor-pointer rounded-lg p-2 text-white group-hover:bg-white dark:bg-blue-600"
                            title="Editar categoría"
                        >
                            <FaEdit size={14} />
                        </button>

                        <button
                            onClick={() => submitDelete(lenguaje.id)}
                            className="bg-primary group-hover:text-primary cursor-pointer rounded-lg p-2 text-white group-hover:bg-white dark:bg-blue-600"
                            title="Eliminar categoría"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>

                    {/* CONTENIDO */}
                    <h3 className="mb-2 text-2xl font-semibold text-gray-800 group-hover:text-white dark:text-white">{lenguaje.nombre}</h3>

                    <p className="text-sm text-gray-600 group-hover:text-gray-400 dark:text-gray-400 group-hover:dark:text-gray-200">{lenguaje.abreviacion}</p>
                </motion.article>
            ))}
        </motion.section>
    );
}
