import { motion } from "framer-motion";
import { useState } from "react";
import { FaBookOpen, FaChevronRight, FaUser } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useBooksStore } from "../store/libro";
import HeaderTypeFormatBook from "./Libros/HeaderTypeFormatBook";
import Error from "./Atomos/Error";
import LoadingBooks from "./Atomos/Loading";

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

type ViewMode = "list" | "grid";

export default function Libros() {
    const { books, isLoading, error, selectBook } = useBooksStore();
    const [viewMode, setViewMode] = useState<ViewMode>("list");

    const handleViewMode = (viewMode: ViewMode) => {
        setViewMode(viewMode);
    };

    if (isLoading) {
        return <LoadingBooks />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <section className="flex flex-col gap-6">
            {/* Header */}
            <HeaderTypeFormatBook viewMode={viewMode} handleViewMode={handleViewMode} />

            {/* =======================
               GRID VIEW
            ======================= */}
            {viewMode === "grid" && (
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
                >
                    {books.map((book) => {
                        const info = book.volumeInfo;

                        return (
                            <motion.article
                                key={book.id}
                                variants={itemVariants}
                                whileHover={{ y: -6 }}
                                onClick={() => selectBook(book)}
                                className="group cursor-pointer  rounded-2xl bg-background shadow-sm hover:shadow-lg flex justify-between flex-col"
                            >
                                <div className="relative h-56 bg-gray-100">
                                    {info.imageLinks?.thumbnail ? (
                                        <motion.img
                                            src={info.imageLinks.thumbnail}
                                            alt={info.title}
                                            className="h-full w-full object-contain"
                                            whileHover={{ scale: 1.1, y: -10 }}
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400">
                                            <FaBookOpen size={40} />
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 flex flex-col gap-2 h-full">
                                    <h3 className="line-clamp-1 font-semibold flex-1 ">{info.title}</h3>

                                    {info.authors && (
                                        <p className="mt-2 flex items-center gap-2 text-sm text-secondary ">
                                            <FaUser className="text-primary" />
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
                                className="group flex cursor-pointer gap-5 rounded-2xl bg-surface  p-4 shadow-sm hover:shadow-md"
                            >
                                {/* Imagen */}
                                <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                    {info.imageLinks?.thumbnail ? (
                                        <img src={info.imageLinks.thumbnail} alt={info.title} className="h-full w-full object-contain rounded-lg" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400">
                                            <FaBookOpen />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex flex-1 flex-col justify-between py-1">
                                    <div>

                                        <h3 className="text-lg font-semibold">{info.title}</h3>

                                        {info.authors && (
                                            <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                                <FaUser className="text-primary" />
                                                {info.authors.join(", ")}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-primary-soft">
                                        {info.publishedDate && <span className="flex items-center gap-1"><IoCalendarNumberOutline className="text-primary/70" /> {info.publishedDate}</span>}
                                        {info.pageCount && <span className="flex items-center gap-1"><FaBookOpen className="text-primary/70" /> {info.pageCount} páginas</span>}
                                        {info.language && <span className="flex items-center gap-1"><GrLanguage className="text-primary/70" /> {info.language.toUpperCase()}</span>}
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
