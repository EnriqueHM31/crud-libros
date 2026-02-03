import { motion } from "framer-motion";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useMenuStore } from "../../../store/menu.store";
import ButtonTheme from "../../Atomos/ButtonTheme";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
    },
};

export default function AsideNav() {
    const { menuItems, setMenu, currentMenu, isOpen, setIsOpen } = useMenuStore();
    const navigate = useNavigate();

    return (
        <>
            {/* Botón menú mobile */}
            <motion.button
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.2, delay: 1.6 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary dark:bg-primary-dark fixed top-5 right-4 z-50 flex size-10 items-center justify-center rounded-full border border-gray-400 text-2xl text-white md:hidden dark:border-gray-600 dark:text-white"
                aria-label="Abrir menú"
            >
                {isOpen ? <IoClose /> : <HiMenu />}
            </motion.button>

            <motion.aside
                className={`bg-primary dark:bg-primary-dark text-text-inverse fixed z-40 h-screen w-full flex-col justify-between border-r-2 py-6 transition-transform duration-300 md:static md:flex md:translate-x-0 dark:border-gray-700 ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
            >
                <div className="flex flex-1 flex-col gap-6">
                    <header className="flex items-center justify-between px-6 pe-18 md:px-6">
                        <motion.h1
                            variants={itemVariants}
                            transition={{ duration: 0.2 }}
                            initial="hidden"
                            animate="visible"
                            className="text-2xl font-bold tracking-tight"
                        >
                            <span className="opacity-90">Libros</span> <span className="text-surface">HM</span>
                        </motion.h1>

                        <ButtonTheme />
                    </header>

                    <nav className="my-10 mt-8 flex flex-col md:my-0" aria-label="Main navigation">
                        {menuItems.map(({ name, icon: Icon, key }, index) => (
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
                                    setIsOpen(false); // cierra en mobile
                                }}
                                className={`group flex w-full cursor-pointer items-center gap-4 py-3 text-left text-lg font-medium transition-colors ${currentMenu === key ? "bg-primary-hover text-text-inverse" : "text-text-inverse hover:bg-primary-hover"
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

                <footer>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="md:mxnone mx-auto flex w-full max-w-10/12 cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-4 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-100 md:max-w-5/6 md:min-w-fit dark:border-gray-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-800"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <FaHome size={18} />
                        Inicio
                    </motion.button>
                </footer>
            </motion.aside>
        </>
    );
}
