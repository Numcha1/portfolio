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

const normalizeTitle = (value: string) => value.trim().toLowerCase();
const isPlaceholderImage = (value: string) =>
  value.trim().endsWith("/project-placeholder.svg");

type MappedProject = Project & {
  createdAt: number;
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS);

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
          .order("id", { ascending: false });

        if (error) {
          console.error("Supabase projects query error:", error);
          return;
        }

        const rows = (data ?? []) as RawProjectRow[];

        const mappedProjects: MappedProject[] = rows.map((item) => {
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

        const seenTitles = new Map<string, MappedProject>();

        for (const project of mappedProjects) {
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

        const uniqueProjects = Array.from(seenTitles.values());
        const uniqueProjectsWithoutMeta: Project[] = uniqueProjects.map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          techStack: project.techStack,
          githubUrl: project.githubUrl,
          imageUrl: project.imageUrl
        }));

        if (!mounted) {
          return;
        }

        setProjects(
          uniqueProjectsWithoutMeta.length > 0
            ? uniqueProjectsWithoutMeta
            : SAMPLE_PROJECTS
        );
      } catch (err) {
        console.error("Unexpected projects loader error:", err);
      }
    };

    void loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return { projects };
};
