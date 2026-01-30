import { Route, Routes } from "react-router-dom";
import LoginDemo from "../pages/LoginDemo";
import { lazy, Suspense } from "react";
import LoadingBooks from "../components/Atomos/Loading";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));

export function PagesRoutes() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-primary-dark"><LoadingBooks />.</div>
        }>
            <Routes>
                <Route path="/" element={<LoginDemo />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}
