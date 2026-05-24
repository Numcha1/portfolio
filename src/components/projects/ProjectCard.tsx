import { useEffect, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { getProjectImageFallback } from "@/lib/projectImage";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  delay?: number;
};

export const ProjectCard = ({ project, priority = false, delay = 0 }: ProjectCardProps) => {
  const defaultFallback = getProjectImageFallback(project.title);
  const [imageSrc, setImageSrc] = useState(project.imageUrl || defaultFallback);
  const [hasUsedDefaultFallback, setHasUsedDefaultFallback] = useState(false);

  useEffect(() => {
    setImageSrc(project.imageUrl || defaultFallback);
    setHasUsedDefaultFallback(false);
  }, [project.imageUrl, defaultFallback]);

  return (
    <Reveal delay={delay}>
      <article className="overflow-hidden rounded-2xl border border-border/70 bg-surface/70 shadow-soft">
        <div className="relative h-52 overflow-hidden border-b border-border/60">
          <img
            src={imageSrc}
            alt={`${project.title} preview`}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
            onError={() => {
              if (!hasUsedDefaultFallback && imageSrc !== defaultFallback) {
                setImageSrc(defaultFallback);
                setHasUsedDefaultFallback(true);
                return;
              }

              if (imageSrc !== "/project-placeholder.svg") {
                setImageSrc("/project-placeholder.svg");
              }
            }}
          />
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h3 className="font-heading text-xl font-semibold text-white">{project.title}</h3>
            <p className="mt-2 text-sm text-primarySoft">{project.techStack.join(" | ")}</p>
            <p className="mt-2 line-clamp-3 text-sm text-muted">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                GitHub
              </a>
            ) : (
              <span className="btn-secondary cursor-not-allowed opacity-50">GitHub</span>
            )}

            {project.demoUrl ? (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Demo
              </a>
            ) : (
              <span className="btn-primary cursor-not-allowed opacity-50">Demo</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
};
