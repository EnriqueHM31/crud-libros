import { motion } from "framer-motion";
import { FaBookOpen, FaUser } from "react-icons/fa";
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

export default function MosaicoBooks() {
    const { books, selectBook } = useBooksStore();
    return (
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
                        className="group bg-background flex cursor-pointer flex-col justify-between rounded-2xl from-primary from-10% to-white to-100% shadow-sm hover:bg-primary hover:shadow-lg hover:text-background"
                    >
                        <div className="relative h-56">
                            {info.imageLinks?.thumbnail ? (
                                <motion.img
                                    src={info.imageLinks.thumbnail}
                                    alt={info.title}
                                    className="h-full w-full object-contain mx-auto group-hover:scale-115 duration-400 transition-all group-hover:-translate-y-4"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-400">
                                    <FaBookOpen size={40} />
                                </div>
                            )}
                        </div>

                        <div className="flex h-full flex-col gap-2 p-4">
                            <h3 className="line-clamp-1 flex-1 font-semibold">{info.title}</h3>

                            {info.authors && (
                                <p className="text-secondary group-hover:text-background mt-2 flex items-center gap-2 text-sm">
                                    <FaUser className="text-primary group-hover:text-background" />
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
