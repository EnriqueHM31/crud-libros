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
            className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-lg"
        >
            {/* IMAGE */}
            <div className="relative h-60 overflow-hidden">
                <motion.img
                    src={v.imageLinks?.thumbnail || "/no-image.jpg"}
                    alt={v.title}
                    className="h-full w-full object-contain"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                />

                {/* overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                {/* category badge */}
                {v.categories?.[0] && (
                    <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
                        {v.categories[0]}
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="flex-1  p-5  flex flex-col justify-between">
                {/* title */}
                <h2 className="line-clamp-2 text-lg font-semibold text-white">{v.title}</h2>

                {/* subtitle */}
                {v.subtitle && <p className="line-clamp-1 text-xs text-zinc-400">{v.subtitle}</p>}

                {/* meta */}
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


                <p className="mt-3 line-clamp-2 text-sm text-white/80">{v.description}</p>


                {/* actions */}
                <div className="flex gap-3 pt-4">
                    <motion.a
                        href={`/libros/${book.id}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.75, transition: { duration: 0.3 } }}
                        className="flex-1 cursor-pointer rounded-lg bg-white py-2 text-center text-sm font-medium text-black hover:bg-zinc-200"
                    >
                        Ver detalle
                    </motion.a>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.75, transition: { duration: 0.3 } }}
                        className="cursor-pointer rounded-lg border border-zinc-700 px-3 py-2 hover:bg-zinc-900"
                    >
                        ❤
                    </motion.button>
                </div>
            </div>

            {/* hover glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </div>
        </motion.article>
    );
}
