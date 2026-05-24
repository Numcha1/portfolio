import type { NavLink, SkillGroup, SocialLink } from "@/types/site";

export const SITE_CONFIG = {
  name: "PATIPHAN MEELAPSUANG",
  role: "Full Stack & IoT Developer",
  tagline:
    "Computer Engineering & IoT Student interested in Backend, AI and System Development",
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
  "สนใจ Backend Development",
  "พัฒนาระบบ Full Stack",
  "ทำระบบฐานข้อมูลและ IoT",
  "เรียนรู้เทคโนโลยีใหม่ได้รวดเร็ว"
];

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
