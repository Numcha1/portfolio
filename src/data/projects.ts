import type { Project } from "@/types/project";

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "emr-system",
    title: "EMR SYSTEM",
    description: "ระบบจัดเก็บข้อมูลผู้ป่วยและวิเคราะห์โรค",
    techStack: ["FastAPI", "PostgreSQL", "Docker", "Next.js"],
    githubUrl: "https://github.com/Numcha1/healthchain-emr",
    demoUrl: "https://your-demo-url.com/emr",
    imageUrl: "/project-placeholder.svg"
  },
  {
    id: "beauty-salon-pos",
    title: "BEAUTY SALON POS",
    description: "ระบบสมาชิก ระบบจอง ระบบสต็อก",
    techStack: ["PHP", "MySQL", "HTML", "CSS"],
    githubUrl: "https://github.com/your-username/beauty-salon-pos",
    demoUrl: "https://your-demo-url.com/beauty-salon-pos",
    imageUrl: "/project-placeholder.svg"
  },
  {
    id: "fusion-splicer-stock",
    title: "FUSION SPLICER STOCK SYSTEM",
    description: "ระบบจัดการอุปกรณ์และอะไหล่",
    techStack: ["PHP", "MySQL"],
    githubUrl: "https://github.com/your-username/fusion-splicer-stock",
    demoUrl: "https://your-demo-url.com/fusion-stock",
    imageUrl: "/project-placeholder.svg"
  }
];
