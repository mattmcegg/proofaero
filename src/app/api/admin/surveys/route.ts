import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth";
import { generateSurveyNumber } from "@/lib/surveys";
import { jsonError, jsonOk } from "@/lib/api";
import type { Survey, SurveyType, User } from "@/lib/types";

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return jsonError("Forbidden", 403);
  }

  const body = await req.json();
  const { userId, propertyAddress, zip, type, status, notes, capturedAt } =
    body;

  if (!userId || !propertyAddress || !zip || !type) {
    return jsonError("userId, propertyAddress, zip, and type are required", 400);
  }

  if (!ObjectId.isValid(userId)) {
    return jsonError("Invalid userId", 400);
  }

  const db = await getDb();
  const user = await db.collection<User>("users").findOne({
    _id: new ObjectId(userId),
  });
  if (!user) return jsonError("User not found", 404);

  const survey: Survey = {
    _id: new ObjectId(),
    userId: user._id,
    surveyNumber: await generateSurveyNumber(),
    propertyAddress: propertyAddress.trim(),
    zip: zip.trim(),
    type: type as SurveyType,
    status: status ?? "completed",
    notes: notes?.trim() || undefined,
    capturedAt: capturedAt ? new Date(capturedAt) : new Date(),
    createdAt: new Date(),
  };

  await db.collection<Survey>("surveys").insertOne(survey);

  return jsonOk({
    survey: {
      id: survey._id.toString(),
      surveyNumber: survey.surveyNumber,
      propertyAddress: survey.propertyAddress,
      zip: survey.zip,
      type: survey.type,
      status: survey.status,
      capturedAt: survey.capturedAt?.toISOString(),
      createdAt: survey.createdAt.toISOString(),
      userId: survey.userId.toString(),
    },
  }, 201);
}
