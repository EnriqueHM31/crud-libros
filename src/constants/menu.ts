import type { MenuItem } from "@/types/store";
import { FaHome, FaInfo, FaTags, FaBook, FaShoppingCart } from "react-icons/fa";
import { HiLanguage } from "react-icons/hi2";
import { FiHome, FiMail, FiPackage, FiStar, FiBook } from "react-icons/fi";

export const menuItems = [
    { key: "home", name: "Home", icon: FaHome },
    { key: "informacion", name: "Información", icon: FaInfo },
    { key: "categorias", name: "Categorias", icon: FaTags },
    { key: "lenguajes", name: "Lenguajes", icon: HiLanguage },
    { key: "libros", name: "Libros", icon: FaBook },
    { key: "pedidos", name: "Pedidos", icon: FaShoppingCart },
] as MenuItem[];


export const links = [
    { name: "Inicio", Icon: FiHome, href: "/usuario", private: false },
    { name: "Libros", Icon: FiBook, href: "/usuario/libros", private: false },
    { name: "Contacto", Icon: FiMail, href: "/usuario/contacto", private: false },
    { name: "Favoritos", Icon: FiStar, href: "/usuario/favoritos", private: true },
    { name: "Pedidos", Icon: FiPackage, href: "/usuario/pedidos", private: true },
];