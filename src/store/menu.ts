import type React from "react";
import { FaBook, FaHome, FaInfo, FaShoppingCart } from "react-icons/fa";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MenuKey = "home" | "libros" | "contacto" | "pedidos" | "informacion";

type MenuItem = {
    key: MenuKey;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

interface MenuState {
    menuItems: MenuItem[];
    currentMenu: MenuKey;
    isOpen: boolean;

    setMenu: (menu: MenuKey) => void;
    setIsOpen: (open: boolean) => void;
}

export const useMenuStore = create<MenuState>()(
    persist(
        (set, get) => ({
            menuItems: [
                { key: "home", name: "Home", icon: FaHome },
                { key: "informacion", name: "Información", icon: FaInfo },
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
