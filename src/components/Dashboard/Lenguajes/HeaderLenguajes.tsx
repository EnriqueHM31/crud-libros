import { HiLanguage } from "react-icons/hi2";
import HeaderSection from "../Atomos/Header";
import { motion } from "framer-motion";
import { useLenguajesStore } from "@/store/lenguajes.store";

export default function HeaderLenguaje() {

    const { openCreateModal } = useLenguajesStore();
    return (
        <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex flex-5 items-center justify-center md:flex-1 md:items-start md:justify-start">
                <HeaderSection title="Administracion de los lenguajes " description="Gestiona los lenguajes disponibles para los libros" />
            </div>

            <div className="flex w-fit flex-1 items-center justify-end">
                <motion.button
                    onClick={openCreateModal}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.2, delay: 1.6 }}
                    className="bg-primary text-white mt-5 flex w-fit cursor-pointer items-center justify-center gap-3 rounded-xl px-4 py-2 font-semibold transition-colors duration-150 md:mt-0 md:py-2.5 dark:bg-blue-600 hover:bg-blue-800"
                >
                    <HiLanguage className="transition-transform duration-300 group-hover:rotate-180" />
                    Crear lenguaje
                </motion.button>
            </div>
        </div>
    );
}   