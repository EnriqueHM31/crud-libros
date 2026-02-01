export default function InputForm({
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
}) {
    return (
        <div>
            <label className="text-primary text-sm font-medium dark:text-gray-400" htmlFor={props.id}>
                {label}
            </label>
            <input
                {...props}
                className="bg-background text-primary-dark mt-1 w-full rounded-xl border px-3 py-2 focus:outline-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
        </div>
    );
}
