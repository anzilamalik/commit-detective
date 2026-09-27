import { useState, useEffect, useCallback } from "react";
import type { Investigation, InvestigationSummary } from "./types";

import InvestigationPicker from "./InvestigationPicker";
import InvestigationHeader from "./InvestigationHeader";
import StageCard from "./StageCard";
import InsightPanel from "./InsightPanel";
import TimelineLoadingState from "./TimelineLoadingState";
import TimelineErrorState from "./TimelineErrorState";

// Change this if your backend runs on a different host/port.
const API_BASE = "http://localhost:8000";

export default function CommitDetectiveTimeline() {
  const [investigationList, setInvestigationList] = useState<InvestigationSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [investigation, setInvestigation] = useState<Investigation | null>(null);
  const [openStages, setOpenStages] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Derived: true only when every stage is open.
  const allExpanded =
    investigation !== null &&
    investigation.stages.length > 0 &&
    openStages.size === investigation.stages.length;

  // Whether the sidebar should be shown at all.
  const hasSidebar = investigationList.length > 1;

  // ── Fetch investigation list (also used by retry button) ───────────────────
  const fetchList = useCallback(() => {
    fetch(`${API_BASE}/api/investigations`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load investigation list");
        return res.json() as Promise<InvestigationSummary[]>;
      })
      .then((list) => {
        setError(null);
        setInvestigationList(list);
        if (list.length > 0) setSelectedId(list[0].id);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // ── Fetch investigation detail whenever the selection changes ──────────────
  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    fetch(`${API_BASE}/api/investigations/${selectedId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load investigation detail");
        return res.json() as Promise<Investigation>;
      })
      .then((data) => {
        if (cancelled) return;
        setError(null);
        setInvestigation(data);
        setOpenStages(new Set());
        setLoading(false);
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [selectedId]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const toggleStage = (id: string) => {
    setOpenStages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleExpandAll = () => {
    if (!investigation) return;
    if (allExpanded) {
      setOpenStages(new Set());
    } else {
      setOpenStages(new Set(investigation.stages.map((s) => s.id)));
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen text-left">
      {/* Sidebar — only renders when there are multiple investigations */}
      {hasSidebar && (
        <aside className="hidden md:flex flex-col shrink-0 w-56 border-r border-[var(--border)] px-4 py-10 sticky top-0 self-start max-h-screen overflow-y-auto">
          <InvestigationPicker
            investigations={investigationList}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 max-w-2xl mx-auto py-10 px-6">
        {error && (
          <TimelineErrorState
            message={error}
            apiBase={API_BASE}
            onRetry={fetchList}
          />
        )}

        {loading && !error && <TimelineLoadingState />}

        {!loading && !error && investigation && (
          <>
            <InvestigationHeader
              title={investigation.title}
              subtitle={investigation.subtitle}
              allExpanded={allExpanded}
              onToggleExpandAll={toggleExpandAll}
            />

            {/* Timeline list with vertical connector line */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute left-[21px] top-5 bottom-10 w-px bg-[var(--accent-border)]"
              />
              {investigation.stages.map((stage) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  isOpen={openStages.has(stage.id)}
                  onToggle={() => toggleStage(stage.id)}
                />
              ))}
            </div>

            {investigation.insight && (
              <InsightPanel insight={investigation.insight} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
