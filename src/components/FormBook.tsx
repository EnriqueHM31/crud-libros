import { useState } from "react";
import type { GoogleBook, SaleInfo, VolumeInfo } from "../types/libro";
import { useBooksStore } from "../store/libro";

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

    if (
        JSON.stringify(original.volumeInfo) !==
        JSON.stringify(current.volumeInfo)
    ) {
        changes.volumeInfo = current.volumeInfo;
    }

    if (
        JSON.stringify(original.saleInfo) !==
        JSON.stringify(current.saleInfo)
    ) {
        changes.saleInfo = current.saleInfo;
    }

    return changes;
}

/* =========================
   COMPONENTE
========================= */

export function BookForm({ book, type = "create" }: BookFormProps) {
    const { createBook, editBook } = useBooksStore();

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            volumeInfo: {
                ...prev.volumeInfo,
                [name]:
                    name === "pageCount"
                        ? Number(value) || undefined
                        : value,
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

    /* =========================
       UI
    ========================= */

    return (
        <form
            onSubmit={handleSubmit}
            className="grid gap-6 min-h-screen  border border-border bg-white p-6 shadow-lg dark:border-white/10 dark:bg-primary-dark md:grid-cols-[280px_1fr]"
        >
            {/* IMAGEN */}
            <div className="space-y-3">
                <div className="flex aspect-2/3 items-center justify-center overflow-hidden rounded-xl bg-muted dark:bg-white/5">
                    {formData.volumeInfo.imageLinks?.thumbnail ? (
                        <img
                            src={formData.volumeInfo.imageLinks.thumbnail}
                            alt="preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="text-sm text-muted-foreground dark:text-gray-400">
                            Sin imagen
                        </span>
                    )}
                </div>

                <input
                    type="url"
                    placeholder="URL de la imagen"
                    value={
                        formData.volumeInfo.imageLinks?.thumbnail ?? ""
                    }
                    onChange={(e) =>
                        handleImageChange(e.target.value)
                    }
                    className="w-full rounded-xl border bg-background px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 text-primary-dark dark:text-white"
                />
            </div>

            {/* FORM */}
            <div className="space-y-4">
                <Input
                    label="Título"
                    name="title"
                    required
                    value={formData.volumeInfo.title}
                    onChange={handleChange}
                />

                <Input
                    label="Subtítulo"
                    name="subtitle"
                    value={formData.volumeInfo.subtitle ?? ""}
                    onChange={handleChange}
                />

                <Input
                    label="Autores (coma separados)"
                    value={
                        formData.volumeInfo.authors?.join(", ") ?? ""
                    }
                    onChange={(e) =>
                        handleAuthorsChange(e.target.value)
                    }
                />

                <div className="grid gap-4 md:grid-cols-3">
                    <Input
                        label="Editorial"
                        name="publisher"
                        value={formData.volumeInfo.publisher ?? ""}
                        onChange={handleChange}
                    />

                    <Input
                        label="Fecha publicación"
                        name="publishedDate"
                        value={
                            formData.volumeInfo.publishedDate ?? ""
                        }
                        onChange={handleChange}
                    />

                    <Input
                        label="Páginas"
                        type="number"
                        name="pageCount"
                        value={formData.volumeInfo.pageCount ?? ""}
                        onChange={handleChange}
                    />
                </div>

                <Input
                    label="Idioma"
                    name="language"
                    value={formData.volumeInfo.language ?? ""}
                    onChange={handleChange}
                />

                <div>
                    <label className="text-sm font-medium text-primary-dark dark:text-gray-400">
                        Descripción
                    </label>
                    <textarea
                        name="description"
                        rows={4}
                        value={
                            formData.volumeInfo.description ?? ""
                        }
                        onChange={handleChange}
                        className="mt-1 w-full resize-none rounded-xl border bg-background px-3 py-2 dark:border-white/10 dark:bg-white/5 text-primary-dark dark:text-white"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="rounded-xl bg-primary dark:bg-blue-600 px-6 py-2 font-medium text-white transition  hover:bg-gray-600 dark:hover:bg-blue-800 cursor-pointer"
                    >
                        {type === "edit"
                            ? "Guardar cambios"
                            : "Crear libro"}
                    </button>
                </div>
            </div>
        </form>
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
            <label className="text-sm font-medium text-primary-dark dark:text-gray-400">{label}</label>
            <input
                {...props}
                className="mt-1 w-full rounded-xl border bg-background px-3 py-2 dark:border-white/10 dark:bg-white/5 text-primary-dark dark:text-white"
            />
        </div>
    );
}
