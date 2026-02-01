// handleApiError.ts

import type { GoogleBook } from "@/types/libro";
import { toast } from "sonner";

export interface ApiError {
    data?: GoogleBook | GoogleBook[];
    error?: {
        code?: string;
        message?: string;
    };
    message?: string;
    ok?: boolean;
};

/**
 * Maneja errores de fetch y devuelve un mensaje limpio
 * @param response Response de fetch
 */
export const handleApiError = async (response: Response) => {
    if (response.ok) return; // No hay error

    let errorMessage = `Error ${response.status}: ${response.statusText}`;

    try {
        const data: ApiError = await response.json();

        // Si el backend envía un objeto `error` con `message`
        if (data?.error?.message) {
            errorMessage = data.error.message;
            toast.error(errorMessage);
        }
        // Si el backend envía un mensaje general
        else if (data?.message) {
            errorMessage = data.message;
            toast.error(errorMessage);
        }

    } catch (err) {
        console.warn("No se pudo leer el cuerpo del error:", err);
    }

    throw new Error(errorMessage);
};
