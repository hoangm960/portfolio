import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import {
    getPersonalInfo,
    getProjects,
    getSkillCategories,
    getSocialLinks,
    PersonalInfo,
    Project,
    SkillCategory,
    SocialLink,
} from "@/lib/db";

const ALLOWED_EMAIL = "hoangm960@gmail.com";

interface UseAdminAuthReturn {
    user: User | null;
    loading: boolean;
    isAllowed: boolean;
    personalInfo: PersonalInfo | null;
    projects: Project[];
    skillCategories: SkillCategory[];
    socialLinks: SocialLink[];
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    reloadData: () => Promise<void>;
}

export function useAdminAuth(): UseAdminAuthReturn {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

    const isAllowed = user?.email === ALLOWED_EMAIL;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);
            if (user && user.email === ALLOWED_EMAIL) {
                const [info, proj, skills, social] = await Promise.all([
                    getPersonalInfo(),
                    getProjects(),
                    getSkillCategories(),
                    getSocialLinks(),
                ]);
                setPersonalInfo(info);
                setProjects(proj);
                setSkillCategories(skills);
                setSocialLinks(social);
            }
        });
        return () => unsubscribe();
    }, []);

    const reloadData = async () => {
        const [info, proj, skills, social] = await Promise.all([
            getPersonalInfo(),
            getProjects(),
            getSkillCategories(),
            getSocialLinks(),
        ]);
        setPersonalInfo(info);
        setProjects(proj);
        setSkillCategories(skills);
        setSocialLinks(social);
    };

    const signIn = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    const handleSignOut = async () => {
        await signOut(auth);
    };

    return {
        user,
        loading,
        isAllowed,
        personalInfo,
        projects,
        skillCategories,
        socialLinks,
        signIn,
        signOut: handleSignOut,
        reloadData,
    };
}
