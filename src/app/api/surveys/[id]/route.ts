import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import { getSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";
import type { Footage, Survey } from "@/lib/types";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return jsonError("Not authenticated", 401);

  if (!ObjectId.isValid(id)) return jsonError("Invalid survey id", 400);

  const db = await getDb();
  const survey = await db.collection<Survey>("surveys").findOne({
    _id: new ObjectId(id),
  });

  if (!survey) return jsonError("Survey not found", 404);

  if (
    session.role !== "admin" &&
    survey.userId.toString() !== session.userId
  ) {
    return jsonError("Forbidden", 403);
  }

  const footage = await db
    .collection<Footage>("footage")
    .find({ surveyId: survey._id })
    .sort({ uploadedAt: -1 })
    .toArray();

  return jsonOk({
    survey: {
      id: survey._id.toString(),
      surveyNumber: survey.surveyNumber,
      propertyAddress: survey.propertyAddress,
      zip: survey.zip,
      type: survey.type,
      status: survey.status,
      capturedAt: survey.capturedAt?.toISOString(),
      notes: survey.notes,
      createdAt: survey.createdAt.toISOString(),
      userId: survey.userId.toString(),
    },
    footage: footage.map((f) => ({
      id: f._id.toString(),
      title: f.title,
      originalName: f.originalName,
      mimeType: f.mimeType,
      size: f.size,
      uploadedAt: f.uploadedAt.toISOString(),
    })),
  });
}
