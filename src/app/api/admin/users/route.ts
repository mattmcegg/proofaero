import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import { hashPassword, requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";
import type { User } from "@/lib/types";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return jsonError("Forbidden", 403);
  }

  const db = await getDb();
  const users = await db
    .collection<User>("users")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return jsonOk({
    users: users.map((u) => ({
      id: u._id.toString(),
      username: u.username,
      role: u.role,
      name: u.name,
      email: u.email,
      createdAt: u.createdAt.toISOString(),
    })),
  });
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return jsonError("Forbidden", 403);
  }

  const body = await req.json();
  const { username, password, role, name, email } = body;

  if (!username || !password) {
    return jsonError("Username and password are required", 400);
  }

  const normalizedUsername = username.toLowerCase().trim();
  const db = await getDb();

  const existing = await db.collection<User>("users").findOne({
    username: normalizedUsername,
  });
  if (existing) {
    return jsonError("Username already exists", 409);
  }

  const user: User = {
    _id: new ObjectId(),
    username: normalizedUsername,
    passwordHash: await hashPassword(password),
    role: role === "admin" ? "admin" : "member",
    name: name?.trim() || undefined,
    email: email?.trim() || undefined,
    createdAt: new Date(),
  };

  await db.collection<User>("users").insertOne(user);

  return jsonOk({
    user: {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email,
    },
  }, 201);
}
