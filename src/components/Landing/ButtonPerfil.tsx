import { useOpen } from "@/hooks/useOpen";
import { useAuthStore } from "@/store/autenticacion.store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ProfileButton({ OpenModalPassword }: { OpenModalPassword: () => void }) {
    const { user } = useAuthStore();
    const perfilModal = useOpen();
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

    const initial = user?.username?.charAt(0)?.toUpperCase() || "?";

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!perfilModal.isOpen) return;
            const target = e.target as Node;
            if (panelRef.current && !panelRef.current.contains(target) && btnRef.current && !btnRef.current.contains(target)) {
                perfilModal.close();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [perfilModal]);
    if (initial === "?") return null;
    return (
        <div className="relative inline-block">
            <button
                ref={btnRef}
                onClick={perfilModal.toggle}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-zinc-800 font-semibold text-white transition hover:bg-zinc-700"
                aria-haspopup="dialog"
                aria-expanded={perfilModal.isOpen}
            >
                {initial}
            </button>

            <AnimatePresence>
                {perfilModal.isOpen && (
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 8, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl"
                    >
                        <div className="space-y-2">
                            <div>
                                <p className="text-xs text-zinc-400">Usuario</p>
                                <p className="text-sm font-medium break-all text-white">{user?.username ?? "—"}</p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-400">Correo electrónico</p>
                                <p className="text-sm break-all text-white">{user?.correo ?? "—"}</p>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={OpenModalPassword}
                                    className="cursor-pointer text-sm text-blue-400 underline-offset-4 transition duration-300 hover:text-blue-300 hover:underline"
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
