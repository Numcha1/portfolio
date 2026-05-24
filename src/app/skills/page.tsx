import type { Metadata } from "next";

import { SkillsSection } from "@/components/sections/SkillsSection";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills across full stack development and IoT engineering."
};

export default function SkillsPage() {
  return <SkillsSection />;
}
