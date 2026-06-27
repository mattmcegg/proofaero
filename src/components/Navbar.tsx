"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./brand";

const links = [
  { href: "#problem", label: "Why It Matters" },
  { href: "#process", label: "How It Works" },
  { href: "#coverage", label: "Coverage" },
  { href: "#proof", label: "Proof" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" aria-label="ProofAero home">
            <Wordmark className="text-lg" light={!scrolled} />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-ink/70 hover:text-ink"
                    : "text-paper/80 hover:text-paper"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#quote"
              className="hidden rounded-full bg-aero px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-aero-deep hover:shadow-lift sm:inline-block"
            >
              Get my proof quote
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
                scrolled ? "text-ink" : "text-paper"
              }`}
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`h-0.5 w-5 bg-current transition-transform ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-5 bg-current transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-5 bg-current transition-transform ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden bg-paper/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? "max-h-96 border-b border-ink/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-5 py-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/5 py-3 text-base font-medium text-ink/80"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-full bg-aero px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Get my proof quote
          </a>
        </div>
      </div>
    </header>
  );
}
