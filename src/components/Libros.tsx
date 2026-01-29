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

type ViewMode = "list" | "grid";
const viewModes = {
    list: "list",
    grid: "grid",
} as const;

export default function Libros() {
    const { isLoading, error } = useBooksStore();
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const books = useFilteredBooks();

    const { selectedBook } = useBooksStore();

    const handleViewMode = (viewMode: ViewMode) => {
        setViewMode(viewMode);
    };

    if (isLoading) {
        return <LoadingBooks />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <section className="dark:bg-primary-dark flex min-h-screen flex-col bg-white px-8 py-6">
            {/* Header */}
            <HeaderLibro />
            {/* Filters */}
            <BooksFilters />
            {/* Formato */}
            <HeaderTypeFormatBook viewMode={viewMode} handleViewMode={handleViewMode} />
            {!books || (books.length === 0 && <NotResults />)}
            {/* GRID VIEW */}
            {viewMode === viewModes.grid && <MosaicoBooks />}
            {/* LIST VIEW */}
            {viewMode === viewModes.list && <ListBooks />}
            <BookModal book={selectedBook} onEdit={(book) => console.log("Editar", book)} onDelete={(id) => console.log("Eliminar", id)} />;
        </section>
    );
}
