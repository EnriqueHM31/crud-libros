import { FaSearch, FaRedo } from "react-icons/fa";
import { useBooksFiltersStore } from "../../store/filtros";

export default function BooksFilters() {
    const {
        search,
        category,
        author,
        language,
        maxPages,
        setSearch,
        setCategory,
        setAuthor,
        setLanguage,
        setMaxPages,
        resetFilters,
    } = useBooksFiltersStore();

    return (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                {/* Search */}
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar libro…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-soft"
                    />
                </div>

                {/* Categoría */}
                <input
                    type="text"
                    placeholder="Categoría"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                />

                {/* Autor */}
                <input
                    type="text"
                    placeholder="Autor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                />

                {/* Idioma */}
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                >
                    <option value="">Idioma</option>
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <option value="fr">Francés</option>
                    <option value="pt">Portugués</option>
                </select>

                {/* Máx páginas */}
                <input
                    type="number"
                    min={1}
                    placeholder="Máx páginas"
                    value={maxPages ?? ""}
                    onChange={(e) =>
                        setMaxPages(
                            e.target.value
                                ? Number(e.target.value)
                                : null
                        )
                    }
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                />
            </div>

            {/* Reset */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
                >
                    <FaRedo />
                    Limpiar filtros
                </button>
            </div>
        </section>
    );
}
