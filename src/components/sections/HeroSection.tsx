import Link from "next/link";

import { SITE_CONFIG } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export const HeroSection = () => {
  return (
    <section className="section-shell section-anchor" id="home">
      <Reveal className="panel py-12 text-center sm:py-16">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {SITE_CONFIG.name}
        </h1>
        <p className="mt-3 text-lg text-primarySoft sm:text-xl">{SITE_CONFIG.role}</p>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {SITE_CONFIG.tagline}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
