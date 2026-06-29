import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { UserRole } from "@/lib/types";

const COOKIE_NAME = "proofaero_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
}

async function getSessionFromRequest(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      userId: payload.userId as string,
      username: payload.username as string,
      role: payload.role as UserRole,
    };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getSessionFromRequest(req);

  const isProtected =
    pathname.startsWith("/vault") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/admin");

  if (isProtected && !session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && session?.role !== "admin") {
    return NextResponse.redirect(new URL("/vault", req.url));
  }

  if (pathname === "/login" && session) {
    const dest =
      session.role === "admin" ? "/admin" : "/vault";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vault/:path*", "/admin/:path*", "/account/:path*", "/login"],
};
