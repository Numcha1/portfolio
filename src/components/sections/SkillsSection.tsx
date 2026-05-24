import { SKILL_GROUPS } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export const SkillsSection = ({ id }: { id?: string }) => {
  return (
    <section id={id} className="section-shell section-anchor">
      <Reveal className="panel">
        <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">Skills</h2>

        <div className="mt-6 space-y-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="rounded-xl border border-border/70 bg-surfaceAlt/70 p-4 text-sm sm:text-base">
              <span className="font-semibold text-white">{group.title}:</span>{" "}
              <span className="text-muted">{group.skills.join(" ")}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};
