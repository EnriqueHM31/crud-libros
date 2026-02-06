import { create } from "zustand";
import { useLenguajesStore } from "./lenguajes.store";

interface Lenguaje {
    id: string;
    nombre: string;
    abreviacion: string;
}

export interface LenguajesFiltersState {
    searchLenguaje: string;
    lenguajesFiltrados: Lenguaje[];

    setsearchLenguaje: (value: string) => void;
    filtrarLenguajes: (value: string) => void;
    resetFilters: () => void;
}
export const useLenguajesFiltersStore = create<LenguajesFiltersState>((set) => ({
    searchLenguaje: "",
    lenguajesFiltrados: [],

    setsearchLenguaje: (searchLenguaje) => set({ searchLenguaje }),

    filtrarLenguajes: (searchLenguaje) => {
        const { lenguajes } = useLenguajesStore.getState();

        const filtradas = lenguajes.filter((lenguaje) => lenguaje.nombre.toLowerCase().includes(searchLenguaje.toLowerCase()));

        set({
            lenguajesFiltrados: filtradas,
            searchLenguaje,
        });
    },

    resetFilters: () => {
        const { lenguajes } = useLenguajesStore.getState();

        set({
            searchLenguaje: "",
            lenguajesFiltrados: lenguajes,
        });
    },
}));
