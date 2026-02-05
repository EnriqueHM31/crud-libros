import { FaSearch, FaRedo, FaBook, FaUser, FaLanguage, FaFileAlt } from "react-icons/fa";
import { useBooksFiltersStore } from "@/store/filtrosBooks.store";
import { motion } from "framer-motion";
import { useFilterCategories } from "@/hooks/useFilterCategories";
import type { Categoria } from "@/types/categoria";

export default function BooksFilters() {
    const { search, category, author, language, maxPages, setSearch, setCategory, setAuthor, setLanguage, setMaxPages, resetFilters } = useBooksFiltersStore();
    const { categorias } = useFilterCategories();

    return (
        <section className="rounded-2xl border border-white py-3 dark:border-0 dark:border-gray-500">
            <div className="space-y-4">
                {/* Search destacado */}
                <div className="group relative flex items-center justify-between gap-6 pb-3">
                    <div className="group relative flex-1">
                        <FaSearch className="text-gray-500 group-hover:text-primary group-hover:text-primary absolute top-1/2 left-4 -translate-y-1/2 transition-colors dark:text-gray-600 dark:group-hover:text-gray-400" />
                        <input
                            type="text"
                            name="search"
                            placeholder="Buscar por título o descripción..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="dark:bg-primary-dark w-full rounded-xl border-2 border-gray-300 bg-white px-12 py-2.5 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:ring-gray-600 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:ring-gray-400"
                        />
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
                            className="bg-primary text-white flex w-fit cursor-pointer items-center justify-center gap-3 rounded-xl px-4 py-2.5 font-semibold transition-colors duration-150 dark:bg-blue-600 hover:bg-blue-800"
                        >
                            <FaRedo className="transition-transform duration-300 group-hover:rotate-180" />
                            <span className="hidden md:block">Limpiar filtros</span>
                        </motion.button>
                    </div>
                </div>

                {/* Grid de filtros con iconos */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Categoría */}
                    <div className="group relative">
                        <FaBook className="text-gray-500 group-hover:text-primary absolute top-1/2 left-4 -translate-y-1/2 transition-colors dark:text-gray-600 dark:group-hover:text-gray-400" />
                        <select
                            value={category}
                            name="category"
                            onChange={(e) => setCategory(e.target.value)}
                            className="dark:bg-primary-dark w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-300 bg-white py-3 pr-4 pl-10 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:ring-gray-600 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:ring-gray-400"
                        >
                            <option value="">Todas las categorías</option>{" "}
                            {
                                categorias.map((category: Categoria) => (
                                    <option key={category.id} value={category.id}>{category.nombre}</option>
                                ))
                            }
                        </select>
                        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                            <svg
                                className="text-gray-500 group-hover:text-primary h-4 w-4 group-hover:text-gray-600 dark:text-gray-600"
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
                        <FaUser className="text-gray-500 group-hover:text-primary group-hover:text-primary absolute top-1/2 left-4 -translate-y-1/2 transition-colors dark:text-gray-600 dark:group-hover:text-gray-400" />
                        <input
                            type="text"
                            name="author"
                            placeholder="Autor"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="dark:bg-primary-dark w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-300 bg-white py-3 pr-4 pl-10 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:ring-gray-600 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:ring-gray-400"
                        />
                    </div>

                    {/* Idioma */}
                    <div className="group relative">
                        <FaLanguage className="text-gray-500 group-hover:text-primary group-hover:text-primary absolute top-1/2 left-4 -translate-y-1/2 transition-colors dark:text-gray-600 dark:group-hover:text-gray-400" />
                        <select
                            value={language}
                            name="language"
                            onChange={(e) => setLanguage(e.target.value)}
                            className="dark:bg-primary-dark w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-300 bg-white py-3 pr-4 pl-10 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:ring-gray-600 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:ring-gray-400"
                        >
                            <option value="">Todos los idiomas</option>
                            <option value="es">🇪🇸 Español</option>
                            <option value="en">🇬🇧 Inglés</option>
                            <option value="fr">🇫🇷 Francés</option>
                            <option value="pt">🇵🇹 Portugués</option>
                        </select>
                        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                            <svg
                                className="text-gray-500 group-hover:text-primary h-4 w-4 group-hover:text-gray-600 dark:text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Máx páginas */}
                    <div className="group relative">
                        <FaFileAlt className="text-gray-500 group-hover:text-primary group-hover:text-primary absolute top-1/2 left-3 z-10 -translate-y-1/2 transition-colors dark:text-gray-600 dark:group-hover:text-gray-400" />
                        <input
                            type="number"
                            name="maxPages"
                            min={1}
                            placeholder="Máx páginas"
                            value={maxPages ?? ""}
                            onChange={(e) => setMaxPages(e.target.value ? Number(e.target.value) : null)}
                            className="dark:bg-primary-dark w-full appearance-none rounded-xl border-2 border-gray-300 bg-white py-3 pr-4 pl-10 text-sm text-black shadow-sm transition-all hover:shadow-md focus:ring-1 focus:ring-gray-600 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:ring-gray-400"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
