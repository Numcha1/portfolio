-- Keep only these 3 projects on host:
-- EMR SYSTEM, REPAIR-AND-SPARE, Project Milestone Monitor

begin;

delete from public.projects;

insert into public.projects (
  title,
  description,
  tech_stack,
  github_url,
  demo_url,
  image_url
)
values
  (
    'EMR SYSTEM',
    'Patient record management and disease analysis system.',
    'FastAPI, PostgreSQL, Docker, Next.js',
    'https://github.com/Numcha1/healthchain-emr',
    '',
    '/emr-system.png'
  ),
  (
    'REPAIR-AND-SPARE',
    'Repair and spare parts workflow with status and inventory tracking.',
    'PHP, MySQL, HTML, CSS',
    'https://github.com/Numcha1/Repair-and-Spare-Parts-Inventory-Management-System',
    '',
    '/repair-and-spare.png'
  ),
  (
    'Project Milestone Monitor',
    'Project progress tracking, task management, and reporting system.',
    'PHP, MySQL, JavaScript',
    'https://github.com/Numcha1/Project-Management-and-Progress-Tracking-System-A-Case-Study',
    '',
    '/project-milestone-monitor.png'
  );

commit;
