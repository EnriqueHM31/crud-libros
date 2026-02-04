import { useState } from "react";

export function useSelectDinamico({ value, handleChange }: { value: string[]; handleChange: (value: string[]) => void; }) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(value ?? []);
    const [inputValue, setInputValue] = useState<string>(value?.join(", ") ?? "");

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        console.log({ value });
        if (!value) return;

        // Si ya está en la lista, no hacemos nada
        if (selectedCategories.includes(value)) return;
        console.log({ selectedCategories });

        const newSelected = [...selectedCategories, value];
        console.log({ newSelected });
        setSelectedCategories(newSelected);
        handleChange(newSelected);
        setInputValue(newSelected.join(", "));
    };

    const handleRemoveCategory = (cat: string) => {
        const newSelected = selectedCategories.filter((c) => c !== cat);
        setSelectedCategories(newSelected);
        setInputValue(newSelected.join(", "));
        handleChange(newSelected);
    };
    return {
        selectedCategories,
        handleSelectChange,
        handleRemoveCategory,
        inputValue,
    };
}