import { createReadStream, existsSync } from "fs";
import { Readable } from "stream";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import { getSession } from "@/lib/auth";
import { footagePath } from "@/lib/uploads";
import type { Footage, Survey } from "@/lib/types";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!ObjectId.isValid(id)) {
    return new Response("Invalid id", { status: 400 });
  }

  const db = await getDb();
  const footage = await db.collection<Footage>("footage").findOne({
    _id: new ObjectId(id),
  });

  if (!footage) {
    return new Response("Not found", { status: 404 });
  }

  const survey = await db.collection<Survey>("surveys").findOne({
    _id: footage.surveyId,
  });

  if (!survey) {
    return new Response("Not found", { status: 404 });
  }

  if (
    session.role !== "admin" &&
    survey.userId.toString() !== session.userId
  ) {
    return new Response("Forbidden", { status: 403 });
  }

  const path = footagePath(footage.filename);
  if (!existsSync(path)) {
    return new Response("File not found", { status: 404 });
  }

  const stream = createReadStream(path);
  const webStream = Readable.toWeb(stream) as ReadableStream;

  return new Response(webStream, {
    headers: {
      "Content-Type": footage.mimeType,
      "Content-Length": String(footage.size),
      "Cache-Control": "private, max-age=3600",
    },
  });
}
