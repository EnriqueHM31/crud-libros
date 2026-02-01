import type { GoogleBook } from "@/types/libro";
import { handleApiError } from "@/utils/errors";

export const getAllBooks = async () => {

    try {
        const response = await fetch(import.meta.env.VITE_API_URL);

        await handleApiError(response);
        const { data } = await response.json();
        return { data };
    } catch (error) {
        throw new Error('Error al obtener libros de la API' + error);
    }
};


export const getBookById = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener libro de la API');
        }
        const { items } = await response.json();
        return { data: items[0] };
    } catch (error) {
        throw new Error('Error al obtener libro de la API' + error);
    }
};

export const createBook = async (book: GoogleBook) => {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                volumeInfo: book.volumeInfo,
            }),
        });

        await handleApiError(response);

        const { data } = (await response.json()) as { data: GoogleBook };
        return { data };
    } catch (error) {
        console.error('Error al crear libro:', error);
    }
};


export const updateBook = async (book: Partial<GoogleBook>, id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar libro de la API');
        }
        const { data } = await response.json();
        return { data };
    } catch (error) {
        throw new Error('Error al actualizar libro de la API' + error);
    }
};

export const deleteBook = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar libro de la API');
        }
        const { data } = await response.json();
        return { data };
    } catch (error) {
        throw new Error('Error al eliminar libro de la API' + error);
    }
};