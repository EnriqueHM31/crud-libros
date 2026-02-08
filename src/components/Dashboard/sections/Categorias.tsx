import LoadingBooks from "../../Atomos/Loading";
import Error from "../Atomos/Error";

import FiltersCategorias from "../Categorias/FiltersCategoria";
import HeaderCategorias from "../Categorias/HeaderCategoria";
import ListaCategorias from "../Categorias/ListaCategoria";
import CategoryModal from "../Categorias/ModalCategoria";
import NotResults from "../../Atomos/NotResults";

import { useFilterCategories } from "@/hooks/useFilterCategoria";
import { useCategoriasStore } from "@/store/categorias.store";

export default function Categorias() {
    const { isLoading, error } = useCategoriasStore();
    const { categorias } = useFilterCategories();

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
                    <Error error={error.message ?? "Ocurrió un error inesperado"} title={error.title ?? "Error"} />
                ) : !categorias || categorias.length === 0 ? (
                    <NotResults error="No se encontraron resultados para la categoría buscada" />
                ) : (
                    <ListaCategorias />
                )}
            </section>
        </>
    );
}
