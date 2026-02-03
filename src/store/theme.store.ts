import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark";

interface ThemeState {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
}

export const useThemeStore = create(
    persist<ThemeState>(
        (set, get) => ({
            mode: "light",

            setMode: (mode) => {
                const html = document.documentElement;

                html.classList.toggle("dark", mode === "dark");

                set({ mode });
            },

            toggleMode: () => {
                const nextMode: ThemeMode = get().mode === "light" ? "dark" : "light";

                document.documentElement.classList.toggle("dark", nextMode === "dark");

                set({ mode: nextMode });
            },
        }),
        {
            name: "theme-mode",

            // 🔥 CLAVE: sincroniza el DOM al cargar desde localStorage
            onRehydrateStorage: () => (state) => {
                if (!state) return;

                document.documentElement.classList.toggle("dark", state.mode === "dark");
            },
        }
    )
);
