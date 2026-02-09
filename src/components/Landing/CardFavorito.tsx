import { useFavoritosStore } from "@/store/favoritosLibros.store";
import type { GoogleBook } from "@/types/libro";

export default function CardFavorito({ book, read, onClickModal }: { book: GoogleBook; read: boolean; onClickModal: (book: GoogleBook) => void }) {
    const { agregarFavorito, quitarFavorito, esFavorito, toggleLeido } = useFavoritosStore();

    if (!book || !book.id) return null;
    const v = book.volumeInfo;

    const isFavorito = esFavorito(book.id);

    return (
        <div className="h-[550px] w-full rounded-2xl bg-zinc-800 p-4 shadow-sm shadow-zinc-300 outline -outline-offset-8 outline-zinc-600">
            <div className="group relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-neutral-900 outline -outline-offset-8 outline-zinc-600 duration-500 before:absolute before:top-20 before:right-66 before:size-35 before:rounded-full before:bg-zinc-700 before:blur-xl before:duration-500 after:absolute after:-right-10 after:bottom-15 after:size-35 after:rounded-full after:bg-zinc-700 after:blur-xl after:duration-500 hover:rotate-8 hover:duration-500 hover:before:-translate-x-40 hover:before:translate-y-12 hover:after:translate-x-24 hover:after:duration-500">
                <div className="z-10 flex h-full w-full flex-col items-center gap-2 px-7 py-3">
                    <header className="flex flex-4 flex-col items-center justify-center gap-2 text-center">
                        <div className="flex-1">
                            <img src={v.imageLinks?.thumbnail || "/no-image.jpg"} alt={v.title} className="h-60 w-full object-contain object-top" />
                        </div>
                        <div className="flex flex-2 flex-col items-center justify-center gap-2">
                            <span className="line-clamp-2 text-xl font-bold text-white">{v.title} </span>

                            <span className="line-clamp-1 text-sm text-gray-400">{v.subtitle}</span>
                        </div>
                    </header>

                    <section className="flex w-full flex-1 flex-col items-center gap-2">
                        <div className="flex w-full items-center justify-center gap-2">
                            <button
                                onClick={() => onClickModal(book)}
                                title={`Ver detalle de ${book.volumeInfo.title}`}
                                className="flex-1 cursor-pointer rounded-xl bg-zinc-300 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-500 hover:text-white"
                            >
                                Ver detalle
                            </button>
                            <button
                                title={isFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                                onClick={() => (isFavorito ? quitarFavorito(book.id) : agregarFavorito(book))}
                                className="flex-1 cursor-pointer rounded-xl bg-zinc-300 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-500 hover:text-white"
                            >
                                Quitar
                            </button>
                        </div>
                        <div className="flex w-full">
                            <button
                                title={read ? "Marcar libro como no leído" : "Marcar libro como leído"}
                                onClick={() => toggleLeido(book.id)}
                                className={`flex-1 cursor-pointer rounded-xl px-4 py-2 text-sm font-medium text-black transition-colors ${
                                    read ? "bg-green-700 text-white hover:bg-green-800" : "bg-zinc-300 text-black hover:bg-zinc-500 hover:text-white"
                                }`}
                            >
                                {read ? "Marcar libro como no leído" : "Marcar libro como leído"}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
