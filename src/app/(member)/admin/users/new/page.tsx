"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateUserPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        name: name || undefined,
        email: email || undefined,
        role: "member",
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to create user");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-lg px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/admin" className="text-sm font-medium text-aero hover:text-aero-bright">
        ← Admin
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold text-ink">Create member</h1>
      <p className="mt-2 text-mist">
        Add a homeowner so they can access their ProofAero Vault.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-soft"
      >
        {error && (
          <div className="rounded-lg bg-flag-red/10 px-4 py-3 text-sm text-flag-red">
            {error}
          </div>
        )}

        <label className="block">
          <span className="text-sm font-medium text-ink">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
            required
            minLength={6}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Name (optional)</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Email (optional)</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-aero py-3 text-sm font-semibold text-white hover:bg-aero-bright disabled:opacity-60"
        >
          {loading ? "Creating…" : "Create member"}
        </button>
      </form>
    </div>
  );
}
