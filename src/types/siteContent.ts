import type { HighlightItem, NavLink, SkillGroup, SocialLink } from "@/types/site";

export type SiteConfig = {
  name: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
};

export type SiteContent = {
  siteConfig: SiteConfig;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  aboutIntro: string;
  aboutPoints: string[];
  skillGroups: SkillGroup[];
  experienceItems: string[];
  highlights: HighlightItem[];
};
