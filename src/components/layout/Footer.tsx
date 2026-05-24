import Link from "next/link";

import { SITE_CONFIG, SOCIAL_LINKS } from "@/data/site";

export const Footer = () => {
  return (
    <footer className="mt-8 border-t border-border/50 bg-bg/70">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
        <p className="text-xs text-muted">
          {new Date().getFullYear()} {SITE_CONFIG.name}. Built with Next.js + Supabase.
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted hover:text-white"
            >
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
