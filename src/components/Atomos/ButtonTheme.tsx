import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useThemeStore } from "../../store/theme";
import { motion } from "framer-motion";

export default function ButtonTheme() {
    const { mode, toggleMode } = useThemeStore();

    const isDark = mode === "dark";

    return (
        <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" checked={isDark} onChange={toggleMode} className="peer sr-only" />

            <motion.div
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.2, delay: 1.6 }}
                className="dark:bg-primary-dark bg-primary relative h-9 w-16 rounded-full border-2 border-gray-500 bg-none shadow-md transition-colors duration-500 peer-focus:outline-none dark:border-gray-400"
            >
                {/* Switch */}
                <span
                    className={`absolute top-1 left-1 z-10 size-6 rounded-full transition-transform duration-300 peer-checked:translate-x-8 dark:bg-blue-600 ${isDark ? "translate-x-7" : "translate-x-0 bg-white"} `}
                />

                {/* Icons */}
                <MdSunny className="absolute top-1 left-1 size-6 text-yellow-400" />
                <FaMoon className="absolute top-2 right-2 size-4 text-gray-300" />
            </motion.div>
        </label>
    );
}
