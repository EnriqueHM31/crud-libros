// handleApiError.ts

import type { GoogleBook } from "@/types/libro";
import { toast } from "sonner";

export interface UserError {
    title: string;
    message: string;
}

export interface ApiError {
    data?: GoogleBook | GoogleBook[];
    error?: {
        code?: string;
        message?: string;
    };
    message?: string;
    ok?: boolean;
}

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

interface ApiErrorResponse {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export function isApiError(error: unknown): error is ApiErrorResponse {
    return typeof error === "object" && error !== null && "response" in error;
}

export function getUserFriendlyError(error: unknown, categoria: string): UserError {
    // AbortController
    if (error instanceof DOMException && error.name === "AbortError") {
        return { message: "La solicitud fue cancelada. Intenta nuevamente.", title: `Error en ${categoria}` };
    }
    // Error estándar
    if (error instanceof Error) {
        const msg = error.message.toLowerCase();

        // fetch network error
        if (msg.includes("failed to fetch") || msg.includes("networkerror")) {
            return { title: `Error en ${categoria}`, message: "No se pudo conectar con el servidor. Verifica tu internet." };
        }

        // timeout custom
        if (msg.includes("timeout")) {
            return { title: `Error en ${categoria}`, message: "El servidor tardó demasiado en responder." };
        }

        // 4xx / 5xx si tú los lanzas manualmente
        if (msg.includes("404")) {
            return { title: `Error en ${categoria}`, message: "No se encontraron libros." };
        }

        if (msg.includes("500")) {
            return { title: `Error en ${categoria}`, message: "El servidor tuvo un problema. Intenta más tarde." };
        }
    }

    // fallback
    return { title: `Error en ${categoria}`, message: "Ocurrió un error inesperado. Intenta nuevamente." };
}
