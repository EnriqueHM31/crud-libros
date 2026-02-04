import { containerVariantsEntrada, itemVariantsEntrada } from "@/constants/animaciones";
import { useFiltersBooks } from "@/hooks/useFiltersBooks";
import { useBooksStore } from "@/store/libro.store";
import type { GoogleBook } from "@/types/libro";
import { motion } from "framer-motion";
import { FaBookOpen, FaChevronRight, FaUser } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { IoCalendarNumberOutline } from "react-icons/io5";

export default function ListBooks() {
    const { books } = useFiltersBooks();
    const { openBookModal } = useBooksStore();

    return (
        <motion.section variants={containerVariantsEntrada} initial="hidden" animate="visible" className="flex flex-col gap-4">
            {books.map((book: GoogleBook) => {
                const info = book.volumeInfo;

                return (
                    <motion.article
                        key={book.id}
                        onClick={() => openBookModal(book)}
                        variants={itemVariantsEntrada}
                        whileHover={{ x: 6 }}
                        className="group bg-surface dark:bg-primary-dark/30 hover:bg-primary text-background flex cursor-pointer flex-col items-center justify-center gap-5 rounded-2xl border px-2 py-5 shadow-sm hover:shadow-md md:flex-row md:items-start md:justify-start md:px-8 md:py-4 dark:border-gray-700 dark:hover:bg-blue-600"
                    >
                        {/* Imagen */}
                        <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            {info.imageLinks?.thumbnail ? (
                                <img src={info.imageLinks.thumbnail} alt={info.title} className="h-full w-full rounded-lg object-contain" />
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-400">
                                    <FaBookOpen />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-1 flex-col justify-between py-1">
                            <div className="flex flex-col items-center justify-center md:items-start md:justify-start">
                                <h3 className="text-primary/80 group-hover:text-background text-center text-lg font-semibold md:text-start dark:text-white">
                                    {info.title}
                                </h3>

                                {info.authors && (
                                    <p className="group-hover:text-background mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <FaUser className="text-primary group-hover:text-background dark:text-blue-500" />
                                        {info.authors.join(", ")}
                                    </p>
                                )}
                            </div>

                            <div className="text-primary-soft group-hover:text-background mt-5 flex flex-wrap items-center justify-center gap-4 text-sm md:items-start md:justify-start dark:text-gray-400">
                                {info.publishedDate && (
                                    <span className="flex items-center gap-2">
                                        <IoCalendarNumberOutline className="text-primary/70 group-hover:text-background dark:text-blue-500" />{" "}
                                        {info.publishedDate}
                                    </span>
                                )}
                                {info.pageCount && (
                                    <span className="ms-2 flex items-center gap-2">
                                        <FaBookOpen className="text-primary/70 group-hover:text-background dark:text-blue-500" /> {info.pageCount} páginas
                                    </span>
                                )}
                                {info.language && (
                                    <span className="ms-2 flex items-center gap-2">
                                        <GrLanguage className="text-primary/70 group-hover:text-background dark:text-blue-500" /> {info.language.toUpperCase()}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Arrow */}
                        <FaChevronRight className="dark: hidden self-center text-gray-400 transition-transform group-hover:translate-x-1 md:block dark:hover:text-gray-200" />
                    </motion.article>
                );
            })}
        </motion.section>
    );
}
