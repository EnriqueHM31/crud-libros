import { useBooksStore } from "../store/libro.store";
import { useBooksFiltersStore } from "../store/filtrosBooks.store";
import { useDebouncedValue } from "./useDebounce";

export function useFiltersBooks() {
    const { books } = useBooksStore();
    const { search, category, author, language, maxPages } = useBooksFiltersStore();

    // 🔥 debounce SOLO en inputs
    const dSearch = useDebouncedValue(search, 600);
    const dCategory = useDebouncedValue(category, 600);
    const dAuthor = useDebouncedValue(author, 600);

    console.log({ dCategory });

    const filteredBooks = books.filter((book) => {
        const info = book.volumeInfo;

        if (dSearch && !normalizeText(info.title).includes(dSearch)) {
            return false;
        }

        if (dCategory && info.categories?.length && !info.categories.includes(dCategory)) {
            console.log(info.categories);
            return false;
        }

        if (dAuthor && !normalizeText(info.authors?.join(" ") ?? "").includes(dAuthor.toLowerCase())) {
            return false;
        }

        if (language && info.language !== language) {
            return false;
        }

        if (maxPages && info.pageCount && info.pageCount > maxPages) {
            return false;
        }

        return true;
    });

    return {
        books: filteredBooks,
        total: filteredBooks.length,
    };
}

function normalizeText(text: string) {
    return text
        .normalize("NFD") // separa letras y acentos
        .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
        .toLowerCase(); // opcional
}
