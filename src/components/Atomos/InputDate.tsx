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
            <label className="text-primary text-sm font-medium dark:text-gray-400" htmlFor={props.id}>
                {label}
            </label>

            {/* Contenedor animado clickable */}
            <motion.div
                onClick={handleClick}
                className="bg-background relative flex w-full cursor-pointer items-center rounded-xl border px-3 py-2 dark:border-white/10 dark:bg-white/5"
            >
                <input
                    ref={inputRef}
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    className="text-primary-dark w-full cursor-pointer bg-transparent outline-none dark:text-white"
                    {...props}
                />
                {/* Icono opcional de calendario */}
                <span className="text-primary-dark ml-2 dark:text-white">&#128197;</span>
            </motion.div>
        </div>
    );
}
