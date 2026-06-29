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
 * ProofAero mark — the "PA" monogram in aero blue paired with the four-band
 * aviation stripe flag, distilled from the full logo lockup for use at small
 * sizes (footer, inline accents).
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
      {/* PA monogram */}
      <text
        x="2"
        y="45"
        className="font-display"
        fontSize="34"
        fontWeight="700"
        letterSpacing="-2"
        fill="var(--color-aero)"
      >
        PA
      </text>
      {/* Aviation stripe flag */}
      <rect x="44" y="21" width="18" height="6" fill="var(--color-flag-crimson)" />
      <rect x="44" y="27" width="18" height="6" fill="var(--color-flag-red)" />
      <rect x="44" y="33" width="18" height="6" fill="var(--color-flag-orange)" />
      <rect x="44" y="39" width="18" height="6" fill="var(--color-flag-gold)" />
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
