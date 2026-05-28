import { DEFAULT_SITE_CONTENT } from "@/data/site";
import type { HighlightItem, NavLink, SkillGroup, SocialLink } from "@/types/site";
import type { SiteConfig, SiteContent } from "@/types/siteContent";

const isString = (value: unknown): value is string => typeof value === "string";

const cleanString = (value: unknown, fallback = "") =>
  isString(value) ? value.trim() : fallback;

const cleanStringArray = (value: unknown, fallback: string[] = []) => {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .filter(isString)
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : fallback;
};

const parseNavLink = (value: unknown): NavLink | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;
  const label = cleanString(item.label);
  const href = cleanString(item.href);

  if (!label || !href) {
    return null;
  }

  return { label, href };
};

const parseSocialLink = (value: unknown): SocialLink | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;
  const label = cleanString(item.label);
  const href = cleanString(item.href);

  if (!label || !href) {
    return null;
  }

  return { label, href };
};

const parseSkillGroup = (value: unknown): SkillGroup | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;
  const title = cleanString(item.title);
  const skills = cleanStringArray(item.skills);

  if (!title || skills.length === 0) {
    return null;
  }

  return { title, skills };
};

const parseHighlight = (value: unknown): HighlightItem | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;
  const label = cleanString(item.label);
  const valueText = cleanString(item.value);

  if (!label || !valueText) {
    return null;
  }

  return { label, value: valueText };
};

const parseSiteConfig = (value: unknown): SiteConfig => {
  const fallback = DEFAULT_SITE_CONTENT.siteConfig;

  if (!value || typeof value !== "object") {
    return { ...fallback };
  }

  const item = value as Record<string, unknown>;

  return {
    name: cleanString(item.name, fallback.name),
    role: cleanString(item.role, fallback.role),
    tagline: cleanString(item.tagline, fallback.tagline),
    description: cleanString(item.description, fallback.description),
    email: cleanString(item.email, fallback.email),
    phone: cleanString(item.phone, fallback.phone),
    location: cleanString(item.location, fallback.location),
    resumeUrl: cleanString(item.resumeUrl, fallback.resumeUrl)
  };
};

const parseArray = <T>(value: unknown, parser: (item: unknown) => T | null, fallback: T[]) => {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const parsed = value
    .map(parser)
    .filter((item): item is T => item !== null);

  return parsed.length > 0 ? parsed : fallback;
};

export const normalizeSiteContent = (value: unknown): SiteContent => {
  const fallback = DEFAULT_SITE_CONTENT;

  if (!value || typeof value !== "object") {
    return fallback;
  }

  const item = value as Record<string, unknown>;

  return {
    siteConfig: parseSiteConfig(item.siteConfig),
    navLinks: parseArray(item.navLinks, parseNavLink, fallback.navLinks),
    socialLinks: parseArray(item.socialLinks, parseSocialLink, fallback.socialLinks),
    aboutIntro: cleanString(item.aboutIntro, fallback.aboutIntro),
    aboutPoints: cleanStringArray(item.aboutPoints, fallback.aboutPoints),
    skillGroups: parseArray(item.skillGroups, parseSkillGroup, fallback.skillGroups),
    experienceItems: cleanStringArray(item.experienceItems, fallback.experienceItems),
    highlights: parseArray(item.highlights, parseHighlight, fallback.highlights)
  };
};
