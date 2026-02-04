import { menuItems } from "@/constants/menu";
import type { MenuState } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMenuStore = create<MenuState>()(
    persist(
        (set, get) => ({
            menuItems: menuItems,

            currentMenu: "home",
            isOpen: true,

            setMenu: (menu) => {
                const item = get().menuItems.find((i) => i.key === menu);
                if (!item) return;

                set({ currentMenu: menu });
            },

            setIsOpen: (isOpen) => set({ isOpen }),
        }),
        {
            name: "menu-store",
            partialize: (state) => ({
                currentMenu: state.currentMenu,
            }),
        }
    )
);
