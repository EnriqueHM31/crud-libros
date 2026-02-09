export interface LoginResponse {
    user: {
        id: string;
        username: string;
    };
}

export async function loginService(username: string, password: string): Promise<LoginResponse> {
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

export async function logoutService(): Promise<void> {
    const res = await fetch(import.meta.env.VITE_API_URL_AUTH + "/logout", {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Error al cerrar sesión");
    }
}

export async function meService() {
    const res = await fetch(import.meta.env.VITE_API_URL_AUTH + "/me", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("No autenticado");
    }

    return res.json();
}
