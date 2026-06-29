import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";
import type { QuoteRequest } from "@/lib/types";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return jsonError("Forbidden", 403);
  }

  const db = await getDb();
  const quotes = await db
    .collection<QuoteRequest>("quote_requests")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return jsonOk({
    quotes: quotes.map((q) => ({
      id: q._id.toString(),
      name: q.name,
      email: q.email,
      zip: q.zip,
      type: q.type,
      createdAt: q.createdAt.toISOString(),
    })),
  });
}
