import { handleApiError } from "@/utils/errors";

export async function sendEmail({ mensaje, correo, nombre }: { mensaje: string; correo: string; nombre: string }) {

    try {
        const response = await fetch(import.meta.env.VITE_API_URL_EMAIL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comentario: ` Mensaje de ${nombre} con el mensaje: "${mensaje}"`,
                email: correo,
                page: "Biblioteca HM",
            }),
        })

        handleApiError(response);

        const { data, message } = (await response.json()) as { data: string; message: string };
        return { data, message };
    } catch (error) {
        throw new Error("Error al enviar correo de la API " + error);
    }
}