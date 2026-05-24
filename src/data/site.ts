import type { NavLink, SkillGroup, SocialLink } from "@/types/site";

export const SITE_CONFIG = {
  name: "PATIPHAN MEELAPSUANG",
  role: "วิศวกรรมคอมพิวเตอร์และระบบไอโอที",
  tagline: "",
  description:
    "Portfolio website of Patiphan Meelapsuang, Full Stack and IoT Developer.",
  email: "waterza184641@gmail.com",
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
  { label: "GitHub", href: "https://github.com/Numcha1" },
  { label: "Facebook", href: "https://www.facebook.com/patiphan.meelapsuang" },
  { label: "Instagram", href: "https://www.instagram.com/p._.num_cha_/" }
];

export const ABOUT_POINTS = [
  "ปรับตัวได้ดี และทำงานร่วมกับผู้อื่นได้อย่างราบรื่น",
  "ชอบพัฒนาโปรเจกต์ที่สามารถนำไปใช้งานได้จริง",
  "สนใจงานพัฒนาซอฟต์แวร์และการออกแบบระบบ",
  "พัฒนาทักษะด้านเทคโนโลยีอย่างต่อเนื่อง",
  "ทำงานเป็นทีมได้ดี และพร้อมรับข้อเสนอแนะเพื่อนำไปปรับปรุงงาน"
];

export const ABOUT_INTRO =
  "ผมเป็นนักศึกษาสาขาวิศวกรรมคอมพิวเตอร์และเทคโนโลยี IoT ที่สนใจงานพัฒนาระบบและซอฟต์แวร์ครับ งานพัฒนาเว็บไซต์ ระบบจัดการข้อมูล และงาน Backend Development ชอบเรียนรู้เทคโนโลยีใหม่ๆ และนำมาประยุกต์ใช้กับงานจริง เคยทำโปรเจกต์ทั้งด้านเว็บไซต์ ฐานข้อมูล และระบบจัดการข้อมูลหลายรูปแบบ เป้าหมายของผมคือพัฒนาทักษะการเขียนโปรแกรม การออกแบบระบบ และการแก้ปัญหาอย่างต่อเนื่อง เพื่อต่อยอดสู่การทำงานด้านเทคโนโลยีและซอฟต์แวร์ในอนาคต";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    skills: ["HTML,", "CSS,", "JavaScript,", "Next.js,", "Tailwind CSS"]
  },
  {
    title: "Backend",
    skills: ["PHP,", "Python,", "FastAPI,", "Node.js"]
  },
  {
    title: "Database",
    skills: ["MySQL,", "PostgreSQL,", "Supabase"]
  },
  {
    title: "Tools",
    skills: ["GitHub,", "Docker,", "Figma,", "VS Code"]
  },
  {
    title: "SoftSkills",
    skills: ["Problem Solving,", "Teamwork,", "Adaptability,", "Fast Learner,", "Responsibility"]
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
