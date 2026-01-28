import { FaSearch, FaRedo, FaBook, FaUser, FaLanguage, FaFileAlt, FaFilter } from "react-icons/fa";
import { useBooksFiltersStore } from "../../store/filtros";
import { motion } from "framer-motion";

export default function BooksFilters() {
    const { search, category, author, language, maxPages, setSearch, setCategory, setAuthor, setLanguage, setMaxPages, resetFilters } = useBooksFiltersStore();

    return (
        <section className="rounded-2xl p-6 shadow-lg border border-background-secondary">
            {/* Header */}
            <div className="flex items-center justify-between gap-3  pb-4 border-b border-background-secondary">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2.5 rounded-lg">
                        <FaFilter className="text-white text-lg" />
                    </div>
                    <h2 className="text-xl font-semibold text-secondary">Filtrar libros</h2>
                </div>
                {/* Reset mejorado */}
                <div className="mt-6 flex justify-end">
                    <motion.button
                        onClick={resetFilters}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.2, delay: 1.6 }}
                        className="bg-primary text-background flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl py-2 font-semibold transition-colors duration-150 hover:bg-primary px-4"
                    >
                        <FaRedo className="group-hover:rotate-180 transition-transform duration-300" />
                        Limpiar filtros
                    </motion.button>
                </div>
            </div>

            <div className="space-y-4">
                {/* Search destacado */}
                <div className="relative group">
                    <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-text-secondary/80 group-hover:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar por título o descripción..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border-2 border-gray-200 px-12 py-3.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
                    />
                </div>

                {/* Grid de filtros con iconos */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Categoría */}
                    <div className="relative group">
                        <FaBook className="absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary/80 group-hover:text-primary transition-colors z-10 pointer-events-none" />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full appearance-none rounded-xl border-2 border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md cursor-pointer"
                        >
                            <option value="">Todas las categorías</option>
                            <option value="ficcion">Ficción</option>
                            <option value="no-ficcion">No ficción</option>
                            <option value="ciencia">Ciencia</option>
                            <option value="tecnologia">Tecnología</option>
                            <option value="historia">Historia</option>
                            <option value="biografia">Biografía</option>
                            <option value="poesia">Poesía</option>
                            <option value="infantil">Infantil</option>
                        </select>
                        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Autor */}
                    <div className="relative group">
                        <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary/80 group-hover:text-primary transition-colors z-10" />
                        <input
                            type="text"
                            placeholder="Autor"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
                        />
                    </div>

                    {/* Idioma */}
                    <div className="relative group">
                        <FaLanguage className="absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary/80 group-hover:text-primary transition-colors z-10 pointer-events-none" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full appearance-none rounded-xl border-2 border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md cursor-pointer"
                        >
                            <option value="">Todos los idiomas</option>
                            <option value="es">🇪🇸 Español</option>
                            <option value="en">🇬🇧 Inglés</option>
                            <option value="fr">🇫🇷 Francés</option>
                            <option value="pt">🇵🇹 Portugués</option>
                        </select>
                        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Máx páginas */}
                    <div className="relative group">
                        <FaFileAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary/80 group-hover:text-primary transition-colors z-10" />
                        <input
                            type="number"
                            min={1}
                            placeholder="Máx páginas"
                            value={maxPages ?? ""}
                            onChange={(e) => setMaxPages(e.target.value ? Number(e.target.value) : null)}
                            className="w-full rounded-xl border-2 border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
                        />
                    </div>
                </div>
            </div>

        </section>
    );
}