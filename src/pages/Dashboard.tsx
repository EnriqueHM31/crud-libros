import { useEffect } from "react";
import { useBooksStore } from "../store/libro";
import { useMenuStore } from "../store/menu";
import AsideNav from "../components/Dashboard/sections/AsideNav";
import Home from "../components/Dashboard/sections/Home";
import Libros from "../components/Dashboard/sections/Libros";
import Contacto from "../components/Dashboard/sections/Contacto";

export default function Dashboard() {
    const { currentMenu } = useMenuStore();
    const { cargarLibros } = useBooksStore();

    useEffect(() => {
        cargarLibros();
    }, [cargarLibros]);
    return (
        <main className="flex h-screen w-screen">
            <div className="md:flex-1">
                <AsideNav />
            </div>
            <div className="h-screen flex-4 overflow-y-auto py-10 md:py-0">
                {currentMenu === "home" && <Home />}
                {currentMenu === "libros" && <Libros />}
                {currentMenu === "contacto" && <Contacto />}
            </div>
        </main>
    );
}
