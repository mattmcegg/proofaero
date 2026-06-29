import { getDb } from "@/lib/db/mongodb";
import type { Survey } from "@/lib/types";

export async function generateSurveyNumber(): Promise<string> {
  const db = await getDb();
  const count = await db.collection<Survey>("surveys").countDocuments();
  const num = 2000 + count + 1;
  return `PA-${num}`;
}
