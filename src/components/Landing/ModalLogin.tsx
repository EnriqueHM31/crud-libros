import IMGLOGO from "@/../public/icono.svg";
import { useOpen } from "@/hooks/useOpen";
import { useAuthStore } from "@/store/autenticacion.store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiLock, FiUser, FiX } from "react-icons/fi";
import { toast } from "sonner";
import RegistrarseModal from "./ModalRegistrar";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    openIniciarSesion: () => void;
}
export default function LoginModal({ open, onClose, openIniciarSesion }: LoginModalProps) {
    const [formLogin, setFormLogin] = useState({ username: "", password: "" });
    const { loading, login } = useAuthStore();
    const modalRegistrar = useOpen();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormLogin((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formLogin.username || !formLogin.password) {
            toast.error("Completa los campos");
            return;
        }

        const { ok } = await login(formLogin.username, formLogin.password);

        if (ok) {
            onClose();
        }
    };

    const openRegister = () => {
        onClose(); // cierra login
        setTimeout(() => {
            modalRegistrar.open(); // abre registro
        }, 120); // pequeño delay para que AnimatePresence no los superponga
    };

    return (
        <>
            {/* LOGIN */}
            <AnimatePresence>
                {open && !modalRegistrar.isOpen && (
                    <motion.div
                        key="loginModal"
                        className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ y: 80, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 60, opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.35 }}
                            className="relative w-[420px] max-w-[95%] rounded-2xl border border-zinc-700 bg-zinc-950 p-8 shadow-2xl"
                        >
                            <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer text-zinc-400 hover:text-white">
                                <FiX size={20} />
                            </button>

                            <div className="flex flex-col items-center gap-3 text-center">
                                <div className="flex items-center gap-2 text-2xl font-bold text-white">
                                    <img src={IMGLOGO} className="h-10 w-auto saturate-30" />
                                    <h2>Librería HM</h2>
                                </div>
                                <h3 className="text-xl font-bold dark:text-gray-300">Iniciar sesión</h3>
                                <p className="max-w-[280px] text-sm text-zinc-400">Accede a tu cuenta para gestionar tu biblioteca.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                                <div className="relative">
                                    <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500" />
                                    <input
                                        name="username"
                                        autoComplete="username"
                                        value={formLogin.username}
                                        onChange={handleChange}
                                        placeholder="Usuario"
                                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pr-3 pl-10 text-white"
                                    />
                                </div>

                                <div className="relative">
                                    <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500" />
                                    <input
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        value={formLogin.password}
                                        onChange={handleChange}
                                        placeholder="Contraseña"
                                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pr-3 pl-10 text-white"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                                    type="button"
                                    onClick={openRegister}
                                    className="cursor-pointer text-sm text-white hover:text-gray-300 hover:underline"
                                >
                                    ¿No tienes cuenta?
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                                    type="submit"
                                    disabled={loading}
                                    className="mt-3 cursor-pointer rounded-xl bg-white py-3 font-semibold text-black"
                                >
                                    {loading ? "Ingresando..." : "Iniciar sesión"}
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* REGISTER */}
            <RegistrarseModal open={modalRegistrar.isOpen} onClose={modalRegistrar.close} openIniciarSesion={openIniciarSesion} />
        </>
    );
}
