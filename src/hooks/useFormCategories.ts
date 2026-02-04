import type { HookFormBookProps } from "@/types/componentes";
import { useState } from "react";

export function useFormCategories({ type, initialData, onSubmit }: HookFormBookProps) {
    const [categoria, setCategoria] = useState(initialData ?? { nombre: "", descripcion: "" });

    const isEdit = type === "edit";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && initialData) {
            // Construir objeto solo con campos que cambiaron
            const updatedFields: Partial<typeof categoria> = {};
            if (categoria.nombre !== initialData.nombre) updatedFields.nombre = categoria.nombre;
            if (categoria.descripcion !== initialData.descripcion) updatedFields.descripcion = categoria.descripcion;

            onSubmit(updatedFields); // Solo enviamos los campos modificados
        } else {
            // Si es create, enviamos todo
            onSubmit({
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCategoria((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return {
        categoria,
        handleChange,
        handleSubmit,
        isEdit,
    };
}
