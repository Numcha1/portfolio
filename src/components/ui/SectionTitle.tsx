import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: SectionTitleProps) => {
  return (
    <div className={cn("space-y-3", align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primarySoft">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && <p className="max-w-3xl text-sm text-muted sm:text-base">{description}</p>}
    </div>
  );
};
