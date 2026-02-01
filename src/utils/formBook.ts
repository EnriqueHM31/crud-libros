import type { GoogleBook, VolumeInfo } from "../types/libro";

interface FormData {
    volumeInfo: VolumeInfo;
}

export function mapBookToFormData({ book }: { book: GoogleBook }): FormData {
    return {
        volumeInfo: {
            ...book.volumeInfo,
            imageLinks: {
                thumbnail: book.volumeInfo.imageLinks?.thumbnail ?? "",
            },
        },
    };
}

export function getChangedFields(original: FormData, current: FormData) {
    const changes: Partial<FormData> = {};

    if (JSON.stringify(original.volumeInfo) !== JSON.stringify(current.volumeInfo)) {
        changes.volumeInfo = current.volumeInfo;
    }


    return changes;
}
