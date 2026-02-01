import { FaArrowLeft } from "react-icons/fa";
import { useBookForm } from "../../../hooks/FormBook";
import { useBooksStore } from "../../../store/libro";
import type { BookFormProps } from "../../../types/formBook";
import HeaderSection from "../Atomos/Header";
import InputForm from "./Atomos/InputForm";
import SelectorDinamico from "./Atomos/SelectDinamico";
import CountrySvg from "./Atomos/Country";

export function BookForm({ book, type = "create" }: BookFormProps) {
    const { formData, handleChange, handleAuthorsChange, handleImageChange, handleCategoriesChange, handleSubmit, titleForm, descriptionForm } = useBookForm({
        type,
        book,
    });
    const { backBooks } = useBooksStore();

    return (
        <div className="dark:bg-primary-dark relative flex min-h-screen w-full flex-col gap-5 md:flex-row md:p-6">
            <button
                onClick={backBooks}
                className="bg-primary absolute top-6 left-6 flex h-9 w-9 cursor-pointer items-center gap-2 rounded-full p-2 font-medium text-white transition-all duration-100 ease-in hover:scale-110 md:top-0 md:-left-2 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-800"
            >
                <FaArrowLeft className="text-xl" />
            </button>
            <main className="dark:bg-primary-dark min-h-screen w-full bg-white px-3 py-6 md:p-6">
                <div className="mb-6 flex items-center justify-center gap-8 md:mb-4 md:justify-start">
                    <HeaderSection title={titleForm} description={descriptionForm} />
                </div>
                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
                    <div className="grid w-full items-center justify-center gap-6 md:grid-cols-[280px_1fr]">
                        {/* IMAGEN */}
                        <div className="flex h-full w-full flex-col items-center justify-between space-y-3">
                            <div className="dark:bg-primary-dark flex aspect-auto h-full w-full items-center justify-center overflow-hidden rounded-xl md:aspect-2/3">
                                {formData.volumeInfo.imageLinks?.thumbnail ? (
                                    <img
                                        src={formData.volumeInfo.imageLinks.thumbnail}
                                        alt="preview"
                                        className="h-full max-h-1/2 min-h-[400px] w-full object-contain md:h-full md:max-h-full md:min-h-full"
                                    />
                                ) : (
                                    <span className="text-muted-foreground flex h-full min-h-[200px] w-full items-center justify-center text-sm md:min-h-full dark:text-gray-400">
                                        Sin imagen
                                    </span>
                                )}
                            </div>

                            <div className="flex w-full flex-col gap-2">
                                <span className="text-primary-soft text-sm font-medium dark:text-gray-400">URL de la imagen</span>
                                <input
                                    type="url"
                                    name="image-book"
                                    placeholder="URL de la imagen"
                                    value={formData.volumeInfo.imageLinks?.thumbnail ?? ""}
                                    onChange={(e) => handleImageChange(e.target.value)}
                                    className="bg-background text-primary-dark mt-1 w-full rounded-xl border px-3 py-2 focus:outline-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* FORM */}
                        <div className="flex h-full w-full flex-col justify-between gap-4">
                            <InputForm label="Título" name="title" id="title" required value={formData.volumeInfo.title} onChange={handleChange} />

                            <InputForm label="Subtítulo" name="subtitle" id="subtitle" value={formData.volumeInfo.subtitle ?? ""} onChange={handleChange} />

                            <InputForm
                                label="Autores (coma separados)"
                                name="authors"
                                id="authors"
                                value={formData.volumeInfo.authors?.join(", ") ?? ""}
                                onChange={(e) => handleAuthorsChange(e.target.value)}
                            />

                            <InputForm label="Editorial" name="publisher" id="publisher" value={formData.volumeInfo.publisher ?? ""} onChange={handleChange} />

                            <InputForm
                                label="Fecha publicación"
                                name="publishedDate"
                                id="publishedDate"
                                value={formData.volumeInfo.publishedDate ?? ""}
                                onChange={handleChange}
                            />

                            <InputForm
                                label="Páginas"
                                type="number"
                                name="pageCount"
                                id="pageCount"
                                value={formData.volumeInfo.pageCount ?? ""}
                                onChange={handleChange}
                            />

                            <div className="flex items-center gap-2">
                                <InputForm label="Idioma" name="language" id="language" value={formData.volumeInfo.language ?? ""} onChange={handleChange} />
                                <CountrySvg value={formData.volumeInfo.language ?? ""} />
                            </div>

                            <SelectorDinamico handleChange={handleCategoriesChange} value={formData.volumeInfo.categories} />

                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor="description" className="text-primary-dark text-sm font-medium dark:text-gray-400">
                                    Descripción
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={4}
                                    value={formData.volumeInfo.description ?? ""}
                                    onChange={handleChange}
                                    className="bg-background text-primary-dark field-sizing-content w-full resize-none rounded-xl border px-3 py-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                                />
                            </div>
                        </div>
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
