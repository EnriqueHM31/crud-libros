import { motion } from "framer-motion";
import {
    FiHome,
    FiBook,
    FiMail,
    FiStar,
    FiPackage,
    FiGithub,
    FiTwitter,
    FiInstagram
} from "react-icons/fi";

export default function Footer() {

    const links = [
        { name: "Inicio", icon: <FiHome />, href: "/usuario" },
        { name: "Libros", icon: <FiBook />, href: "/libros" },
        { name: "Contacto", icon: <FiMail />, href: "/contacto" },
        { name: "Favoritos", icon: <FiStar />, href: "/favoritos" },
        { name: "Pedidos", icon: <FiPackage />, href: "/pedidos" },
    ];

    return (
        <footer className="w-full dark:bg-black text-black dark:text-white border-t border-white dark:border-zinc-800 mt-24">
            <div className="max-w-7xl mx-auto px-6 py-4">

                {/* GRID */}
                <div className="grid md:grid-cols-3 gap-12">

                    {/* BRAND */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: .1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold tracking-wide mb-4">
                            Libreria HM
                        </h2>

                        <p className="text-sm text-zinc-900 dark:text-zinc-400 max-w-sm">
                            Plataforma de gestión de libros, favoritos y pedidos.
                            Interfaz moderna, rápida y pensada para usuarios reales.
                        </p>

                        {/* SOCIAL */}
                        <div className="flex gap-4 mt-6 text-xl">
                            {[FiGithub, FiTwitter, FiInstagram].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    href="#"
                                    className="text-zinc-900 dark:text-zinc-400 hover:text-zinc-400 dark:hover:text-white transition"
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* LINKS */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: .2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-sm font-semibold text-black dark:text-zinc-300 mb-4">
                            Navegación
                        </h3>

                        <div className="flex flex-col gap-5">
                            {links.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.75 }}
                                    className="
                                    relative w-fit flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-400 py-1 hover:text-zinc-600
                                    dark:hover:text-white transition
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1
                                    after:h-[2px] after:w-0  after:bg-zinc-950 after:transition-all after:duration-300
                                    hover:after:w-full
                                    "
                                >
                                    {link.icon}
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* NEWSLETTER */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: .3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-sm font-semibold text-black dark:text-zinc-300 mb-4">
                            Suscríbete
                        </h3>

                        <p className="text-sm text-zinc-900 dark:text-zinc-400 mb-4">
                            Recibe novedades y actualizaciones.
                        </p>

                        <div className="flex items-center gap-4">
                            <input
                                type="email"
                                aria-label="Email"
                                name="email"
                                id="email"
                                placeholder="tu@email.com"
                                autoComplete="email"
                                className="
                                w-full dark:bg-zinc-900 border border-gray-500 dark:border-zinc-800 px-4 py-2
                                text-sm outline-none rounded-xl
                                dark:focus:border-zinc-600
                                "
                            />

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.75 }}
                                className="
                                px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium
                                cursor-pointer hover:bg-gray-500 hover:text-white    rounded-xl
                                "
                            >
                                OK
                            </motion.button>
                        </div>
                    </motion.div>

                </div>

                {/* BOTTOM */}
                <motion.div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-zinc-900 dark:text-zinc-500"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: .4 }}
                    viewport={{ once: true }}
                >
                    <span>© 2026 Libreria HM. Todos los derechos reservados.</span>

                    <div className="flex gap-6">
                        <a href="#" className=" hover:text-black dark:hover:text-white transition">Privacidad</a>
                        <a href="#" className=" hover:text-black dark:hover:text-white transition">Términos</a>
                    </div>
                </motion.div>

            </div>
        </footer>
    );
}
