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
    const { menuItems, setMenu, currentMenu, isOpen, setIsOpen } = useMenuStore();

    return (
        <>
            {/* Botón menú mobile */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary-soft text-primary fixed top-4 right-4 z-50 flex size-10 items-center justify-center rounded-full text-2xl md:hidden"
                aria-label="Abrir menú"
            >
                {isOpen ? <IoClose /> : <HiMenu />}
            </button>

            <motion.aside
                className={`bg-primary text-text-inverse fixed z-40 h-screen w-full flex-col justify-between py-6 transition-transform duration-300 md:static md:flex md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
            >
                <div className="flex flex-1 flex-col gap-6">
                    <header className="px-6">
                        <motion.h1
                            variants={itemVariants}
                            transition={{ duration: 0.2 }}
                            initial="hidden"
                            animate="visible"
                            className="text-2xl font-bold tracking-tight"
                        >
                            <span className="opacity-90">Libros</span> <span className="text-surface">HM</span>
                        </motion.h1>
                    </header>

                    <nav className="my-10 mt-8 flex flex-col md:my-0" aria-label="Main navigation">
                        {menuItems.map(({ name, path, icon: Icon, key }, index) => (
                            <motion.button
                                key={name}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    delay: index * 0.3,
                                    duration: 0.2,
                                }}
                                onClick={() => {
                                    setMenu(key);
                                    window.history.pushState({}, "", path);
                                    setIsOpen(false); // cierra en mobile
                                }}
                                className={`group flex w-full cursor-pointer items-center gap-4 py-3 text-left text-lg font-medium transition-colors ${
                                    currentMenu === key ? "bg-primary-hover text-text-inverse" : "text-text-inverse hover:bg-primary-hover"
                                } `}
                            >
                                <div className="flex flex-1 items-center gap-2 px-4">
                                    <Icon className="text-xl opacity-90 group-hover:opacity-100" />
                                    <span>{name}</span>
                                </div>
                            </motion.button>
                        ))}
                    </nav>
                </div>

                <footer className="px-4">
                    <motion.button
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                        onClick={toggleMode}
                        transition={{ duration: 0.2, delay: 1.6 }}
                        className="bg-background text-primary flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl py-3 font-semibold transition-colors duration-150 hover:bg-white"
                    >
                        <FaMoon />
                        Cambiar tema
                    </motion.button>
                </footer>
            </motion.aside>
        </>
    );
}
