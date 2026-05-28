"use client";

import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";

export const HeroSection = () => {
  const { content } = useSiteContent();
  const { name, role, tagline } = content.siteConfig;

  return (
    <section className="section-shell section-anchor" id="home">
      <Reveal className="panel text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primarySoft">Portfolio</p>

        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">{name}</h1>
        <p className="mt-2 text-lg text-primarySoft">{role}</p>
        {tagline ? <p className="mt-3 text-sm text-muted sm:text-base">{tagline}</p> : null}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/projects" className="btn-primary">
            View Projects
          </Link>
          <Link href="#contact" className="btn-secondary">
            Contact Me
          </Link>
        </div>

        {content.highlights.length > 0 ? (
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {content.highlights.map((item) => (
              <div key={item.label} className="rounded-xl border border-border/70 bg-surfaceAlt/60 p-3 text-center">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Reveal>
    </section>
  );
};
