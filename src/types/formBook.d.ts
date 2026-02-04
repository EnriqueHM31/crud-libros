import type { FormType } from "@/constants/dashboard";

export interface FormData {
    volumeInfo: VolumeInfo;
    saleInfo?: SaleInfo;
}

export interface BookFormProps {
    book?: GoogleBook | null;
    type?: FormType;
}

export export type ViewMode = "list" | "grid";