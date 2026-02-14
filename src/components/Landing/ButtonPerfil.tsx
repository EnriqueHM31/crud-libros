import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/autenticacion.store";

export default function ProfileButton() {
    const { user } = useAuthStore();
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

    const initial = user?.username?.charAt(0)?.toUpperCase() || "?";

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!open) return;
            const target = e.target as Node;
            if (
                panelRef.current &&
                !panelRef.current.contains(target) &&
                btnRef.current &&
                !btnRef.current.contains(target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <div className="relative inline-block">
            <button
                ref={btnRef}
                onClick={() => setOpen((v) => !v)}
                className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center font-semibold hover:bg-zinc-700 transition cursor-pointer"
                aria-haspopup="dialog"
                aria-expanded={open}
            >
                {initial}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 8, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-72 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl p-4 z-50"
                    >
                        <div className="space-y-2">
                            <div>
                                <p className="text-xs text-zinc-400">Usuario</p>
                                <p className="text-sm text-white font-medium break-all">
                                    {user?.username ?? "—"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-400">Correo electrónico</p>
                                <p className="text-sm text-white break-all">
                                    {user?.correo ?? "—"}
                                </p>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={() => {
                                        // navegación o handler de cambio de contraseña
                                        // ej: navigate("/cambiar-password")
                                    }}
                                    className="text-sm text-blue-400 hover:underline underline-offset-4 cursor-pointer hover:text-blue-300 transition duration-300"
                                >
                                    Cambiar contraseña
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
