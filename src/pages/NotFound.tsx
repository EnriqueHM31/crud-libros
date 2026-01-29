import { motion } from "framer-motion";
import { FaBookDead, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-primary-soft px-6 dark:bg-primary-dark">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex max-w-2xl flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/80 p-10 text-center shadow-xl backdrop-blur-md dark:bg-black/30"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex size-30 animate-bounce items-center justify-center rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                >
                    <FaBookDead size={60} />
                </motion.div>

                {/* 404 */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-9xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                >
                    404
                </motion.h1>

                {/* Texto */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl text-gray-600 dark:text-gray-400"
                >
                    El libro que buscas no existe o fue movido a otra estantería.
                </motion.p>

                {/* Botón */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xl font-semibold text-white shadow-md transition hover:bg-blue-700"
                    >
                        <FaArrowLeft />
                        Volver al inicio
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
