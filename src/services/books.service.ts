import type { GoogleBook } from "@/types/libro";
import { handleApiError } from "@/utils/errors";

export const getAllBooks = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL_BOOKS);

        await handleApiError(response);
        const { data, message } = (await response.json()) as { data: GoogleBook[]; message: string };
        return { data, message };
    } catch (error) {
        throw new Error("Error al obtener libros de la API" + error);
    }
};

export const getBookById = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_BOOKS}/${id}`);
        await handleApiError(response);
        const { data, message } = (await response.json()) as { data: GoogleBook; message: string };
        return { data, message };
    } catch (error) {
        throw new Error("Error al obtener libro de la API" + error);
    }
};

export const createBook = async (book: GoogleBook) => {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL_BOOKS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                book
            }),
        });

        await handleApiError(response);

        const { data, message } = (await response.json()) as { data: GoogleBook; message: string };
        return { data, message };
    } catch (error) {
        throw new Error("Error al crear libro de la API" + error);
    }
};

export const updateBook = async (book: Partial<GoogleBook>, id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_BOOKS}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        });
        await handleApiError(response);

        const { data, message } = (await response.json()) as { data: GoogleBook; message: string };
        return { data, message };
    } catch (error) {
        throw new Error("Error al actualizar libro de la API" + error);
    }
};

export const deleteBook = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_BOOKS}/${id}`, {
            method: "DELETE",
        });

        await handleApiError(response);
        const { data, message } = (await response.json()) as { data: GoogleBook; message: string };
        return { data, message };
    } catch (error) {
        throw new Error("Error al eliminar libro de la API" + error);
    }
};
