import Layout from "@/layout/Layout";
import { Outlet } from "react-router-dom";

export default function Landing() {


    return (
        <Layout>
            <Outlet />
            <h1 className="text-primary-dark text-4xl font-bold">Bienvenido a la librería de libros</h1>
        </Layout>
    );
}
