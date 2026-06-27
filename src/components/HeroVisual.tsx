import { ShieldIcon, PinIcon, ClockIcon } from "./icons";

/**
 * A stylized top-down "survey report" — an aerial roof scan with a HUD
 * overlay and floating evidence badges. Pure SVG/CSS, no stock photos.
 */
export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative animate-drift rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-3 shadow-lift backdrop-blur-sm">
        {/* The scan surface */}
        <div className="relative overflow-hidden rounded-2xl bg-ink-soft">
          <svg viewBox="0 0 400 360" className="block h-auto w-full">
            <defs>
              <linearGradient id="ground" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#102338" />
                <stop offset="1" stopColor="#0a1626" />
              </linearGradient>
              <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#29a9ef" stopOpacity="0" />
                <stop offset="1" stopColor="#29a9ef" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            <rect width="400" height="360" fill="url(#ground)" />

            {/* subtle plot grid */}
            <g stroke="#29a9ef" strokeOpacity="0.07">
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="360" />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
              ))}
            </g>

            {/* property + roof planes (top-down) */}
            <g>
              <polygon points="120,90 280,90 300,150 100,150" fill="#1c3550" />
              <polygon points="100,150 300,150 300,280 100,280" fill="#16293d" />
              <polygon
                points="120,90 280,90 300,150 100,150"
                fill="none"
                stroke="#3b5d80"
                strokeWidth="1.2"
              />
              {/* ridge line */}
              <line x1="100" y1="150" x2="300" y2="150" stroke="#5d82a8" strokeWidth="1.4" />
              <line x1="200" y1="90" x2="200" y2="150" stroke="#3b5d80" strokeWidth="1" />
              {/* a documented "issue" marker */}
              <circle cx="250" cy="120" r="14" fill="none" stroke="#f6b72a" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="250" cy="120" r="2.5" fill="#f6b72a" />
            </g>

            {/* animated scan sweep */}
            <g style={{ mixBlendMode: "screen" }}>
              <rect width="400" height="120" fill="url(#scan)">
                <animate
                  attributeName="y"
                  from="-120"
                  to="360"
                  dur="3.4s"
                  repeatCount="indefinite"
                />
              </rect>
              <line x1="0" x2="400" y1="0" y2="0" stroke="#29a9ef" strokeWidth="1.5" strokeOpacity="0.8">
                <animate
                  attributeName="y1"
                  from="0"
                  to="360"
                  dur="3.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y2"
                  from="0"
                  to="360"
                  dur="3.4s"
                  repeatCount="indefinite"
                />
              </line>
            </g>

            {/* HUD corner brackets */}
            <g stroke="#e8eef5" strokeWidth="2" fill="none" strokeOpacity="0.9">
              <path d="M28 28h26M28 28v26" />
              <path d="M372 28h-26M372 28v26" />
              <path d="M28 332h26M28 332v-26" />
              <path d="M372 332h-26M372 332v-26" />
            </g>
            <text x="34" y="350" fill="#7e95ad" fontSize="11" fontFamily="monospace">
              GPS 25.7617° N, 80.1918° W
            </text>
            <text x="300" y="24" fill="#7e95ad" fontSize="11" fontFamily="monospace">
              4K · 60fps
            </text>
          </svg>

          {/* in-scan stripe accent */}
          <div className="stripe-bar absolute bottom-0 left-0 h-1 w-full" />
        </div>

        {/* report footer row */}
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-flag-gold" />
            <span className="font-mono text-xs uppercase tracking-widest text-paper/60">
              Survey #PA-2291 · Documented
            </span>
          </div>
          <span className="font-display text-xs font-semibold text-aero-bright">
            ProofAero Vault
          </span>
        </div>
      </div>

      {/* Floating evidence badges */}
      <FloatingBadge
        className="-left-4 top-10 sm:-left-8"
        icon={<ClockIcon className="h-4 w-4" />}
        label="Timestamped"
        value="Jun 27, 3:14 PM"
      />
      <FloatingBadge
        className="-right-3 top-1/3 sm:-right-6"
        icon={<PinIcon className="h-4 w-4" />}
        label="Geo-tagged"
        value="Verified location"
      />
      <FloatingBadge
        className="-bottom-4 left-1/4"
        icon={<ShieldIcon className="h-4 w-4" />}
        label="Claim-ready"
        value="Insurance-grade"
      />
    </div>
  );
}

function FloatingBadge({
  className = "",
  icon,
  label,
  value,
}: {
  className?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`absolute z-10 flex items-center gap-2.5 rounded-xl border border-ink/10 bg-paper px-3.5 py-2.5 shadow-lift ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-aero/10 text-aero">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-mist">
          {label}
        </span>
        <span className="block text-xs font-bold text-ink">{value}</span>
      </span>
    </div>
  );
}
