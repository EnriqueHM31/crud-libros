import React, { useState } from "react";
import InputForm from "./InputForm";
import { FaChevronDown, FaTimes } from "react-icons/fa";

const categories = ["Ficción", "Historia", "Humor", "Literatura", "Poesía", "Religión", "Saga", "Suspenso", "Terror", "Tragedia", "Computadoras"];

export default function SelectorDinamico({ handleChange, value }: { handleChange: (value: string[]) => void; value: string[] }) {
    console.log({ value });
    const [selectedCategories, setSelectedCategories] = useState<string[]>(value ?? []);
    const [inputValue, setInputValue] = useState<string>(value?.join(", ") ?? "");

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (!value) return;

        // Si ya está en la lista, no hacemos nada
        if (selectedCategories.includes(value)) return;

        const newSelected = [...selectedCategories, value];
        setSelectedCategories(newSelected);
        setInputValue(newSelected.join(", "));
    };

    const handleRemoveCategory = (cat: string) => {
        const newSelected = selectedCategories.filter((c) => c !== cat);
        setSelectedCategories(newSelected);
        setInputValue(newSelected.join(", "));
        handleChange(newSelected);
    };

    return (
        <div className="flex w-full flex-col gap-2">
            {/* Opcional: mostrar botones para eliminar categorías */}
            <div className="flex flex-wrap gap-2">
                {selectedCategories.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => handleRemoveCategory(cat)}
                        className="bg-primary hover:bg-primary/50 flex w-fit items-center gap-2 rounded-lg px-2 py-2 text-sm text-white dark:bg-blue-600 dark:hover:bg-blue-800"
                    >
                        {cat}
                        <FaTimes className="cursor-pointer text-sm" />
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
                            value=""
                            onChange={handleSelectChange}
                            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-9 text-sm text-gray-500 transition-all duration-200 ease-out hover:border-gray-400 hover:shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:border-white/20 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                        >
                            <option value="" disabled className="bg-primary-dark border-none">
                                Selecciona una categoría
                            </option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat} className="bg-primary-dark border-none" disabled={selectedCategories.includes(cat)}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {/* flecha custom encima, pointer-events-none para que no bloquee el select */}
                        <FaChevronDown size={13} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                    </div>
                </div>
                <div className="flex w-full flex-2 flex-col gap-2">
                    <InputForm label="Categorías" value={inputValue} />
                </div>
            </div>
        </div>
    );
}
