import BooksFiltersLanding from "@/components/Landing/FiltersLibroLanding";
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
            <div className="flex min-h-screen max-w-7xl flex-col gap-5 bg-white  text-black dark:bg-black dark:text-white">
                <h1 className=" text-4xl font-bold">Catalogo de libros</h1>

                <BooksFiltersLanding />

                <div className="max grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {books.map((book) => (
                        <LibroCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
