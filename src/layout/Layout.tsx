import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white py-2 text-black dark:bg-black dark:text-white">
            <Navbar />
            <main className="flex-1">{children}</main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
