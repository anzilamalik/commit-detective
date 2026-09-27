export interface InvestigationSummary {
  id: string;
  title: string;
}

export interface Stage {
  id: string;
  icon: string;
  phase: string;
  commit: string;
  title: string;
  summary: string;
  detail: string;
}

export interface Insight {
  title: string;
  body: string;
}

export interface Investigation {
  id: string;
  title: string;
  subtitle: string;
  stages: Stage[];
  insight?: Insight;
}
