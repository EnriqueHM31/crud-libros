import { useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaUser, FaChevronRight, FaThLarge, FaList } from "react-icons/fa";
import { useBooksStore } from "../store/libro";

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

export default function Libros() {
    const { books, isLoading, error, selectBook } = useBooksStore();
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    if (isLoading) {
        return <div className="flex h-full items-center justify-center">Cargando libros…</div>;
    }

    if (error) {
        return <div className="rounded-xl bg-red-500/10 p-6 text-red-500">{error}</div>;
    }

    return (
        <section className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Libros</h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode("list")}
                        className={`rounded-lg p-2 ${viewMode === "list" ? "bg-primary-soft text-primary" : "text-gray-400 hover:bg-gray-100"}`}
                    >
                        <FaList />
                    </button>

                    <button
                        onClick={() => setViewMode("grid")}
                        className={`rounded-lg p-2 ${viewMode === "grid" ? "bg-primary-soft text-primary" : "text-gray-400 hover:bg-gray-100"}`}
                    >
                        <FaThLarge />
                    </button>
                </div>
            </div>

            {/* =======================
               GRID VIEW
            ======================= */}
            {viewMode === "grid" && (
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {books.map((book) => {
                        const info = book.volumeInfo;

                        return (
                            <motion.article
                                key={book.id}
                                variants={itemVariants}
                                whileHover={{ y: -6 }}
                                onClick={() => selectBook(book)}
                                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg"
                            >
                                <div className="relative h-56 bg-gray-100">
                                    {info.imageLinks?.thumbnail ? (
                                        <motion.img
                                            src={info.imageLinks.thumbnail}
                                            alt={info.title}
                                            className="h-full w-full object-cover"
                                            whileHover={{ scale: 1.05 }}
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400">
                                            <FaBookOpen size={40} />
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="line-clamp-2 font-semibold">{info.title}</h3>

                                    {info.authors && (
                                        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                            <FaUser />
                                            {info.authors.join(", ")}
                                        </p>
                                    )}
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.section>
            )}

            {/* =======================
               LIST VIEW
            ======================= */}
            {viewMode === "list" && (
                <motion.section variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-4">
                    {books.map((book) => {
                        const info = book.volumeInfo;

                        return (
                            <motion.article
                                key={book.id}
                                variants={itemVariants}
                                whileHover={{ x: 6 }}
                                onClick={() => selectBook(book)}
                                className="group flex cursor-pointer gap-5 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md"
                            >
                                {/* Imagen */}
                                <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                    {info.imageLinks?.thumbnail ? (
                                        <img src={info.imageLinks.thumbnail} alt={info.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400">
                                            <FaBookOpen />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex flex-1 flex-col">
                                    <h3 className="text-lg font-semibold">{info.title}</h3>

                                    {info.authors && (
                                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                            <FaUser />
                                            {info.authors.join(", ")}
                                        </p>
                                    )}

                                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
                                        {info.publishedDate && <span>📅 {info.publishedDate}</span>}
                                        {info.pageCount && <span>📄 {info.pageCount} páginas</span>}
                                        {info.language && <span>🌐 {info.language.toUpperCase()}</span>}
                                    </div>
                                </div>

                                {/* Arrow */}
                                <FaChevronRight className="self-center text-gray-400 transition-transform group-hover:translate-x-1" />
                            </motion.article>
                        );
                    })}
                </motion.section>
            )}
        </section>
    );
}
