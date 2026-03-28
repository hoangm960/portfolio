import { ReactNode } from "react";
import { DragHandle } from "./SortableItem";
import { ActionButtons } from "./ActionButtons";

interface EditableCardProps {
    id: string;
    isEditing: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onSave: () => void;
    onCancel: () => void;
    viewContent: ReactNode;
    editContent: ReactNode;
}

export function EditableCard({
    id,
    isEditing,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    viewContent,
    editContent,
}: EditableCardProps) {
    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700">
            {isEditing ? (
                <div className="space-y-3">
                    {editContent}
                    <ActionButtons
                        isEditing
                        onSave={onSave}
                        onCancel={onCancel}
                    />
                </div>
            ) : (
                <div className="flex justify-between items-start">
                    <div className="flex-1">{viewContent}</div>
                    <div className="flex items-center gap-2">
                        <DragHandle id={id} />
                        <ActionButtons
                            isEditing={false}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
