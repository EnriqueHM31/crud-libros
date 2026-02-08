import { useFavoritosStore } from "@/store/favoritosLibros.store";
import type { GoogleBook } from "@/types/libro";

export default function CardFavorito({ book, read }: { book: GoogleBook; read: boolean }) {
    const { agregarFavorito, quitarFavorito, esFavorito, toggleLeido } = useFavoritosStore();
    if (!book || !book.id) return null;

    const v = book.volumeInfo;

    const isFavorito = esFavorito(book.id);

    console.log({ isFavorito });

    console.log({ read });

    return (
        <div className="bg-zinc-800 rounded-2xl shadow-sm shadow-zinc-300 outline outline-zinc-600 -outline-offset-8 h-[550px] w-full p-4">
            <div className="group overflow-hidden relative after:duration-500 before:duration-500  duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-40 hover:duration-500 after:absolute after:size-35 after:bg-zinc-700 after:rounded-full  after:blur-xl after:bottom-15 after:-right-10 before:absolute before:bg-zinc-700 before:rounded-full  before:blur-xl before:top-20 before:right-66 before:size-35  hover:rotate-8   bg-neutral-900 rounded-2xl outline outline-zinc-600 -outline-offset-8 h-full w-full flex flex-col items-center justify-center">
                <div className="z-10 flex flex-col items-center gap-2 w-full h-full px-7 py-3  ">

                    <header className="flex-4 flex flex-col items-center justify-center gap-2 text-center ">

                        <div className="flex-1">

                            <img src={v.imageLinks?.thumbnail || "/no-image.jpg"} alt={v.title} className="h-60 w-full object-contain object-top" />
                        </div>
                        <div className="flex-2 flex items-center justify-center gap-2 flex-col">

                            <span className="text-white text-xl font-bold line-clamp-2">{v.title} </span>

                            <span className="text-gray-400 text-sm line-clamp-1">
                                {v.subtitle}
                            </span>
                        </div>
                    </header>

                    <section className="flex gap-2 items-center flex-1 flex-col  w-full">
                        <div className="flex gap-2 items-center justify-center w-full ">

                            <button
                                title={`Ver detalle de ${book.volumeInfo.title}`}
                                className="rounded-xl flex-1 bg-zinc-300 transition-colors px-4 py-2 text-sm font-medium text-black hover:bg-zinc-500 hover:text-white cursor-pointer">
                                Ver detalle
                            </button>
                            <button
                                title={isFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                                onClick={() => isFavorito ? quitarFavorito(book.id) : agregarFavorito(book)}
                                className="rounded-xl flex-1 bg-zinc-300 transition-colors px-4 py-2 text-sm font-medium text-black hover:bg-zinc-500 hover:text-white cursor-pointer">
                                Quitar
                            </button>
                        </div>
                        <div className="w-full flex">
                            <button
                                title={read ? "Marcar libro como no leído" : "Marcar libro como leído"}
                                onClick={() => toggleLeido(book.id)}
                                className={`rounded-xl flex-1  transition-colors px-4 py-2 text-sm font-medium text-black  cursor-pointer 
                                    ${read ? "bg-green-700 text-white hover:bg-green-800 " : "bg-zinc-300 text-black hover:bg-zinc-500 hover:text-white"
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
