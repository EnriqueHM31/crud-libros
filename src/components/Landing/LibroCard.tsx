import { useFavoritosStore } from "@/store/favoritosLibros.store";
import type { GoogleBook } from "@/types/libro";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FiBookOpen, FiUser, FiGlobe, FiLayers } from "react-icons/fi";

export default function LibroCard({ book }: { book: GoogleBook }) {
    const { agregarFavorito, quitarFavorito, esFavorito } = useFavoritosStore();

    const v = book.volumeInfo;
    const favorito = esFavorito(book.id);

    // motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [12, -12]);
    const rotateY = useTransform(x, [-100, 100], [-12, 12]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = width / 2;
        const centerY = height / 2;

        x.set(mouseX - centerX);
        y.set(mouseY - centerY);
    }

    function reset() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            style={{ perspective: 1000 }}
            className="w-full transition h-[600px] "
        >
            <motion.article
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-2xl h-full"
            >
                {/* IMAGE */}
                <motion.div
                    style={{ transform: "translateZ(60px)" }}
                    className="relative h-80 overflow-hidden"
                >
                    <motion.img
                        src={v.imageLinks?.thumbnail || "/no-image.jpg"}
                        alt={v.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                    {v.categories?.[0] && (
                        <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black px-3 py-1 text-xs text-white backdrop-blur">
                            {v.categories[0]}
                        </div>
                    )}
                </motion.div>

                {/* CONTENT */}
                <div
                    style={{ transform: "translateZ(40px)" }}
                    className="flex flex-1 flex-col justify-between p-5 "
                >
                    <h2 className="line-clamp-2 text-lg font-semibold text-white flex-1 flex items-center justify-center text-center">
                        {v.title}
                    </h2>

                    <div className="flex-2">

                        {v.subtitle && (
                            <p className="line-clamp-1 text-xs text-zinc-400">
                                {v.subtitle}
                            </p>
                        )}

                        <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
                            <div className="flex items-center gap-1">
                                <FiUser size={14} />
                                {v.authors?.[0] ?? "Autor desconocido"}
                            </div>

                            <div className="flex items-center gap-1">
                                <FiBookOpen size={14} />
                                {v.pageCount} pág.
                            </div>

                            <div className="flex items-center gap-1">
                                <FiGlobe size={14} />
                                {v.language?.toUpperCase()}
                            </div>

                            <div className="flex items-center gap-1">
                                <FiLayers size={14} />
                                {v.publishedDate?.slice(0, 4)}
                            </div>
                        </div>

                        <p className="mt-3 line-clamp-2 text-sm text-white/80">
                            {v.description}
                        </p>

                        {/* BUTTONS */}
                        <div
                            style={{ transform: "translateZ(80px)" }}
                            className="flex gap-3 pt-4"
                        >
                            <motion.a
                                href={`/libros/${book.id}`}
                                whileTap={{ scale: 0.9 }}
                                title={`Ver ${book.volumeInfo.title}`}
                                className="flex-1 rounded-lg bg-white hover:bg-gray-500 hover:text-white transition cursor-pointer py-2 text-center text-sm font-medium text-black"
                            >
                                Ver detalle
                            </motion.a>

                            <motion.button
                                onClick={() =>
                                    favorito
                                        ? quitarFavorito(book.id)
                                        : agregarFavorito(book)
                                }
                                title={`${favorito ? "Quitar de" : "Agregar a"} favoritos`}
                                whileTap={{ scale: 0.85 }}
                                className={`rounded-lg border px-3 cursor-pointer py-2 transition ${favorito ? "bg-red-700 hover:bg-red-400" : "bg-zinc-900 hover:bg-zinc-400"
                                    }`}
                            >
                                🤍
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* brillo */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </motion.article>
        </motion.div>
    );
}
