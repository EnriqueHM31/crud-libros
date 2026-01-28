import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

export default function LoadingBooks() {
    return (
        <div className=" flex h-full w-full flex-col items-center justify-center gap-6 bg-white dark:bg-primary-dark">
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
                    className="bg-primary dark:bg-white shadow-primary dark:shadow-white  h-24 w-16 origin-right rounded-l-md shadow-lg"
                />

                {/* Centro (lomo) */}
                <div className="bg-surface dark:bg-primary-dark border-secondary/80 dark:border-gray-400 z-10 -mx-1 flex h-24 w-6 items-center justify-center border px-1">
                    <FaBookOpen className="text-secondary/80 dark:text-white text-xl" />
                </div>

                {/* Portada derecha */}
                <motion.div
                    animate={{ rotateY: [0, 50, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="bg-primary dark:bg-white shadow-primary dark:shadow-white h-24 w-16 origin-left rounded-r-md shadow-lg"
                />
            </motion.div>

            {/* Texto */}
            <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-sm font-medium tracking-wide text-black dark:text-white">
                Cargando libros…
            </motion.p>
        </div>
    );
}
