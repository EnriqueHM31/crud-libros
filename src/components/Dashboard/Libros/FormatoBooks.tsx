import { FaList, FaThLarge } from "react-icons/fa";
import { useFilteredBooks } from "@/hooks/Filters";

type ViewMode = "list" | "grid";
interface HeaderTypeFormatBookProps {
    viewMode: string;
    handleViewMode: (viewMode: ViewMode) => void;
}

const typeViews = [
    { name: "Lista", value: "list", icono: <FaList /> },
    { name: "Grilla", value: "grid", icono: <FaThLarge /> },
];

export default function HeaderTypeFormatBook({ viewMode, handleViewMode }: HeaderTypeFormatBookProps) {
    const { total } = useFilteredBooks();
    return (
        <div className="flex flex-col items-center justify-between md:flex-row">
            <h2 className="my-10 text-3xl font-bold text-black dark:text-white">Libros</h2>

            <div className="flex items-center gap-2">
                <span className="me-10 text-sm font-medium text-gray-500 dark:text-gray-400">Mostrando {total} libros</span>
                {typeViews.map(({ name, value, icono }: (typeof typeViews)[number]) => (
                    <button
                        key={name}
                        onClick={() => handleViewMode(value as ViewMode)}
                        className={`cursor-pointer rounded-lg p-2 ${viewMode === value ? "bg-primary text-background dark:bg-blue-600" : "text-primary hover:bg-background dark:text-white dark:hover:bg-blue-800"}`}
                    >
                        {icono}
                    </button>
                ))}
            </div>
        </div>
    );
}
