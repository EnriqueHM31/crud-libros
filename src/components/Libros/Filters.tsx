import { FaSearch, FaRedo, FaBook, FaUser, FaLanguage, FaFileAlt, FaFilter } from "react-icons/fa";
import { useBooksFiltersStore } from "../../store/filtros";
import { motion } from "framer-motion";

export default function BooksFilters() {
    const { search, category, author, language, maxPages, setSearch, setCategory, setAuthor, setLanguage, setMaxPages, resetFilters } = useBooksFiltersStore();

    return (
        <section className="border-background-secondary rounded-2xl border p-6 shadow-lg">
            {/* Header */}
            <div className="border-background-secondary flex items-center justify-between gap-3 border-b pb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-lg p-2.5">
                        <FaFilter className="text-lg text-white" />
                    </div>
                    <h2 className="text-secondary text-xl font-semibold">Filtrar libros</h2>
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
                        className="bg-primary text-background hover:bg-primary flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl px-4 py-2 font-semibold transition-colors duration-150"
                    >
                        <FaRedo className="transition-transform duration-300 group-hover:rotate-180" />
                        Limpiar filtros
                    </motion.button>
                </div>
            </div>

            <div className="space-y-4">
                {/* Search destacado */}
                <div className="group relative">
                    <FaSearch className="text-text-secondary/80 group-hover:text-primary absolute top-1/2 left-4 -translate-y-1/2 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar por título o descripción..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-12 py-3.5 text-sm shadow-sm transition-all hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                    />
                </div>

                {/* Grid de filtros con iconos */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Categoría */}
                    <div className="group relative">
                        <FaBook className="text-text-secondary/80 group-hover:text-primary pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 transition-colors" />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-200 bg-white py-3 pr-4 pl-10 text-sm shadow-sm transition-all hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                        >
                            <option value="">Todas las categorías</option>
                            <option value="computers">Computadoras</option>
                            <option value="ficcion">Ficción</option>
                            <option value="no-ficcion">No ficción</option>
                            <option value="ciencia">Ciencia</option>
                            <option value="tecnologia">Tecnología</option>
                            <option value="historia">Historia</option>
                            <option value="biografia">Biografía</option>
                            <option value="poesia">Poesía</option>
                            <option value="infantil">Infantil</option>
                        </select>
                        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Autor */}
                    <div className="group relative">
                        <FaUser className="text-text-secondary/80 group-hover:text-primary absolute top-1/2 left-3 z-10 -translate-y-1/2 transition-colors" />
                        <input
                            type="text"
                            placeholder="Autor"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pr-4 pl-10 text-sm shadow-sm transition-all hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                        />
                    </div>

                    {/* Idioma */}
                    <div className="group relative">
                        <FaLanguage className="text-text-secondary/80 group-hover:text-primary pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 transition-colors" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-200 bg-white py-3 pr-4 pl-10 text-sm shadow-sm transition-all hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                        >
                            <option value="">Todos los idiomas</option>
                            <option value="es">🇪🇸 Español</option>
                            <option value="en">🇬🇧 Inglés</option>
                            <option value="fr">🇫🇷 Francés</option>
                            <option value="pt">🇵🇹 Portugués</option>
                        </select>
                        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Máx páginas */}
                    <div className="group relative">
                        <FaFileAlt className="text-text-secondary/80 group-hover:text-primary absolute top-1/2 left-3 z-10 -translate-y-1/2 transition-colors" />
                        <input
                            type="number"
                            min={1}
                            placeholder="Máx páginas"
                            value={maxPages ?? ""}
                            onChange={(e) => setMaxPages(e.target.value ? Number(e.target.value) : null)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pr-4 pl-10 text-sm shadow-sm transition-all hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
