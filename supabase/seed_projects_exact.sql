-- Keep only these 3 projects on host
-- EMR SYSTEM, REPAIR-AND-SPARE, PROJECT-MANAGEMENT

begin;

delete from public.projects;

insert into public.projects
(title, description, tech_stack, github_url, demo_url, image_url)
values
(
  'EMR SYSTEM',
  'ระบบจัดเก็บข้อมูลผู้ป่วยและวิเคราะห์โรค',
  'FastAPI, PostgreSQL, Docker, Next.js',
  'https://github.com/Numcha1/healthchain-emr',
  '',
  '/project-placeholder.svg'
),
(
  'REPAIR-AND-SPARE',
  'ระบบจัดการงานซ่อมและอะไหล่ พร้อมติดตามสถานะงานและสต็อก',
  'PHP, MySQL, HTML, CSS',
  'https://github.com/Numcha1/Repair-and-Spare-Parts-Inventory-Management-System',
  '',
  '/project-placeholder.svg'
),
(
  'PROJECT-MANAGEMENT',
  'ระบบติดตามความคืบหน้าโครงการ จัดการงาน และสรุปรายงานผล',
  'PHP, MySQL, JavaScript',
  'https://github.com/Numcha1/Project-Management-and-Progress-Tracking-System-A-Case-Study',
  '',
  '/project-placeholder.svg'
);

commit;