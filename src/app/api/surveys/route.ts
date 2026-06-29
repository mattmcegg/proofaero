import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import { getSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";
import type { Survey } from "@/lib/types";

export async function GET() {
  const session = await getSession();
  if (!session) return jsonError("Not authenticated", 401);

  const db = await getDb();
  const filter =
    session.role === "admin"
      ? {}
      : { userId: new ObjectId(session.userId) };

  const surveys = await db
    .collection<Survey>("surveys")
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();

  return jsonOk({
    surveys: surveys.map((s) => ({
      id: s._id.toString(),
      surveyNumber: s.surveyNumber,
      propertyAddress: s.propertyAddress,
      zip: s.zip,
      type: s.type,
      status: s.status,
      capturedAt: s.capturedAt?.toISOString(),
      createdAt: s.createdAt.toISOString(),
      userId: s.userId.toString(),
    })),
  });
}
