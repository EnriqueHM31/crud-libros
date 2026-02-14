import ICONOLOGO from "@/../public/icono.svg";
import { links } from "@/constants/menu";
import { useOpen } from "@/hooks/useOpen";
import { useAuthStore } from "@/store/autenticacion.store";
import { useThemeStore } from "@/store/theme.store";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import BotonTheme from "./BotonTheme";
import LoginModal from "./ModalLogin";
import ProfileButton from "./ButtonPerfil";

export default function Navbar() {
    const { mode } = useThemeStore();
    const { user, logout } = useAuthStore();
    const modalAuth = useOpen();
    const navbar = useOpen();
    const location = useLocation();

    const filteredLinks = links.filter((link) => {
        if (link.private && !user) return false;
        return true;
    });

    return (
        <>
            <LoginModal open={modalAuth.isOpen} onClose={modalAuth.close} openIniciarSesion={modalAuth.open} />
            {/* NAVBAR */}
            <nav
                className={`fixed top-0 left-0 z-50 w-full border-b text-white dark:border-zinc-800 ${mode === "dark" ? "bg-black/60 backdrop-blur-2xl" : "bg-white"}`}
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    <motion.h1
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1, transition: { duration: 0.5 } }}
                        exit={{ scale: 0.9 }}
                        className="flex items-center gap-2 text-xl font-bold tracking-wide text-black dark:text-white"
                    >
                        <img src={ICONOLOGO} alt="logo" className="h-10 w-auto saturate-30" />
                        Libreria HM
                    </motion.h1>

                    {/* Desktop */}
                    <div className="hidden items-center gap-7 md:flex">
                        {filteredLinks.map(({ name, href, Icon }) => (
                            <Link key={name} to={href}>
                                <motion.div
                                    initial={{ scale: 0.6 }}
                                    animate={{ scale: 1, transition: { duration: 0.5 } }}
                                    exit={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                                    className={`relative flex items-center justify-center gap-2 px-4 py-2 text-sm text-black/80 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-2xl after:bg-black after:transition-all after:duration-300 after:content-[''] hover:text-black dark:text-white/70 dark:after:bg-white dark:hover:text-white ${location.pathname === href ? "text-black after:w-full dark:text-white" : "border-black/50 text-black/70 hover:after:w-full dark:border-b-2"} `}
                                >
                                    <Icon />
                                    {name}
                                </motion.div>
                            </Link>
                        ))}
                        {user ? (
                            <>
                                <motion.button
                                    onClick={logout}
                                    initial={{ scale: 0.6 }}
                                    animate={{ scale: 1, transition: { duration: 0.5 } }}
                                    exit={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                                    className="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-500 hover:text-white dark:bg-white dark:text-black"
                                >
                                    Cerrar Sesion
                                </motion.button>

                                <ProfileButton />
                            </>
                        ) : (
                            <motion.button
                                onClick={modalAuth.open}
                                initial={{ scale: 0.6 }}
                                animate={{ scale: 1, transition: { duration: 0.5 } }}
                                exit={{ scale: 0.9 }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                                className="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-500 hover:text-white dark:bg-white dark:text-black"
                            >
                                Iniciar Sesion
                            </motion.button>
                        )}



                        <BotonTheme />
                    </div>

                    {/* Button mobile */}
                    <motion.button
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1, transition: { duration: 0.5 } }}
                        exit={{ scale: 0.9 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                        onClick={navbar.toggle}
                        className={`cursor-pointer rounded-full p-1 text-2xl md:hidden ${navbar.isOpen ? "bg-white text-black" : "bg-black text-white"}`}
                    >
                        {navbar.isOpen ? <FiX /> : <FiMenu />}
                    </motion.button>
                </div>
            </nav>

            {/* ESPACIADOR para que no tape contenido */}
            <div className="h-16" />

            {/* MOBILE MENU */}
            <AnimatePresence>
                {navbar.isOpen && (
                    <>
                        {/* overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 w-full max-w-11/12 md:hidden dark:bg-black"
                            onClick={navbar.close}
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
                                {links.map(({ name, href, Icon }) => (
                                    <Link
                                        key={name}
                                        to={href}
                                        className="flex w-full max-w-10/12 items-center gap-3 text-lg text-white/90 transition hover:text-white"
                                        onClick={navbar.close}
                                    >
                                        <motion.div
                                            initial={{ scale: 0.6 }}
                                            animate={{ scale: 1, transition: { duration: 0.5 } }}
                                            exit={{ scale: 0.9 }}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                                            className="relative flex w-full items-center justify-center gap-2 px-4 py-2 text-sm text-white/80 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-2xl after:bg-white after:transition-all after:duration-300 after:content-[''] hover:text-white hover:after:w-full dark:text-white/70 dark:after:bg-white dark:hover:text-white"
                                        >
                                            <Icon />
                                            {name}
                                        </motion.div>
                                    </Link>
                                ))}
                                {user ? (
                                    <motion.button
                                        onClick={logout}
                                        initial={{ scale: 0.6 }}
                                        animate={{ scale: 1, transition: { duration: 0.5 } }}
                                        exit={{ scale: 0.9 }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                                        className="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-500 hover:text-white dark:bg-white dark:text-black"
                                    >
                                        Cerrar Sesion
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        onClick={modalAuth.open}
                                        initial={{ scale: 0.6 }}
                                        animate={{ scale: 1, transition: { duration: 0.5 } }}
                                        exit={{ scale: 0.9 }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.77, transition: { duration: 0.3 } }}
                                        className="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-500 hover:text-white dark:bg-white dark:text-black"
                                    >
                                        Iniciar Sesion
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
