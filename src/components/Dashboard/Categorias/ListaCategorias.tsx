import { FaEdit, FaTrash } from "react-icons/fa";
import { useCategoriasStore } from "@/store/categorias";
import { useFilterCategories } from "@/hooks/useFilterCategories";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.35 },
    },
};
export default function ListaCategorias() {
    const { openEditModal, submitDelete } = useCategoriasStore();
    const { categorias } = useFilterCategories();

    if (!categorias || categorias.length === 0) return null;

    return (
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categorias.map((categoria) => (
                <motion.article
                    key={categoria.id}
                    variants={itemVariants}
                    whileHover={{ x: 6 }}
                    className="group dark:bg-primary-dark hover:bg-primary relative rounded-2xl border bg-white p-5 shadow-sm transition hover:text-white hover:shadow-md dark:border-white/10 hover:dark:bg-blue-600"
                >
                    {/* ICONOS */}
                    <div className="absolute top-3 right-3 flex gap-2">
                        <button
                            onClick={() => {
                                openEditModal(categoria);
                            }}
                            className="bg-primary group-hover:text-primary cursor-pointer rounded-lg p-2 text-white group-hover:bg-white dark:bg-blue-600"
                            title="Editar categoría"
                        >
                            <FaEdit size={14} />
                        </button>

                        <button
                            onClick={() => submitDelete(categoria.id)}
                            className="bg-primary group-hover:text-primary cursor-pointer rounded-lg p-2 text-white group-hover:bg-white dark:bg-blue-600"
                            title="Eliminar categoría"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>

                    {/* CONTENIDO */}
                    <h3 className="mb-2 text-2xl font-semibold text-gray-800 group-hover:text-white dark:text-white">{categoria.nombre}</h3>

                    <p className="text-sm text-gray-600 group-hover:text-gray-400 dark:text-gray-400 group-hover:dark:text-gray-200">
                        {categoria.descripcion || "Sin descripción"}
                    </p>
                </motion.article>
            ))}
        </motion.section>
    );
}
