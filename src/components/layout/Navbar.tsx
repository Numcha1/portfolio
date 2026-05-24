import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" }
];

export const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-sm font-semibold tracking-wide text-white sm:text-base">
          <span className="sm:hidden">PATIPHAN</span>
          <span className="hidden sm:inline">PATIPHAN MEELAPSUANG</span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm text-muted hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
};
