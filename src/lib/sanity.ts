import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import { personalInfo as defaultPersonalInfo, projects as defaultProjects, skillCategories as defaultSkillCategories, socialLinks as defaultSocialLinks } from './data'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'z1k5z0p3',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
})

const builder = createImageUrlBuilder(client)

type SanityImage = {
  _type?: string;
  asset?: {
    _ref: string;
  };
};

export function urlFor(source: SanityImage | null | undefined) {
  if (!source || !source.asset) return { url: () => "" }
  return builder.image(source)
}

export async function getPersonalInfo() {
  try {
    const data = await client.fetch(`*[_type == "personalInfo"][0]`)
    return data || defaultPersonalInfo
  } catch {
    return defaultPersonalInfo
  }
}

export async function getProjects() {
  try {
    const data = await client.fetch(`*[_type == "project"] | order(_createdAt asc)`)
    return data?.length > 0 ? data : defaultProjects
  } catch {
    return defaultProjects
  }
}

export async function getSkillCategories() {
  try {
    const data = await client.fetch(`*[_type == "skillCategory"]`)
    return data?.length > 0 ? data : defaultSkillCategories
  } catch {
    return defaultSkillCategories
  }
}

export async function getSocialLinks() {
  try {
    const data = await client.fetch(`*[_type == "socialLink" && enabled == true]`)
    return data?.length > 0 ? data : defaultSocialLinks
  } catch {
    // Return as array format
    return [
      { platform: "github", url: "https://github.com/hoangm960", enabled: true },
      { platform: "linkedin", url: "https://linkedin.com/in/minh-hoang-tech", enabled: true },
      { platform: "facebook", url: "https://www.facebook.com/daylaminhne2901", enabled: true },
    ]
  }
}
