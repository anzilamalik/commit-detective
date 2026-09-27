import type { InvestigationSummary } from "./types";

interface Props {
  investigations: InvestigationSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function InvestigationPicker({ investigations, selectedId, onSelect }: Props) {
  if (investigations.length <= 1) return null;

  return (
    <nav aria-label="Investigations" className="w-48 shrink-0 pt-1 pr-8">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text)] opacity-50 mb-3 select-none px-1">
        Investigations
      </p>
      <ul className="space-y-0.5">
        {investigations.map((inv) => {
          const isActive = selectedId === inv.id;
          return (
            <li key={inv.id}>
              <button
                onClick={() => onSelect(inv.id)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1",
                  isActive
                    ? "text-[var(--accent)] font-medium bg-[var(--accent-bg)]"
                    : "text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--code-bg)]",
                ].join(" ")}
              >
                {/* Active indicator bar */}
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={[
                      "inline-block w-0.5 h-3.5 rounded-full shrink-0 transition-colors",
                      isActive ? "bg-[var(--accent)]" : "bg-transparent",
                    ].join(" ")}
                  />
                  {inv.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
