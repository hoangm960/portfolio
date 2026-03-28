interface FormInputProps {
    type?: "text" | "email" | "number" | "textarea" | "month";
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
}

export function FormInput({
    type = "text",
    label,
    placeholder,
    value,
    onChange,
    rows,
}: FormInputProps) {
    const baseClass =
        "w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white";

    const input = type === "textarea" ? (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseClass}
            rows={rows || 2}
        />
    ) : (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseClass}
        />
    );

    if (label) {
        return (
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                    {label}
                </label>
                {input}
            </div>
        );
    }

    return input;
}
