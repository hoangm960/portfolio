import { SocialLink } from "@/lib/db";

interface SocialLinksSectionProps {
    links: SocialLink[];
    onUpdate: (
        platform: string,
        data: Partial<SocialLink>,
    ) => Promise<void>;
}

export function SocialLinksSection({
    links,
    onUpdate,
}: SocialLinksSectionProps) {
    return (
        <div className="space-y-4">
            {links.map((link) => (
                <div
                    key={link.platform}
                    className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700"
                >
                    <div className="flex justify-between items-center">
                        <span className="font-medium capitalize">
                            {link.platform}
                        </span>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={link.enabled}
                                onChange={(e) =>
                                    onUpdate(link.platform, {
                                        enabled: e.target.checked,
                                    })
                                }
                                className="w-5 h-5"
                            />
                            <span className="text-sm">Enabled</span>
                        </label>
                    </div>
                    <input
                        type="text"
                        value={link.url}
                        onChange={(e) =>
                            onUpdate(link.platform, { url: e.target.value })
                        }
                        className="w-full mt-2 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        placeholder="URL"
                    />
                </div>
            ))}
        </div>
    );
}
