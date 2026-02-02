import { useFilteredBooks } from "../../../hooks/Filters";

import LoadingBooks from "../../Atomos/Loading";
import Error from "../Atomos/Error";

import { BookModal } from "../Libros/BookSelected";

import { useCategoriasStore } from "@/store/categorias";
import FiltersCategorias from "../Categorias/FiltersCategorias";
import HeaderCategorias from "../Categorias/HeaderCategorias";
import ListaCategorias from "../Categorias/ListaCategorias";
import { BookForm } from "../Libros/FormBook";
import NotResults from "../Libros/NotResults";
import CategoryForm from "../Categorias/CategoriaForm";


export default function Categorias() {
    const { isLoading, error, selectedCategory, modalMode, isModalOpen } = useCategoriasStore();

    const { books } = useFilteredBooks();

    if (isLoading) return <LoadingBooks />;
    if (error) return <Error error={error} />;
    const isFormMode = modalMode === "create" || modalMode === "edit";

    return (
        <>
            {/* FORMULARIO CREATE / EDIT */}
            {modalMode === "edit" && selectedCategory && <CategoryForm initialData={selectedCategory} type="edit" />}

            {modalMode === "create" && <BookForm />}

            {/* MODAL VIEW */}
            {isModalOpen && modalMode === "view" && <CategoryForm book={selectedCategory} type="create" />}

            {!isFormMode && (
                <section className="flex flex-col gap-5">
                    {/* Header */}
                    <HeaderCategorias />

                    {/* Filters */}
                    <FiltersCategorias />

                    {/* Selector de formato */}

                    {/* Sin resultados */}
                    {!books || books.length === 0 ? (
                        <NotResults error="No se encontraron resultados para la categoria buscada" />
                    ) : (
                        <ListaCategorias />
                    )}
                </section>
            )}
        </>
    );
}
