import { useCountryImg } from "@/hooks/useCountryImg";
import type { CountryDisplayProps } from "@/types/componentes";

export default function CountrySvg({ value, size = { width: 40, height: 20 } }: CountryDisplayProps) {
    const { isErrored, handleError, flagUrl } = useCountryImg(value ?? "");

    return (
        <div className="flex h-full flex-1 flex-col justify-between gap-2">
            <span className="text-primary-soft text-sm font-medium dark:text-gray-400">Bandera</span>

            {isErrored ? (
                <span className="flex h-full min-h-10 items-center justify-center text-sm font-medium text-red-500 md:justify-start dark:text-gray-400">
                    {value ? "No existe la bandera para " + value : ""}
                </span>
            ) : (
                <div className="flex h-full w-full items-center justify-center md:justify-start">
                    {flagUrl !== "" ? (
                        <img
                            key={flagUrl} // fuerza remount al cambiar value
                            src={flagUrl}
                            alt={`Bandera de ${value}`}
                            width={size.width}
                            height={size.height}
                            className="text-primary text-sm dark:border-white/10 dark:text-white/60"
                            onError={handleError}
                        />
                    ) : (
                        <div className="bg-primary-dark h-full w-full text-sm font-medium text-white">Sin bandera</div>
                    )}
                </div>
            )}
        </div>
    );
}
