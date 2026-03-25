# Sanity CMS for Portfolio

This is the Sanity Content Studio for managing portfolio content.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) to manage content.

## Content Types

- **personalInfo** — Your profile information (name, role, bio, avatar, contact)
- **project** — Portfolio projects with description, tech stack, and links
- **skillCategory** — Skill categories and individual skills
- **socialLink** — Social media links (GitHub, LinkedIn, Facebook, email)

## Environment Variables

Copy `.env.example` to `.env` and add your values:

```bash
cp .env.example .env
```

Required variables:
- `SANITY_PROJECT_ID` — Your Sanity project ID
- `SANITY_DATASET` — Dataset name (default: production)
- `SANITY_WRITE_TOKEN` — Write token for content modifications
