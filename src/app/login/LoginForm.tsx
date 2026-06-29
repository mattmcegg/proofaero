"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogoImage, StripeRule } from "@/components/brand";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/vault";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      const dest =
        data.user.role === "admin" && from.startsWith("/admin")
          ? from
          : data.user.role === "admin"
            ? "/admin"
            : from.startsWith("/vault") || from.startsWith("/account")
              ? from
              : "/vault";

      router.push(dest);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <div className="absolute inset-0 grid-faint opacity-40" />
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16">
        <div className="text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <LogoImage className="h-16 w-16 rounded-xl" />
            <span className="font-display text-2xl font-bold text-paper">
              Proof<span className="text-aero-bright">Aero</span> Vault
            </span>
          </Link>
          <p className="mt-3 text-sm text-paper/60">
            Sign in to access your survey footage and condition reports.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          {error && (
            <div className="mb-4 rounded-lg bg-flag-red/20 px-4 py-3 text-sm text-flag-red">
              {error}
            </div>
          )}

          <label className="block">
            <span className="text-sm font-medium text-paper/80">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-ink/50 px-4 py-3 text-paper placeholder:text-paper/30 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
              placeholder="your username"
              autoComplete="username"
              required
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-medium text-paper/80">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-ink/50 px-4 py-3 text-paper placeholder:text-paper/30 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-aero py-3.5 text-sm font-semibold text-white transition-colors hover:bg-aero-bright disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in to Vault"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-paper/50">
          <Link href="/" className="hover:text-aero-bright">
            ← Back to ProofAero.com
          </Link>
        </p>
      </div>
      <StripeRule className="h-1.5 w-full" />
    </div>
  );
}
