import { motion } from "framer-motion";
import { useRef } from "react";

export default function InputDate({
    label,
    ...props
}: {
    label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.showPicker?.(); // abre el date picker en navegadores modernos
    };

    return (
        <div className="flex w-full flex-col gap-2">
            <label
                className="text-primary text-sm font-medium dark:text-gray-400"
                htmlFor={props.id}
            >
                {label}
            </label>

            {/* Contenedor animado clickable */}
            <motion.div
                onClick={handleClick}
                className="relative w-full cursor-pointer rounded-xl border bg-background dark:bg-white/5 dark:border-white/10 flex items-center px-3 py-2"
            >
                <input
                    ref={inputRef}
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    className="bg-transparent w-full text-primary-dark outline-none cursor-pointer dark:text-white"
                    {...props}
                />
                {/* Icono opcional de calendario */}
                <span className="ml-2 text-primary-dark dark:text-white">&#128197;</span>
            </motion.div>
        </div>
    );
}
