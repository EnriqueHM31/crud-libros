import { motion } from "framer-motion";
export default function Error({ error, title }: { error: string; title: string }) {
    return (
        <section className="flex flex-col items-center justify-center gap-1 px-4">
            {/* SVG Animado */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative">
                <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                    {/* Círculo de fondo */}
                    <motion.circle
                        cx="100"
                        cy="100"
                        r="90"
                        className="dark:fill-primary-dark fill-red-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    {/* Libro cerrado */}
                    <motion.g initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.3 }}>
                        {/* Portada del libro */}
                        <rect x="60" y="70" width="80" height="90" rx="4" fill="#F28B79" />
                        <rect x="60" y="70" width="40" height="90" rx="4" fill="#F54A27" />
                        {/* Detalles del libro */}
                        <rect x="70" y="85" width="20" height="3" rx="1.5" fill="#fff" opacity="0.6" />
                        <rect x="70" y="95" width="15" height="3" rx="1.5" fill="#fff" opacity="0.6" />
                        <rect x="70" y="105" width="18" height="3" rx="1.5" fill="#fff" opacity="0.6" />
                    </motion.g>

                    {/* Lupa animada */}
                    <motion.g initial={{ x: -20, y: -20, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.3 }}>
                        {/* Círculo de la lupa */}
                        <motion.circle
                            cx="130"
                            cy="60"
                            r="20"
                            className="stroke-red-500 dark:stroke-red-500"
                            strokeWidth="4"
                            fill="none"
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Mango de la lupa */}
                        <motion.line x1="145" y1="72" x2="160" y2="87" className="stroke-red-500 dark:stroke-red-500" strokeWidth="4" strokeLinecap="round" />
                    </motion.g>

                    {/* Signo de interrogación */}
                    <motion.g initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.8, duration: 0.6, type: "spring" }}>
                        <circle cx="125" cy="135" r="18" fill="#FBBF24" />
                        <text x="125" y="145" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">
                            ?
                        </text>
                    </motion.g>

                    {/* Partículas flotantes */}
                    {[...Array(3)].map((_, i) => (
                        <motion.circle
                            key={i}
                            cx={50 + i * 50}
                            cy={40}
                            r="3"
                            className="fill-primary/80 dark:fill-white"
                            initial={{ y: 0, opacity: 0 }}
                            animate={{
                                y: [-10, -25, -10],
                                opacity: [0, 0.6, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </svg>
            </motion.div>

            {/* Texto animado */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="max-w-md space-y-2 text-center"
            >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
                <p className="text-base text-gray-600 dark:text-gray-400">{error ?? "No hay resultados para mostrar"}</p>
            </motion.div>
        </section>
    );
}
