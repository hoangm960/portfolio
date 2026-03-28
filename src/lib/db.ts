import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export type Skill = {
  name: string;
  icon: string | null;
};

export type SkillCategory = {
  _id: string;
  name: string;
  order: number;
  skills: Skill[];
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  image: string | null;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  startDate: string;
  endDate: string;
  order: number;
};

export type ProjectInput = {
  name: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  startDate: string;
  endDate: string;
  order: number;
};

export type SkillCategoryInput = {
  name: string;
  order: number;
  skills: Skill[];
};

export type SocialLink = {
  platform: string;
  url: string;
  enabled: boolean;
  order: number;
};

export type PersonalInfo = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
  aboutImage: string;
  bio: string;
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    cupsOfCoffee: number;
  };
};

const PERSONAL_INFO_DOC = "info/personal";

async function uploadImage(
  folder: string,
  filename: string,
  file: File
): Promise<string> {
  const storageRef = ref(storage, `${folder}/${filename}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function getPersonalInfo(): Promise<PersonalInfo> {
  const docRef = doc(db, PERSONAL_INFO_DOC);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as PersonalInfo;
  }
  throw new Error("Personal info not found in Firestore");
}

export async function updatePersonalInfo(data: Partial<PersonalInfo>): Promise<void> {
  const docRef = doc(db, PERSONAL_INFO_DOC);
  await setDoc(docRef, data, { merge: true });
}

export async function uploadAvatar(userId: string, file: File): Promise<string> {
  return uploadImage(`avatars/${userId}`, "avatar.jpg", file);
}

export async function uploadAboutImage(userId: string, file: File): Promise<string> {
  return uploadImage(`avatars/${userId}`, "about.jpg", file);
}

export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, "projects"), orderBy("order", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { _id: doc.id, image: data.imageUrl || null, ...data };
  }) as Project[];
}

export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  const docRef = doc(db, "projects", id);
  await setDoc(docRef, data, { merge: true });
}

export async function createProject(data: ProjectInput): Promise<string> {
  const docRef = doc(collection(db, "projects"));
  await setDoc(docRef, data);
  return docRef.id;
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, "projects", id);
  await deleteDoc(docRef);
}

export async function uploadProjectImage(projectId: string, file: File): Promise<string> {
  const filename = file.name || "image.jpg";
  return uploadImage(`projects/${projectId}`, filename, file);
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  const q = query(collection(db, "skillCategories"), orderBy("order", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() })) as SkillCategory[];
}

export async function updateSkillCategory(
  id: string,
  data: Partial<SkillCategory>
): Promise<void> {
  const docRef = doc(db, "skillCategories", id);
  await setDoc(docRef, data, { merge: true });
}

export async function createSkillCategory(data: SkillCategoryInput): Promise<string> {
  const docRef = doc(collection(db, "skillCategories"));
  await setDoc(docRef, data);
  return docRef.id;
}

export async function deleteSkillCategory(id: string): Promise<void> {
  const docRef = doc(db, "skillCategories", id);
  await deleteDoc(docRef);
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const q = query(collection(db, "socialLinks"), orderBy("order", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data()) as SocialLink[];
}

export async function updateSocialLink(platform: string, data: Partial<SocialLink>): Promise<void> {
  const docRef = doc(db, "socialLinks", platform);
  await setDoc(docRef, { platform, ...data }, { merge: true });
}
