import Link from "next/link";

const TYPE_LABELS: Record<string, string> = {
  baseline: "Pre-storm baseline",
  ondemand: "On-demand response",
};

const STATUS_STYLES: Record<string, string> = {
  scheduled: "bg-aero/10 text-aero-deep",
  processing: "bg-flag-gold/20 text-flag-orange",
  completed: "bg-emerald-500/15 text-emerald-700",
};

export interface SurveySummary {
  id: string;
  surveyNumber: string;
  propertyAddress: string;
  zip: string;
  type: string;
  status: string;
  capturedAt?: string;
  createdAt: string;
}

export function SurveyCard({ survey }: { survey: SurveySummary }) {
  const date = survey.capturedAt || survey.createdAt;
  const formatted = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/vault/surveys/${survey.id}`}
      className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-soft transition-all hover:border-aero/30 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-ink group-hover:text-aero">
            Survey #{survey.surveyNumber}
          </p>
          <p className="mt-1 text-sm text-mist">
            {TYPE_LABELS[survey.type] || survey.type}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            STATUS_STYLES[survey.status] || "bg-paper-dim text-mist"
          }`}
        >
          {survey.status}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm">
        <p className="text-ink">{survey.propertyAddress}</p>
        <p className="text-mist">{survey.zip}</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink/5 pt-4 text-sm">
        <span className="text-mist">Captured {formatted}</span>
        <span className="font-semibold text-aero group-hover:text-aero-bright">
          View footage →
        </span>
      </div>
    </Link>
  );
}
