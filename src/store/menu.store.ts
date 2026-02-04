import type { MenuState } from "@/types/store";
import { FaBook, FaHome, FaInfo, FaShoppingCart, FaTags } from "react-icons/fa";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMenuStore = create<MenuState>()(
    persist(
        (set, get) => ({
            menuItems: [
                { key: "home", name: "Home", icon: FaHome },
                { key: "informacion", name: "Información", icon: FaInfo },
                { key: "categorias", name: "Categorias", icon: FaTags },
                { key: "libros", name: "Libros", icon: FaBook },
                { key: "pedidos", name: "Pedidos", icon: FaShoppingCart },
            ],

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
