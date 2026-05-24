import type { Project } from "@/types/project";

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "emr-system",
    title: "EMR SYSTEM",
    description: "ระบบจัดเก็บข้อมูลผู้ป่วยและวิเคราะห์โรค",
    techStack: ["FastAPI", "PostgreSQL", "Docker", "Next.js"],
    githubUrl: "https://github.com/Numcha1/healthchain-emr",
    demoUrl: "",
    imageUrl: "/project-placeholder.svg"
  },
  {
    id: "repair-and-spare",
    title: "REPAIR-AND-SPARE",
    description: "ระบบจัดการงานซ่อมและอะไหล่ พร้อมติดตามสถานะงานและสต็อก",
    techStack: ["PHP", "MySQL", "HTML", "CSS"],
    githubUrl: "https://github.com/Numcha1/Repair-and-Spare-Parts-Inventory-Management-System",
    demoUrl: "",
    imageUrl: "/repair-and-spare.png"
  },
  {
    id: "project-management",
    title: "PROJECT-MANAGEMENT",
    description: "ระบบติดตามความคืบหน้าโครงการ จัดการงาน และสรุปรายงานผล",
    techStack: ["PHP", "MySQL", "JavaScript"],
    githubUrl: "https://github.com/Numcha1/Project-Management-and-Progress-Tracking-System-A-Case-Study",
    demoUrl: "",
    imageUrl: "/project-placeholder.svg"
  }
];
