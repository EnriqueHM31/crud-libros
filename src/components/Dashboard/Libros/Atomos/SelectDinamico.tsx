import React, { useState } from "react";
import InputForm from "./InputForm";
import { FaChevronDown, FaTimes } from "react-icons/fa";

const categories = [
    "Ficción",
    "Historia",
    "Humor",
    "Literatura",
    "Poesía",
    "Religión",
    "Saga",
    "Suspenso",
    "Terror",
    "Tragedia",
];
export default function SelectorDinamico() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

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
    };

    return (
        <div className="flex flex-col  gap-2 w-full ">
            {/* Opcional: mostrar botones para eliminar categorías */}
            <div className="flex flex-wrap gap-2 ">
                {selectedCategories.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => handleRemoveCategory(cat)}
                        className="bg-primary dark:bg-blue-600 dark:hover:bg-blue-800 hover:bg-primary/50 text-white px-2 py-2 gap-2 flex items-center  rounded-lg text-sm w-fit"
                    >
                        {cat}
                        <FaTimes className="text-sm cursor-pointer" />
                    </button>
                ))}
            </div>
            <div className="flex  gap-2 w-full">

                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="category-select" className=" text-primary text-sm font-medium dark:text-gray-400">
                        Menu de categorías
                    </label>

                    <div className="relative w-full">
                        <select
                            id="category-select"
                            value=""
                            onChange={handleSelectChange}
                            className="
      w-full appearance-none cursor-pointer
      bg-white border border-gray-300
      rounded-xl px-4 py-2.5 pr-9
      text-sm text-gray-500
      transition-all duration-200 ease-out
      hover:border-gray-400 hover:shadow-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      dark:bg-white/5 dark:border-white/10 dark:text-white/60
      dark:hover:border-white/20
      dark:focus:ring-blue-600 dark:focus:border-blue-600
    "
                        >
                            <option value="" disabled className="bg-primary-dark border-none">
                                Selecciona una categoría
                            </option>
                            {categories.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat}
                                    className="bg-primary-dark border-none"
                                    disabled={selectedCategories.includes(cat)}
                                >
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {/* flecha custom encima, pointer-events-none para que no bloquee el select */}
                        <FaChevronDown
                            size={13}
                            className="
      absolute right-3 top-1/2 -translate-y-1/2
      text-gray-400 pointer-events-none
      dark:text-white/40
    "
                        />
                    </div>

                </div>
                <div className="flex flex-col gap-2 w-full flex-2">
                    <InputForm label="Categorías" value={inputValue} />
                </div>
            </div>



        </div>
    );
};
