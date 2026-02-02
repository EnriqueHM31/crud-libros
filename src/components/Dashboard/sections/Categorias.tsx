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
    const { isLoading, error } = useCategoriasStore();
    const { books } = useFilteredBooks();

    if (isLoading) return <LoadingBooks />;

    return (
        <>

            {/* LISTADO */}
            <section className="flex flex-col gap-5">
                {/* MODAL CREATE / EDIT */}
                <CategoryModal />
                <HeaderCategorias />
                <FiltersCategorias />

                {error ? (
                    <Error error={error} />
                ) : (
                    !books || books.length === 0 ? <NotResults error="No se encontraron resultados para la categoría buscada" /> : <ListaCategorias />

                )}
            </section>
        </>
    );
}
