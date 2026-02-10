import BooksFiltersLanding from "@/components/Landing/FiltersLibroLanding";
import LibroCard from "@/components/Landing/LibroCard";
import ModalLibro from "@/components/Landing/ModalLibro";
import { useFiltersBooks } from "@/hooks/useFiltersLibro";
import Layout from "@/layout/Layout";
import { useBooksStore } from "@/store/libro.store";
import type { GoogleBook } from "@/types/libro";
import { useEffect, useState } from "react";

export default function Libros() {
    const { cargarLibros } = useBooksStore();
    const { books, total } = useFiltersBooks();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<GoogleBook | null>(null);

    const handleOpenModal = (book: GoogleBook) => {
        setSelected(book);
        setOpen(true);
    };

    useEffect(() => {
        cargarLibros();
    }, [cargarLibros]);
    return (
        <Layout>
            <ModalLibro open={open} onClose={() => setOpen(false)} book={selected} />
            <div className="flex min-h-screen max-w-7xl flex-col gap-5 bg-white text-black dark:bg-black dark:text-white">
                <div className="mt-15 flex flex-col items-center justify-between gap-2 md:flex-row">
                    <h1 className="text-2xl font-bold md:text-4xl">Catalogo de libros</h1>
                    <p className="text-sm font-bold text-black dark:text-zinc-400">Mostrando {total} libros</p>
                </div>

                <p className="w-full text-center text-black md:text-left dark:text-gray-400">
                    En esta página encontrarás el catálogo de libros disponibles en la librería HM. Aquí podrás explorar los títulos, filtrar por idioma o
                    categoría y visualizar la información básica de cada libro para ubicarlo de forma rápida y sencilla.
                </p>
                <BooksFiltersLanding />

                <div className="mt-7 grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-3">
                    {books.map((book) => (
                        <LibroCard key={book.id} book={book} onClickModal={handleOpenModal} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
