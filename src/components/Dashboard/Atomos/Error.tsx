import { motion } from "framer-motion";

export default function Error({ error }: { error: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 flex flex-col items-center gap-4 text-red-400"
        >
            {/* SVG animado */}
            <motion.svg
                width="80"
                height="80"
                viewBox="0 0 200 200"
                initial={{ rotate: -5 }}
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-red-400"
            >
                {/* libro */}
                <motion.rect
                    x="40"
                    y="60"
                    width="120"
                    height="80"
                    rx="10"
                    fill="currentColor"
                    opacity="0.15"
                />

                {/* linea central libro */}
                <line
                    x1="100"
                    y1="60"
                    x2="100"
                    y2="140"
                    stroke="currentColor"
                    strokeWidth="3"
                    opacity="0.4"
                />

                {/* ojos */}
                <motion.circle
                    cx="75"
                    cy="95"
                    r="6"
                    fill="currentColor"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: [1, 0.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                    cx="125"
                    cy="95"
                    r="6"
                    fill="currentColor"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: [1, 0.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                />

                {/* boca triste */}
                <path
                    d="M70 120 Q100 100 130 120"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeLinecap="round"
                />
            </motion.svg>

            {/* texto */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-center max-w-sm"
            >
                {error}
            </motion.p>
        </motion.div>
    );
}
