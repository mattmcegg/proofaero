import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import {
  createSession,
  verifyPassword,
} from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";
import type { User } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return jsonError("Username and password are required", 400);
  }

  const db = await getDb();
  const user = await db.collection<User>("users").findOne({
    username: username.toLowerCase().trim(),
  });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return jsonError("Invalid username or password", 401);
  }

  await createSession(user);

  return jsonOk({
    user: {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email,
    },
  });
}
