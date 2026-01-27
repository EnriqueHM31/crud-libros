import { useBooksStore } from "../store/libro";
import { useBooksFiltersStore } from "../store/filtros";

export function useFilteredBooks() {
    const { books } = useBooksStore();
    const {
        search,
        category,
        author,
        language,
        maxPages,
    } = useBooksFiltersStore();

    return books.filter((book) => {
        const info = book.volumeInfo;

        if (
            search &&
            !info.title.toLowerCase().includes(search.toLowerCase())
        ) {
            return false;
        }

        if (
            category &&
            !info.categories?.some((c) =>
                c.toLowerCase().includes(category.toLowerCase())
            )
        ) {
            return false;
        }

        if (
            author &&
            !info.authors?.some((a) =>
                a.toLowerCase().includes(author.toLowerCase())
            )
        ) {
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
