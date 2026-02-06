import { useLenguajesStore } from "@/store/lenguajes.store";
import FiltersLenguajes from "../Lenguajes/FiltersLenguaje";
import HeaderLenguaje from "../Lenguajes/HeaderLenguaje";
import LoadingBooks from "@/components/Atomos/Loading";
import Error from "@/components/Dashboard/Atomos/Error";
import { useFilterLenguajes } from "@/hooks/useFilterLenguaje";
import NotResults from "@/components/Atomos/NotResults";
import ListaLenguajes from "../Lenguajes/ListaLenguaje";
import LenguajeModal from "../Lenguajes/ModalLenguaje";

export default function Lenguajes() {
    const { isLoading, error } = useLenguajesStore();
    const { lenguajes } = useFilterLenguajes();

    if (isLoading) return <LoadingBooks />;

    return (
        <section className="flex flex-col gap-5">
            <LenguajeModal />

            <HeaderLenguaje />
            <FiltersLenguajes />

            {error ? (
                <Error error={error} />
            ) : !lenguajes || lenguajes.length === 0 ? (
                <NotResults error="No se encontraron resultados para la categoría buscada" />
            ) : (
                <ListaLenguajes />
            )}
        </section>
    );
}
