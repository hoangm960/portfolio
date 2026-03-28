import { useState } from "react";
import { SkillCategory, SkillCategoryInput } from "@/lib/db";
import { SortableList } from "./SortableList";
import { EditableCard } from "./EditableCard";
import { FormInput } from "./FormInput";

interface SkillsSectionProps {
    categories: SkillCategory[];
    onUpdate: (id: string, data: Partial<SkillCategory>) => Promise<void>;
    onCreate: (data: SkillCategoryInput) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onReorder: (items: SkillCategory[]) => void;
}

export function SkillsSection({
    categories,
    onUpdate,
    onCreate,
    onDelete,
    onReorder,
}: SkillsSectionProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<SkillCategory>>({});

    async function handleSave(id: string) {
        await onUpdate(id, form);
        setEditingId(null);
        setForm({});
    }

    async function handleAdd() {
        await onCreate({
            name: "New Category",
            order: categories.length,
            skills: [],
        });
    }

    function updateForm(field: keyof SkillCategory, value: unknown) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    return (
        <div>
            <button
                onClick={handleAdd}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Add Category
            </button>

            <SortableList
                items={categories}
                onReorder={onReorder}
                onUpdateOrder={async (id, order) => {
                    await onUpdate(id, { order });
                }}
            >
                {(cat) => (
                    <EditableCard
                        id={cat._id}
                        isEditing={editingId === cat._id}
                        onEdit={() => {
                            setEditingId(cat._id);
                            setForm(cat);
                        }}
                        onDelete={() => onDelete(cat._id)}
                        onSave={() => handleSave(cat._id)}
                        onCancel={() => {
                            setEditingId(null);
                            setForm({});
                        }}
                        viewContent={
                            <>
                                <h3 className="font-semibold">{cat.name}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {cat.skills.map((s) => s.name).join(", ")}
                                </p>
                            </>
                        }
                        editContent={
                            <>
                                <FormInput
                                    placeholder="Category Name"
                                    value={form.name || ""}
                                    onChange={(v) => updateForm("name", v)}
                                />
                                <FormInput
                                    type="textarea"
                                    placeholder="Skills (comma separated)"
                                    value={
                                        form.skills
                                            ?.map((s) => s.name)
                                            .join(", ") ||
                                        cat.skills.map((s) => s.name).join(", ")
                                    }
                                    onChange={(v) =>
                                        updateForm(
                                            "skills",
                                            v.split(",").map((s) => ({
                                                name: s.trim(),
                                                icon: null,
                                            })),
                                        )
                                    }
                                />
                            </>
                        }
                    />
                )}
            </SortableList>
        </div>
    );
}
