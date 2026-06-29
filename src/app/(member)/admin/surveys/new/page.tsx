"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  username: string;
  name?: string;
}

export default function CreateSurveyPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [zip, setZip] = useState("");
  const [type, setType] = useState("baseline");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        const members = (data.users || []).filter(
          (u: User & { role: string }) => u.role === "member"
        );
        setUsers(members);
        if (members.length > 0) setUserId(members[0].id);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/surveys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        propertyAddress,
        zip,
        type,
        notes: notes || undefined,
        status: "processing",
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to create survey");
      setLoading(false);
      return;
    }

    router.push(`/admin/surveys/${data.survey.id}`);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-lg px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/admin" className="text-sm font-medium text-aero hover:text-aero-bright">
        ← Admin
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold text-ink">New survey</h1>
      <p className="mt-2 text-mist">
        Create a survey record for a member, then upload their footage.
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
          <span className="text-sm font-medium text-ink">Member</span>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
            required
          >
            {users.length === 0 ? (
              <option value="">No members — create one first</option>
            ) : (
              users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}{u.name ? ` (${u.name})` : ""}
                </option>
              ))
            )}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Property address</span>
          <input
            type="text"
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
            placeholder="123 Coastal Dr, Naples, FL"
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">ZIP code</span>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="34102"
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Survey type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
          >
            <option value="baseline">Pre-storm baseline</option>
            <option value="ondemand">On-demand response</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Pilot notes (optional)</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
          />
        </label>

        <button
          type="submit"
          disabled={loading || users.length === 0}
          className="w-full rounded-full bg-aero py-3 text-sm font-semibold text-white hover:bg-aero-bright disabled:opacity-60"
        >
          {loading ? "Creating…" : "Create & upload footage"}
        </button>
      </form>
    </div>
  );
}
