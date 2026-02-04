import { useState } from "react";

export function useCountryImg(value: string) {
    const [erroredUrls, setErroredUrls] = useState<Set<string>>(new Set());

    const code = value.toLowerCase();
    const flagUrl = `https://flagservice.net/${code.toUpperCase()}/flag.svg`;

    const isErrored = erroredUrls.has(flagUrl);

    const handleError = () => {
        setErroredUrls((prev) => new Set(prev).add(flagUrl));
    };

    return {
        flagUrl,
        isErrored,
        handleError,
    };
}