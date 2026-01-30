import { useEffect } from "react";
import { useBooksStore } from "../store/libro";
import { useMenuStore } from "../store/menu";
import AsideNav from "../components/sections/AsideNav";
import Home from "../components/sections/Home";
import Libros from "../components/sections/Libros";
import Contacto from "../components/sections/Contacto";

export default function Dashboard() {
    const { currentMenu } = useMenuStore();
    const { cargarLibros } = useBooksStore();

    useEffect(() => {
        cargarLibros();
    }, [cargarLibros]);
    return (
        <main className="flex h-screen w-screen">
            <div className="flex-1">
                <AsideNav />
            </div>
            <div className="h-screen flex-4 overflow-y-auto">
                {currentMenu === "home" && <Home />}
                {currentMenu === "libros" && <Libros />}
                {currentMenu === "contacto" && <Contacto />}
            </div>
        </main>
    );
}
