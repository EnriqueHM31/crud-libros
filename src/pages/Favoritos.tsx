import Layout from "@/layout/Layout";
import { useFavoritosStore, type LibroFav } from "@/store/favoritosLibros.store";
export default function Favoritos() {
    const { favoritos, totalFavoritos, toggleLeido, quitarFavorito } = useFavoritosStore();

    return (
        <Layout>
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

                    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {favoritos.map((libroFavorito: LibroFav) => (
                            <article key={libroFavorito.book.id} className="rounded-2xl border border-gray-600 bg-white p-4 shadow-sm dark:bg-neutral-900">
                                <div className="mb-10">
                                    <img
                                        src={libroFavorito.book.volumeInfo.imageLinks?.thumbnail}
                                        alt={libroFavorito.book.volumeInfo.title}
                                        className="h-80 w-full object-contain"
                                    />
                                </div>
                                <h2 className="text-lg font-semibold">{libroFavorito.book.volumeInfo.title}</h2>

                                <div className="mt-3 flex items-center gap-2">
                                    <button
                                        title={libroFavorito.read ? "Marcar libro como no leído" : "Marcar libro como leído"}
                                        onClick={() => toggleLeido(libroFavorito.book.id)}
                                        className={`rounded-lg px-3 py-1 text-sm font-medium transition ${
                                            libroFavorito.read ? "bg-green-600 text-white" : "bg-gray-300 text-black"
                                        }`}
                                    >
                                        {libroFavorito.read ? "Leído" : "No leído"}
                                    </button>

                                    <button
                                        onClick={() => quitarFavorito(libroFavorito.book.id)}
                                        className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white"
                                    >
                                        Quitar
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </Layout>
    );
}
