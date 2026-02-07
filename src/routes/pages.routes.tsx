import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingBooks from "../components/Atomos/Loading";
import LoginDemo from "../pages/LoginDemo";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Landing = lazy(() => import("../pages/Landing"));
const Pedidos = lazy(() => import("../pages/Pedidos"));
const Libros = lazy(() => import("../pages/Libros"));
const Contacto = lazy(() => import("../pages/Contacto"));
const Favoritos = lazy(() => import("../pages/Favoritos"));

export function PagesRoutes() {
    return (
        <Suspense
            fallback={
                <div className="dark:bg-primary-dark flex min-h-screen items-center justify-center bg-white">
                    <LoadingBooks />.
                </div>
            }
        >
            <Routes>
                <Route path="/" element={<LoginDemo />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/usuario" element={<Landing />} />
                <Route path="/libros" element={<Libros />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}
