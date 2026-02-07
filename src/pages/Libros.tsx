import { useFiltersBooks } from "@/hooks/useFiltersLibro";
import Layout from "@/layout/Layout";

export default function Libros() {
    const { books } = useFiltersBooks();
    return (
        <Layout>
            <div>
                {books.map((book) => (
                    <div key={book.id}>
                        <h1>{book.volumeInfo.title}</h1>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
