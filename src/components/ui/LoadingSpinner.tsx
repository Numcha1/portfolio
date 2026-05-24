export const LoadingSpinner = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div className="flex items-center gap-3 text-sm text-muted">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span>{label}</span>
    </div>
  );
};
