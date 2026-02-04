import { useSelectDinamico } from "@/hooks/useSelectDinamico";
import type { SelectorDinamicoProps } from "@/types/componentes";
import { FaTimes } from "react-icons/fa";
import InputForm from "./InputForm";

export default function SelectorDinamico({ handleChange, value, categorias }: SelectorDinamicoProps) {
    const { selectedCategories, handleSelectChange, handleRemoveCategory, inputValue } = useSelectDinamico({ value, handleChange });
    return (
        <div className="flex w-full flex-col gap-2">
            {/* Opcional: mostrar botones para eliminar categorías */}
            <div className="flex flex-wrap gap-2">
                {selectedCategories.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => handleRemoveCategory(cat)}
                        className="bg-primary hover:bg-primary/80 flex w-fit cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-white dark:bg-blue-600 dark:hover:bg-blue-800"
                    >
                        {cat}
                        <FaTimes className="text-sm" />
                    </button>
                ))}
            </div>
            <div className="flex w-full gap-2">
                <div className="flex flex-1 flex-col gap-2">
                    <label htmlFor="category-select" className="text-primary text-sm font-medium dark:text-gray-400">
                        Menu de categorías
                    </label>

                    <div className="relative w-full">
                        <select
                            id="category-select"
                            name="category-select"
                            value=""
                            onChange={handleSelectChange}
                            className="bg-background text-primary-dark select-estilado mt-1 w-full cursor-pointer appearance-none rounded-xl border px-3 py-2 focus:outline-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        >
                            <option value="" disabled className="dark:bg-primary-dark border-none bg-white">
                                Selecciona una categoría
                            </option>
                            {categorias.map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.nombre}
                                    className="dark:bg-primary-dark cursor-pointer border-none bg-white disabled:bg-red-600"
                                    disabled={selectedCategories.includes(cat.nombre)}
                                >
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex w-full flex-2 flex-col gap-2">
                    <InputForm label="Categorías" name="categories" id="categories" value={inputValue} readOnly />
                </div>
            </div>
        </div>
    );
}
