-- Site content access control (public read + admin write)
-- Run this after `projects_admin_access.sql` so `public.admin_users` already exists.

begin;

grant usage on schema public to anon, authenticated;

create table if not exists public.site_content (
  id boolean primary key default true check (id = true),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

grant select on table public.site_content to anon, authenticated;
grant insert, update, delete on table public.site_content to authenticated;

drop policy if exists "site_content_public_read" on public.site_content;
create policy "site_content_public_read"
on public.site_content
for select
to anon, authenticated
using (true);

drop policy if exists "site_content_admin_insert" on public.site_content;
create policy "site_content_admin_insert"
on public.site_content
for insert
to authenticated
with check (
  exists (
    select 1
    from public.admin_users as au
    where au.user_id = auth.uid()
  )
);

drop policy if exists "site_content_admin_update" on public.site_content;
create policy "site_content_admin_update"
on public.site_content
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

drop policy if exists "site_content_admin_delete" on public.site_content;
create policy "site_content_admin_delete"
on public.site_content
for delete
to authenticated
using (
  exists (
    select 1
    from public.admin_users as au
    where au.user_id = auth.uid()
  )
);

insert into public.site_content (id, content)
values (true, '{}'::jsonb)
on conflict (id) do nothing;

commit;
