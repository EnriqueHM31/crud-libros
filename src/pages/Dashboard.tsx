import Categorias from "@/components/Dashboard/sections/Categorias";
import Pedidos from "@/components/Dashboard/sections/Pedidos";
import { useCategoriasStore } from "@/store/categorias.store";
import { useEffect } from "react";
import AsideNav from "../components/Dashboard/sections/AsideNav";
import Home from "../components/Dashboard/sections/Home";
import Informacion from "../components/Dashboard/sections/Informacion";
import Libros from "../components/Dashboard/sections/Libros";
import { useBooksStore } from "../store/libro.store";
import { useMenuStore } from "../store/menu.store";
import Lenguajes from "@/components/Dashboard/sections/Lenguajes";
import { useLenguajesStore } from "@/store/lenguajes.store";

export default function Dashboard() {
    const { currentMenu } = useMenuStore();
    const { cargarLibros } = useBooksStore();
    const { obtenerCategorias } = useCategoriasStore();
    const { obtenerLenguajes } = useLenguajesStore();
    useEffect(() => {
        cargarLibros();
        obtenerCategorias();
        obtenerLenguajes();
    }, [cargarLibros, obtenerCategorias, obtenerLenguajes]);
    return (
        <main className="flex h-screen w-screen">
            <div className="md:flex-1">
                <AsideNav />
            </div>
            <div className="dark:bg-primary-dark flex h-screen min-h-screen w-full flex-4 flex-col overflow-y-auto bg-white px-4 py-20 md:px-8 md:py-9">
                {currentMenu === "home" && <Home />}
                {currentMenu === "informacion" && <Informacion />}
                {currentMenu === "categorias" && <Categorias />}
                {currentMenu === "lenguajes" && <Lenguajes />}
                {currentMenu === "libros" && <Libros />}
                {currentMenu === "pedidos" && <Pedidos />}
            </div>
        </main>
    );
}
