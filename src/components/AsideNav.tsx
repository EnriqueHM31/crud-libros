import { motion } from "framer-motion";
import { FaMoon } from "react-icons/fa";
import { useMenuStore } from "../store/menu";
import { useThemeStore } from "../store/theme";

const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
    },
};

export default function AsideNav() {
    const { toggleMode } = useThemeStore();
    const { menuItems, setMenu, currentMenu } = useMenuStore();

    return (
        <motion.aside className="bg-primary text-text-inverse flex h-screen w-full flex-col justify-between py-6">
            <header className="px-6">
                <motion.h1
                    variants={itemVariants}
                    transition={{ duration: 0.8 }}
                    initial="hidden"
                    animate="visible"
                    className="text-2xl font-bold tracking-tight"
                >
                    <span className="opacity-90">Libros</span> <span className="text-primary-soft">HM</span>
                </motion.h1>
            </header>

            <nav className="mt-8 flex flex-col gap-1 px-2" aria-label="Main navigation">
                {menuItems.map(({ name, path, icon: Icon, key }, index) => {
                    return (
                        <motion.button
                            key={name}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.3, duration: 0.8 }}
                            whileHover={{ x: 6 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                                setMenu(key);
                                window.history.pushState({}, "", path);
                            }}
                            className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-lg font-medium transition-colors cursor-pointer
                                ${currentMenu === key
                                    ? 'bg-primary-hover text-text-inverse'
                                    : 'text-text-inverse hover:bg-primary-hover'
                                }
                            `}

                        >
                            <Icon className="text-xl opacity-90 group-hover:opacity-100" />
                            <span>{name}</span>
                        </motion.button>
                    );
                })}
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
    );
}
