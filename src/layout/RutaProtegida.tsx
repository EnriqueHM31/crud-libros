import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/autenticacion.store";

export default function RutaProtegida() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const checking = useAuthStore((s) => s.checking);

    if (checking) return null; // o loader

    if (!isAuthenticated) {
        return <Navigate to="/usuario" replace />;
    }

    return <Outlet />;
}
