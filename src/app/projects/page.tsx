import type { Metadata } from "next";

import { ProjectsSection } from "@/components/projects/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore all portfolio projects with tech stack and source links."
};

export default function ProjectsPage() {
  return <ProjectsSection heading="Projects" />;
}
