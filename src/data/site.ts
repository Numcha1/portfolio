import type { NavLink, SkillGroup, SocialLink } from "@/types/site";

export const SITE_CONFIG = {
  name: "PATIPHAN MEELAPSUANG",
  role: "วิศวกรรมคอมพิวเตอร์และระบบไอโอที",
  tagline: "",
  description:
    "Portfolio website of Patiphan Meelapsuang, Full Stack and IoT Developer.",
  email: "youremail@gmail.com",
  phone: "+66 00 000 0000",
  location: "Thailand",
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL ?? "https://your-resume-link.com/resume.pdf"
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/your-username" },
  { label: "Facebook", href: "https://www.facebook.com/your-profile" }
];

export const ABOUT_POINTS = [
  "ถนัดงาน Backend และการเชื่อมต่อฐานข้อมูลเพื่อให้ระบบทำงานต่อเนื่อง",
  "มีประสบการณ์พัฒนาโปรเจกต์ Full Stack ในงานเรียนและโปรเจกต์ส่วนตัว",
  "สนใจงาน IoT ที่เชื่อมข้อมูลจากอุปกรณ์เข้าสู่ระบบเว็บ",
  "ทำงานเป็นทีมได้ดี พร้อมเรียนรู้จาก feedback และปรับปรุงงานอย่างต่อเนื่อง"
];

export const ABOUT_INTRO =
  "ผมเป็นนักศึกษาวิศวกรรมคอมพิวเตอร์และระบบไอโอทีที่ชอบการพัฒนาระบบแบบเป็นขั้นตอน ตั้งแต่เข้าใจปัญหา วางโครงสร้าง จนพัฒนาให้ใช้งานได้จริง.";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "Next.js"]
  },
  {
    title: "Backend",
    skills: ["PHP", "Python", "FastAPI"]
  },
  {
    title: "Database",
    skills: ["MySQL", "PostgreSQL"]
  },
  {
    title: "Tools",
    skills: ["Docker", "GitHub", "Figma"]
  }
];

export const EXPERIENCE_ITEMS = [
  "NIWAT FROZEN FOOD",
  "DIGITAL INSTRUMENT COMPANY LIMITED"
];

export const HIGHLIGHTS = [
  { label: "Projects Built", value: "12+" },
  { label: "Tech Stack", value: "20+" },
  { label: "Focus", value: "Web + IoT" }
];
