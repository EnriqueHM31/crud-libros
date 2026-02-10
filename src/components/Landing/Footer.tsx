import { links } from "@/constants/menu";
import { useAuthStore } from "@/store/autenticacion.store";
import { motion } from "framer-motion";
import { FiGithub, FiInstagram, FiTwitter } from "react-icons/fi";

export default function Footer() {
    const { user } = useAuthStore();

    const filteredLinks = links.filter((link) => {
        if (link.private && !user) return false;
        return true;
    });

    return (
        <footer className="mt-24 w-full border-t border-gray-400 text-black dark:border-zinc-800 dark:bg-black dark:text-white">
            <div className="mx-auto max-w-7xl px-6 py-4">
                {/* GRID */}
                <div className="grid gap-12 md:grid-cols-3">
                    {/* BRAND */}
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
                        <h2 className="mb-4 text-2xl font-bold tracking-wide">Libreria HM</h2>

                        <p className="max-w-sm text-sm text-zinc-900 dark:text-zinc-400">
                            Plataforma de gestión de libros, favoritos y pedidos. Interfaz moderna, rápida y pensada para usuarios reales.
                        </p>

                        {/* SOCIAL */}
                        <div className="mt-6 flex gap-4 text-xl">
                            {[FiGithub, FiTwitter, FiInstagram].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    href="#"
                                    className="text-zinc-900 transition hover:text-zinc-400 dark:text-zinc-400 dark:hover:text-white"
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* LINKS */}
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
                        <h3 className="mb-4 text-sm font-semibold text-black dark:text-zinc-300">Navegación</h3>

                        <div className="flex flex-col gap-5">
                            {filteredLinks.map(({ name, href, Icon }) => (
                                <motion.a
                                    key={name}
                                    href={href}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.75 }}
                                    className="relative flex w-fit items-center gap-2 py-1 text-sm text-zinc-700 transition after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-zinc-950 after:transition-all after:duration-300 after:content-[''] hover:text-zinc-600 hover:after:w-full dark:text-zinc-400 dark:hover:text-white"
                                >
                                    <Icon />
                                    {name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* NEWSLETTER */}
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
                        <h3 className="mb-4 text-sm font-semibold text-black dark:text-zinc-300">Suscríbete</h3>

                        <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-400">Recibe novedades y actualizaciones.</p>

                        <div className="flex items-center gap-4">
                            <input
                                type="email"
                                aria-label="Email"
                                name="email"
                                id="email"
                                placeholder="tu@email.com"
                                autoComplete="email"
                                className="w-full rounded-xl border border-gray-500 px-4 py-2 text-sm outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-600"
                            />

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.75 }}
                                className="cursor-pointer rounded-xl bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-500 hover:text-white dark:bg-white dark:text-black"
                            >
                                OK
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* BOTTOM */}
                <motion.div
                    className="mt-12 flex flex-col justify-between gap-4 border-t border-zinc-800 pt-6 text-xs text-zinc-900 md:flex-row dark:text-zinc-500"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <span className="text-center md:text-start">© 2026 Libreria HM. Todos los derechos reservados.</span>

                    <div className="flex items-center justify-center gap-6">
                        <a href="#" className="text-center transition hover:text-black md:text-start dark:hover:text-white">
                            Privacidad
                        </a>
                        <a href="#" className="text-center transition hover:text-black md:text-start dark:hover:text-white">
                            Términos
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
