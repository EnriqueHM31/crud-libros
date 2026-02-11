import { handleApiError } from "@/utils/errors";

export interface User {
    id: string;
    username: string;
}

export interface ReponseUsuario {
    data: User;
    message: string;
}
export async function registrarUsuario({ username, password, correo }: { username: string; password: string; correo: string }): Promise<ReponseUsuario> {
    const response = await fetch(import.meta.env.VITE_API_URL_AUTH + "/registrar-usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // clave para cookies
        body: JSON.stringify({
            username,
            correo,
            password,
        }),
    });

    await handleApiError(response);

    const { data, message } = (await response.json()) as { data: User; message: string };
    return { data, message };
}

export async function IniciarSesion(username: string, password: string): Promise<ReponseUsuario> {
    const response = await fetch(import.meta.env.VITE_API_URL_AUTH + "/iniciar-sesion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // clave para cookies
        body: JSON.stringify({ username, password }),
    });

    await handleApiError(response);

    const { data, message } = (await response.json()) as { data: User; message: string };
    return { data, message };
}

export async function CerrarSesion(): Promise<ReponseUsuario> {
    const response = await fetch(import.meta.env.VITE_API_URL_AUTH + "/cerrar-sesion", {
        method: "POST",
        credentials: "include",
    });

    await handleApiError(response);

    const { data, message } = (await response.json()) as { data: User; message: string };
    return { data, message };
}

export async function obtenerUsuario() {
    const response = await fetch(import.meta.env.VITE_API_URL_AUTH + "/usuario", {
        method: "GET",
        credentials: "include",
    });

    const { data, message } = (await response.json()) as { data: User; message: string };
    return { data, message };
}
