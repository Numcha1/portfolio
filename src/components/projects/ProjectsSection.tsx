"use client";

import Link from "next/link";

import { useProjects } from "@/hooks/useProjects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Reveal } from "@/components/ui/Reveal";

type ProjectsSectionProps = {
  id?: string;
  heading: string;
  description?: string;
  limit?: number;
  showViewAll?: boolean;
};

export const ProjectsSection = ({
  id,
  heading,
  description,
  limit,
  showViewAll = false
}: ProjectsSectionProps) => {
  const { projects } = useProjects();

  return (
    <section id={id} className="section-shell section-anchor">
      <Reveal className="panel">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">{heading}</h2>
            {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
          </div>

          {showViewAll && (
            <Link href="/projects" className="btn-secondary">
              View All Projects
            </Link>
          )}
        </div>

        <ProjectGrid projects={projects} limit={limit} />
      </Reveal>
    </section>
  );
};
