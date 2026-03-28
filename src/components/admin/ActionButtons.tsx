interface ActionButtonsProps {
    onEdit?: () => void;
    onDelete?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    isEditing?: boolean;
}

export function ActionButtons({
    onEdit,
    onDelete,
    onSave,
    onCancel,
    isEditing,
}: ActionButtonsProps) {
    if (isEditing) {
        return (
            <div className="flex gap-2">
                {onSave && (
                    <button
                        onClick={onSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                )}
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600"
                    >
                        Cancel
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {onEdit && (
                <button
                    onClick={onEdit}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                    Edit
                </button>
            )}
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-800"
                >
                    Delete
                </button>
            )}
        </div>
    );
}
