import { useCategoriasStore } from "@/store/categorias.store";
import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";
import HeaderSection from "../Atomos/Header";

export default function HeaderCategorias() {
    const { openCreateModal } = useCategoriasStore();
    return (
        <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="md:flex-1 flex flex-5 items-center justify-center md:items-start md:justify-start">
                <HeaderSection title="Administracion de las categorias" description="Gestiona las categorias disponibles de la aplicación." />
            </div>

            <div className="flex-1 w-fit flex items-center justify-end">
                <motion.button
                    onClick={openCreateModal}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.2, delay: 1.6 }}
                    className="bg-primary text-background hover:bg-primary mt-5 flex w-fit cursor-pointer items-center justify-center gap-3 rounded-xl px-4 py-2 font-semibold transition-colors duration-150 md:mt-0 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-800"
                >
                    <FaBook className="transition-transform duration-300 group-hover:rotate-180" />
                    Crear categoria
                </motion.button>
            </div>
        </div>
    );
}
