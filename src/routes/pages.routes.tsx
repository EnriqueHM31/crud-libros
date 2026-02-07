import { Route, Routes } from "react-router-dom";
import LoginDemo from "../pages/LoginDemo";
import { lazy, Suspense } from "react";
import LoadingBooks from "../components/Atomos/Loading";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Landing = lazy(() => import("../pages/Landing"));

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
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}
