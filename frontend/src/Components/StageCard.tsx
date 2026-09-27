import { ChevronDown, ChevronUp, Search, GitCommit, AlertTriangle, Wrench, CheckCircle2 } from "lucide-react";
import type { Stage } from "./types";

const ICON_MAP: Record<string, React.ElementType> = {
  search: Search,
  commit: GitCommit,
  warning: AlertTriangle,
  fix: Wrench,
  check: CheckCircle2,
};

interface Props {
  stage: Stage;
  isOpen: boolean;
  onToggle: () => void;
}

export default function StageCard({ stage, isOpen, onToggle }: Props) {
  const Icon = ICON_MAP[stage.icon] ?? GitCommit;

  return (
    <div className="relative pl-14 mb-5 last:mb-0">
      {/* Timeline node — small outlined circle sitting on the vertical line */}
      <div
        aria-hidden="true"
        className={[
          "absolute left-0 top-3 flex h-10 w-10 items-center justify-center rounded-full",
          "bg-[var(--bg)] border-2 border-[var(--accent-border)] text-[var(--accent)]",
          "transition-colors",
          isOpen ? "bg-[var(--accent-bg)]" : "",
        ].join(" ")}
      >
        <Icon size={16} strokeWidth={1.75} />
      </div>

      {/* Expand/collapse trigger — the whole card header row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={[
          "w-full text-left rounded-xl border transition-all duration-150",
          "bg-[var(--bg)] border-[var(--border)]",
          "hover:border-[var(--accent-border)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
          isOpen ? "border-[var(--accent-border)]" : "",
        ].join(" ")}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 px-4 pt-3.5 pb-3">
          <div className="min-w-0">
            {/* Phase + commit hash meta row */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--accent)] opacity-80">
                {stage.phase}
              </span>
              {stage.commit && (
                <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--code-bg)] text-[var(--text)]">
                  {stage.commit}
                </code>
              )}
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-[var(--text-h)] leading-snug">
              {stage.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-[var(--text)] mt-1 leading-relaxed opacity-80">
              {stage.summary}
            </p>
          </div>

          {/* Chevron */}
          <div className="shrink-0 text-[var(--text)] opacity-40 mt-1">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>

        {/* Detail panel — separated by a hairline */}
        {isOpen && (
          <div className="px-4 pt-3 pb-4 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text)] leading-relaxed">
              {stage.detail}
            </p>
          </div>
        )}
      </button>
    </div>
  );
}
