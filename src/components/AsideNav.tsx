import { motion } from "framer-motion";
import { FaMoon } from "react-icons/fa";
import { useMenuStore } from "../store/menu";
import { useThemeStore } from "../store/theme";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";



const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
    },
};

export default function AsideNav() {
    const { toggleMode } = useThemeStore();
    const {
        menuItems,
        setMenu,
        currentMenu,
        isOpen,
        setIsOpen,
    } = useMenuStore();

    return (
        <>
            {/* Overlay mobile */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                />
            )}

            {/* Botón menú mobile */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed right-4 top-4 z-50 rounded-full bg-primary-soft size-10 text-primary md:hidden text-2xl flex items-center justify-center"
                aria-label="Abrir menú"
            >
                {isOpen ? <IoClose /> : <HiMenu />}
            </button>

            <motion.aside
                className={`
                    bg-primary text-text-inverse fixed z-40 h-screen w-full flex-col justify-between py-6
                    transition-transform duration-300 md:static md:translate-x-0 md:flex
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    
                `}
            >
                <header className="px-6">
                    <motion.h1
                        variants={itemVariants}
                        transition={{ duration: 0.8 }}
                        initial="hidden"
                        animate="visible"
                        className="text-2xl font-bold tracking-tight"
                    >
                        <span className="opacity-90">Libros</span>{" "}
                        <span className="text-primary-soft">HM</span>
                    </motion.h1>
                </header>

                <nav
                    className="mt-8 flex flex-col gap-1 px-2 my-10 md:my-0"
                    aria-label="Main navigation"
                >
                    {menuItems.map(
                        ({ name, path, icon: Icon, key }, index) => (
                            <motion.button
                                key={name}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    delay: index * 0.3,
                                    duration: 0.8,
                                }}
                                whileHover={{ x: 6 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                    setMenu(key);
                                    window.history.pushState({}, "", path);
                                    setIsOpen(false); // cierra en mobile
                                }}
                                className={`group flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left text-lg font-medium transition-colors
                                    ${currentMenu === key
                                        ? "bg-primary-hover text-text-inverse"
                                        : "text-text-inverse hover:bg-primary-hover"
                                    }
                                `}
                            >
                                <Icon className="text-xl opacity-90 group-hover:opacity-100" />
                                <span>{name}</span>
                            </motion.button>
                        )
                    )}
                </nav>

                <footer className="px-4">
                    <motion.button
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMode}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-primary-soft text-primary flex w-full items-center justify-center gap-3 rounded-xl py-3 font-semibold transition-colors hover:bg-white"
                    >
                        <FaMoon />
                        Cambiar tema
                    </motion.button>
                </footer>
            </motion.aside>
        </>
    );
}
