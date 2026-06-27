import type { SVGProps } from "react";
import Image from "next/image";

/**
 * The official ProofAero logo lockup (PA monogram + drone + aviation stripes
 * + ProofAero wordmark). The artwork carries its own dark navy field, so it
 * is designed to sit on the site's dark surfaces.
 */
export function LogoImage({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/proofaero-logo.png"
      alt="ProofAero"
      width={1024}
      height={1024}
      priority={priority}
      className={className}
    />
  );
}

/**
 * ProofAero mark — a protective peak that doubles as a roofline and an
 * ascending flight path. Its interior carries the four aviation stripes,
 * echoing the striped pyramid of the reference monogram.
 */
export function Mark({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <clipPath id="pa-peak">
          <path d="M32 5 60 56 4 56Z" />
        </clipPath>
      </defs>
      {/* Stripe bands fill the lower body of the peak */}
      <g clipPath="url(#pa-peak)">
        <rect x="0" y="5" width="64" height="51" fill="var(--color-aero)" />
        <rect x="0" y="40" width="64" height="4" fill="var(--color-flag-crimson)" />
        <rect x="0" y="44" width="64" height="4" fill="var(--color-flag-red)" />
        <rect x="0" y="48" width="64" height="4" fill="var(--color-flag-orange)" />
        <rect x="0" y="52" width="64" height="4" fill="var(--color-flag-gold)" />
      </g>
      {/* Crisp outline keeps it sharp at small sizes */}
      <path
        d="M32 5 60 56 4 56Z"
        stroke="var(--color-aero-deep)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Inner notch — the drone's vantage point at the apex */}
      <circle cx="32" cy="20" r="3.4" fill="var(--color-paper)" />
    </svg>
  );
}

export function Wordmark({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-display font-bold tracking-tight ${className}`}
    >
      <Mark className="h-7 w-7 shrink-0" />
      <span className={light ? "text-paper" : "text-ink"}>
        Proof<span className="text-aero">Aero</span>
      </span>
    </span>
  );
}

/**
 * The signature four-band stripe flag with tapered trailing edge —
 * used as a recurring accent / section divider across the site.
 */
export function StripeFlag({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 64"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d="M0 4 H96 L84 16 H0 Z" fill="var(--color-flag-crimson)" />
      <path d="M0 20 H84 L72 32 H0 Z" fill="var(--color-flag-red)" />
      <path d="M0 36 H72 L60 48 H0 Z" fill="var(--color-flag-orange)" />
      <path d="M0 52 H60 L48 64 H0 Z" fill="var(--color-flag-gold)" />
    </svg>
  );
}

/** A thin full-width stripe rule for dividers. */
export function StripeRule({ className = "" }: { className?: string }) {
  return <div className={`stripe-bar ${className}`} />;
}
