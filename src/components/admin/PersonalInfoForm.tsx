import { useState } from "react";
import Image from "next/image";
import { PersonalInfo } from "@/lib/db";
import { uploadAvatar, uploadAboutImage } from "@/lib/db";

interface PersonalInfoFormProps {
    data: PersonalInfo | null;
    userId: string;
    onUpdate: (data: Partial<PersonalInfo>) => Promise<void>;
}

const defaultForm: PersonalInfo = {
    name: "",
    role: "",
    tagline: "",
    location: "",
    email: "",
    phone: "",
    avatar: "",
    aboutImage: "",
    bio: "",
    stats: { yearsExperience: 0, projectsCompleted: 0, cupsOfCoffee: 0 },
};

export function PersonalInfoForm({
    data,
    userId,
    onUpdate,
}: PersonalInfoFormProps) {
    const [form, setForm] = useState<PersonalInfo>(data || defaultForm);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [aboutFile, setAboutFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        try {
            const updatedData = { ...form };
            if (avatarFile) {
                updatedData.avatar = await uploadAvatar(userId, avatarFile);
            }
            if (aboutFile) {
                updatedData.aboutImage = await uploadAboutImage(userId, aboutFile);
            }
            await onUpdate(updatedData);
            alert("Saved!");
        } catch (err) {
            console.error(err);
            alert("Error saving");
        }
        setSaving(false);
    }

    const avatarPreview = avatarFile ? URL.createObjectURL(avatarFile) : form.avatar;
    const aboutPreview = aboutFile ? URL.createObjectURL(aboutFile) : form.aboutImage;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="flex flex-row justify-between items-start gap-6 p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Avatar</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 dark:file:bg-sky-900 dark:file:text-sky-300"
                    />
                    {avatarPreview && (
                        <div className="relative mt-2 w-20 h-20">
                            <Image
                                src={avatarPreview}
                                alt="Avatar"
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                        About Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAboutFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 dark:file:bg-sky-900 dark:file:text-sky-300"
                    />
                    {aboutPreview && (
                        <div className="relative mt-2 w-20 h-20">
                            <Image
                                src={aboutPreview}
                                alt="About"
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Name</label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Role</label>
                <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Tagline</label>
                <input
                    type="text"
                    value={form.tagline}
                    onChange={(e) =>
                        setForm({ ...form, tagline: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Location</label>
                <input
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Email</label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Phone</label>
                <input
                    type="text"
                    value={form.phone}
                    onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Bio</label>
                <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                        Years Experience
                    </label>
                    <input
                        type="number"
                        value={form.stats.yearsExperience}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                stats: {
                                    ...form.stats,
                                    yearsExperience: Number(e.target.value),
                                },
                            })
                        }
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                        Projects Completed
                    </label>
                    <input
                        type="number"
                        value={form.stats.projectsCompleted}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                stats: {
                                    ...form.stats,
                                    projectsCompleted: Number(e.target.value),
                                },
                            })
                        }
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                        Cups of Coffee
                    </label>
                    <input
                        type="number"
                        value={form.stats.cupsOfCoffee}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                stats: {
                                    ...form.stats,
                                    cupsOfCoffee: Number(e.target.value),
                                },
                            })
                        }
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity50"
            >
                {saving ? "Saving..." : "Save"}
            </button>
        </form>
    );
}
