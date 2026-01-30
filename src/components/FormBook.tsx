import { FaArrowLeft } from "react-icons/fa";
import { useBookForm } from "../hooks/FormBook";
import { useBooksStore } from "../store/libro";
import type { BookFormProps } from "../types/formBook";
import HeaderSection from "./Atomos/Header";
import InputForm from "./Libros/Atomos/InputForm";

export function BookForm({ book, type = "create" }: BookFormProps) {
    const { formData, handleChange, handleAuthorsChange, handleImageChange, handleSubmit, titleForm, descriptionForm } = useBookForm({ type, book });
    const { backBooks } = useBooksStore();

    return (
        <div className="border-border dark:bg-primary-dark flex min-h-screen gap-5 border bg-white p-6 shadow-lg dark:border-white/10">
            <button
                onClick={backBooks}
                className="bg-primary flex h-9 w-9 cursor-pointer items-center gap-2 rounded-full p-2 font-medium text-white transition-all duration-100 ease-in hover:scale-110 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-800"
            >
                <FaArrowLeft className="text-xl" />
            </button>
            <main className="dark:bg-primary-dark min-h-screen bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center gap-8">
                    <HeaderSection title={titleForm} description={descriptionForm} />
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid items-center justify-center gap-6 md:grid-cols-[280px_1fr]">
                        {/* IMAGEN */}
                        <div className="space-y-3">
                            <div className="bg-muted flex aspect-2/3 items-center justify-center overflow-hidden rounded-xl border dark:border-white/10 dark:bg-white/5">
                                {formData.volumeInfo.imageLinks?.thumbnail ? (
                                    <img src={formData.volumeInfo.imageLinks.thumbnail} alt="preview" className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-muted-foreground text-sm dark:text-gray-400">Sin imagen</span>
                                )}
                            </div>

                            <input
                                type="url"
                                placeholder="URL de la imagen"
                                value={formData.volumeInfo.imageLinks?.thumbnail ?? ""}
                                onChange={(e) => handleImageChange(e.target.value)}
                                className="bg-background text-primary-dark w-full rounded-xl border px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>

                        {/* FORM */}
                        <div className="space-y-4">
                            <InputForm label="Título" name="title" required value={formData.volumeInfo.title} onChange={handleChange} />

                            <InputForm label="Subtítulo" name="subtitle" value={formData.volumeInfo.subtitle ?? ""} onChange={handleChange} />

                            <InputForm
                                label="Autores (coma separados)"
                                value={formData.volumeInfo.authors?.join(", ") ?? ""}
                                onChange={(e) => handleAuthorsChange(e.target.value)}
                            />

                            <div className="grid gap-4 md:grid-cols-3">
                                <InputForm label="Editorial" name="publisher" value={formData.volumeInfo.publisher ?? ""} onChange={handleChange} />

                                <InputForm
                                    label="Fecha publicación"
                                    name="publishedDate"
                                    value={formData.volumeInfo.publishedDate ?? ""}
                                    onChange={handleChange}
                                />

                                <InputForm label="Páginas" type="number" name="pageCount" value={formData.volumeInfo.pageCount ?? ""} onChange={handleChange} />
                            </div>

                            <InputForm label="Idioma" name="language" value={formData.volumeInfo.language ?? ""} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-primary-dark text-sm font-medium dark:text-gray-400">Descripción</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.volumeInfo.description ?? ""}
                            onChange={handleChange}
                            className="bg-background text-primary-dark mt-1 field-sizing-content w-full resize-y rounded-xl border px-3 py-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-primary cursor-pointer rounded-xl px-6 py-2 font-medium text-white transition hover:bg-gray-600 dark:bg-blue-600 dark:hover:bg-blue-800"
                        >
                            {type === "edit" ? "Guardar cambios" : "Crear libro"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
