import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiEdit, FiTrash } from "react-icons/fi";
import type { GoogleBook } from "@/types/libro";
import { useBooksStore } from "@/store/libro";

interface BookModalProps {
    book: GoogleBook | null;
}

export function BookModal({ book }: BookModalProps) {
    const { closeBookModal, isModalOpen, openEditBook, deleteBook } = useBooksStore();

    if (!book) return null;

    const { title, subtitle, authors, description, publishedDate, pageCount, language, imageLinks } = book.volumeInfo;

    return (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* MODAL */}
                    <motion.div
                        className="dark:bg-primary-dark relative flex h-full max-h-[90dvh] w-full max-w-10/12 flex-col justify-between overflow-y-auto rounded-2xl border border-gray-700 bg-white px-4 py-3 shadow-xl md:static md:max-w-3xl md:flex-row md:p-8"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* CERRAR */}
                        <button
                            onClick={closeBookModal}
                            className="text-muted hover:bg-muted/20 absolute top-4 right-4 cursor-pointer rounded-lg p-2 text-black dark:text-white"
                        >
                            <FiX size={20} />
                        </button>

                        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
                            {/* IMAGEN */}
                            <div className="flex justify-center py-5">
                                {imageLinks?.thumbnail ? (
                                    <img src={imageLinks.thumbnail} alt={title} className="h-40 rounded-xl object-cover shadow-md md:h-64" />
                                ) : (
                                    <div className="bg-muted text-muted-foreground flex h-64 w-40 items-center justify-center rounded-xl text-sm">
                                        Sin imagen
                                    </div>
                                )}
                            </div>

                            {/* INFO */}
                            <div className="space-y-3">
                                <h2 className="text-2xl font-bold text-black dark:text-white">{title}</h2>

                                {subtitle && <p className="text-muted-foreground text-black dark:text-white">{subtitle}</p>}

                                {authors && (
                                    <p className="text-sm text-black dark:text-gray-400">
                                        <span className="font-medium">Autores:</span> {authors.join(", ")}
                                    </p>
                                )}

                                <div className="text-muted-foreground flex flex-wrap gap-4 text-sm text-black dark:text-gray-400">
                                    {publishedDate && <span>📅 {publishedDate}</span>}
                                    {pageCount && <span>📖 {pageCount} páginas</span>}
                                    {language && <span>🌍 {language.toUpperCase()}</span>}
                                </div>

                                {description ? (
                                    <p className="line-clamp-5 text-sm leading-relaxed text-black dark:text-white">{description}</p>
                                ) : (
                                    <p className="line-clamp-5 text-sm leading-relaxed text-black dark:text-white">Sin descripción</p>
                                )}
                            </div>
                        </div>

                        {/* ACCIONES */}
                        <div className="mt-9 flex justify-end gap-3 md:mt-6">
                            <button
                                onClick={() => openEditBook(book)}
                                className="bg-primary flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-white transition hover:bg-gray-700 hover:text-white dark:bg-blue-600 dark:hover:bg-blue-800"
                            >
                                <FiEdit />
                                Editar
                            </button>

                            <button
                                onClick={() => deleteBook}
                                className="bg-destructive text-destructive-foreground flex cursor-pointer items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-400 hover:opacity-90"
                            >
                                <FiTrash />
                                Eliminar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
