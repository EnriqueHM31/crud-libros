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
        mensaje: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
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
            <section className="w-full max-w-6xl mx-auto p-6 mt-5">
                <div className="relative grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-zinc-900 outline outline-zinc-700">

                    {/* LEFT VISUAL */}
                    <div className="relative flex flex-col justify-center p-10 bg-neutral-950 overflow-hidden">

                        {/* glow background */}
                        <div className="absolute w-[500px] h-[500px] bg-zinc-700/30 blur-3xl rounded-full" />

                        <div className="flex flex-col gap-2 ">
                            <div className="flex  gap-2 text-center">
                                <img src={ICONOLOGO} alt="logo" className="h-10 w-auto saturate-30" />
                                <h2 className="text-3xl font-bold text-white">
                                    Libreria HM
                                </h2>
                            </div>
                            <p className="text-gray-400">Envíanos un correo sobre la librería o sugerencias de libros.</p>


                            <motion.button
                                onClick={() => copiar("luisenriquehernandezmarin0@gmail.com")}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.96 }}
                                className="bg-zinc-950 border border-gray-600 text-white font-medium py-4 px-4 
            flex flex-col gap-2 rounded-xl items-start mt-8 cursor-pointer hover:bg-black/10
            relative overflow-hidden"
                            >
                                {/* glow hover */}
                                <motion.div
                                    className="absolute inset-0 bg-zinc-700/20 opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <div className="relative z-10 flex gap-3 items-center">
                                    <motion.div
                                        whileHover={{ rotate: 12, scale: 1.15 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <FaEnvelope className="text-2xl" />
                                    </motion.div>

                                    <span className="text-sm md:text-base">
                                        luisenriquexxxx@gmail.com
                                    </span>
                                </div>

                                <motion.span
                                    className="text-xs text-zinc-400 relative z-10"
                                    initial={{ opacity: 0.6 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    Da click para copiar el correo
                                </motion.span>

                                {/* borde animado */}
                                <motion.div
                                    className="absolute inset-0 rounded-xl border border-white/0"
                                    whileHover={{
                                        borderColor: "rgba(255,255,255,0.2)"
                                    }}
                                    transition={{ duration: 0.25 }}
                                />
                            </motion.button>
                        </div>
                    </div>

                    {/* FORM */}
                    <div className="relative p-8 bg-zinc-900">

                        {/* light sweep */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition">
                            <div className="absolute -left-20 top-0 w-40 h-full bg-white/5 blur-2xl rotate-12" />
                        </div>

                        <div className="relative z-10 flex flex-col gap-5">
                            <h1 className="text-2xl font-bold text-white">
                                Contacto
                            </h1>
                            <p className="text-zinc-400 text-sm">
                                Llena el formulario para enviarnos un mensaje sobre la librería o sugerencias de libros.
                            </p>

                            {/* inputs */}
                            <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmitEnviarMensaje(e)}>

                                <InputField
                                    label="Nombre"
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handleChange}
                                />

                                <InputField
                                    label="Correo"
                                    name="correo"
                                    value={form.correo}
                                    onChange={handleChange}
                                />

                                <TextareaField
                                    label="Mensaje"
                                    name="mensaje"
                                    value={form.mensaje}
                                    onChange={handleChange}
                                />

                                <motion.button
                                    whileTap={{ scale: 0.96 }}
                                    className="mt-2 rounded-xl bg-zinc-300 text-black font-medium py-3 hover:bg-zinc-500 hover:text-white transition cursor-pointer"
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
                className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white
                focus:outline-none focus:ring-1 focus:ring-zinc-400
                transition shadow-inner"
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
                className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white
                focus:outline-none focus:ring-1 focus:ring-zinc-400
                transition shadow-inner resize-none"
            />
        </div>
    );
}
