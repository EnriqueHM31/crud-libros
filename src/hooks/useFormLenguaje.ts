import type { HookFormLenguajesProps } from "@/types/componentes";
import { useState } from "react";

export function useFormLenguajes({ type, initialData, onSubmit }: HookFormLenguajesProps) {
    const [lenguaje, setlenguaje] = useState(initialData ?? { nombre: "", abreviacion: "" });

    const isEdit = type === "edit";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && initialData) {
            // Construir objeto solo con campos que cambiaron
            const updatedFields: Partial<typeof lenguaje> = {};
            if (lenguaje.nombre !== initialData.nombre) updatedFields.nombre = lenguaje.nombre;
            if (lenguaje.abreviacion !== initialData.abreviacion) updatedFields.abreviacion = lenguaje.abreviacion;

            onSubmit(updatedFields); // Solo enviamos los campos modificados
        } else {
            // Si es create, enviamos todo
            console.log("enviando lenguaje", lenguaje);
            onSubmit({
                nombre: lenguaje.nombre,
                abreviacion: lenguaje.abreviacion,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setlenguaje((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return {
        lenguaje,
        handleChange,
        handleSubmit,
        isEdit,
    };
}
