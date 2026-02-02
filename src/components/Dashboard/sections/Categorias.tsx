import { useFilteredBooks } from "../../../hooks/Filters";
import LoadingBooks from "../../Atomos/Loading";
import Error from "../Atomos/Error";

import CategoryModal from "../Categorias/ModalCategoria";
import FiltersCategorias from "../Categorias/FiltersCategorias";
import HeaderCategorias from "../Categorias/HeaderCategorias";
import ListaCategorias from "../Categorias/ListaCategorias";
import NotResults from "../Libros/NotResults";

import { useCategoriasStore } from "@/store/categorias";

export default function Categorias() {
    const { isLoading, error, modalMode } = useCategoriasStore();
    const { books } = useFilteredBooks();

    if (isLoading) return <LoadingBooks />;

    const isFormMode = modalMode === "create" || modalMode === "edit";

    return (
        <>
            {/* MODAL CREATE / EDIT */}
            <CategoryModal />

            {/* LISTADO */}
            {!isFormMode && (
                <section className="flex flex-col gap-5">
                    {
                        error ? (
                            <Error error={error} />
                        ) : (
                            <>
                                <HeaderCategorias />
                                <FiltersCategorias />

                                {!books || books.length === 0 ? (
                                    <NotResults error="No se encontraron resultados para la categoría buscada" />
                                ) : (
                                    <ListaCategorias />
                                )}
                            </>
                        )
                    }
                </section>
            )}
        </>
    );
}
