import { useBooksStore } from "../store/libro";
import { useBooksFiltersStore } from "../store/filtrosBooks";
import { useDebouncedValue } from "./useDebounce";

export function useFiltersBooks() {
    const { books } = useBooksStore();
    const { search, category, author, language, maxPages } = useBooksFiltersStore();

    // 🔥 debounce SOLO en inputs
    const dSearch = useDebouncedValue(search, 600);
    const dCategory = useDebouncedValue(category, 600);
    const dAuthor = useDebouncedValue(author, 600);

    const filteredBooks = books.filter((book) => {
        const info = book.volumeInfo;

        if (dSearch && !normalizeText(info.title).includes(dSearch)) {
            return false;
        }

        if (dCategory && !normalizeText(info.categories?.join(" ") ?? "").includes(dCategory)) {
            return false;
        }

        if (dAuthor && !normalizeText(info.authors?.join(" ") ?? "").includes(dAuthor)) {
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
