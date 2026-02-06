import type { Categoria } from "./categoria";
import type { GoogleBook } from "./libro";

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

export interface CountryDisplayProps {
    value: string; // código de país, ej: "es", "pt"
    size?: { width: number; height: number };
    textView?: boolean;
}

export interface SelectorDinamicoProps {
    handleChange: (value: string[]) => void;
    value: string[];
    categorias: Categoria[];
}

export interface BookModalProps {
    book: GoogleBook | null;
}

export interface HeaderTypeFormatBookProps {
    viewMode: string;
    handleViewMode: (viewMode: ViewMode) => void;
}
