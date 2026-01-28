import HeaderSection from "../Atomos/Header";
import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";

export default function HeaderLibro() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex-5">
                <HeaderSection title="Administracion de libros" description="Gestiona los libros disponibles de la aplicación." />
            </div>

            <div className="flex-1">
                <motion.button
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.2, delay: 1.6 }}
                    className="bg-primary text-background hover:bg-primary flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl px-4 py-2.5 font-semibold transition-colors duration-150"
                >
                    <FaBook className="transition-transform duration-300 group-hover:rotate-180" />
                    Crear libro
                </motion.button>
            </div>
        </div>
    );
}
