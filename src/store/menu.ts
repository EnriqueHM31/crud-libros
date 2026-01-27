import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FaHome, FaBook, FaComment } from "react-icons/fa";
import type React from "react";

export type MenuKey = "home" | "libros" | "contacto";

type MenuItem = {
    key: MenuKey;
    name: string;
    path: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

interface MenuState {
    menuItems: MenuItem[];
    currentMenu: MenuKey;
    isOpen: boolean;

    setMenu: (menu: MenuKey) => void;
    setIsOpen: (open: boolean) => void;
    syncFromUrl: () => void;
}

export const useMenuStore = create<MenuState>()(
    persist(
        (set, get) => ({
            menuItems: [
                { key: "home", name: "Home", path: "/", icon: FaHome },
                { key: "libros", name: "Libros", path: "/libros", icon: FaBook },
                { key: "contacto", name: "Contacto", path: "/contacto", icon: FaComment },
            ],

            currentMenu: "home",
            isOpen: true,

            setMenu: (menu) => {
                const item = get().menuItems.find((i) => i.key === menu);
                if (!item) return;

                window.history.pushState({}, "", item.path);
                set({ currentMenu: menu });
            },

            setIsOpen: (isOpen) => set({ isOpen }),

            syncFromUrl: () => {
                const path = window.location.pathname;
                const found = get().menuItems.find((i) => i.path === path);
                if (found) set({ currentMenu: found.key });
            },
        }),
        {
            name: "menu-store",
            partialize: (state) => ({
                currentMenu: state.currentMenu,
            }),
        }
    )
);