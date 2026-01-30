import { motion } from "framer-motion";
import { FaEnvelope, FaCopy, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";
import HeaderSection from "../Atomos/Header";

const EMAIL = "luisenriquehernandezmarin0@gmail.com";

export default function Contacto() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="dark:bg-primary-dark flex min-h-screen flex-col gap-6 bg-white px-8 py-6">
            <div>
                <HeaderSection title="Contacto" description="¿Tienes alguna pregunta o propuesta? Escríbeme y con gusto te responderé." />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="dark:bg-primary-dark grid w-full max-w-full flex-1 grid-cols-1 rounded-2xl bg-white/80 shadow-xl md:grid-cols-2"
            >
                {/* IZQUIERDA */}
                <div className="relative flex h-full flex-col justify-center gap-8 p-8">
                    <div className="relative z-10 flex flex-col justify-center">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Librería HM</h2>

                        <p className="mt-2 mb-5 max-w-sm text-sm text-gray-600 dark:text-gray-400">
                            ¿Tienes alguna pregunta o propuesta? Escríbeme y con gusto te responderé.
                        </p>

                        {/* Email */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCopy}
                            className="mt-6 inline-flex w-fit cursor-pointer items-center gap-3 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
                        >
                            <FaEnvelope />
                            {copied ? "Correo copiado" : "luisenriquxxxxxxxxxx@gmail.com"}

                            <FaCopy className="opacity-80" />
                        </motion.button>
                    </div>

                    <p className="relative z-10 text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Librería HM</p>
                </div>

                {/* DERECHA */}
                <div className="flex flex-col justify-center p-8">
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="dark:bg-primary-dark rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:text-white"
                        />

                        <input
                            type="email"
                            placeholder="Correo"
                            className="dark:bg-primary-dark rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:text-white"
                        />

                        <textarea
                            rows={4}
                            placeholder="Mensaje"
                            className="dark:bg-primary-dark resize-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:text-white"
                        />

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
                        >
                            <FaPaperPlane />
                            Enviar mensaje
                        </motion.button>
                    </motion.form>
                </div>
            </motion.div>
        </main>
    );
}
