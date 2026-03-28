interface AdminHeaderProps {
    email: string;
    onSignOut: () => Promise<void>;
}

export function AdminHeader({ email, onSignOut }: AdminHeaderProps) {
    return (
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Portfolio Admin</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{email}</span>
                    <button
                        onClick={onSignOut}
                        className="px-4 py-2 text-sm bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </header>
    );
}
