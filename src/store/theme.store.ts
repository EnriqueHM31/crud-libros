import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeMode, ThemeState } from "@/types/store";
import { theme } from "@/constants/theme";

export const useThemeStore = create(
    persist<ThemeState>(
        (set, get) => ({
            mode: theme.light as ThemeMode,

            setMode: (mode) => {
                const html = document.documentElement;
                html.classList.toggle(theme.dark, mode === theme.dark);

                set({ mode });
            },

            toggleMode: () => {
                const nextMode: ThemeMode = (get().mode === theme.light ? theme.dark : theme.light) as ThemeMode;
                document.documentElement.classList.toggle(theme.dark, nextMode === theme.dark);

                set({ mode: nextMode });
            },
        }),
        {
            name: "theme-mode",

            onRehydrateStorage: () => (state) => {
                if (!state) return;

                document.documentElement.classList.toggle(theme.dark, state.mode === theme.dark);
            },
        }
    )
);
