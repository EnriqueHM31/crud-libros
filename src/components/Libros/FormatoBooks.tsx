import { FaList, FaThLarge } from "react-icons/fa";

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
    return (
        <div className="flex items-center justify-between">
            <h2 className="my-10 text-3xl font-bold text-black dark:text-white">Libros</h2>

            <div className="flex gap-2">
                {typeViews.map(({ name, value, icono }: (typeof typeViews)[number]) => (
                    <button
                        key={name}
                        onClick={() => handleViewMode(value as ViewMode)}
                        className={`rounded-lg cursor-pointer p-2 ${viewMode === value ? "bg-primary dark:bg-blue-600 text-background" : "text-primary dark:text-white  hover:bg-background dark:hover:bg-blue-800"}`}
                    >
                        {icono}
                    </button>
                ))}
            </div>
        </div>
    );
}
