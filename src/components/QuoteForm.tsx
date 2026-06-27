"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "./icons";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="grid gap-4"
    >
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
      <button
        type="submit"
        className="group mt-1 inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-flag-gold px-6 py-3.5 text-base font-semibold text-ink transition-all hover:brightness-105"
      >
        Lock in my survey
        <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
