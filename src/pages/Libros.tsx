import LibroCard from "@/components/Landing/LibroCard";
import { useFiltersBooks } from "@/hooks/useFiltersLibro";
import Layout from "@/layout/Layout";
import { useBooksStore } from "@/store/libro.store";
import { useEffect } from "react";

export default function Libros() {
    const { cargarLibros } = useBooksStore();
    const { books } = useFiltersBooks();

    useEffect(() => {
        cargarLibros();
    }, [cargarLibros]);
    return (
        <Layout>
            <div className="min-h-screen flex flex-col gap-5 bg-white  text-black dark:bg-black dark:text-white max-w-7xl py-10">
                <h1 className="text-4xl font-bold py-5" >Catalogo de libros</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 max">
                    {books.map((book) => (
                        <LibroCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
