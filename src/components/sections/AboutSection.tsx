import { ABOUT_POINTS } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export const AboutSection = ({ id }: { id?: string }) => {
  return (
    <section id={id} className="section-shell section-anchor">
      <Reveal className="panel">
        <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">About Me</h2>

        <ul className="mt-6 space-y-3">
          {ABOUT_POINTS.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-muted sm:text-base">
              <span className="mt-2 h-2 w-2 rounded-full bg-primarySoft" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
};
