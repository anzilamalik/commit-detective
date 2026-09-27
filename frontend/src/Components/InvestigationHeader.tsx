import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  allExpanded: boolean;
  onToggleExpandAll: () => void;
}

export default function InvestigationHeader({ title, subtitle, allExpanded, onToggleExpandAll }: Props) {
  return (
    <header className="mb-10">
      {/* Eyebrow */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)] opacity-70 mb-2 select-none">
        Commit Detective
      </p>

      {/* Title */}
      <h1 className="text-[1.6rem] font-bold text-[var(--text-h)] leading-tight mb-3 tracking-tight">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-[var(--text)] leading-relaxed max-w-prose mb-5">
        {subtitle}
      </p>

      {/* Divider */}
      <hr className="border-[var(--border)] mb-4" />

      {/* Expand / collapse — styled as a quiet text action, not a filled button */}
      <button
        onClick={onToggleExpandAll}
        className={[
          "inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text)] transition-colors",
          "hover:text-[var(--accent)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 rounded",
        ].join(" ")}
      >
        {allExpanded
          ? <><ChevronsDownUp size={14} aria-hidden="true" /> Collapse all</>
          : <><ChevronsUpDown size={14} aria-hidden="true" /> Expand all stages</>
        }
      </button>
    </header>
  );
}
