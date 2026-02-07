import Layout from "@/layout/Layout";
import { useBooksStore } from "@/store/libro.store";
import { useEffect } from "react";

export default function Landing() {

    const { cargarLibros } = useBooksStore();

    useEffect(() => {
        cargarLibros();
    }, [cargarLibros]);

    return (
        <Layout>
            <h1 className="text-primary-dark text-4xl font-bold">Bienvenido a la librería de libros</h1>
        </Layout>
    );
}
