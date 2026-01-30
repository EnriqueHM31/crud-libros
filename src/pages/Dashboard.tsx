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
            <div className="h-screen flex-4 overflow-y-auto dark:bg-primary-dark flex min-h-screen w-full flex-col bg-white px-4 py-20 md:py-0 md:px-8 ">
                {currentMenu === "home" && <Home />}
                {currentMenu === "libros" && <Libros />}
                {currentMenu === "contacto" && <Contacto />}
            </div>
        </main>
    );
}
