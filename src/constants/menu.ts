import type { MenuItem } from "@/types/store";
import { FaHome, FaInfo, FaTags, FaBook, FaShoppingCart } from "react-icons/fa";
import { HiLanguage } from "react-icons/hi2";

export const menuItems = [
    { key: "home", name: "Home", icon: FaHome },
    { key: "informacion", name: "Información", icon: FaInfo },
    { key: "categorias", name: "Categorias", icon: FaTags },
    { key: "lenguajes", name: "Lenguajes", icon: HiLanguage },
    { key: "libros", name: "Libros", icon: FaBook },
    { key: "pedidos", name: "Pedidos", icon: FaShoppingCart },
] as MenuItem[];
