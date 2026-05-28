"use client";

import { useEffect, useState } from "react";

import { SAMPLE_PROJECTS } from "@/data/projects";
import { normalizeProjectImageUrl } from "@/lib/projectImage";
import type { Project } from "@/types/project";
import { supabase } from "../../lib/supabase";

type RawProjectRow = {
  id?: string | number | null;
  title?: string | null;
  description?: string | null;
  techStack?: string[] | string | null;
  tech_stack?: string[] | string | null;
  githubUrl?: string | null;
  github_url?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  createdAt?: string | null;
  created_at?: string | null;
};

type MappedProject = Project & {
  createdAt: number;
};

type UseProjectsOptions = {
  limit?: number;
};

const PROJECTS_CACHE_KEY = "portfolio.projects.cache.v2";
const QUERY_TIMEOUT_MS = 6000;

const normalizeTitle = (value: string) => value.trim().toLowerCase();
const isPlaceholderImage = (value: string) =>
  value.trim().endsWith("/project-placeholder.svg");

const parseLimit = (value?: number) => {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }

  return Math.floor(value);
};

const toProject = (value: unknown): Project | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;
  const title = String(item.title ?? "").trim();

  if (!title) {
    return null;
  }

  return {
    id: String(item.id ?? title),
    title,
    description: String(item.description ?? ""),
    techStack: Array.isArray(item.techStack)
      ? item.techStack.filter((tech): tech is string => typeof tech === "string")
      : [],
    githubUrl: String(item.githubUrl ?? ""),
    imageUrl: normalizeProjectImageUrl(String(item.imageUrl ?? ""), title)
  };
};

const readProjectsCache = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawCache = window.localStorage.getItem(PROJECTS_CACHE_KEY);

    if (!rawCache) {
      return null;
    }

    const parsed = JSON.parse(rawCache);

    if (!Array.isArray(parsed)) {
      return null;
    }

    const cachedProjects = parsed
      .map(toProject)
      .filter((project): project is Project => project !== null);

    return cachedProjects.length > 0 ? cachedProjects : null;
  } catch {
    return null;
  }
};

const writeProjectsCache = (projects: Project[]) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(projects));
  } catch {
    // Ignore storage errors to keep UI resilient (private mode/quota limits).
  }
};

const mapRowsToProjects = (rows: RawProjectRow[]): MappedProject[] =>
  rows.map((item) => {
    const techValue = item.techStack ?? item.tech_stack;
    const createdAtRaw = item.createdAt ?? item.created_at;
    const parsedCreatedAt = createdAtRaw ? Date.parse(createdAtRaw) : NaN;
    const title = String(item.title ?? "");

    return {
      id: String(item.id ?? ""),
      title,
      description: String(item.description ?? ""),
      techStack: Array.isArray(techValue)
        ? techValue.filter((tech): tech is string => typeof tech === "string")
        : typeof techValue === "string"
          ? techValue
              .split(",")
              .map((tech) => tech.trim())
              .filter(Boolean)
          : [],
      githubUrl: String(item.githubUrl ?? item.github_url ?? ""),
      imageUrl: normalizeProjectImageUrl(String(item.imageUrl ?? item.image_url ?? ""), title),
      createdAt: Number.isNaN(parsedCreatedAt) ? 0 : parsedCreatedAt
    };
  });

const dedupeProjects = (projects: MappedProject[]): Project[] => {
  const seenTitles = new Map<string, MappedProject>();

  for (const project of projects) {
    const key = normalizeTitle(project.title);

    if (!key) {
      continue;
    }

    const existing = seenTitles.get(key);

    if (!existing) {
      seenTitles.set(key, project);
      continue;
    }

    const shouldReplace =
      (!isPlaceholderImage(project.imageUrl) && isPlaceholderImage(existing.imageUrl)) ||
      project.createdAt > existing.createdAt;

    if (shouldReplace) {
      seenTitles.set(key, project);
    }
  }

  return Array.from(seenTitles.values()).map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    techStack: project.techStack,
    githubUrl: project.githubUrl,
    imageUrl: project.imageUrl
  }));
};

const mergeProjects = (primary: Project[], fallback: Project[]) => {
  const merged = new Map<string, Project>();

  for (const project of primary) {
    merged.set(normalizeTitle(project.title), project);
  }

  for (const project of fallback) {
    const key = normalizeTitle(project.title);

    if (!merged.has(key)) {
      merged.set(key, project);
    }
  }

  return Array.from(merged.values());
};

export const useProjects = ({ limit }: UseProjectsOptions = {}) => {
  const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const cachedProjects = readProjectsCache();

    if (cachedProjects && mounted) {
      setProjects(mergeProjects(cachedProjects, SAMPLE_PROJECTS));
    }

    const loadProjects = async () => {
      if (!supabase) {
        return;
      }

      const safeLimit = parseLimit(limit);
      const abortController = new AbortController();
      const timeoutId = window.setTimeout(() => {
        abortController.abort();
      }, QUERY_TIMEOUT_MS);

      try {
        let query = supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
          .order("id", { ascending: false })
          .abortSignal(abortController.signal);

        if (safeLimit) {
          // Pull a little extra so duplicate-title filtering still has enough rows.
          query = query.limit(Math.max(safeLimit * 3, safeLimit));
        }

        const { data, error } = await query;

        if (error) {
          console.error("Supabase projects query error:", error);
          return;
        }

        const rows = (data ?? []) as RawProjectRow[];
        const mappedProjects = mapRowsToProjects(rows);
        const uniqueProjects = dedupeProjects(mappedProjects);
        const finalProjects = uniqueProjects.length > 0
          ? mergeProjects(uniqueProjects, SAMPLE_PROJECTS)
          : SAMPLE_PROJECTS;

        if (!mounted) {
          return;
        }

        setProjects(finalProjects);

        if (uniqueProjects.length > 0) {
          writeProjectsCache(uniqueProjects);
        }
      } catch (err) {
        const isAbortError = err instanceof Error && err.name === "AbortError";

        if (!isAbortError) {
          console.error("Unexpected projects loader error:", err);
        }
      } finally {
        window.clearTimeout(timeoutId);

        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadProjects();

    return () => {
      mounted = false;
    };
  }, [limit]);

  return { projects, isLoading };
};
