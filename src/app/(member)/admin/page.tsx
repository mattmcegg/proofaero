"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  id: string;
  username: string;
  role: string;
  name?: string;
  email?: string;
}

interface Survey {
  id: string;
  surveyNumber: string;
  propertyAddress: string;
  zip: string;
  type: string;
  status: string;
  userId: string;
  capturedAt?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [usersRes, surveysRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/surveys"),
      ]);
      const usersData = await usersRes.json();
      const surveysData = await surveysRes.json();
      if (usersRes.ok) setUsers(usersData.users);
      if (surveysRes.ok) setSurveys(surveysData.surveys);
      setLoading(false);
    }
    load();
  }, []);

  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Admin</h1>
          <p className="mt-2 text-mist">
            Manage members, surveys, and vault footage uploads.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/users/new"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-paper-dim"
          >
            Create member
          </Link>
          <Link
            href="/admin/surveys/new"
            className="rounded-full bg-aero px-5 py-2.5 text-sm font-semibold text-white hover:bg-aero-bright"
          >
            New survey
          </Link>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-ink">All surveys</h2>
        {loading ? (
          <p className="mt-4 text-mist">Loading…</p>
        ) : surveys.length === 0 ? (
          <p className="mt-4 text-mist">No surveys yet. Create one to get started.</p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink/10 bg-paper-dim/50 text-xs font-semibold uppercase tracking-wider text-mist">
                <tr>
                  <th className="px-5 py-3">Survey</th>
                  <th className="px-5 py-3">Member</th>
                  <th className="px-5 py-3">Property</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {surveys.map((s) => (
                  <tr key={s.id} className="hover:bg-paper-dim/30">
                    <td className="px-5 py-4 font-semibold text-ink">
                      #{s.surveyNumber}
                    </td>
                    <td className="px-5 py-4 text-mist">
                      {userMap[s.userId]?.username || s.userId}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-ink">{s.propertyAddress}</span>
                      <span className="text-mist"> · {s.zip}</span>
                    </td>
                    <td className="px-5 py-4 capitalize text-mist">{s.type}</td>
                    <td className="px-5 py-4 capitalize text-mist">{s.status}</td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/surveys/${s.id}`}
                        className="font-semibold text-aero hover:text-aero-bright"
                      >
                        Upload footage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-ink">Members</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users
            .filter((u) => u.role === "member")
            .map((u) => (
              <div
                key={u.id}
                className="rounded-xl border border-ink/10 bg-white p-5 shadow-soft"
              >
                <p className="font-semibold text-ink">{u.username}</p>
                {u.name && <p className="text-sm text-mist">{u.name}</p>}
                {u.email && <p className="text-sm text-mist">{u.email}</p>}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
