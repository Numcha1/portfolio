export const ProjectCardSkeleton = () => {
  return (
    <article className="overflow-hidden rounded-2xl border border-border/70 bg-surface/65 shadow-soft">
      <div className="h-52 animate-pulse bg-surfaceAlt/70" />
      <div className="space-y-4 p-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-surfaceAlt/70" />
        <div className="h-4 w-full animate-pulse rounded bg-surfaceAlt/60" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-surfaceAlt/60" />
        <div className="flex gap-2">
          <div className="h-7 w-20 animate-pulse rounded-full bg-surfaceAlt/60" />
          <div className="h-7 w-16 animate-pulse rounded-full bg-surfaceAlt/60" />
        </div>
      </div>
    </article>
  );
};
