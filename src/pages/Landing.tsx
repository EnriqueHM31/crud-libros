import Navbar from "@/components/Landing/NavBar";

export default function Landing() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white py-2 dark:bg-black">
            <Navbar />
            <h1 className="text-primary-dark text-4xl font-bold">Bienvenido a la librería de libros</h1>
        </div>
    );
}
