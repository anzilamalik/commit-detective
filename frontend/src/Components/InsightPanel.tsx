import { Sparkles } from "lucide-react";
import type { Insight } from "./types";

interface Props {
  insight: Insight;
}

export default function InsightPanel({ insight }: Props) {
  return (
    <aside
      aria-label="Key insight"
      className="mt-8 pl-4 border-l-2 border-[var(--accent-border)]"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Sparkles
          aria-hidden="true"
          className="text-[var(--accent)] opacity-80"
          size={14}
        />
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] opacity-80">
          {insight.title}
        </h3>
      </div>
      <p className="text-sm text-[var(--text)] leading-relaxed">
        {insight.body}
      </p>
    </aside>
  );
}
