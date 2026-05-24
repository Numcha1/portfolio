# Frontend Portfolio (Next.js + Tailwind + Supabase)

Modern portfolio website for a Computer Engineering and IoT student.

## Stack

- Next.js (App Router + TypeScript)
- Tailwind CSS
- Supabase (Postgres)

## Included Sections

- Home
- About
- Skills
- Projects
- Contact

## Features

- Dark blue + white developer theme
- Responsive layout (desktop + mobile)
- Smooth, clean UI and spacing
- Reusable components
- Projects loaded dynamically from Supabase
- Fallback to sample projects if Supabase is not configured

## Supabase Table

Table: `public.projects`

Fields:

- `id`
- `title`
- `description`
- `tech_stack` or `techStack`
- `github_url` or `githubUrl`
- `demo_url` or `demoUrl`
- `image_url` or `imageUrl`

## Setup

1. Install dependencies

```bash
npm install
```

2. Create env file

```bash
cp .env.example .env.local
```

3. Fill Supabase values in `.env.local`

4. Apply policy SQL in Supabase SQL Editor

- Run: `supabase/projects_public_read_policy.sql`

5. Run app

```bash
npm run dev
```