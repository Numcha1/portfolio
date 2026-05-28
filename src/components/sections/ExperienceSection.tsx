"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";

export const ExperienceSection = ({ id }: { id?: string }) => {
  const { content } = useSiteContent();

  return (
    <section id={id} className="section-shell section-anchor">
      <Reveal className="panel">
        <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">Experience</h2>

        <ul className="mt-6 space-y-3">
          {content.experienceItems.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-border/70 bg-surfaceAlt/70 p-4 text-sm font-medium text-white sm:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
};
