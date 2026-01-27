import { useState } from "react";
import { useBooksStore } from "../store/libro";
import Error from "./Atomos/Error";
import LoadingBooks from "./Atomos/Loading";
import HeaderTypeFormatBook from "./Libros/HeaderTypeFormatBook";
import ListBooks from "./Libros/ListBooks";
import MosaicoBooks from "./Libros/MosaicoBooks";


type ViewMode = "list" | "grid";
const viewModes = {
    list: "list",
    grid: "grid",
} as const;

export default function Libros() {
    const { isLoading, error } = useBooksStore();
    const [viewMode, setViewMode] = useState<ViewMode>("list");

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
        <section className="flex flex-col gap-6">
            {/* Header */}
            <HeaderTypeFormatBook viewMode={viewMode} handleViewMode={handleViewMode} />

            {/* GRID VIEW */}
            {viewMode === viewModes.grid && (
                <MosaicoBooks />
            )}

            {/* LIST VIEW */}
            {viewMode === viewModes.list && (
                <ListBooks />
            )}
        </section>
    );
}
