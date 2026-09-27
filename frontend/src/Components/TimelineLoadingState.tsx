import { Loader2 } from "lucide-react";

export default function TimelineLoadingState() {
  return (
    <div
      role="status"
      aria-label="Loading investigation"
      className="flex items-center justify-center gap-2.5 py-16 text-[var(--text)]"
    >
      <Loader2 className="animate-spin" size={20} aria-hidden="true" />
      <span className="text-sm">Loading investigation…</span>
    </div>
  );
}
