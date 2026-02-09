import { useLibroCard } from "@/hooks/LibroCard";
import { useFavoritosStore } from "@/store/favoritosLibros.store";
import type { GoogleBook } from "@/types/libro";
import { motion } from "framer-motion";

export default function LibroCard({ book, onClickModal }: { book: GoogleBook; onClickModal: (book: GoogleBook) => void }) {
    const { agregarFavorito, quitarFavorito, esFavorito } = useFavoritosStore();
    const { rotateX, rotateY, handleMouseMove, reset } = useLibroCard();

    const v = book.volumeInfo;
    const favorito = esFavorito(book.id);

    return (
        <motion.div onMouseMove={handleMouseMove} onMouseLeave={reset} style={{ perspective: 1000 }} className="h-[550px] w-full transition">
            <motion.article
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-2xl"
            >
                {/* IMAGE */}
                <motion.div style={{ transform: "translateZ(60px)" }} className="relative h-80 overflow-hidden">
                    <motion.img src={v.imageLinks?.thumbnail || "/no-image.jpg"} alt={v.title} className="h-full w-full object-contain object-top" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

                    {v.categories?.[0] && (
                        <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black px-3 py-1 text-xs text-white backdrop-blur">
                            {v.categories[0]}
                        </div>
                    )}
                </motion.div>

                {/* CONTENT */}
                <div style={{ transform: "translateZ(-1000px)" }} className="flex flex-1 flex-col justify-between p-5">
                    <div className="flex flex-1 flex-col">
                        <h2 className="line-clamp-2 flex flex-1 items-center justify-center text-center text-lg font-semibold text-white">{v.title}</h2>
                        <p className="mt-3 line-clamp-2 flex-1 text-sm text-gray-400">{v.description}</p>
                    </div>

                    {/* BUTTONS */}
                    <div style={{ transform: "translateZ(80px)" }} className="flex gap-3 pt-4">
                        <motion.button
                            onClick={() => onClickModal(book)}
                            whileTap={{ scale: 0.9 }}
                            title={`Ver ${book.volumeInfo.title}`}
                            className="flex-1 cursor-pointer rounded-lg bg-white py-2 text-center text-sm font-medium text-black transition hover:bg-gray-500 hover:text-white"
                        >
                            Ver detalle
                        </motion.button>

                        <motion.button
                            onClick={() => (favorito ? quitarFavorito(book.id) : agregarFavorito(book))}
                            title={`${favorito ? "Quitar de" : "Agregar a"} favoritos`}
                            whileTap={{ scale: 0.85 }}
                            className={`cursor-pointer rounded-lg border border-white px-3 py-2 transition dark:border-zinc-500 ${
                                favorito ? "bg-red-700 hover:bg-red-400" : "bg-zinc-900 hover:bg-zinc-400"
                            }`}
                        >
                            🤍
                        </motion.button>
                    </div>
                </div>

                {/* brillo */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </motion.article>
        </motion.div>
    );
}
