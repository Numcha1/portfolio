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
  "สามารถปรับตัวและทำงานร่วมกับผู้อื่นได้ดี",
  "ชื่นชอบการพัฒนาโปรเจคที่สามารถใช้งานได้จริง",
  "มีความสนใจด้านซอฟต์แวร์และการพัฒนาระบบ",
  "มุ่งพัฒนาทักษะด้านเทคโนโลยีอย่างต่อเนื่อง",
  "ทำงานเป็นทีมได้ดี พร้อมเรียนรู้จาก feedback และปรับปรุงงานอย่างต่อเนื่อง"
];

export const ABOUT_INTRO =
  "ผมเป็นนักศึกษาสาขาวิศวกรรมคอมพิวเตอร์และเทคโนโลยี IoT ที่มีความสนใจด้านการพัฒนาระบบและซอฟต์แวร์ โดยเฉพาะการพัฒนาเว็บไซต์ ระบบจัดการข้อมูล และ Backend Development ชื่นชอบการเรียนรู้เทคโนโลยีใหม่ๆ และการนำความรู้มาพัฒนาระบบที่สามารถใช้งานได้จริง มีประสบการณ์ในการพัฒนาโปรเจคทั้งด้านเว็บไซต์ ระบบฐานข้อมูล และระบบจัดการข้อมูลในรูปแบบต่าง ๆ รวมถึงการทำงานร่วมกับเครื่องมือและเทคโนโลยีที่เกี่ยวข้องกับการพัฒนาระบบสมัยใหม่ ผมมีความสนใจในการพัฒนาทักษะด้านการเขียนโปรแกรม การออกแบบระบบ และการแก้ปัญหาเชิงตรรกะ พร้อมทั้งสามารถเรียนรู้สิ่งใหม่และปรับตัวเข้ากับสภาพแวดล้อมในการทำงานได้ดี มีความตั้งใจในการพัฒนาตนเองอยู่เสมอ และมุ่งหวังที่จะนำความรู้และประสบการณ์ที่มีไปต่อยอดในการทำงานด้านเทคโนโลยีและการพัฒนาซอฟต์แวร์ในอนาคต";

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
