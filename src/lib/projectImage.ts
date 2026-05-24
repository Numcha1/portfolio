const normalizeTitle = (title: string) => title.trim().toLowerCase();

export const getProjectImageFallback = (title: string) => {
  const key = normalizeTitle(title);

  if (key.includes("emr")) {
    return "/emr-system.png";
  }

  if (key.includes("repair")) {
    return "/repair-and-spare.png";
  }

  if (key.includes("milestone") || key.includes("project-management")) {
    return "/project-milestone-monitor.png";
  }

  return "/project-placeholder.svg";
};

export const normalizeProjectImageUrl = (value: string, title: string) => {
  const raw = value.trim();
  const fallback = getProjectImageFallback(title);

  if (!raw) {
    return fallback;
  }

  if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("/")) {
    return raw;
  }

  if (raw.startsWith("public/")) {
    return `/${raw.replace(/^public\//, "")}`;
  }

  if (raw.startsWith("./")) {
    return `/${raw.replace(/^\.\/+/, "")}`;
  }

  if (raw.includes("supabase.co")) {
    return raw.startsWith("http") ? raw : `https://${raw}`;
  }

  return fallback;
};
