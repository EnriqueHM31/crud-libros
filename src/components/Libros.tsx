import { useState } from "react";
import { useFilteredBooks } from "../hooks/Filters";
import { useBooksStore } from "../store/libro";

import Error from "./Atomos/Error";
import LoadingBooks from "./Atomos/Loading";

import { BookModal } from "./Libros/BookSelected";

import BooksFilters from "./Libros/Filters";
import HeaderTypeFormatBook from "./Libros/FormatoBooks";
import HeaderLibro from "./Libros/HeaderLibro";
import ListBooks from "./Libros/ListBooks";
import MosaicoBooks from "./Libros/MosaicoBooks";
import NotResults from "./Libros/NotResults";
import { BookForm } from "./FormBook";

type ViewMode = "list" | "grid";

const viewModes = {
    list: "list",
    grid: "grid",
} as const;

export default function Libros() {
    const { isLoading, error, selectedBook, modalMode, isModalOpen } = useBooksStore();

    const books = useFilteredBooks();
    const [viewMode, setViewMode] = useState<ViewMode>("list");

    const handleViewMode = (mode: ViewMode) => {
        setViewMode(mode);
    };

    if (isLoading) return <LoadingBooks />;
    if (error) return <Error error={error} />;
    const isFormMode = modalMode === "create" || modalMode === "edit";

    return (
        <>
            {/* FORMULARIO CREATE / EDIT */}
            {modalMode === "edit" && selectedBook && <BookForm book={selectedBook} type="edit" />}

            {modalMode === "create" && <BookForm />}

            {/* MODAL VIEW */}
            {isModalOpen && modalMode === "view" && <BookModal book={selectedBook} />}

            {!isFormMode && (
                <section className="dark:bg-primary-dark flex min-h-screen flex-col bg-white px-8 py-6">
                    {/* Header */}
                    <HeaderLibro />

                    {/* Filters */}
                    <BooksFilters />

                    {/* Selector de formato */}
                    <HeaderTypeFormatBook viewMode={viewMode} handleViewMode={handleViewMode} />

                    {/* Sin resultados */}
                    {!books || books.length === 0 ? (
                        <NotResults />
                    ) : (
                        <>
                            {/* GRID VIEW */}
                            {viewMode === viewModes.grid && <MosaicoBooks />}

                            {/* LIST VIEW */}
                            {viewMode === viewModes.list && <ListBooks />}
                        </>
                    )}
                </section>
            )}
        </>
    );
}
