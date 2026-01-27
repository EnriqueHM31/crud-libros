import AsideNav from "./components/AsideNav";
import { useMenuStore } from "./store/menu";
import Home from "./components/Home";
import Libros from "./components/Libros";
import Contacto from "./components/Contacto";

function App() {
    const { currentMenu } = useMenuStore();
    return (
        <main className="flex h-screen w-screen">
            <div className="flex-1">
                <AsideNav />
            </div>
            <div className="flex-4 p-5">
                {currentMenu === "home" && <Home />}
                {currentMenu === "libros" && <Libros />}
                {currentMenu === "contacto" && <Contacto />}
            </div>
        </main>
    );
}

export default App;
