import AsideNav from "./components/AsideNav";
import { useMenuStore } from "./store/menu";
import Home from "./components/Home";
import Libros from "./components/Libros";
import Contacto from "./components/Contacto";
import { useBooksStore } from "./store/libro";
import { useEffect } from "react";

function App() {
    const { currentMenu } = useMenuStore();
    const { cargarLibros } = useBooksStore();

    useEffect(() => {
        cargarLibros();
    },
        [cargarLibros]);
    return (
        <main className="flex h-screen w-screen">
            <div className="flex-1">
                <AsideNav />
            </div>
            <div className="flex-4 p-5 overflow-y-auto h-screen">
                {currentMenu === "home" && <Home />}
                {currentMenu === "libros" && <Libros />}
                {currentMenu === "contacto" && <Contacto />}
            </div>
        </main>
    );
}

export default App;
