import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiLock, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { useAuthStore } from "@/store/autenticacion.store";
import ButtonEye from "./ButtonEye";
import { useOpen } from "@/hooks/useOpen";
import IMGLOGO from "@/../public/icono.svg";

interface ModalPasswordProps {
    open: boolean;
    onClose: () => void;
}

export default function ModalPassword({ open, onClose }: ModalPasswordProps) {
    const { changePassword, loading } = useAuthStore();
    const ButtonPassword1 = useOpen();
    const ButtonPassword2 = useOpen();
    const ButtonPassword3 = useOpen();

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const reset = () => setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
            toast.error("Completa todos los campos");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        const { ok, message } = await changePassword(form.currentPassword, form.newPassword);

        if (!ok) {
            toast.error(message || "No se pudo cambiar la contraseña");
            return;
        }

        toast.success("Contraseña actualizada");
        reset();
        onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-120 flex items-center justify-center bg-black/70 backdrop-blur-sm"
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
                            <h2 className="text-xl font-bold text-white">Cambiar contraseña</h2>
                            <p className=" text-sm text-zinc-400">Actualiza tus credenciales de acceso</p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                            <div className="relative">
                                <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type={ButtonPassword1.isOpen ? "text" : "password"}
                                    name="currentPassword"
                                    value={form.currentPassword}
                                    onChange={handleChange}
                                    placeholder="Contraseña actual"
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pr-3 pl-10 text-white"
                                />

                                <ButtonEye show={ButtonPassword1.isOpen} setShow={ButtonPassword1.toggle} />
                            </div>

                            <div className="relative">
                                <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type={ButtonPassword2.isOpen ? "text" : "password"}
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    placeholder="Nueva contraseña"
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pr-3 pl-10 text-white"
                                />
                                <ButtonEye show={ButtonPassword2.isOpen} setShow={ButtonPassword2.toggle} />
                            </div>

                            <div className="relative">
                                <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type={ButtonPassword3.isOpen ? "text" : "password"}
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirmar contraseña"
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pr-3 pl-10 text-white"
                                />

                                <ButtonEye show={ButtonPassword3.isOpen} setShow={ButtonPassword3.toggle} />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                type="submit"
                                className="mt-3 cursor-pointer rounded-xl bg-white py-3 font-semibold text-black"
                            >
                                {loading ? "Actualizando..." : "Guardar cambios"}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
