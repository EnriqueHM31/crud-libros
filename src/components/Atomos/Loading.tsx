import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

export default function LoadingBooks() {
    return (
        <div className="dark:bg-primary-dark flex h-full w-full flex-col items-center justify-center gap-6 bg-white">
            {/* Libro */}
            <motion.div
                animate={{
                    rotateY: [0, 20, -20, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                }}
                className="relative flex items-center justify-center"
            >
                {/* Portada izquierda */}
                <motion.div
                    animate={{ rotateY: [0, -50, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="bg-primary shadow-primary h-24 w-16 origin-right rounded-l-md shadow-lg dark:bg-white dark:shadow-white"
                />

                {/* Centro (lomo) */}
                <div className="bg-surface dark:bg-primary-dark border-secondary/80 z-10 -mx-1 flex h-24 w-6 items-center justify-center border px-1 dark:border-gray-400">
                    <FaBookOpen className="text-secondary/80 text-xl dark:text-white" />
                </div>

                {/* Portada derecha */}
                <motion.div
                    animate={{ rotateY: [0, 50, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="bg-primary shadow-primary h-24 w-16 origin-left rounded-r-md shadow-lg dark:bg-white dark:shadow-white"
                />
            </motion.div>

            {/* Texto */}
            <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-sm font-medium tracking-wide text-black dark:text-white"
            >
                Cargando libros…
            </motion.p>
        </div>
    );
}
