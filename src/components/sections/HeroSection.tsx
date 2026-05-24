import Link from "next/link";

import { SITE_CONFIG } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export const HeroSection = () => {
  return (
    <section className="section-shell section-anchor" id="home">
      <Reveal className="panel text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primarySoft">Portfolio</p>

        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          {SITE_CONFIG.name}
        </h1>
        <p className="mt-2 text-lg text-primarySoft">{SITE_CONFIG.role}</p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/projects" className="btn-primary">
            View Projects
          </Link>
          <Link href="#contact" className="btn-secondary">
            Contact Me
          </Link>
        </div>
      </Reveal>
    </section>
  );
};
