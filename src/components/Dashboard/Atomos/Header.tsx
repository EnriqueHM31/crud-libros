import { motion } from "framer-motion";

interface HeaderLibroProps {
    title: string;
    description?: string;
}

export default function HeaderSection({ title, description }: HeaderLibroProps) {
    return (
        <header className="mb-3 flex flex-col gap-2">
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {title}
            </motion.h2>

            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="max-w-2xl text-sm text-gray-500 dark:text-gray-400"
                >
                    {description}
                </motion.p>
            )}
        </header>
    );
}
