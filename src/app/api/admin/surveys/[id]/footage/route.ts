import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth";
import { UPLOADS_DIR, footagePath } from "@/lib/uploads";
import { jsonError, jsonOk } from "@/lib/api";
import type { Footage, Survey } from "@/lib/types";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return jsonError("Forbidden", 403);
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) return jsonError("Invalid survey id", 400);

  const db = await getDb();
  const survey = await db.collection<Survey>("surveys").findOne({
    _id: new ObjectId(id),
  });
  if (!survey) return jsonError("Survey not found", 404);

  const formData = await req.formData();
  const file = formData.get("file");
  const title = (formData.get("title") as string)?.trim();

  if (!file || !(file instanceof File)) {
    return jsonError("A video file is required", 400);
  }

  if (!title) {
    return jsonError("Title is required", 400);
  }

  const allowedTypes = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
  ];
  if (!allowedTypes.includes(file.type)) {
    return jsonError("Only video files (MP4, WebM, MOV, AVI) are allowed", 400);
  }

  if (!existsSync(UPLOADS_DIR)) {
    mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  const footageId = new ObjectId();
  const ext = file.name.split(".").pop() || "mp4";
  const filename = `${footageId.toString()}.${ext}`;
  const dest = footagePath(filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(dest, buffer);

  const footage: Footage = {
    _id: footageId,
    surveyId: survey._id,
    title,
    filename,
    originalName: file.name,
    mimeType: file.type,
    size: file.size,
    uploadedAt: new Date(),
  };

  await db.collection<Footage>("footage").insertOne(footage);

  if (survey.status !== "completed") {
    await db.collection<Survey>("surveys").updateOne(
      { _id: survey._id },
      { $set: { status: "completed" } }
    );
  }

  return jsonOk({
    footage: {
      id: footage._id.toString(),
      title: footage.title,
      originalName: footage.originalName,
      mimeType: footage.mimeType,
      size: footage.size,
      uploadedAt: footage.uploadedAt.toISOString(),
    },
  }, 201);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return jsonError("Forbidden", 403);
  }

  const { id: surveyId } = await params;
  const { footageId } = await req.json();

  if (!ObjectId.isValid(surveyId) || !ObjectId.isValid(footageId)) {
    return jsonError("Invalid id", 400);
  }

  const db = await getDb();
  const footage = await db.collection<Footage>("footage").findOne({
    _id: new ObjectId(footageId),
    surveyId: new ObjectId(surveyId),
  });

  if (!footage) return jsonError("Footage not found", 404);

  await db.collection<Footage>("footage").deleteOne({ _id: footage._id });

  const path = footagePath(footage.filename);
  if (existsSync(path)) {
    const { unlink } = await import("fs/promises");
    await unlink(path);
  }

  return jsonOk({ ok: true });
}
