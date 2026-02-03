import React, { useState } from "react";
import InputForm from "./InputForm";
import { FaTimes } from "react-icons/fa";

const categories = ["Ficción", "Historia", "Humor", "Literatura", "Poesía", "Religión", "Saga", "Suspenso", "Terror", "Tragedia", "Computadoras"];

export default function SelectorDinamico({ handleChange, value }: { handleChange: (value: string[]) => void; value: string[] }) {
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
                            {categories.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat}
                                    className="dark:bg-primary-dark cursor-pointer border-none bg-white disabled:bg-red-600"
                                    disabled={selectedCategories.includes(cat)}
                                >
                                    {cat}
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
