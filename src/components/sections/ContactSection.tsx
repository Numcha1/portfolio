import Link from "next/link";

import { SITE_CONFIG, SOCIAL_LINKS } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export const ContactSection = ({ id }: { id?: string }) => {
  return (
    <section id={id} className="section-shell section-anchor">
      <Reveal className="panel">
        <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">Contact</h2>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`mailto:${SITE_CONFIG.email}`} className="chip hover:text-white">
            Gmail
          </Link>

          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="chip hover:text-white"
            >
              {social.label}
            </Link>
          ))}

        </div>
      </Reveal>
    </section>
  );
};
