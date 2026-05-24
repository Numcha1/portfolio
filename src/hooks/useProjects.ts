"use client";

import { useEffect, useState } from "react";

import { SAMPLE_PROJECTS } from "@/data/projects";
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
  demoUrl?: string | null;
  demo_url?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
};

const toSafeImageUrl = (value: string) => {
  const raw = value.trim();

  if (!raw) {
    return "/project-placeholder.svg";
  }

  const isHttp = raw.startsWith("http://") || raw.startsWith("https://");
  const isLocalPath = raw.startsWith("/");

  return isHttp || isLocalPath ? raw : "/project-placeholder.svg";
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS);

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        const { data, error } = await supabase.from("projects").select("*");

        if (error) {
          console.error("Supabase projects query error:", error);
          return;
        }

        const rows = (data ?? []) as RawProjectRow[];

        const mappedProjects: Project[] = rows.map((item) => {
          const techValue = item.techStack ?? item.tech_stack;

          return {
            id: String(item.id ?? ""),
            title: String(item.title ?? ""),
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
            demoUrl: String(item.demoUrl ?? item.demo_url ?? ""),
            imageUrl: toSafeImageUrl(String(item.imageUrl ?? item.image_url ?? ""))
          };
        });

        if (!mounted) {
          return;
        }

        setProjects(mappedProjects.length > 0 ? mappedProjects : SAMPLE_PROJECTS);
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
