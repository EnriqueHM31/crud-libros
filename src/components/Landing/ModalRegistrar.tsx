import IMGLOGO from "@/../public/icono.svg";
import { useAuthStore } from "@/store/autenticacion.store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiLock, FiMail, FiUser, FiX } from "react-icons/fi";
import { toast } from "sonner";

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
    openIniciarSesion: () => void;
}

export default function RegistrarseModal({ open, onClose, openIniciarSesion }: RegisterModalProps) {
    const [form, setForm] = useState({
        username: "",
        correo: "",
        password: "",
    });

    const { loading, registrar } = useAuthStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.username || !form.correo || !form.password) {
            toast.error("Completa todos los campos");
            return;
        }

        const { username, correo, password } = form;

        await registrar(username, correo, password);

        onClose();

        setTimeout(() => {
            openIniciarSesion();
        }, 500);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
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
                        {/* close */}
                        <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer text-zinc-400 hover:text-white">
                            <FiX size={20} />
                        </button>

                        {/* header */}
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="flex items-center gap-2 text-2xl font-bold text-white">
                                <img src={IMGLOGO} alt="logo" className="h-10 w-auto saturate-30" />
                                <h2>Librería HM</h2>
                            </div>

                            <h3 className="text-xl font-bold dark:text-gray-300">Registrarse</h3>
                            <p className="max-w-[280px] text-sm text-zinc-400">
                                Crea tu cuenta para guardar favoritos, marcar libros leídos y gestionar tu biblioteca.
                            </p>
                        </div>

                        {/* form */}
                        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                            {/* username */}
                            <div className="relative">
                                <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Usuario"
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pr-3 pl-10 text-white outline-none focus:border-zinc-500"
                                />
                            </div>

                            {/* correo */}
                            <div className="relative">
                                <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="correo"
                                    name="correo"
                                    autoComplete="correo"
                                    value={form.correo}
                                    onChange={handleChange}
                                    placeholder="Correo electrónico"
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pr-3 pl-10 text-white outline-none focus:border-zinc-500"
                                />
                            </div>

                            {/* password */}
                            <div className="relative">
                                <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Contraseña"
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pr-3 pl-10 text-white outline-none focus:border-zinc-500"
                                />
                            </div>

                            {/* submit */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.92 }}
                                disabled={loading}
                                className="mt-3 cursor-pointer rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-300 disabled:opacity-50"
                            >
                                {loading ? "Creando cuenta..." : "Registrarse"}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
