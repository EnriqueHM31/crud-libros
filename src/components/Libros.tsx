import { useState } from "react";
import { useFilteredBooks } from "../hooks/Filters";
import { useBooksStore } from "../store/libro";
import Error from "./Atomos/Error";
import LoadingBooks from "./Atomos/Loading";
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
        <section className="flex flex-col py-6 px-8 bg-white dark:bg-primary-dark">
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
        </section>
    );
}
