import { useState } from "react";

interface FlagDisplayProps {
    value: string; // código de país, ej: "es", "pt"
    size?: { width: number; height: number };
}

export default function CountrySvg({ value, size = { width: 40, height: 20 } }: FlagDisplayProps) {
    const [erroredUrls, setErroredUrls] = useState<Set<string>>(new Set());

    if (!value) return null;

    const code = value.toLowerCase();
    const flagUrl = `https://flagservice.net/${code.toUpperCase()}/flag.svg`;

    const isErrored = erroredUrls.has(flagUrl);

    const handleError = () => {
        setErroredUrls((prev) => new Set(prev).add(flagUrl));
    };

    return (
        <div className="flex h-full flex-col justify-between gap-2">
            <span className="text-primary-soft text-sm font-medium dark:text-gray-400">Bandera</span>

            {isErrored ? (
                <span className="flex h-full items-center justify-center text-sm font-medium text-red-500 dark:text-gray-400">
                    No existe la bandera para "{value}"
                </span>
            ) : (
                <div className="flex h-full w-full items-center justify-center">
                    <img
                        key={flagUrl} // fuerza remount al cambiar value
                        src={flagUrl}
                        alt={`Bandera de ${value}`}
                        width={size.width}
                        height={size.height}
                        className="text-primary text-sm dark:border-white/10 dark:text-white/60"
                        onError={handleError}
                    />
                </div>
            )}
        </div>
    );
}
