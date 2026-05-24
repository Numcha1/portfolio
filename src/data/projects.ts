import type { Project } from "@/types/project";

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "repair-and-spare",
    title: "REPAIR-AND-SPARE",
    description: "ระบบจัดการงานซ่อมและอะไหล่ พร้อมติดตามสถานะงานและสต็อก",
    techStack: ["PHP", "MySQL", "HTML", "CSS"],
    githubUrl: "https://github.com/Numcha1/Repair-and-Spare-Parts-Inventory-Management-System",
    demoUrl: "",
    imageUrl: "/project-placeholder.svg"
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
