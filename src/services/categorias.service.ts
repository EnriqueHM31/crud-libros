import { handleApiError } from "@/utils/errors";

export async function getAllCategories() {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL);

        await handleApiError(response);
        const { data } = await response.json();
        return { data };
    } catch (error) {
        throw new Error("Error al obtener libros de la API" + error);
    }
}

export async function getCategoryById(id: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);

        await handleApiError(response);
        const { data } = await response.json();
        return { data };
    } catch (error) {
        throw new Error("Error al obtener libro de la API" + error);
    }
}

export async function createCategory(category: string) {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                volumeInfo: category,
            }),
        });

        await handleApiError(response);

        const { data } = (await response.json()) as { data: string };
        return { data };
    } catch (error) {
        console.error("Error al crear libro:", error);
    }
}

export async function updateCategory(category: string, id: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al eliminar libro de la API");
        }
        const { data } = await response.json();
        return { data };
    } catch (error) {
        throw new Error("Error al eliminar libro de la API" + error);
    }
}   