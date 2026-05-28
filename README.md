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
- Admin page at `/admin` for project CRUD (login required)

## Supabase Table

Table: `public.projects`

Fields:

- `id`
- `title`
- `description`
- `tech_stack` or `techStack`
- `github_url` or `githubUrl`
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

- Public read only: `supabase/projects_public_read_policy.sql`
- Public read + admin write: `supabase/projects_admin_access.sql`
- Site content table + admin write: `supabase/site_content_admin_access.sql`
  - Replace `YOUR_ADMIN_USER_ID` in SQL before running.
  - This keeps portfolio pages public, but only your admin account can edit.

5. Run app

```bash
npm run dev
```

6. Open admin page

- `http://localhost:3000/admin`
- You can edit both project data and all core site content in this page.
