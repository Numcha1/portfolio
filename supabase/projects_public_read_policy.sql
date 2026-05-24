-- 1) Enable RLS on the projects table
alter table public.projects enable row level security;

-- 2) Recreate policy safely
drop policy if exists "Public read access" on public.projects;

create policy "Public read access"
on public.projects
for select
to anon
using (true);

-- 3) Ensure anon role can read the table
grant usage on schema public to anon;
grant select on table public.projects to anon;