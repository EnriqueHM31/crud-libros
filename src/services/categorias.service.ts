import { handleApiError } from "@/utils/errors";

export async function getAllCategories() {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL_CATEGORIES);

        await handleApiError(response);
        const { data } = await response.json();
        return { data };
    } catch (error) {
        throw new Error("Error al obtener libros de la API" + error);
    }
}

export async function getCategoryById(id: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_CATEGORIES}/${id}`);

        await handleApiError(response);
        const { data } = await response.json();
        return { data };
    } catch (error) {
        throw new Error("Error al obtener libro de la API" + error);
    }
}

export async function createCategory(category: { nombre: string; descripcion: string }) {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL_CATEGORIES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: category.nombre,
                descripcion: category.descripcion,
            }),
        });

        await handleApiError(response);

        const { data, message } = (await response.json()) as { data: { nombre: string; descripcion: string, id: string }, message: string };
        return { data, message };
    } catch (error) {
        console.error("Error al crear libro:", error);
    }
}

export async function updateCategory(id: string, category: { nombre?: string; descripcion?: string }) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_CATEGORIES}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: category.nombre,
                descripcion: category.descripcion,
            }),
        });

        await handleApiError(response);

        const { data } = await response.json();
        return { data };
    } catch (error) {
        throw new Error("Error al actualizar libro de la API" + error);
    }
}

export async function deleteCategory(id: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_CATEGORIES}/${id}`, {
            method: "DELETE",
        });

        await handleApiError(response);
        const { data } = await response.json();
        return { data };
    } catch (error) {
        throw new Error("Error al eliminar libro de la API" + error);
    }
}
