import CardFavorito from "@/components/Landing/CardFavorito";
import ModalLibro from "@/components/Landing/ModalLibro";
import Layout from "@/layout/Layout";
import { useFavoritosStore, type LibroFav } from "@/store/favoritosLibros.store";
import type { GoogleBook } from "@/types/libro";
import { useState } from "react";
export default function Favoritos() {
    const { favoritos, totalFavoritos } = useFavoritosStore();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<GoogleBook | null>(null);

    const handleOpenModal = (book: GoogleBook) => {
        setSelected(book);
        setOpen(true);
    };

    return (
        <Layout>
            <ModalLibro open={open} onClose={() => setOpen(false)} book={selected} />
            {favoritos.length === 0 ? (
                <section className="p-6">
                    <h1 className="mb-2 text-2xl font-bold">Favoritos</h1>
                    <p className="text-gray-500">No tienes libros favoritos aún.</p>
                </section>
            ) : (
                <section className="flex w-full flex-col space-y-6">
                    <div className="mt-15 flex items-center justify-between gap-2">
                        <h1 className="text-4xl font-bold">Tus libros favoritos</h1>
                        <p className="text-sm font-bold text-black dark:text-zinc-400">Mostrando {totalFavoritos()} libros</p>
                    </div>

                    <p className="w-full text-black dark:text-gray-400">
                        Aquí podrás ver los libros que has marcado como favoritos. Puedes leer los libros marcados como leídos y quitarlos de tus favoritos.
                    </p>

                    <div className="mt-8 grid w-full items-center justify-center gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {favoritos.map((libroFavorito: LibroFav) => (
                            <CardFavorito key={libroFavorito.book.id} book={libroFavorito.book} read={libroFavorito.read} onClickModal={handleOpenModal} />
                        ))}
                    </div>
                </section>
            )}
        </Layout>
    );
}
