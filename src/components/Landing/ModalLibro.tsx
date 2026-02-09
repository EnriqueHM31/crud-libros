import { useFavoritosStore } from "@/store/favoritosLibros.store";
import type { GoogleBook } from "@/types/libro";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

interface Props {
    open: boolean;
    onClose: () => void;
    book: GoogleBook | null;
}

export default function ModalLibro({ open, onClose, book }: Props) {
    const { agregarFavorito, esFavorito, quitarFavorito } = useFavoritosStore();
    if (!book) return null;

    const fav = esFavorito(book.id);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg h-screen"
                >
                    {/* modal */}
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 18 }}
                        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-900 shadow-2xl"
                    >
                        {/* close */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 cursor-pointer text-zinc-400 hover:text-white"
                        >
                            <FiX size={22} />
                        </motion.button>

                        <div className="grid md:grid-cols-2 overflow-y-auto">
                            {/* LEFT IMAGE */}
                            <motion.div whileHover={{ scale: 1.02 }} className="relative flex items-center justify-center bg-neutral-950 p-8">
                                <motion.img
                                    src={book.volumeInfo.imageLinks?.thumbnail || "/no-image.jpg"}
                                    alt={book.volumeInfo.title}
                                    className="h-[200px] object-contain md:h-[360px] md:object-contain"
                                    whileHover={{ y: -6 }}
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                            </motion.div>

                            {/* RIGHT INFO */}
                            <div className="flex flex-col gap-4 p-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{book.volumeInfo.title}</h2>
                                    <p className="text-sm text-zinc-400">{book.volumeInfo.subtitle}</p>
                                </div>

                                <div className="space-y-1 text-sm text-zinc-400">
                                    <p>
                                        <b className="text-zinc-200">Autor:</b> {book.volumeInfo.authors?.join(", ")}
                                    </p>
                                    <p>
                                        <b className="text-zinc-200">Editorial:</b> {book.volumeInfo.publisher}
                                    </p>
                                    <p>
                                        <b className="text-zinc-200">Año:</b> {book.volumeInfo.publishedDate?.slice(0, 4)}
                                    </p>
                                    <p>
                                        <b className="text-zinc-200">Páginas:</b> {book.volumeInfo.pageCount}
                                    </p>
                                    <p>
                                        <b className="text-zinc-200">Idioma:</b> {book.volumeInfo.language?.toUpperCase()}
                                    </p>
                                    <p>
                                        <b className="text-zinc-200">Categorías:</b> {book.volumeInfo.categories?.join(", ")}
                                    </p>
                                </div>

                                <motion.div whileHover={{ scale: 1.01 }} className="mt-2 max-h-40 overflow-auto pr-2 text-sm text-white/80">
                                    {book.volumeInfo.description}
                                </motion.div>

                                {/* action */}
                                <motion.button
                                    onClick={() => (fav ? quitarFavorito(book.id) : agregarFavorito(book))}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.96 }}
                                    className={`k mt-4 cursor-pointer rounded-xl py-3 font-medium transition ${fav ? "bg-red-700 hover:bg-red-400" : "bg-zinc-300 text-black hover:bg-zinc-500 hover:text-white"
                                        }`}
                                >
                                    {fav ? "Quitar de favoritos" : "Añadir a favoritos"}
                                </motion.button>
                            </div>
                        </div>

                        {/* glow */}
                        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
