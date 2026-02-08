import { useState } from "react";
import { useFiltersBooks } from "../../../hooks/useFiltersLibro";
import { useBooksStore } from "../../../store/libro.store";

import Error from "../Atomos/Error";
import LoadingBooks from "../../Atomos/Loading";

import { BookModal } from "../Libros/sections/SelectedLibro";

import BooksFilters from "../Libros/sections/FiltersLibro";
import HeaderTypeFormatBook from "../Libros/sections/FormatoLibro";
import HeaderLibro from "@/components/Dashboard/Libros/sections/HeaderLibro";
import ListBooks from "../Libros/sections/ListLibro";
import MosaicoBooks from "@/components/Dashboard/Libros/sections/MosaicoLibro";
import NotResults from "../../Atomos/NotResults";
import { BookForm } from "@/components/Dashboard/Libros/sections/FormLibro";
import type { ViewMode } from "@/types/formLibro";
import { viewModes, FormType } from "@/constants/dashboard";

export default function Libros() {
    const { isLoading, error, selectedBook, modalMode, isModalOpen } = useBooksStore();

    const { books } = useFiltersBooks();
    const [viewMode, setViewMode] = useState<ViewMode>("list");

    const handleViewMode = (mode: ViewMode) => {
        setViewMode(mode);
    };

    if (isLoading) return <LoadingBooks />;
    const isFormMode = modalMode === "create" || modalMode === FormType.edit;

    return (
        <>
            {/* FORMULARIO CREATE / EDIT */}
            {modalMode === FormType.edit && selectedBook && <BookForm book={selectedBook} type={FormType.edit} />}

            {modalMode === FormType.create && <BookForm />}

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

                    {
                        error ? (
                            <Error error={error} />
                        ) : !books || books.length === 0 ? (
                            <NotResults error="No se encontraron resultados para la búsqueda" />
                        ) : (
                            <>
                                {/* GRID VIEW */}
                                {viewMode === viewModes.grid && <MosaicoBooks />}

                                {/* LIST VIEW */}
                                {viewMode === viewModes.list && <ListBooks />}
                            </>
                        )
                    }


                </section>
            )}
        </>
    );
}
