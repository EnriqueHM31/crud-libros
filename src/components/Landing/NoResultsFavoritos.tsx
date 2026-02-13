import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NoResultsFavoritos() {
    return (
        <div className="min-h-[80dvh] flex items-center justify-center ">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center max-w-lg"
            >
                {/* SVG animado */}
                <motion.svg
                    width="220"
                    height="220"
                    viewBox="0 0 200 200"
                    className="mx-auto mb-6"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: [0.9, 1.05, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
                >
                    <rect x="30" y="60" width="140" height="90" rx="8" fill="#e2e8f0" />
                    <rect x="45" y="75" width="110" height="60" rx="4" fill="#cbd5e1" />

                    {/* libros */}
                    <motion.rect
                        x="55"
                        y="80"
                        width="15"
                        height="50"
                        rx="2"
                        fill="#60a5fa"
                        animate={{ y: [80, 76, 80] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.rect
                        x="75"
                        y="80"
                        width="15"
                        height="50"
                        rx="2"
                        fill="#34d399"
                        animate={{ y: [80, 84, 80] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    />
                    <motion.rect
                        x="95"
                        y="80"
                        width="15"
                        height="50"
                        rx="2"
                        fill="#fbbf24"
                        animate={{ y: [80, 76, 80] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                    />
                    <motion.rect
                        x="115"
                        y="80"
                        width="15"
                        height="50"
                        rx="2"
                        fill="#f472b6"
                        animate={{ y: [80, 84, 80] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                    />
                </motion.svg>

                <motion.h2
                    className="text-2xl font-semibold dark:text-gray-200 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    No tienes favoritos aún
                </motion.h2>

                <motion.p
                    className="dark:text-gray-400 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Explora la librería y guarda tus libros favoritos para verlos aquí.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link to="/usuario/libros">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer rounded-xl bg-black px-4 py-2 text-xl text-white hover:bg-gray-500 hover:text-white dark:bg-white dark:text-black"
                        >
                            Ir a la librería
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
