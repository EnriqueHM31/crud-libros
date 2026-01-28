import { useBooksStore } from "../store/libro";
import { useBooksFiltersStore } from "../store/filtros";

export function useFilteredBooks() {
    const { books } = useBooksStore();
    const { search, category, author, language, maxPages } = useBooksFiltersStore();

    return books.filter((book) => {
        const info = book.volumeInfo;

        if (search && !normalizeText(info.title).includes(search.toLocaleLowerCase())) {
            return false;
        }

        if (category && !normalizeText(info.categories?.[0] ?? "").includes(category.toLocaleLowerCase())) {
            return false;
        }

        if (author && !normalizeText(info.authors?.join("") ?? "").includes(author.toLocaleLowerCase())) {
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
}

export function normalizeText(text: string) {
    return text
        .normalize("NFD") // separa letras y acentos
        .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
        .toLowerCase(); // opcional
}
