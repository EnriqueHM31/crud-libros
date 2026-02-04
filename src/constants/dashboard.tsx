import { FaList, FaThLarge } from "react-icons/fa";

export const typeViews = [
    { name: "Lista", value: "list", icono: <FaList /> },
    { name: "Grilla", value: "grid", icono: <FaThLarge /> },
];

export const viewModes = {
    list: "list",
    grid: "grid",
} as const;

export const FormType = {
    create: "create",
    edit: "edit",
};
