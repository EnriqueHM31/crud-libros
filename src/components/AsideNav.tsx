import { useThemeStore } from "../store/theme";

export default function AsideNav() {
    const { toggleMode } = useThemeStore();
    return (
        <aside className="bg-background-secondary h-screen w-72 flex flex-col justify-between">
            <h1 className="text-2xl font-bold">
                <span className="text-blue-500">Libros</span> HM
            </h1>
            <nav className="flex flex-col gap-y-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">
                    Home
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                    About
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                    Contact
                </a>
            </nav>

            <footer className="flex justify-center gap-x-4 p-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Sign Up
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={toggleMode}
                >
                    Cambiar Tema
                </button>
            </footer>
        </aside>
    )
}