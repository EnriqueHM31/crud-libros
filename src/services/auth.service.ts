export interface LoginResponse {
    user: {
        id: string;
        username: string;
    };
}

export async function registrarUsuario(username: string, password: string): Promise<LoginResponse> {
    const res = await fetch(import.meta.env.VITE_API_URL_AUTH + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // clave para cookies
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Error en login");
    }

    return res.json();
}

export async function IniciarSesion(username: string, password: string): Promise<LoginResponse> {
    const res = await fetch(import.meta.env.VITE_API_URL_AUTH + "/iniciar-sesion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // clave para cookies
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Error en login");
    }

    return res.json();
}

export async function CerrarSesion(): Promise<void> {
    const res = await fetch(import.meta.env.VITE_API_URL_AUTH + "/cerrar-sesion", {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Error al cerrar sesión");
    }
}

export async function obtenerUsuario() {
    const res = await fetch(import.meta.env.VITE_API_URL_AUTH + "/usuario", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("No autenticado");
    }

    return res.json();
}
