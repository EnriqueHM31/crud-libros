import { useDebouncedValue } from "@/hooks/useDebounce";
import { useLenguajesFiltersStore } from "@/store/filterLenguajes.store";
import { useLenguajesStore } from "@/store/lenguajes.store";
import { useEffect } from "react";




export function useFilterLenguajes() {
    const { searchLenguaje, lenguajesFiltrados, setsearchLenguaje, filtrarLenguajes, resetFilters } = useLenguajesFiltersStore();

    const { lenguajes } = useLenguajesStore();

    // 🔥 debounce del texto
    const debouncedSearch = useDebouncedValue(searchLenguaje, 300);

    /**
     * Inicializa lista filtrada
     */
    useEffect(() => {
        useLenguajesFiltersStore.setState({
            lenguajesFiltrados: lenguajes,
        });
    }, [lenguajes]);

    /**
     * Filtra cuando el debounce cambia
     */
    useEffect(() => {
        filtrarLenguajes(debouncedSearch);
    }, [debouncedSearch, filtrarLenguajes]);

    /**
     * Input handler (sin lógica pesada)
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchLenguaje(e.target.value);
    };

    const handleReset = () => {
        resetFilters();
    };

    return {
        searchLenguaje,
        lenguajes: lenguajesFiltrados,
        handleChange,
        handleReset,
    };
}
