import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useBooksStore } from "../store/libro";
import type { GoogleBook, SaleInfo, VolumeInfo } from "../types/libro";
import HeaderSection from "./Atomos/Header";

/* =========================
   TIPOS
========================= */

interface FormData {
    volumeInfo: VolumeInfo;
    saleInfo?: SaleInfo;
}

interface BookFormProps {
    book?: GoogleBook | null;
    type?: "create" | "edit";
}

/* =========================
   HELPERS
========================= */

function mapBookToFormData(book: GoogleBook): FormData {
    return {
        volumeInfo: {
            ...book.volumeInfo,
            imageLinks: {
                thumbnail: book.volumeInfo.imageLinks?.thumbnail ?? "",
            },
        },
        saleInfo: book.saleInfo,
    };
}

function getChangedFields(original: FormData, current: FormData) {
    const changes: Partial<FormData> = {};

    if (JSON.stringify(original.volumeInfo) !== JSON.stringify(current.volumeInfo)) {
        changes.volumeInfo = current.volumeInfo;
    }

    if (JSON.stringify(original.saleInfo) !== JSON.stringify(current.saleInfo)) {
        changes.saleInfo = current.saleInfo;
    }

    return changes;
}

/* =========================
   COMPONENTE
========================= */

export function BookForm({ book, type = "create" }: BookFormProps) {
    const { createBook, editBook, backBooks } = useBooksStore();

    const initialData: FormData =
        book && type === "edit"
            ? mapBookToFormData(book)
            : {
                volumeInfo: {
                    title: "",
                    subtitle: "",
                    authors: [],
                    publisher: "",
                    publishedDate: "",
                    description: "",
                    pageCount: undefined,
                    language: "",
                    imageLinks: { thumbnail: "" },
                },
                saleInfo: undefined,
            };

    const [formData, setFormData] = useState<FormData>(initialData);
    const [originalData] = useState<FormData>(initialData);

    /* =========================
       HANDLERS
    ========================= */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            volumeInfo: {
                ...prev.volumeInfo,
                [name]: name === "pageCount" ? Number(value) || undefined : value,
            },
        }));
    };

    const handleAuthorsChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            volumeInfo: {
                ...prev.volumeInfo,
                authors: value.split(",").map((a) => a.trim()),
            },
        }));
    };

    const handleImageChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            volumeInfo: {
                ...prev.volumeInfo,
                imageLinks: { thumbnail: value },
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (type === "create") {
            createBook({
                ...book,
                id: crypto.randomUUID(),
                kind: "books#volume",
                volumeInfo: formData.volumeInfo,
                saleInfo: formData.saleInfo,
            } as GoogleBook);
            return;
        }

        if (!book) return;

        const changes = getChangedFields(originalData, formData);

        editBook(book.id, {
            ...book,
            ...changes,
            volumeInfo: {
                ...book.volumeInfo,
                ...changes.volumeInfo,
            },
        });
    };


    const titleForm = type === "create" ? "Crear libro" : "Editar libro";
    const descriptionForm = type === "create" ? "Crea un libro para el sistema de libros" : "Edita el libro seleccionado";
    /* =========================
       UI
    ========================= */

    return (
        <div className="flex border-border dark:bg-primary-dark min-h-screen border bg-white p-6 shadow-lg dark:border-white/10 gap-5">
            <button
                onClick={backBooks}
                className="bg-primary text-white w-9 h-9 p-2 rounded-full dark:bg-blue-600   font-medium dark:text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in  flex items-center gap-2 dark:hover:bg-blue-800 ">
                <FaArrowLeft className="text-xl" />
            </button>
            <main className=" dark:bg-primary-dark min-h-screen  bg-white p-6 shadow-lg ">
                <div className="mb-6 flex items-center gap-8">
                    <HeaderSection title={titleForm} description={descriptionForm} />
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid gap-6 md:grid-cols-[280px_1fr] justify-center items-center">

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
                        <div className="space-y-4 ">
                            <Input label="Título" name="title" required value={formData.volumeInfo.title} onChange={handleChange} />

                            <Input label="Subtítulo" name="subtitle" value={formData.volumeInfo.subtitle ?? ""} onChange={handleChange} />

                            <Input
                                label="Autores (coma separados)"
                                value={formData.volumeInfo.authors?.join(", ") ?? ""}
                                onChange={(e) => handleAuthorsChange(e.target.value)}
                            />

                            <div className="grid gap-4 md:grid-cols-3">
                                <Input label="Editorial" name="publisher" value={formData.volumeInfo.publisher ?? ""} onChange={handleChange} />

                                <Input label="Fecha publicación" name="publishedDate" value={formData.volumeInfo.publishedDate ?? ""} onChange={handleChange} />

                                <Input label="Páginas" type="number" name="pageCount" value={formData.volumeInfo.pageCount ?? ""} onChange={handleChange} />
                            </div>

                            <Input label="Idioma" name="language" value={formData.volumeInfo.language ?? ""} onChange={handleChange} />


                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-primary-dark text-sm font-medium dark:text-gray-400">Descripción</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.volumeInfo.description ?? ""}
                            onChange={handleChange}
                            className="bg-background text-primary-dark mt-1 w-full resize-y rounded-xl border px-3 py-2 dark:border-white/10 dark:bg-white/5 dark:text-white field-sizing-content"
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

/* =========================
   INPUT REUTILIZABLE
========================= */

function Input({
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
}) {
    return (
        <div>
            <label className="text-primary text-sm font-medium dark:text-gray-400">{label}</label>
            <input
                {...props}
                className="bg-background text-primary-dark mt-1 w-full rounded-xl border px-3 py-2 dark:border-white/10 dark:bg-white/5 dark:text-white focus:outline-blue-600 "
            />
        </div>
    );
}
