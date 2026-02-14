import { FiEye, FiEyeOff } from "react-icons/fi";

interface ButtonEyeProps {
    show: boolean; // estado actual
    setShow: (v: boolean) => void; // setter externo
    className?: string;
}

export default function ButtonEye({ show, setShow, className = "" }: ButtonEyeProps) {
    return (
        <button
            type="button"
            onClick={() => setShow(!show)}
            className={`absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-white ${className} cursor-pointer`}
            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            title={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
            {show ? <FiEye size={18} /> : <FiEyeOff size={18} />}
        </button>
    );
}
