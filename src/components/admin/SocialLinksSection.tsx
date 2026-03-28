import { useState } from "react";
import { SocialLink } from "@/lib/db";
import { SortableList } from "./SortableList";
import { DragHandle } from "./SortableItem";

interface SocialLinksSectionProps {
    links: SocialLink[];
    onUpdate: (platform: string, data: Partial<SocialLink>) => Promise<void>;
    onCreate: (data: { title: string; url: string; order: number }) => Promise<void>;
    onDelete: (platform: string) => Promise<void>;
    onReorder: (items: SocialLink[]) => void;
}

interface PendingLink {
    title: string;
    url: string;
    enabled: boolean;
}

interface LocalLink {
    _id: string;
    order: number;
    platform: string;
    title: string;
    url: string;
    enabled: boolean;
}

export function SocialLinksSection({
    links,
    onUpdate,
    onCreate,
    onDelete,
    onReorder,
}: SocialLinksSectionProps) {
    const [newTitle, setNewTitle] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [pendingChanges, setPendingChanges] = useState<Record<string, PendingLink>>({});
    const [pendingOrder, setPendingOrder] = useState<Record<string, number>>({});
    const [localLinks, setLocalLinks] = useState<LocalLink[]>([]);
    const [saving, setSaving] = useState(false);

    const displayLinks = localLinks.length > 0 ? localLinks : links.map((l) => ({ _id: l.platform, order: l.order, platform: l.platform, title: l.title, url: l.url, enabled: l.enabled }));

    const hasChanges = Object.keys(pendingChanges).length > 0 || Object.keys(pendingOrder).length > 0;

    async function handleAdd() {
        if (!newTitle.trim()) return;
        await onCreate({
            title: newTitle.trim(),
            url: newUrl.trim(),
            order: links.length,
        });
        setNewTitle("");
        setNewUrl("");
    }

    function updatePendingChange(platform: string, field: keyof PendingLink, value: string | boolean) {
        const existingLink = links.find(l => l.platform === platform);
        const currentPending = pendingChanges[platform];
        setPendingChanges((prev) => ({
            ...prev,
            [platform]: {
                title: currentPending?.title ?? existingLink?.title ?? "",
                url: currentPending?.url ?? existingLink?.url ?? "",
                enabled: currentPending?.enabled ?? existingLink?.enabled ?? true,
                [field]: value,
            },
        }));
    }

    async function handleSaveAll() {
        setSaving(true);
        try {
            // Save order changes first
            for (const [platform, order] of Object.entries(pendingOrder)) {
                await onUpdate(platform, { order });
            }
            // Save data changes
            for (const [platform, data] of Object.entries(pendingChanges)) {
                await onUpdate(platform, data);
            }
            setPendingChanges({});
            setPendingOrder({});
            setLocalLinks([]);
        } catch (err) {
            console.error(err);
            alert("Error saving");
        }
        setSaving(false);
    }

    function handleDelete(platform: string) {
        onDelete(platform);
        setPendingChanges((prev) => {
            const updated = { ...prev };
            delete updated[platform];
            return updated;
        });
    }

    function getLinkData(link: SocialLink): SocialLink {
        const pending = pendingChanges[link.platform];
        if (pending) {
            return { ...link, ...pending };
        }
        return link;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 items-end p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex-1 mr-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                            Title
                        </label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="e.g., GitHub, LinkedIn"
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                            URL
                        </label>
                        <input
                            type="text"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Add
                    </button>
                </div>
                <button
                    onClick={handleSaveAll}
                    disabled={!hasChanges || saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <SortableList
                items={displayLinks}
                onReorder={(items) => {
                    setLocalLinks(items);
                    const newOrder: Record<string, number> = {};
                    items.forEach((item, index) => {
                        newOrder[item._id] = index;
                    });
                    setPendingOrder(newOrder);
                }}
                saveOnReorder={false}
            >
                {(link) => (
                    <LinkEditor
                        link={getLinkData(link)}
                        onChange={(field, value) => updatePendingChange(link.platform, field, value)}
                        onDelete={() => handleDelete(link.platform)}
                    />
                )}
            </SortableList>
        </div>
    );
}

interface LinkEditorProps {
    link: SocialLink;
    onChange: (field: keyof PendingLink, value: string | boolean) => void;
    onDelete: () => void;
}

function LinkEditor({ link, onChange, onDelete }: LinkEditorProps) {
    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start gap-4">
                <DragHandle id={link.platform} />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium mb-1 text-slate-500 dark:text-slate-400">
                            Title
                        </label>
                        <input
                            type="text"
                            value={link.title}
                            onChange={(e) => onChange("title", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1 text-slate-500 dark:text-slate-400">
                            URL
                        </label>
                        <input
                            type="text"
                            value={link.url}
                            onChange={(e) => onChange("url", e.target.value)}
                            placeholder="https://..."
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={link.enabled}
                            onChange={(e) => onChange("enabled", e.target.checked)}
                            className="w-5 h-5"
                        />
                        <span className="text-sm">Enabled</span>
                    </label>
                    <button
                        onClick={onDelete}
                        className="px-3 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
