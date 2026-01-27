import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';

export default function LoadingBooks() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-text">
            {/* Libro */}
            <motion.div
                animate={{
                    rotateY: [0, 20, -20, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                }}
                className="relative flex items-center justify-center"
            >
                {/* Portada izquierda */}
                <motion.div
                    animate={{ rotateY: [0, -50, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="h-24 w-16 origin-right rounded-l-md bg-primary shadow-lg"
                />

                {/* Centro (lomo) */}
                <div className="z-10 -mx-1 flex h-24 w-6 items-center justify-center bg-secondary">
                    <FaBookOpen className="text-secondary text-xl" />
                </div>

                {/* Portada derecha */}
                <motion.div
                    animate={{ rotateY: [0, 50, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="h-24 w-16 origin-left rounded-r-md bg-primary shadow-lg"
                />
            </motion.div>

            {/* Texto */}
            <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-sm font-medium tracking-wide"
            >
                Cargando libros…
            </motion.p>
        </div>
    );
}
