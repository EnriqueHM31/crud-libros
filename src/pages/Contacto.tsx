import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "@/layout/Layout";
import ICONOLOGO from "@/../public/icono.svg";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "sonner";
import { sendEmail } from "@/services/email.service";

export default function ContactoPanel() {
    function copiar(correo: string) {
        navigator.clipboard.writeText(correo);
        toast.success("Correo copiado");
    }

    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        mensaje: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmitEnviarMensaje(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!form.correo || !form.nombre || !form.mensaje) {
            toast.error("Por favor, rellena todos los campos");
            return;
        }

        const { message } = (await sendEmail({ mensaje: form.mensaje, correo: form.correo, nombre: form.nombre })) as { data: string; message: string };

        toast.success(message ?? "Mensaje enviado correctamente");
    }

    return (
        <Layout>
            <section className="mx-auto mt-5 w-full max-w-6xl p-6">
                <div className="relative grid gap-0 overflow-hidden rounded-3xl bg-zinc-900 outline outline-zinc-700 md:grid-cols-2">
                    {/* LEFT VISUAL */}
                    <div className="relative flex flex-col justify-center overflow-hidden bg-neutral-950 p-10">
                        {/* glow background */}
                        <div className="absolute h-[500px] w-[500px] rounded-full bg-zinc-700/30 blur-3xl" />

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 text-center">
                                <img src={ICONOLOGO} alt="logo" className="h-10 w-auto saturate-30" />
                                <h2 className="text-3xl font-bold text-white">Libreria HM</h2>
                            </div>
                            <p className="text-gray-400">Envíanos un correo sobre la librería o sugerencias de libros.</p>

                            <motion.button
                                onClick={() => copiar("luisenriquehernandezmarin0@gmail.com")}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.96 }}
                                className="relative mt-8 flex cursor-pointer flex-col items-start gap-2 overflow-hidden rounded-xl border border-gray-600 bg-zinc-950 px-4 py-4 font-medium text-white hover:bg-black/10"
                            >
                                {/* glow hover */}
                                <motion.div className="absolute inset-0 bg-zinc-700/20 opacity-0" whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />

                                <div className="relative z-10 flex items-center gap-3">
                                    <motion.div whileHover={{ rotate: 12, scale: 1.15 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <FaEnvelope className="text-2xl" />
                                    </motion.div>

                                    <span className="text-sm md:text-base">luisenriquexxxx@gmail.com</span>
                                </div>

                                <motion.span className="relative z-10 text-xs text-zinc-400" initial={{ opacity: 0.6 }} whileHover={{ opacity: 1 }}>
                                    Da click para copiar el correo
                                </motion.span>

                                {/* borde animado */}
                                <motion.div
                                    className="absolute inset-0 rounded-xl border border-white/0"
                                    whileHover={{
                                        borderColor: "rgba(255,255,255,0.2)",
                                    }}
                                    transition={{ duration: 0.25 }}
                                />
                            </motion.button>
                        </div>
                    </div>

                    {/* FORM */}
                    <div className="relative bg-zinc-900 p-8">
                        {/* light sweep */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition hover:opacity-100">
                            <div className="absolute top-0 -left-20 h-full w-40 rotate-12 bg-white/5 blur-2xl" />
                        </div>

                        <div className="relative z-10 flex flex-col gap-5">
                            <h1 className="text-2xl font-bold text-white">Contacto</h1>
                            <p className="text-sm text-zinc-400">Llena el formulario para enviarnos un mensaje sobre la librería o sugerencias de libros.</p>

                            {/* inputs */}
                            <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmitEnviarMensaje(e)}>
                                <InputField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />

                                <InputField label="Correo" name="correo" value={form.correo} onChange={handleChange} />

                                <TextareaField label="Mensaje" name="mensaje" value={form.mensaje} onChange={handleChange} />

                                <motion.button
                                    whileTap={{ scale: 0.96 }}
                                    className="mt-2 cursor-pointer rounded-xl bg-zinc-300 py-3 font-medium text-black transition hover:bg-zinc-500 hover:text-white"
                                >
                                    Enviar mensaje
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

function InputField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-400">{label}</label>
            <input
                {...props}
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white shadow-inner transition focus:ring-1 focus:ring-zinc-400 focus:outline-none"
            />
        </div>
    );
}

function TextareaField({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-400">{label}</label>
            <textarea
                rows={4}
                {...props}
                className="resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white shadow-inner transition focus:ring-1 focus:ring-zinc-400 focus:outline-none"
            />
        </div>
    );
}
