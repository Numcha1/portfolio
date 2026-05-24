export default function Loading() {
  return (
    <div className="section-shell flex min-h-[60vh] items-center justify-center">
      <div className="panel flex items-center gap-4 px-8 py-6">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted">Loading portfolio experience...</p>
      </div>
    </div>
  );
}
