import { handleApiError } from "@/utils/errors";

interface Lenguaje {
    id: string;
    lenguaje: string;
    abreviacion: string;
}
export async function getAllLanguages() {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL_LENGUAJES);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error al obtener lenguajes de la API" + error);
    }
}

export async function getLanguageById(id: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_LENGUAJES}/${id}`);
        const { items } = await response.json();
        return { data: items };
    } catch (error) {
        throw new Error("Error al obtener lenguaje de la API" + error);
    }
}

export async function createLanguage(lenguaje: { lenguaje: string; abreviacion: string }) {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL_LENGUAJES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lenguaje: lenguaje,
            }),
        });

        await handleApiError(response);

        const { data, message } = (await response.json()) as { data: { lenguaje: string; id: string }; message: string };
        return { data, message };
    } catch (error) {
        throw new Error("Error al crear lenguaje de la API" + error);
    }
}

export async function updateLanguage({ id, lenguaje }: { id: string; lenguaje: Partial<Omit<Lenguaje, "id">> }) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_LENGUAJES}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lenguaje: lenguaje,
            }),
        });

        await handleApiError(response);

        const { data, message } = (await response.json()) as { data: { lenguaje: string; id: string, abreviacion: string }; message: string };
        return { data, message };
    } catch (error) {
        throw new Error("Error al actualizar lenguaje de la API" + error);
    }
}

export async function deleteLanguage(id: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_LENGUAJES}/${id}`, {
            method: "DELETE",
        });

        await handleApiError(response);
        const { data, message } = (await response.json()) as { data: { lenguaje: string; id: string }; message: string };
        return { data, message };
    } catch (error) {
        throw new Error("Error al eliminar lenguaje de la API" + error);
    }
}       