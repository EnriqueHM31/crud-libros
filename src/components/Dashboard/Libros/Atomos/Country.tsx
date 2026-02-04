import { useCountryImg } from "@/hooks/useCountryImg";
import type { CountryDisplayProps } from "@/types/componentes";

export default function CountrySvg({ value, size = { width: 40, height: 20 } }: CountryDisplayProps) {
    const { isErrored, handleError, flagUrl } = useCountryImg(value ?? "");

    return (
        <div className="flex h-full flex-col justify-between gap-2 flex-1">
            <span className="text-primary-soft text-sm font-medium dark:text-gray-400">Bandera</span>

            {isErrored ? (
                <span className="flex h-full items-center justify-center md:justify-start text-sm font-medium text-red-500 dark:text-gray-400 min-h-10">
                    {value ? ("No existe la bandera para " + value) : ""}
                </span>
            ) : (
                <div className="flex h-full w-full items-center md:justify-start justify-center">
                    {
                        flagUrl !== "" ? <img
                            key={flagUrl} // fuerza remount al cambiar value
                            src={flagUrl}
                            alt={`Bandera de ${value}`}
                            width={size.width}
                            height={size.height}
                            className="text-primary text-sm dark:border-white/10 dark:text-white/60"
                            onError={handleError}
                        /> : <div className="w-full h-full bg-primary-dark text-white text-sm font-medium">Sin bandera</div>
                    }

                </div>
            )}
        </div>
    );
}
