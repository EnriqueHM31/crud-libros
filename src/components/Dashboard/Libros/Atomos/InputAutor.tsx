import { FaPlus } from "react-icons/fa";

interface InputAuthorsProps {
    value: string // autores separados por coma
    label: string
    onchange: (newAuthors: string[]) => void
}

export function InputAuthors({
    value,
    onchange,
    label,
}: React.InputHTMLAttributes<HTMLInputElement> & InputAuthorsProps) {
    // Si value está vacío, iniciamos con un input vacío
    const authorsArray = value
        ? value.split(",").map((a) => a.trim())
        : [""] // siempre al menos un input

    const handleAuthorChange = (index: number, newAuthor: string) => {
        const newAuthors = [...authorsArray]
        newAuthors[index] = newAuthor
        onchange(newAuthors)
    }

    const addAuthor = () => {
        onchange([...authorsArray, ""])
    }

    const removeAuthor = (index: number) => {
        const newAuthors = authorsArray.filter((_, i) => i !== index)
        // siempre dejamos al menos un input
        onchange(newAuthors.length > 0 ? newAuthors : [""])
    }

    return (
        <div className="flex flex-col gap-2">
            <label
                className="text-primary text-sm font-medium dark:text-gray-400"
                htmlFor={"author-0"}
            >
                {label}
            </label>

            {/* Botón + para agregar autores */}
            <div className="mb-2">
                <button
                    type="button"
                    onClick={addAuthor}
                    className="bg-primary hover:bg-primary/80 flex w-fit cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-white dark:bg-blue-600 dark:hover:bg-blue-800"
                >
                    <FaPlus className="text-xs" />
                    Agregar autor
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {authorsArray.map((author, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={author}
                            id={`author-${index}`}
                            name={`author-${index}`}
                            onChange={(e) => handleAuthorChange(index, e.target.value)}
                            className="flex-1 bg-background text-primary-dark w-full rounded-xl border px-3 py-2 focus:outline-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white"
                            placeholder={`Autor ${index + 1}`}
                        />
                        {/* Botón × para eliminar */}
                        <button
                            type="button"
                            onClick={() => removeAuthor(index)}
                            className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-800 cursor-pointer"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Input hidden que mantiene el estado real */}
            <input
                type="hidden"
                id={"authors"}
                value={authorsArray.join(",")}
                name="authors"
            />
        </div>
    )
}
