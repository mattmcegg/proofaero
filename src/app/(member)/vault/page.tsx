import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import { getCurrentUser } from "@/lib/auth";
import { SurveyCard } from "@/components/vault/SurveyCard";
import type { Survey } from "@/lib/types";

export default async function VaultPage() {
  const user = await getCurrentUser();
  const db = await getDb();

  const filter =
    user?.role === "admin"
      ? {}
      : { userId: new ObjectId(user!._id) };

  const surveys = await db
    .collection<Survey>("surveys")
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Your ProofAero Vault
        </h1>
        <p className="mt-3 text-lg text-mist">
          Timestamped, geo-tagged drone footage for every survey — ready to
          share with your adjuster.
        </p>
      </div>

      {surveys.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-ink/15 bg-paper-dim/50 px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold text-ink">
            No surveys yet
          </p>
          <p className="mt-2 text-mist">
            Once your first survey is complete, your footage will appear here.
          </p>
          <a
            href="/#quote"
            className="mt-6 inline-flex rounded-full bg-aero px-6 py-3 text-sm font-semibold text-white hover:bg-aero-bright"
          >
            Book a survey
          </a>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {surveys.map((s) => (
            <SurveyCard
              key={s._id.toString()}
              survey={{
                id: s._id.toString(),
                surveyNumber: s.surveyNumber,
                propertyAddress: s.propertyAddress,
                zip: s.zip,
                type: s.type,
                status: s.status,
                capturedAt: s.capturedAt?.toISOString(),
                createdAt: s.createdAt.toISOString(),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
