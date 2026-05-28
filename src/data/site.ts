import type { SiteContent } from "@/types/siteContent";

const fallbackResumeUrl =
  process.env.NEXT_PUBLIC_RESUME_URL ?? "https://your-resume-link.com/resume.pdf";

export const DEFAULT_SITE_CONTENT: SiteContent = {
  siteConfig: {
    name: "PATIPHAN MEELAPSUANG",
    role: "วิศวกรรมคอมพิวเตอร์และระบบไอโอที",
    tagline: "",
    description:
      "Portfolio website of Patiphan Meelapsuang, Full Stack and IoT Developer.",
    email: "waterza184641@gmail.com",
    phone: "+66 62 670 4442",
    location: "Thailand",
    resumeUrl: fallbackResumeUrl
  },
  navLinks: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" }
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/Numcha1" },
    { label: "Facebook", href: "https://www.facebook.com/patiphan.meelapsuang" },
    { label: "Instagram", href: "https://www.instagram.com/p._.num_cha_/" }
  ],
  aboutIntro:
    "ผมเป็นนักศึกษาสาขาวิศวกรรมคอมพิวเตอร์และเทคโนโลยี IoT ที่สนใจงานพัฒนาระบบและซอฟต์แวร์ครับ งานพัฒนาเว็บไซต์ ระบบจัดการข้อมูล และงาน Backend Development ชอบเรียนรู้เทคโนโลยีใหม่ๆ และนำมาประยุกต์ใช้กับงานจริง เคยทำโปรเจกต์ทั้งด้านเว็บไซต์ ฐานข้อมูล และระบบจัดการข้อมูลหลายรูปแบบ เป้าหมายของผมคือพัฒนาทักษะการเขียนโปรแกรม การออกแบบระบบ และการแก้ปัญหาอย่างต่อเนื่อง เพื่อต่อยอดสู่การทำงานด้านเทคโนโลยีและซอฟต์แวร์ในอนาคต",
  aboutPoints: [
    "ปรับตัวได้ดี และทำงานร่วมกับผู้อื่นได้อย่างราบรื่น",
    "ชอบพัฒนาโปรเจกต์ที่สามารถนำไปใช้งานได้จริง",
    "สนใจงานพัฒนาซอฟต์แวร์และการออกแบบระบบ",
    "พัฒนาทักษะด้านเทคโนโลยีอย่างต่อเนื่อง",
    "ทำงานเป็นทีมได้ดี และพร้อมรับข้อเสนอแนะเพื่อนำไปปรับปรุงงาน"
  ],
  skillGroups: [
    {
      title: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "Next.js", "Tailwind CSS"]
    },
    {
      title: "Backend",
      skills: ["PHP", "Python", "FastAPI", "Node.js"]
    },
    {
      title: "Database",
      skills: ["MySQL", "PostgreSQL", "Supabase"]
    },
    {
      title: "Tools",
      skills: ["GitHub", "Docker", "Figma", "VS Code"]
    },
    {
      title: "Soft Skills",
      skills: ["Problem Solving", "Teamwork", "Adaptability", "Fast Learner", "Responsibility"]
    }
  ],
  experienceItems: ["NIWAT FROZEN FOOD", "DIGITAL INSTRUMENT COMPANY LIMITED"],
  highlights: [
    { label: "Projects Built", value: "12+" },
    { label: "Tech Stack", value: "20+" },
    { label: "Focus", value: "Web + IoT" }
  ]
};

export const SITE_CONFIG = DEFAULT_SITE_CONTENT.siteConfig;
export const NAV_LINKS = DEFAULT_SITE_CONTENT.navLinks;
export const SOCIAL_LINKS = DEFAULT_SITE_CONTENT.socialLinks;
export const ABOUT_POINTS = DEFAULT_SITE_CONTENT.aboutPoints;
export const ABOUT_INTRO = DEFAULT_SITE_CONTENT.aboutIntro;
export const SKILL_GROUPS = DEFAULT_SITE_CONTENT.skillGroups;
export const EXPERIENCE_ITEMS = DEFAULT_SITE_CONTENT.experienceItems;
export const HIGHLIGHTS = DEFAULT_SITE_CONTENT.highlights;
