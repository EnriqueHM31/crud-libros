
export interface NotResultsProps {
    error: string;
}

export interface HeaderProps {
    title: string;
    description?: string;
}

export interface CategoriaFormProps {
    type?: "create" | "edit";
    initialData?: {
        nombre: string;
        descripcion?: string;
    };
    isOpen: boolean;
    onClose: () => void;
    onSubmit: <Partial extends { nombre?: string; descripcion?: string }>(data: Partial) => void;
}

export type HookFormBookProps = Omit<CategoriaFormProps, "isOpen" | "onClose">;

interface CountryDisplayProps {
    value: string; // código de país, ej: "es", "pt"
    size?: { width: number; height: number };
}