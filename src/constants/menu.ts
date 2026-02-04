import type { MenuItem } from "@/types/store";
import { FaHome, FaInfo, FaTags, FaBook, FaShoppingCart } from "react-icons/fa";

export const menuItems = [
    { key: "home", name: "Home", icon: FaHome },
    { key: "informacion", name: "Información", icon: FaInfo },
    { key: "categorias", name: "Categorias", icon: FaTags },
    { key: "libros", name: "Libros", icon: FaBook },
    { key: "pedidos", name: "Pedidos", icon: FaShoppingCart },
] as MenuItem[];
