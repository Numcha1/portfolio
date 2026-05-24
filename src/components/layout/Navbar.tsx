import Link from "next/link";

import { SOCIAL_LINKS } from "@/data/site";

export const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-heading text-sm font-bold text-white">
            PM
          </span>
          <p className="font-heading text-sm font-semibold tracking-wide text-white sm:text-base">
            PATIPHAN MEELAPSUANG
          </p>
        </Link>

        <nav className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted hover:text-white"
            >
              {social.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
