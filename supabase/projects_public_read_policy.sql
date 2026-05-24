-- Public read policy for `public.projects`
-- Safe to run multiple times.

begin;

-- 1) Enable Row Level Security
alter table public.projects enable row level security;

-- 2) Recreate read policy for anonymous users
drop policy if exists "Public read access" on public.projects;

create policy "Public read access"
on public.projects
for select
to anon
using (true);

-- 3) Grant schema/table permissions
grant usage on schema public to anon;
grant select on table public.projects to anon;

commit;
