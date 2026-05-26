-- Projects access control (public read + admin write)
-- Run this in Supabase SQL Editor.
-- Step 1: replace YOUR_ADMIN_USER_ID with your real auth.users.id (UUID).

begin;

-- Basic API grants (important when new grant defaults are revoked)
grant usage on schema public to anon, authenticated;
grant select on table public.projects to anon, authenticated;
grant insert, update, delete on table public.projects to authenticated;

-- 1) Admin table
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

grant select on table public.admin_users to authenticated;

drop policy if exists "Admin users can view own row" on public.admin_users;
create policy "Admin users can view own row"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

-- 2) Projects policies
alter table public.projects enable row level security;

drop policy if exists "Public read access" on public.projects;
drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read"
on public.projects
for select
to anon, authenticated
using (true);

drop policy if exists "projects_admin_insert" on public.projects;
create policy "projects_admin_insert"
on public.projects
for insert
to authenticated
with check (
  exists (
    select 1
    from public.admin_users as au
    where au.user_id = auth.uid()
  )
);

drop policy if exists "projects_admin_update" on public.projects;
create policy "projects_admin_update"
on public.projects
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_users as au
    where au.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users as au
    where au.user_id = auth.uid()
  )
);

drop policy if exists "projects_admin_delete" on public.projects;
create policy "projects_admin_delete"
on public.projects
for delete
to authenticated
using (
  exists (
    select 1
    from public.admin_users as au
    where au.user_id = auth.uid()
  )
);

-- 3) Add your admin user manually (replace UUID before run)
insert into public.admin_users (user_id)
values ('YOUR_ADMIN_USER_ID')
on conflict (user_id) do nothing;

commit;
