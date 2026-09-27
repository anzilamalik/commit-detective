import { AlertTriangle } from "lucide-react";

// API_BASE is passed in so this component stays pure and testable without
// knowing the global constant.
interface Props {
  message: string;
  apiBase: string;
  onRetry: () => void;
}

export default function TimelineErrorState({ message, apiBase, onRetry }: Props) {
  return (
    <div
      role="alert"
      className={[
        "rounded-xl border-2 border-red-200 bg-red-50 p-6",
        "flex flex-col items-center gap-4 text-center",
        "dark:border-red-900/50 dark:bg-red-950/30",
      ].join(" ")}
    >
      <AlertTriangle className="text-red-500" size={28} aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">
          Couldn't reach the Commit Detective API
        </p>
        <p className="text-xs text-red-600 dark:text-red-500 font-mono mb-2">
          {apiBase}
        </p>
        <p className="text-xs text-red-500 dark:text-red-600">
          {message} — make sure the backend is running (
          <code className="font-mono">uvicorn main:app --reload</code>)
        </p>
      </div>
      <button
        onClick={onRetry}
        className={[
          "text-xs font-semibold px-4 py-1.5 rounded-lg border border-red-300 bg-white text-red-600",
          "hover:bg-red-50 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2",
          "dark:bg-transparent dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30",
        ].join(" ")}
      >
        Retry
      </button>
    </div>
  );
}
