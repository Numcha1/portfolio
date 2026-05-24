-- Keep only these 3 projects on host
-- EMR SYSTEM, REPAIR-AND-SPARE, Project Milestone Monitor

begin;

delete from public.projects;

insert into public.projects
(title, description, tech_stack, github_url, demo_url, image_url)
values
(
  'EMR SYSTEM',
  'เธฃเธฐเธเธเธเธฑเธ”เน€เธเนเธเธเนเธญเธกเธนเธฅเธเธนเนเธเนเธงเธขเนเธฅเธฐเธงเธดเน€เธเธฃเธฒเธฐเธซเนเนเธฃเธ',
  'FastAPI, PostgreSQL, Docker, Next.js',
  'https://github.com/Numcha1/healthchain-emr',
  '',
  '/emr-system.png'
),
(
  'REPAIR-AND-SPARE',
  'เธฃเธฐเธเธเธเธฑเธ”เธเธฒเธฃเธเธฒเธเธเนเธญเธกเนเธฅเธฐเธญเธฐเนเธซเธฅเน เธเธฃเนเธญเธกเธ•เธดเธ”เธ•เธฒเธกเธชเธ–เธฒเธเธฐเธเธฒเธเนเธฅเธฐเธชเธ•เนเธญเธ',
  'PHP, MySQL, HTML, CSS',
  'https://github.com/Numcha1/Repair-and-Spare-Parts-Inventory-Management-System',
  '',
  '/repair-and-spare.png'
),
(
  'Project Milestone Monitor',
  'เธฃเธฐเธเธเธ•เธดเธ”เธ•เธฒเธกเธเธงเธฒเธกเธเธทเธเธซเธเนเธฒเนเธเธฃเธเธเธฒเธฃ เธเธฑเธ”เธเธฒเธฃเธเธฒเธ เนเธฅเธฐเธชเธฃเธธเธเธฃเธฒเธขเธเธฒเธเธเธฅ',
  'PHP, MySQL, JavaScript',
  'https://github.com/Numcha1/Project-Management-and-Progress-Tracking-System-A-Case-Study',
  '',
  '/project-milestone-monitor.png'
);

commit;

