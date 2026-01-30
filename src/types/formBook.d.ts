
export interface FormData {
    volumeInfo: VolumeInfo;
    saleInfo?: SaleInfo;
}

export interface BookFormProps {
    book?: GoogleBook | null;
    type?: "create" | "edit";
}