interface FormInputProps {
    type?: "text" | "email" | "number" | "textarea";
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
}

export function FormInput({
    type = "text",
    placeholder,
    value,
    onChange,
    rows,
}: FormInputProps) {
    const baseClass =
        "w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white";

    if (type === "textarea") {
        return (
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={baseClass}
                rows={rows || 2}
            />
        );
    }

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseClass}
        />
    );
}
