import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import { jsonError, jsonOk } from "@/lib/api";
import type { QuoteRequest, QuoteRequestType } from "@/lib/types";

const QUOTE_TYPES = new Set<QuoteRequestType>(["baseline", "ondemand", "both"]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidZip(zip: string) {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const zip = typeof body.zip === "string" ? body.zip.trim() : "";
  const type = body.type as QuoteRequestType;

  if (!name) return jsonError("Full name is required", 400);
  if (!email || !isValidEmail(email)) return jsonError("Valid email is required", 400);
  if (!zip || !isValidZip(zip)) return jsonError("Valid ZIP code is required", 400);
  if (!QUOTE_TYPES.has(type)) return jsonError("Invalid survey type", 400);

  const db = await getDb();
  const quoteRequest: QuoteRequest = {
    _id: new ObjectId(),
    name,
    email,
    zip,
    type,
    createdAt: new Date(),
  };

  await db.collection<QuoteRequest>("quote_requests").insertOne(quoteRequest);

  return jsonOk({ id: quoteRequest._id.toString() }, 201);
}
