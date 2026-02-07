import Navbar from "@/components/Landing/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white py-2 dark:bg-black text-black dark:text-white ">
            <Navbar />
            <main>
                {children}
            </main>

            {/* FOOTER */}
            <footer className="mt-auto text-center text-xs text-gray-500 dark:text-gray-400">
                <p>Acceso rápido solo para demostración</p>
            </footer>
        </div>
    );
}