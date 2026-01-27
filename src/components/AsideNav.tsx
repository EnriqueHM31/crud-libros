import { motion } from "framer-motion";
import { useThemeStore } from "../store/theme";
import { FaHome, FaBook, FaComment, FaMoon } from "react-icons/fa";

const links = [
    { name: "Home", href: "#", icon: FaHome },
    { name: "Libros", href: "#", icon: FaBook },
    { name: "Contact", href: "#", icon: FaComment },
];

const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1
    },
};

export default function AsideNav() {
    const { toggleMode } = useThemeStore();

    return (
        <motion.aside
            className="
        h-screen w-72
        bg-primary
        text-text-inverse
        flex flex-col
        justify-between
        py-6
      "
        >
            {/* Header */}
            <header className="px-6">
                <motion.h1
                    variants={itemVariants}
                    transition={{ duration: 0.8 }}
                    initial="hidden"
                    animate="visible"
                    className="text-2xl font-bold tracking-tight">
                    <span className="opacity-90">Libros</span>{" "}
                    <span className="text-primary-soft">HM</span>
                </motion.h1>
            </header>

            {/* Navigation */}
            <nav className="mt-8 flex flex-col gap-1 px-2" aria-label="Main navigation">
                {links.map(({ name, href, icon: Icon }, index) => (
                    <motion.a
                        key={name}
                        href={href}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        whileHover={{ x: 6 }}
                        whileTap={{ scale: 0.97 }}
                        className="
              group flex items-center gap-4
              rounded-xl px-4 py-3
              text-lg font-medium
              text-text-inverse
              hover:bg-primary-hover
              transition-colors
            "
                    >
                        <Icon className="text-xl opacity-90 group-hover:opacity-100" />
                        <span>{name}</span>
                    </motion.a>
                ))}
            </nav>

            {/* Footer */}
            <footer className="px-4">
                <motion.button
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMode}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="
            w-full flex items-center justify-center gap-3
            rounded-xl py-3
            bg-primary-soft
            text-primary
            font-semibold
            hover:bg-white
            transition-colors
          "
                >
                    <FaMoon />
                    Cambiar tema
                </motion.button>
            </footer>
        </motion.aside>
    );
}
