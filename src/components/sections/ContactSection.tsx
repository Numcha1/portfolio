"use client";

import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";

export const ContactSection = ({ id }: { id?: string }) => {
  const { content } = useSiteContent();
  const { email, phone, location } = content.siteConfig;

  return (
    <section id={id} className="section-shell section-anchor">
      <Reveal className="panel">
        <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">Contact</h2>

        <div className="mt-6">
          <div className="flex flex-wrap gap-3">
            <Link href={`mailto:${email}`} className="chip hover:text-white">
              {email}
            </Link>
            <span className="chip">{phone}</span>
            <span className="chip">{location}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {content.socialLinks.map((social) => (
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
        </div>
      </Reveal>
    </section>
  );
};
