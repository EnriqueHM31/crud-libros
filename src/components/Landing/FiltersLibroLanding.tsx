import { useCategoriasStore } from "@/store/categorias.store";
import { useBooksFiltersStore } from "@/store/filterLibros.store";
import { useLenguajesStore } from "@/store/lenguajes.store";
import type { Categoria } from "@/types/categoria";
import { motion } from "framer-motion";
import { FaBook, FaFileAlt, FaLanguage, FaRedo, FaSearch, FaUser } from "react-icons/fa";

export default function BooksFiltersLanding() {
    const { search, category, author, language, maxPages, setSearch, setCategory, setAuthor, setLanguage, setMaxPages, resetFilters } = useBooksFiltersStore();

    const { categorias } = useCategoriasStore();

    const { lenguajes } = useLenguajesStore();

    return (
        <section className="rounded-2xl border border-white py-3 dark:border-0 dark:border-gray-500">
            <div className="flex items-center justify-between gap-4">

                {/* Grid de filtros con iconos */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5 flex-1">
                    <div className="group relative flex-1">
                        <FaSearch className="group-hover:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors dark:text-white/30 dark:group-hover:text-white/80" />
                        <input
                            type="text"
                            name="search"
                            placeholder="Buscar por título o descripción..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="dark:bg-zinc-900 focus:ring-zinc-900 w-full rounded-xl border-2 border-gray-300 bg-white px-12 py-2.5 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:outline-none dark:border-zinc-700 dark:text-white dark:focus:ring-gray-400"
                        />
                    </div>


                    {/* Categoría */}
                    <div className="group relative">
                        <FaBook className="group-hover:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors dark:text-white/30 dark:group-hover:text-white/80" />
                        <select
                            value={category}
                            name="category"
                            onChange={(e) => setCategory(e.target.value)}
                            className="dark:bg-zinc-900 focus:ring-zinc-900 w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-300 bg-white py-3 pr-4 pl-10 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:outline-none dark:border-zinc-700 dark:text-white dark:focus:ring-gray-400"
                        >
                            <option value="">Todas las categorías</option>{" "}
                            {categorias.map((category: Categoria) => (
                                <option key={category.id} value={category.nombre}>
                                    {category.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                            <svg
                                className="h-4 w-4 text-gray-500 group-hover:text-zinc-600 dark:text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Autor */}
                    <div className="group relative">
                        <FaUser className="group-hover:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors dark:text-white/30 dark:group-hover:text-white/80" />
                        <input
                            type="text"
                            name="author"
                            placeholder="Autor"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="dark:bg-zinc-900 focus:ring-zinc-900 w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-300 bg-white py-3 pr-4 pl-10 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:outline-none dark:border-zinc-700 dark:text-white dark:focus:ring-gray-400"
                        />
                    </div>

                    {/* Idioma */}
                    <div className="group relative">

                        <div className="relative">
                            <FaLanguage className="group-hover:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors dark:text-white/30 dark:group-hover:text-white/80" />
                            <select
                                value={language}
                                name="language"
                                onChange={(e) => setLanguage(e.target.value)}
                                className="dark:bg-zinc-900 focus:ring-zinc-900 w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-300 bg-white py-3 pr-10 pl-10 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:outline-none dark:border-zinc-700 dark:text-white dark:focus:ring-gray-400"
                            >
                                <option value="">Todos los idiomas</option>
                                {lenguajes.map((lenguaje) => (
                                    <option key={lenguaje.id} value={lenguaje.abreviacion}>
                                        ({lenguaje.abreviacion}) : {lenguaje.nombre}
                                    </option>
                                ))}
                            </select>

                            {/* icono flecha */}
                            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                                <svg
                                    className="h-4 w-4 text-gray-500 dark:text-white/30"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                    </div>

                    {/* Máx páginas */}
                    <div className="group relative">
                        <FaFileAlt className="group-hover:text-primary absolute top-1/2 left-3 z-10 -translate-y-1/2 text-gray-500 transition-colors dark:text-white/30 dark:group-hover:text-white/80" />
                        <input
                            type="number"
                            name="maxPages"
                            min={1}
                            placeholder="Máx páginas"
                            value={maxPages ?? ""}
                            onChange={(e) => setMaxPages(e.target.value ? Number(e.target.value) : null)}
                            className="dark:bg-zinc-900 focus:ring-zinc-900 w-full appearance-none rounded-xl border-2 border-gray-300 bg-white py-3 pr-4 pl-10 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:outline-none dark:border-zinc-700 dark:text-white dark:focus:ring-gray-400"
                        />
                    </div>
                </div>
                {/* Reset mejorado */}
                <div className="flex items-center justify-end">
                    <motion.button
                        onClick={resetFilters}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.2, delay: 1.6 }}
                        className="bg-black flex w-fit cursor-pointer items-center justify-center gap-3 rounded-xl px-4 py-2.5 font-semibold text-white transition-colors duration-150 hover:bg-gray-500 dark:bg-white/90 dark:text-black dark:hover:text-white"
                    >
                        <FaRedo className="transition-transform duration-300 group-hover:rotate-180" />
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
