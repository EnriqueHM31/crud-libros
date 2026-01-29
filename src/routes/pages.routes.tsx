import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import LoginDemo from "../pages/LoginDemo";

export function PagesRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginDemo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
