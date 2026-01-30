import type { GoogleBook, SaleInfo, VolumeInfo } from "../types/libro";

interface FormData {
    volumeInfo: VolumeInfo;
    saleInfo?: SaleInfo;
}

export function mapBookToFormData({ book }: { book: GoogleBook }): FormData {

    return {
        volumeInfo: {
            ...book.volumeInfo,
            imageLinks: {
                thumbnail: book.volumeInfo.imageLinks?.thumbnail ?? "",
            },
        },
        saleInfo: book.saleInfo,
    };
}

export function getChangedFields(original: FormData, current: FormData) {
    const changes: Partial<FormData> = {};

    if (JSON.stringify(original.volumeInfo) !== JSON.stringify(current.volumeInfo)) {
        changes.volumeInfo = current.volumeInfo;
    }

    if (JSON.stringify(original.saleInfo) !== JSON.stringify(current.saleInfo)) {
        changes.saleInfo = current.saleInfo;
    }

    return changes;
}