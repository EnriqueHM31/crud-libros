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
    );
}