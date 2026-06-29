import { getCurrentUser } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return jsonError("Not authenticated", 401);

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
