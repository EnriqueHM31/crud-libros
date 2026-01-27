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

                if (mode === "dark") {
                    html.classList.add("dark");
                } else {
                    html.classList.remove("dark");
                }

                set({ mode });
            },

            toggleMode: () => {
                const nextMode = get().mode === "light" ? "dark" : "light";
                const html = document.documentElement;

                if (nextMode === "dark") {
                    html.classList.add("dark");
                } else {
                    html.classList.remove("dark");
                }

                set({ mode: nextMode });
            },
        }),
        {
            name: "theme-mode",
        }
    )
);
