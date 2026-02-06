import { useEffect } from "react";
import { useCategoriesFiltersStore } from "@/store/filterCategorias.store";
import { useCategoriasStore } from "@/store/categorias.store";
import { useDebouncedValue } from "@/hooks/useDebounce";

export function useFilterCategories() {
    const { searchCategoria, categoriasFiltradas, setSearchCategoria, filtrarCategorias, resetFilters } = useCategoriesFiltersStore();

    const categoriasOriginales = useCategoriasStore((s) => s.categorias);

    // 🔥 debounce del texto
    const debouncedSearch = useDebouncedValue(searchCategoria, 300);

    /**
     * Inicializa lista filtrada
     */
    useEffect(() => {
        useCategoriesFiltersStore.setState({
            categoriasFiltradas: categoriasOriginales,
        });
    }, [categoriasOriginales]);

    /**
     * Filtra cuando el debounce cambia
     */
    useEffect(() => {
        filtrarCategorias(debouncedSearch);
    }, [debouncedSearch, filtrarCategorias]);

    /**
     * Input handler (sin lógica pesada)
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCategoria(e.target.value);
    };

    const handleReset = () => {
        resetFilters();
    };

    return {
        searchCategoria,
        categorias: categoriasFiltradas,
        handleChange,
        handleReset,
    };
}
