import { motion } from "framer-motion";
import { FaBookOpen, FaUser, FaChevronRight } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useBooksStore } from "../../store/libro";

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

export default function ListBooks() {
    const { books, selectBook } = useBooksStore();
    return (
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-4">
            {books.map((book) => {
                const info = book.volumeInfo;

                return (
                    <motion.article
                        key={book.id}
                        variants={itemVariants}
                        whileHover={{ x: 6 }}
                        onClick={() => selectBook(book)}
                        className="group flex cursor-pointer gap-5 rounded-2xl bg-surface  p-4 shadow-sm hover:shadow-md hover:bg-primary text-background"
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
                                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-500 group-hover:text-background">
                                        <FaUser className="text-primary group-hover:text-background " />
                                        {info.authors.join(", ")}
                                    </p>
                                )}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-4 text-sm text-primary-soft group-hover:text-background">
                                {info.publishedDate && <span className="flex items-center gap-1"><IoCalendarNumberOutline className="text-primary/70 group-hover:text-background" /> {info.publishedDate}</span>}
                                {info.pageCount && <span className="flex items-center gap-1"><FaBookOpen className="text-primary/70 group-hover:text-background" /> {info.pageCount} páginas</span>}
                                {info.language && <span className="flex items-center gap-1"><GrLanguage className="text-primary/70 group-hover:text-background" /> {info.language.toUpperCase()}</span>}
                            </div>
                        </div>

                        {/* Arrow */}
                        <FaChevronRight className="self-center text-gray-400 transition-transform group-hover:translate-x-1" />
                    </motion.article>
                );
            })}
        </motion.section>
    );
}