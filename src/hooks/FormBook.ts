import { useState } from "react";
import { useBooksStore } from "../store/libro";
import { mapBookToFormData, getChangedFields } from "../utils/formBook";
import type { GoogleBook } from "../types/libro";
import type { FormData } from "../types/formBook";

export function useBookForm({ type, book }: { type: "create" | "edit"; book?: GoogleBook }) {
    const { createBook, editBook } = useBooksStore();

    const initialData: FormData =
        book && type === "edit"
            ? mapBookToFormData({ book })
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

    return {
        formData,
        handleChange,
        handleAuthorsChange,
        handleImageChange,
        handleSubmit,
        titleForm,
        descriptionForm,
    };
}
