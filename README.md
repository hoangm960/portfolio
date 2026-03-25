# Portfolio

Personal portfolio website built with modern web technologies to showcase my projects, skills, and experience as a Full-stack Developer.

## Technologies

- **Frontend**: React, Next.js, TypeScript, TailwindCSS, Framer Motion, Three.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Firebase, PostgreSQL, MySQL
- **CMS**: Sanity
- **Tools**: Git, Vite, Vercel

## Getting Started

### Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### CMS Content Management

This portfolio uses **Sanity** as a headless CMS. You can modify content without touching code.

#### Run Sanity Studio locally

```bash
cd studio-portfolio
npm install
npm run dev
```

Then open [http://localhost:3333](http://localhost:3333) in your browser.

#### Content you can modify

- **Personal Info** — name, role, bio, avatar, location, contact details
- **Projects** — title, description, tech stack, GitHub/live URLs, dates
- **Skills** — categories and individual skills with icons
- **Social Links** — GitHub, LinkedIn, Facebook, email

## Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Sanity Studio (`studio-portfolio/.env`)

Copy from `studio-portfolio/.env.example`:

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token
```
