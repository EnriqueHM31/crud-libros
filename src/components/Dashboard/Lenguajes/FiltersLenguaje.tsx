import { useFilterLenguajes } from "@/hooks/useFilterLenguaje";
import { motion } from "framer-motion";
import { FaRedo, FaSearch } from "react-icons/fa";

export default function FiltersLenguajes() {
    const { searchLenguaje, handleChange, handleReset } = useFilterLenguajes();

    return (
        <section className="rounded-2xl border border-white py-3 dark:border-0 dark:border-gray-500">
            <div className="space-y-4">
                {/* Search destacado */}
                <div className="group relative flex items-center justify-between gap-6 pb-3">
                    <div className="group relative flex-5">
                        <FaSearch className="text-text-secondary/80 group-hover:text-primary absolute top-1/2 left-4 -translate-y-1/2 transition-colors dark:text-gray-600 dark:group-hover:text-gray-400" />
                        <input
                            type="text"
                            name="search"
                            placeholder="Buscar por el nombre del lenguaje..."
                            value={searchLenguaje}
                            onChange={handleChange}
                            className="dark:bg-primary-dark w-full rounded-xl border-2 border-gray-300 bg-white px-12 py-2.5 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:ring-gray-600 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:ring-gray-400"
                        />
                    </div>

                    {/* Reset mejorado */}
                    <div className="flex justify-end">
                        <motion.button
                            onClick={handleReset}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.2, delay: 1.6 }}
                            className="bg-primary flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl px-4 py-2.5 font-semibold text-white transition-colors duration-150 hover:bg-blue-800 dark:bg-blue-600"
                        >
                            <FaRedo className="transition-transform duration-300 group-hover:rotate-180" />
                            <span className="hidden md:block">Limpiar filtros</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
