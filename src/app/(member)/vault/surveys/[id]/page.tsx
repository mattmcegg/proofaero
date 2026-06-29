import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import { getCurrentUser } from "@/lib/auth";
import { VideoGrid } from "@/components/vault/VideoGrid";
import type { Footage, Survey } from "@/lib/types";

const TYPE_LABELS: Record<string, string> = {
  baseline: "Pre-storm baseline",
  ondemand: "On-demand response",
};

export default async function SurveyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!ObjectId.isValid(id)) notFound();

  const db = await getDb();
  const survey = await db.collection<Survey>("surveys").findOne({
    _id: new ObjectId(id),
  });

  if (!survey) notFound();

  if (
    user?.role !== "admin" &&
    survey.userId.toString() !== user?._id.toString()
  ) {
    notFound();
  }

  const footage = await db
    .collection<Footage>("footage")
    .find({ surveyId: survey._id })
    .sort({ uploadedAt: -1 })
    .toArray();

  const captured = survey.capturedAt || survey.createdAt;

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/vault"
        className="text-sm font-medium text-aero hover:text-aero-bright"
      >
        ← All surveys
      </Link>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">
            Survey #{survey.surveyNumber}
          </h1>
          <p className="mt-2 text-lg text-mist">
            {TYPE_LABELS[survey.type] || survey.type}
          </p>
          <div className="mt-4 space-y-1 text-sm text-ink">
            <p>{survey.propertyAddress}</p>
            <p className="text-mist">{survey.zip}</p>
          </div>
        </div>
        <div className="rounded-xl border border-ink/10 bg-white px-5 py-4 text-sm shadow-soft">
          <p className="text-mist">Captured</p>
          <p className="font-semibold text-ink">
            {captured.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="mt-3 text-mist">Status</p>
          <p className="font-semibold capitalize text-ink">{survey.status}</p>
        </div>
      </div>

      {survey.notes && (
        <div className="mt-8 rounded-xl border border-aero/20 bg-aero/5 px-5 py-4 text-sm text-ink">
          <p className="font-semibold text-aero-deep">Pilot notes</p>
          <p className="mt-1 text-mist">{survey.notes}</p>
        </div>
      )}

      <div className="mt-10">
        <h2 className="font-display text-xl font-bold text-ink">
          Survey footage
          <span className="ml-2 text-base font-normal text-mist">
            ({footage.length} {footage.length === 1 ? "video" : "videos"})
          </span>
        </h2>
        <div className="mt-6">
          <VideoGrid
            footage={footage.map((f) => ({
              id: f._id.toString(),
              title: f.title,
              originalName: f.originalName,
              mimeType: f.mimeType,
              size: f.size,
              uploadedAt: f.uploadedAt.toISOString(),
            }))}
          />
        </div>
      </div>
    </div>
  );
}
