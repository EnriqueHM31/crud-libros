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
        setErroredUrls(prev => new Set(prev).add(flagUrl));
    };

    return (
        <div className="flex gap-2 flex-col h-full  justify-between">
            <span className="text-primary-soft text-sm font-medium dark:text-gray-400">
                Bandera
            </span>

            {isErrored ? (
                <span className="text-red-500 text-sm font-medium dark:text-gray-400 flex items-center justify-center  h-full">
                    No existe la bandera para "{value}"
                </span>
            ) : (
                <div className="w-full h-full flex items-center justify-center">

                    <img
                        key={flagUrl} // fuerza remount al cambiar value
                        src={flagUrl}
                        alt={`Bandera de ${value}`}
                        width={size.width}
                        height={size.height}
                        className="border text-sm text-primary dark:border-white/10 dark:text-white/60"
                        onError={handleError}
                    />
                </div>
            )}
        </div>
    );
}
