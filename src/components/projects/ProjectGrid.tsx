import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCardSkeleton } from "@/components/ui/ProjectCardSkeleton";

type ProjectGridProps = {
  projects: Project[];
  isLoading?: boolean;
  limit?: number;
  emptyMessage?: string;
};

export const ProjectGrid = ({
  projects,
  isLoading = false,
  limit,
  emptyMessage = "No projects available yet."
}: ProjectGridProps) => {
  if (isLoading) {
    return (
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  const visibleProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;

  if (visibleProjects.length === 0) {
    return (
      <div className="mt-7 rounded-xl border border-dashed border-border/70 bg-surfaceAlt/60 p-6 text-sm text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleProjects.map((project, index) => (
        <ProjectCard key={project.id} project={project} priority={index < 2} delay={index * 0.05} />
      ))}
    </div>
  );
};
