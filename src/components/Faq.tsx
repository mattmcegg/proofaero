"use client";

import { useState } from "react";
import { PlusIcon } from "./icons";

const faqs = [
  {
    q: "How does drone footage actually help my insurance claim?",
    a: "Adjusters need to establish the condition of your property before a loss. Our surveys produce timestamped, GPS-tagged 4K footage and a structured condition report. When a storm hits, you can prove exactly what was intact — removing the insurer's most common reason to deny or underpay: 'pre-existing damage' or 'wear and tear.'",
  },
  {
    q: "What's the difference between on-site and on-demand surveys?",
    a: "On-site is our scheduled baseline survey — a certified pilot documents your entire property in person. On-demand is your rapid post-event response: book through the app the moment a storm clears and we capture fresh damage footage within hours, while evidence is still on the roof.",
  },
  {
    q: "Are your pilots licensed?",
    a: "Every flight is operated by an FAA Part 107 certified remote pilot and fully insured. We fly within FAA regulations and capture imagery to a documentation standard adjusters and public adjusters recognize.",
  },
  {
    q: "Do I need a baseline survey before a storm?",
    a: "It's the single most valuable thing you can do. Documentation captured after damage proves the damage exists; a pre-storm baseline proves the damage is new. Together they make a claim nearly impossible to dispute. After the storm is too late to prove 'before.'",
  },
  {
    q: "How fast do I get my report?",
    a: "Your secure digital report — footage, stills, and condition summary — is delivered to your ProofAero vault within 48 hours of an on-site survey, and as fast as same-day for on-demand storm response.",
  },
  {
    q: "What does it cost versus what I could lose?",
    a: "A survey is a small fraction of a typical roof or structural claim, which routinely runs into the tens of thousands. Most homeowners view it the way they view the deductible — a known cost that protects against a catastrophic, deniable loss.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink/10">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg font-medium text-ink">
                {item.q}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-transform duration-300 ${
                  isOpen ? "rotate-45 border-aero bg-aero text-white" : ""
                }`}
              >
                <PlusIcon className="h-4 w-4" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl text-[15px] leading-relaxed text-mist">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
