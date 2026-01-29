import { motion } from "framer-motion";
import { FaUserShield, FaUser } from "react-icons/fa";
import ButtonTheme from "../components/Atomos/ButtonTheme";
import { useNavigate } from "react-router-dom";

export default function LoginDemo() {

    const navigate = useNavigate();
    return (
        <main className="flex min-h-screen items-center justify-center bg-primary-soft px-6 dark:bg-primary-dark">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/80 p-14 shadow-xl backdrop-blur-md dark:bg-black/30"
            >
                {/* SVG decorativo */}
                <svg
                    className="absolute -top-24 -right-24 size-64 opacity-20"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#2563EB"
                        d="M43.8,-71.6C56.4,-61.7,66.1,-50.1,72.8,-36.7C79.6,-23.3,83.4,-8.1,81.8,6.6C80.2,21.3,73.2,35.6,63.3,46.8C53.3,58,40.3,66,26.1,70.8C11.9,75.6,-3.6,77.1,-19.4,74.5C-35.2,71.9,-51.3,65.2,-62.2,53.2C-73.1,41.2,-78.8,24,-78.5,7.2C-78.2,-9.6,-71.9,-26,-61.7,-38.5C-51.5,-51,-37.4,-59.6,-22.5,-68.3C-7.6,-77,8.1,-85.7,22.4,-83.2C36.7,-80.7,49.5,-67.5,43.8,-71.6Z"
                        transform="translate(100 100)"
                    />
                </svg>

                <svg
                    className="absolute -bottom-24 -left-24 size-64 opacity-20"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#2563EB"
                        d="M43.8,-71.6C56.4,-61.7,66.1,-50.1,72.8,-36.7C79.6,-23.3,83.4,-8.1,81.8,6.6C80.2,21.3,73.2,35.6,63.3,46.8C53.3,58,40.3,66,26.1,70.8C11.9,75.6,-3.6,77.1,-19.4,74.5C-35.2,71.9,-51.3,65.2,-62.2,53.2C-73.1,41.2,-78.8,24,-78.5,7.2C-78.2,-9.6,-71.9,-26,-61.7,-38.5C-51.5,-51,-37.4,-59.6,-22.5,-68.3C-7.6,-77,8.1,-85.7,22.4,-83.2C36.7,-80.7,49.5,-67.5,43.8,-71.6Z"
                        transform="translate(100 100)"
                    />
                </svg>

                <div className="absolute top-5 right-5 flex items-center justify-center gap-4 text-center">
                    <ButtonTheme />
                </div>

                {/* Header */}
                <div className="relative z-10 mb-14 text-center">
                    <h1 className=" font-bold tracking-tight text-gray-900 dark:text-white text-7xl">
                        Libros HM
                    </h1>
                    <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
                        Accede al sistema en modo demostración
                    </p>
                </div>

                {/* Botones */}
                <div className="relative z-10 flex flex-col gap-4">
                    {/* Admin */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 cursor-pointer min-w-70 mx-auto"
                        onClick={() => {
                            navigate("/dashboard");
                        }}
                    >
                        <FaUserShield size={18} />
                        Demo administrador
                    </motion.button>

                    {/* Usuario */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-4 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-100 dark:border-gray-600 dark:bg-black/20 dark:text-white dark:hover:bg-black/30 cursor-pointer min-w-70 mx-auto"
                        onClick={() => {
                            navigate("/landing");
                        }}
                    >
                        <FaUser size={18} />
                        Demo usuario
                    </motion.button>
                </div>

                {/* Footer */}
                <p className="relative z-10 mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
                    Acceso rápido solo para demostración
                </p>
            </motion.div>
        </main>
    );
}
