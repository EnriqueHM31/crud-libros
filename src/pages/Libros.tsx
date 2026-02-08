import BooksFiltersLanding from "@/components/Landing/FiltersLibroLanding";
import LibroCard from "@/components/Landing/LibroCard";
import { useFiltersBooks } from "@/hooks/useFiltersLibro";
import Layout from "@/layout/Layout";
import { useBooksStore } from "@/store/libro.store";
import { useEffect } from "react";

export default function Libros() {
    const { cargarLibros } = useBooksStore();
    const { books, total } = useFiltersBooks();

    useEffect(() => {
        cargarLibros();
    }, [cargarLibros]);
    return (
        <Layout>
            <div className="flex min-h-screen max-w-7xl flex-col gap-5 bg-white text-black dark:bg-black dark:text-white">
                <div className="mt-15 flex items-center justify-between gap-2">
                    <h1 className="text-4xl font-bold">Catalogo de libros</h1>
                    <p className="text-sm font-bold text-black dark:text-zinc-400">Mostrando {total} libros</p>
                </div>

                <p className="w-full text-black dark:text-gray-400 ">En esta página encontrarás el catálogo de libros disponibles en la librería HM. Aquí podrás explorar los títulos, filtrar por idioma o categoría y visualizar la información básica de cada libro para ubicarlo de forma rápida y sencilla.</p>
                <BooksFiltersLanding />

                <div className="max mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {books.map((book) => (
                        <LibroCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
