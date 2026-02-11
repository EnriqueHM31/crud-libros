import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoadingBooks from "../components/Atomos/Loading";
import LoginDemo from "../pages/LoginDemo";
import { useAuthStore } from "@/store/autenticacion.store";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Landing = lazy(() => import("../pages/Landing"));
const Pedidos = lazy(() => import("../pages/Pedidos"));
const Libros = lazy(() => import("../pages/Libros"));
const Contacto = lazy(() => import("../pages/Contacto"));
const Favoritos = lazy(() => import("../pages/Favoritos"));

export function PagesRoutes() {
    const { checkAuth, checking } = useAuthStore();
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (checking) return <div>Cargando sesión...</div>;
    return (
        <Suspense
            fallback={
                <div
                    className={`${location.pathname.includes("usuario") ? "bg-zinc-950" : "dark:bg-primary-dark"} flex min-h-screen items-center justify-center`}
                >
                    <LoadingBooks style={location.pathname.includes("usuario") ? "bg-zinc-950" : "dark:bg-primary-dark"} />
                </div>
            }
        >
            <Routes>
                <Route path="/" element={<LoginDemo />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/usuario" element={<Landing />} />

                <Route path="/usuario" element={null}>
                    <Route path="libros" element={<Libros />} />
                    <Route path="contacto" element={<Contacto />} />
                    <Route path="favoritos" element={<Favoritos />} />
                    <Route path="pedidos" element={<Pedidos />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}
