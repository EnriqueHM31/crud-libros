import { FaList, FaThLarge } from "react-icons/fa";
import { useFiltersBooks } from "@/hooks/FiltersBooks";

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
    const { total } = useFiltersBooks();
    return (
        <div className="my-6 flex w-full items-center justify-between md:my-2 md:mt-0 md:flex-row">
            <h2 className="my-0 text-3xl font-bold text-black md:my-4 dark:text-white">Libros</h2>

            <div className="flex w-full items-center justify-end gap-2">
                <span className="order-2 text-sm font-medium text-gray-500 md:order-1 md:me-10 dark:text-gray-400">Mostrando {total} libros</span>
                <div className="order-1 flex items-center gap-2 md:order-2">
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
        </div>
    );
}
