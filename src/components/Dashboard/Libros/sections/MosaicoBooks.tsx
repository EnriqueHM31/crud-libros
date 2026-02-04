import { containerVariantsEntrada, itemVariantsEntrada } from "@/constants/animaciones";
import { useFiltersBooks } from "@/hooks/useFiltersBooks";
import { useBooksStore } from "@/store/libro.store";
import { motion } from "framer-motion";
import { FaBookOpen, FaUser } from "react-icons/fa";

export default function MosaicoBooks() {
    const { books } = useFiltersBooks();
    const { openBookModal } = useBooksStore();
    return (
        <motion.section
            variants={containerVariantsEntrada}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-5 md:gap-10 lg:grid-cols-3 xl:grid-cols-4"
        >
            {books.map((book) => {
                const info = book.volumeInfo;

                return (
                    <motion.article
                        key={book.id}
                        onClick={() => openBookModal(book)}
                        variants={itemVariantsEntrada}
                        whileHover={{ y: -6 }}
                        className="group bg-background dark:bg-primary-dark from-primary hover:bg-primary hover:text-background flex cursor-pointer flex-col justify-between rounded-2xl from-10% to-white to-100% shadow-sm hover:shadow-lg dark:hover:bg-blue-600"
                    >
                        <div className="relative h-56">
                            {info.imageLinks?.thumbnail ? (
                                <motion.img
                                    src={info.imageLinks.thumbnail}
                                    alt={info.title}
                                    className="mx-auto h-full w-full object-contain transition-all duration-400 group-hover:-translate-y-2 group-hover:scale-115"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-300">
                                    <FaBookOpen size={40} />
                                </div>
                            )}
                        </div>

                        <div className="flex h-full flex-col gap-2 p-4">
                            <h3 className="text-primary-dark line-clamp-1 flex-1 font-semibold group-hover:text-white dark:text-white dark:group-hover:text-white">
                                {info.title}
                            </h3>

                            {info.authors && (
                                <p className="text-secondary mt-2 flex items-center gap-2 text-sm group-hover:text-gray-300 dark:text-gray-400">
                                    <FaUser className="text-primary group-hover:text-gray-300 dark:text-gray-400" />
                                    {info.authors.join(", ")}
                                </p>
                            )}
                        </div>
                    </motion.article>
                );
            })}
        </motion.section>
    );
}
