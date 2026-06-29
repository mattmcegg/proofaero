"use client";

import { useState, type FormEvent } from "react";
import { ArrowIcon, CheckIcon } from "./icons";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          zip: data.get("zip"),
          type: data.get("type"),
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/10 p-10 text-center backdrop-blur">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-flag-gold text-ink">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-paper">
          You&apos;re on the flight list.
        </h3>
        <p className="max-w-sm text-sm text-paper/70">
          A ProofAero flight coordinator will reach out within one business day
          with your survey window and quote. Smart move getting documented
          before the next storm.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Jordan Rivera" />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@email.com"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Property ZIP"
          name="zip"
          placeholder="33139"
        />
        <div className="grid gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-paper/60">
            Survey type
          </label>
          <select
            name="type"
            className="h-12 rounded-xl border border-white/15 bg-white/5 px-4 text-paper outline-none transition focus:border-aero-bright"
            defaultValue="baseline"
          >
            <option value="baseline" className="text-ink">
              Pre-storm baseline
            </option>
            <option value="ondemand" className="text-ink">
              On-demand storm response
            </option>
            <option value="both" className="text-ink">
              Both — full protection
            </option>
          </select>
        </div>
      </div>
      {error ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="group mt-1 inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-flag-gold px-6 py-3.5 text-base font-semibold text-ink transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Lock in my survey"}
        {!loading ? (
          <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        ) : null}
      </button>
      <p className="text-center text-xs text-paper/50">
        Free quote · No obligation · We never share your address.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-wider text-paper/60"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="h-12 rounded-xl border border-white/15 bg-white/5 px-4 text-paper placeholder:text-paper/35 outline-none transition focus:border-aero-bright"
      />
    </div>
  );
}
