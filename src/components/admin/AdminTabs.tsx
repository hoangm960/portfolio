type Tab = "personal" | "projects" | "skills" | "social";

interface AdminTabsProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const tabs: Tab[] = ["personal", "projects", "skills", "social"];

export function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
    return (
        <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-700">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-4 py-2 -mb-px ${
                        activeTab === tab
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
}
