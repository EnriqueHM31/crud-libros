
import type { GoogleBook } from "@/types/libro";
import { motion } from "framer-motion";
import { FiBookOpen, FiUser, FiGlobe, FiLayers } from "react-icons/fi";

export default function LibroCard({ book }: { book: GoogleBook }) {
    const v = book.volumeInfo;

    return (
        <motion.article
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.35 }}
            className="group relative w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg flex flex-col"
        >
            {/* IMAGE */}
            <div className="relative h-60 overflow-hidden">
                <motion.img
                    src={v.imageLinks?.thumbnail || "/no-image.jpg"}
                    alt={v.title}
                    className="w-full h-full object-contain"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                />

                {/* overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                {/* category badge */}
                {v.categories?.[0] && (
                    <div className="absolute top-3 left-3 bg-white/10 backdrop-blur px-3 py-1 text-xs rounded-full border border-white/20">
                        {v.categories[0]}
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3 flex-1">

                {/* title */}
                <h2 className="text-lg font-semibold text-white line-clamp-2">
                    {v.title}
                </h2>

                {/* subtitle */}
                {v.subtitle && (
                    <p className="text-xs text-zinc-400 line-clamp-1">
                        {v.subtitle}
                    </p>
                )}

                {/* meta */}
                <div className="flex flex-wrap gap-4 text-xs text-zinc-400 mt-3">

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

                {/* description */}
                <p className="text-sm text-zinc-400 line-clamp-3 pt-2">
                    {v.description || "Sin descripción disponible."}
                </p>

                {/* actions */}
                <div className="pt-4 flex gap-3">
                    <motion.a
                        href={`/libros/${book.id}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.75, transition: { duration: 0.3 } }}
                        className="flex-1 bg-white text-black text-center text-sm py-2 rounded-lg font-medium hover:bg-zinc-200 cursor-pointer"
                    >
                        Ver detalle
                    </motion.a>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.75, transition: { duration: 0.3 } }}
                        className="px-3 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-900 cursor-pointer"
                    >
                        ❤
                    </motion.button>
                </div>

            </div>

            {/* hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none">
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </div>
        </motion.article>
    );
}
