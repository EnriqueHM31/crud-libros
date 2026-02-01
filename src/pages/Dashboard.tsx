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
            <div className="dark:bg-primary-dark flex h-screen min-h-screen w-full flex-4 flex-col overflow-y-auto bg-white px-4 py-20 md:px-8 md:py-9">
                {currentMenu === "home" && <Home />}
                {currentMenu === "libros" && <Libros />}
                {currentMenu === "contacto" && <Contacto />}
            </div>
        </main>
    );
}
