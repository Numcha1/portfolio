import { EXPERIENCE_ITEMS } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export const ExperienceSection = ({ id }: { id?: string }) => {
  return (
    <section id={id} className="section-shell section-anchor">
      <Reveal className="panel">
        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">EXPERIENCE</h2>

        <ul className="mt-6 space-y-3">
          {EXPERIENCE_ITEMS.map((item) => (
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
