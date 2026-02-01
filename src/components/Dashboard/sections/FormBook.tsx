import { FaArrowLeft } from "react-icons/fa";
import { useBookForm } from "../../../hooks/FormBook";
import { useBooksStore } from "../../../store/libro";
import type { BookFormProps } from "../../../types/formBook";
import HeaderSection from "../Atomos/Header";
import InputForm from "../Libros/Atomos/InputForm";

export function BookForm({ book, type = "create" }: BookFormProps) {
    const { formData, handleChange, handleAuthorsChange, handleImageChange, handleSubmit, titleForm, descriptionForm } = useBookForm({ type, book });
    const { backBooks } = useBooksStore();

    return (
        <div className="dark:bg-primary-dark relative flex min-h-screen flex-col gap-5 md:flex-row md:p-6">
            <button
                onClick={backBooks}
                className="bg-primary absolute top-6 left-6 flex h-9 w-9 cursor-pointer items-center gap-2 rounded-full p-2 font-medium text-white transition-all duration-100 ease-in hover:scale-110 md:top-0 md:-left-2 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-800"
            >
                <FaArrowLeft className="text-xl" />
            </button>
            <main className="dark:bg-primary-dark min-h-screen bg-white px-3 py-6 md:p-6">
                <div className="mb-6 flex items-center justify-center gap-8 md:mb-4 md:justify-start">
                    <HeaderSection title={titleForm} description={descriptionForm} />
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid items-center justify-center gap-6 md:grid-cols-[280px_1fr]">
                        {/* IMAGEN */}
                        <div className="space-y-3">
                            <div className="bg-muted flex aspect-auto items-center justify-center overflow-hidden rounded-xl border md:aspect-2/3 dark:border-white/10 dark:bg-white/5">
                                {formData.volumeInfo.imageLinks?.thumbnail ? (
                                    <img
                                        src={formData.volumeInfo.imageLinks.thumbnail}
                                        alt="preview"
                                        className="h-full md:min-h-auto min-h-[400px] max-h-1/2 w-full object-cover md:max-h-full"
                                    />
                                ) : (
                                    <span className="text-muted-foreground text-sm dark:text-gray-400 md:min-h-auto min-h-[200px] flex items-center justify-center">Sin imagen</span>
                                )}
                            </div>

                            <input
                                type="url"
                                name="image-book"
                                placeholder="URL de la imagen"
                                value={formData.volumeInfo.imageLinks?.thumbnail ?? ""}
                                onChange={(e) => handleImageChange(e.target.value)}
                                className="bg-background text-primary-dark w-full rounded-xl border px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>

                        {/* FORM */}
                        <div className="space-y-4">
                            <InputForm label="Título" name="title" id="title" required value={formData.volumeInfo.title} onChange={handleChange} />

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
                            className="bg-background text-primary-dark mt-1 field-sizing-content w-full resize-none rounded-xl border px-3 py-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                    </div>
                    <div className="mb-10 flex justify-end md:mb-10">
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
