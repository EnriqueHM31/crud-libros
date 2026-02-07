import ICONOLOGO from "@/../public/icono.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiBook, FiHome, FiMail, FiMenu, FiPackage, FiStar, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import BotonTheme from "./BotonTheme";
export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        { name: "Inicio", icon: <FiHome />, href: "/usuario" },
        { name: "Libros", icon: <FiBook />, href: "/libros" },
        { name: "Contacto", icon: <FiMail />, href: "/contacto" },
        { name: "Favoritos", icon: <FiStar />, href: "/favoritos" },
        { name: "Pedidos", icon: <FiPackage />, href: "/pedidos" },
    ];

    return (
        <>
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 z-50 w-full border-b text-white dark:border-zinc-800">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    <motion.h1
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1, transition: { duration: 0.5 } }}
                        exit={{ scale: 0.9 }}
                        className="flex items-center gap-2 text-xl font-bold tracking-wide text-black dark:text-white">
                        <img src={ICONOLOGO} alt="logo" className="h-10 w-auto saturate-30" />
                        Libreria HM
                    </motion.h1>

                    {/* Desktop */}
                    <div className="hidden items-center gap-7 md:flex">
                        {links.map((link) => (
                            <Link key={link.name} to={link.href}>
                                <motion.div
                                    initial={{ scale: 0.6 }}
                                    animate={{ scale: 1, transition: { duration: 0.5 } }}
                                    exit={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                                    className="relative flex items-center justify-center gap-2 px-4 py-2 text-sm text-black/80 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-2xl after:bg-black  after:transition-all after:duration-300 after:content-['']  hover:after:w-full dark:text-white/70 dark:after:bg-white dark:hover:text-white hover:text-black"
                                >
                                    {link.icon}
                                    {link.name}
                                </motion.div>
                            </Link>
                        ))}
                        <motion.button
                            initial={{ scale: 0.6 }}
                            animate={{ scale: 1, transition: { duration: 0.5 } }}
                            exit={{ scale: 0.9 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                            className="cursor-pointer rounded-xl px-4 py-2 text-sm text-white bg-black hover:bg-gray-500 hover:text-white dark:bg-white dark:text-black"
                        >
                            Iniciar Sesion
                        </motion.button>

                        <BotonTheme />
                    </div>

                    {/* Button mobile */}
                    <motion.button
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1, transition: { duration: 0.5 } }}
                        exit={{ scale: 0.9 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                        onClick={() => setOpen(!open)}
                        className={`cursor-pointer rounded-full p-1 text-2xl md:hidden ${open ? "bg-white text-black" : "bg-black text-white"}`}
                    >
                        {open ? <FiX /> : <FiMenu />}
                    </motion.button>
                </div>
            </nav>

            {/* ESPACIADOR para que no tape contenido */}
            <div className="h-16" />

            {/* MOBILE MENU */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 w-full max-w-11/12 md:hidden dark:bg-black"
                            onClick={() => setOpen(false)}
                        />

                        {/* menu */}
                        <motion.div
                            initial={{ y: -40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed top-24 left-1/2 z-50 mx-auto w-full max-w-11/12 -translate-x-1/2 rounded-xl border bg-zinc-950 md:hidden md:border-b dark:border-zinc-600"
                        >
                            <div className="flex flex-col items-center gap-6 py-6">
                                {links.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="flex w-full max-w-10/12 items-center gap-3 text-lg text-white/90 transition hover:text-white"
                                        onClick={() => setOpen(false)}
                                    >
                                        <motion.div
                                            initial={{ scale: 0.6 }}
                                            animate={{ scale: 1, transition: { duration: 0.5 } }}
                                            exit={{ scale: 0.9 }}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                                            className="relative flex w-full items-center justify-center gap-2 px-4 py-2 text-sm text-white/80 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-2xl after:bg-white after:transition-all after:duration-300 after:content-[''] hover:text-white hover:after:w-full dark:text-white/70 dark:after:bg-white dark:hover:text-white"
                                        >
                                            {link.icon}
                                            {link.name}
                                        </motion.div>
                                    </Link>
                                ))}
                                <motion.button
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                                    className="cursor-pointer rounded-xl px-4 py-2 text-sm text-white/80 hover:bg-gray-500 hover:text-white dark:bg-white dark:text-black"
                                >
                                    Iniciar Sesion
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
