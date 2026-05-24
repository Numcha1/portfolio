import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description: "Background, goals, and engineering mindset."
};

export default function AboutPage() {
  return <AboutSection />;
}
