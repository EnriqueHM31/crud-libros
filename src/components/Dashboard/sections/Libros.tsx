import { useState } from "react";
import { useFiltersBooks } from "../../../hooks/useFiltersBooks";
import { useBooksStore } from "../../../store/libro";

import Error from "../Atomos/Error";
import LoadingBooks from "../../Atomos/Loading";

import { BookModal } from "../Libros/BookSelected";

import BooksFilters from "../Libros/Filters";
import HeaderTypeFormatBook from "../Libros/FormatoBooks";
import HeaderLibro from "../Libros/HeaderLibro";
import ListBooks from "../Libros/ListBooks";
import MosaicoBooks from "../Libros/MosaicoBooks";
import NotResults from "../Libros/NotResults";
import { BookForm } from "../Libros/FormBook";

type ViewMode = "list" | "grid";

const viewModes = {
    list: "list",
    grid: "grid",
} as const;

export default function Libros() {
    const { isLoading, error, selectedBook, modalMode, isModalOpen } = useBooksStore();

    const { books } = useFiltersBooks();
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
                <section className="flex flex-col gap-5">
                    {/* Header */}
                    <HeaderLibro />

                    {/* Filters */}
                    <BooksFilters />

                    {/* Selector de formato */}
                    <HeaderTypeFormatBook viewMode={viewMode} handleViewMode={handleViewMode} />

                    {/* Sin resultados */}
                    {!books || books.length === 0 ? (
                        <NotResults error="No se encontraron resultados para la búsqueda" />
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
