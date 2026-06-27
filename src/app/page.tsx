import Navbar from "@/components/Navbar";
import HeroVisual from "@/components/HeroVisual";
import Faq from "@/components/Faq";
import QuoteForm from "@/components/QuoteForm";
import { Mark, LogoImage, StripeFlag, StripeRule } from "@/components/brand";
import {
  ArrowIcon,
  ShieldIcon,
  DroneIcon,
  ClockIcon,
  DocIcon,
  StormIcon,
  HouseIcon,
  CheckIcon,
  XIcon,
  PinIcon,
  CameraIcon,
  LockIcon,
  BoltIcon,
} from "@/components/icons";

export default function Home() {
  return (
    <main id="top">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Problem />
      <Process />
      <Coverage />
      <ProofSection />
      <ValueAnchor />
      <FaqSection />
      <FinalCta />
      <Footer />
    </main>
  );
}

/* ----------------------------------------------------------------- HERO */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-16 text-paper">
      <div className="absolute inset-0 grid-faint" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-aero/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-flag-orange/10 blur-[120px]" />
      <StripeFlag className="pointer-events-none absolute right-0 top-24 h-40 w-72 opacity-20" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-paper/80">
            <span className="flag-dot" />
            FAA Part 107 certified pilots
          </span>

          <h1 className="reveal reveal-1 mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            When the storm damanages it,
            <br />
            your <span className="stripe-text">drone footage</span> proves it.
          </h1>

          <p className="reveal reveal-2 mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
            Insurers deny and underpay claims when you can&apos;t prove what your
            home looked like before the damage. ProofAero captures
            timestamped, geo-tagged, insurance-grade drone surveys — so your
            claim can never be dismissed for lack of proof.
          </p>

          <div className="reveal reveal-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-aero px-7 py-4 text-base font-semibold text-white shadow-lift transition-all hover:bg-aero-bright"
            >
              Document my property
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#process"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-semibold text-paper transition-colors hover:bg-white/5"
            >
              See how it works
            </a>
          </div>

          <div className="reveal reveal-4 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-paper/60">
            <Rating />
            <span className="flex items-center gap-2">
              <ShieldIcon className="h-4 w-4 text-flag-gold" />
              $0 denied for documented homes
            </span>
            <span className="flex items-center gap-2">
              <DroneIcon className="h-4 w-4 text-aero-bright" />
              4,200+ properties flown
            </span>
          </div>
        </div>

        <div className="reveal reveal-2">
          <HeroVisual />
        </div>
      </div>

      <StripeRule className="h-1.5 w-full" />
    </section>
  );
}

function Rating() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-flag-gold">
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.3 2.8 1-5.9L1.5 7.7l5.9-.9z" />
          </svg>
        ))}
      </span>
      <span className="font-semibold text-paper">4.9</span>
      <span>from 600+ homeowners</span>
    </span>
  );
}

/* --------------------------------------------------------- TRUST STRIP */
function TrustStrip() {
  const items = [
    "FAA Part 107",
    "Fully Insured Flights",
    "4K · 60fps Capture",
    "Geo-Tagged Evidence",
    "Adjuster-Ready Reports",
    "Secure Cloud Vault",
  ];
  return (
    <section className="border-b border-ink/10 bg-paper-dim">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 sm:px-8">
        {items.map((it) => (
          <span
            key={it}
            className="text-xs font-semibold uppercase tracking-wider text-mist"
          >
            {it}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- PROBLEM */
function Problem() {
  return (
    <section id="problem" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>The hidden gap</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            The damage is real.
            <br />
            But without proof, the payout isn&apos;t.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-mist">
            After every major storm, the same script plays out. You file. The
            adjuster arrives. And the burden of proof quietly shifts onto you.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <StatCard
            big="1 in 8"
            label="storm-related claims are underpaid or denied — most often for &lsquo;pre-existing&rsquo; or &lsquo;wear and tear.&rsquo;"
          />
          <StatCard
            big="$27,800"
            label="average roof claim a homeowner risks losing when they can&apos;t document prior condition."
            accent
          />
          <StatCard
            big="60 days"
            label="the narrow window insurers expect documentation in — long after evidence has blown away."
          />
        </div>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
          <PainCard
            icon={<XIcon className="h-5 w-5" />}
            title="Without ProofAero"
            tone="bad"
            points={[
              "Adjuster claims damage was \u201Cpre-existing\u201D — and you can\u2019t prove otherwise.",
              "Phone photos are blurry, undated, and easy to dispute.",
              "You climb a storm-damaged roof to gather evidence yourself.",
              "Months of back-and-forth, and a payout far below your loss.",
            ]}
          />
          <PainCard
            icon={<CheckIcon className="h-5 w-5" />}
            title="With ProofAero"
            tone="good"
            points={[
              "Timestamped, geo-tagged footage proves exact prior condition.",
              "Insurance-grade reports adjusters can\u2019t wave away.",
              "Zero risk — a certified pilot flies it, you stay on the ground.",
              "Faster approvals and the full payout you\u2019re owed.",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  big,
  label,
  accent,
}: {
  big: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-8 ${
        accent
          ? "border-flag-orange/30 bg-gradient-to-b from-flag-orange/5 to-transparent"
          : "border-ink/10 bg-white"
      }`}
    >
      <div
        className={`font-display text-5xl font-bold ${
          accent ? "stripe-text" : "text-ink"
        }`}
      >
        {big}
      </div>
      <p
        className="mt-3 text-sm leading-relaxed text-mist"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
}

function PainCard({
  icon,
  title,
  tone,
  points,
}: {
  icon: React.ReactNode;
  title: string;
  tone: "good" | "bad";
  points: string[];
}) {
  const good = tone === "good";
  return (
    <div
      className={`rounded-3xl border p-8 sm:p-10 ${
        good
          ? "border-aero/20 bg-ink text-paper shadow-lift"
          : "border-ink/10 bg-paper-dim"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            good ? "bg-aero text-white" : "bg-flag-red/15 text-flag-red"
          }`}
        >
          {icon}
        </span>
        <h3
          className={`font-display text-xl font-semibold ${
            good ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h3>
      </div>
      <ul className="mt-6 space-y-4">
        {points.map((p) => (
          <li key={p} className="flex gap-3">
            <span
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                good
                  ? "bg-flag-gold text-ink"
                  : "bg-flag-red/15 text-flag-red"
              }`}
            >
              {good ? (
                <CheckIcon className="h-3.5 w-3.5" />
              ) : (
                <XIcon className="h-3.5 w-3.5" />
              )}
            </span>
            <span
              className={`text-[15px] leading-relaxed ${
                good ? "text-paper/80" : "text-mist"
              }`}
            >
              {p}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------- PROCESS */
function Process() {
  const steps = [
    {
      icon: <PinIcon className="h-6 w-6" />,
      kicker: "Step 01",
      title: "Book your survey",
      body: "Schedule an on-site baseline in 60 seconds, or trigger an on-demand storm response the moment conditions clear. Pick the protection that fits your property.",
    },
    {
      icon: <DroneIcon className="h-6 w-6" />,
      kicker: "Step 02",
      title: "We fly it for you",
      body: "A certified pilot captures every roof plane, gutter, and elevation in 4K — timestamped and geo-tagged to documentation standards. You never leave the ground.",
    },
    {
      icon: <DocIcon className="h-6 w-6" />,
      kicker: "Step 03",
      title: "Your proof is vaulted",
      body: "Footage, stills, and a structured condition report land in your secure ProofAero Vault — ready to hand any adjuster, the second you need it.",
    },
  ];

  return (
    <section id="process" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="absolute inset-0 grid-faint opacity-60" />
      <div className="pointer-events-none absolute right-1/4 top-0 h-80 w-80 rounded-full bg-aero/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow light>How it works</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Two ways to fly. One unshakeable proof.
          </h2>
          <p className="mt-5 text-lg text-paper/70">
            On-site baselines before the season. On-demand response after the
            sky clears. Both feed the same court-and-claim-ready evidence vault.
          </p>
        </div>

        {/* mode toggle cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <ModeCard
            icon={<HouseIcon className="h-6 w-6" />}
            tag="On-site"
            title="Pre-storm baseline"
            body="A scheduled, in-person survey that establishes your property&apos;s exact condition — the &lsquo;before&rsquo; that makes any future damage undeniable."
          />
          <ModeCard
            icon={<StormIcon className="h-6 w-6" />}
            tag="On-demand"
            title="Rapid storm response"
            body="Book the instant a storm passes and we capture fresh damage within hours — while the evidence is still on your roof."
            highlight
          />
        </div>

        {/* steps */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              {i < steps.length - 1 && (
                <div className="absolute left-7 top-7 hidden h-px w-full bg-gradient-to-r from-aero/40 to-transparent md:block" />
              )}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-aero text-white shadow-lift">
                {s.icon}
              </div>
              <div className="mt-6 font-mono text-xs uppercase tracking-widest text-aero-bright">
                {s.kicker}
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold text-paper">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/65">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModeCard({
  icon,
  tag,
  title,
  body,
  highlight,
}: {
  icon: React.ReactNode;
  tag: string;
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border p-8 transition-all ${
        highlight
          ? "border-flag-orange/40 bg-gradient-to-br from-white/[0.07] to-transparent"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      {highlight && (
        <span className="absolute right-6 top-6 rounded-full bg-flag-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
          Most booked
        </span>
      )}
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-aero-bright">
        {icon}
      </span>
      <div className="mt-5 text-xs font-semibold uppercase tracking-widest text-paper/50">
        {tag}
      </div>
      <h3 className="mt-1 font-display text-2xl font-semibold text-paper">
        {title}
      </h3>
      <p
        className="mt-3 text-[15px] leading-relaxed text-paper/65"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}

/* ------------------------------------------------------------ COVERAGE */
function Coverage() {
  const features = [
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "Timestamped to the second",
      body: "Every frame is locked to a verifiable date and time, so &lsquo;before&rsquo; and &lsquo;after&rsquo; are never in question.",
    },
    {
      icon: <PinIcon className="h-6 w-6" />,
      title: "GPS-tagged location",
      body: "Coordinates are embedded in the record, tying the footage to your exact address with no room for dispute.",
    },
    {
      icon: <CameraIcon className="h-6 w-6" />,
      title: "4K cinema-grade capture",
      body: "Cracked shingles, lifted flashing, and hail bruising are visible in detail an adjuster cannot dismiss.",
    },
    {
      icon: <DocIcon className="h-6 w-6" />,
      title: "Structured condition report",
      body: "A clean, professional summary formatted the way adjusters and public adjusters expect to receive it.",
    },
    {
      icon: <LockIcon className="h-6 w-6" />,
      title: "Secure ProofAero Vault",
      body: "Your evidence lives in encrypted cloud storage — shareable with one link the moment you file a claim.",
    },
    {
      icon: <BoltIcon className="h-6 w-6" />,
      title: "Same-day storm response",
      body: "When a system rolls through, we prioritize documented members for rapid post-event re-flights.",
    },
  ];

  return (
    <section id="coverage" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>What you receive</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            Not photos. Evidence.
          </h2>
          <p className="mt-5 text-lg text-mist">
            Every ProofAero survey is built to one standard: it has to hold up
            when an insurer pushes back. Here&apos;s what&apos;s in the vault.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-paper p-8 transition-colors hover:bg-white"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-aero/10 text-aero transition-colors group-hover:bg-aero group-hover:text-white">
                {f.icon}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {f.title}
              </h3>
              <p
                className="mt-2 text-[15px] leading-relaxed text-mist"
                dangerouslySetInnerHTML={{ __html: f.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- PROOF */
function ProofSection() {
  const testimonials = [
    {
      quote:
        "After Hurricane season, my neighbor and I filed nearly identical roof claims. He fought for four months and settled low. I sent my ProofAero baseline and the adjuster approved the full amount in nine days.",
      name: "Marcus T.",
      role: "Homeowner · Cape Coral, FL",
    },
    {
      quote:
        "The insurer tried the &lsquo;pre-existing damage&rsquo; line. I forwarded my timestamped pre-storm survey and the conversation ended right there. It paid for itself many times over.",
      name: "Diane R.",
      role: "Homeowner · Galveston, TX",
    },
    {
      quote:
        "As a public adjuster, ProofAero files are the cleanest evidence I get. Geo-tagged, dated, professional. They make my clients&apos; claims almost impossible to deny.",
      name: "Andre P.",
      role: "Licensed Public Adjuster",
    },
  ];

  return (
    <section id="proof" className="relative bg-paper-dim py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionEyebrow>The proof in proof</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              Documented homes simply win more claims.
            </h2>
            <p className="mt-5 text-lg text-mist">
              The pattern is consistent: when you can prove prior condition, the
              dispute disappears. Here&apos;s what that looks like across the
              homeowners and adjusters we fly for.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <BigStat value="98%" label="approval rate for documented claims" />
              <BigStat value="9 days" label="average time to payout" />
              <BigStat value="4,200+" label="properties surveyed" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className={`flex flex-col justify-between rounded-2xl border border-ink/10 bg-white p-7 shadow-soft ${
                  i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <StripeFlag className="h-6 w-12 opacity-90" />
                <blockquote
                  className="mt-4 text-[15px] leading-relaxed text-ink/85"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
                />
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-paper">
                    {t.name.charAt(0)}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="block text-xs text-mist">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold text-ink sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-xs leading-snug text-mist">{label}</div>
    </div>
  );
}

/* -------------------------------------------------------- VALUE ANCHOR */
function ValueAnchor() {
  return (
    <section className="bg-ink py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-10 sm:p-14">
          <StripeFlag className="pointer-events-none absolute -right-6 -top-6 h-32 w-56 opacity-20" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionEyebrow light>Simple math</SectionEyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                A survey costs less than your deductible.
              </h2>
              <p className="mt-5 text-paper/70">
                Weigh one known, modest cost against the tens of thousands an
                undocumented claim can quietly cost you. Most homeowners decide
                in about ten seconds.
              </p>
              <a
                href="#quote"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-flag-gold px-7 py-4 text-base font-semibold text-ink transition-all hover:brightness-105"
              >
                Get my exact quote
                <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="space-y-4">
              <ScaleRow
                label="Typical denied / underpaid roof claim"
                value="$27,800"
                bar="w-full"
                tone="loss"
              />
              <ScaleRow
                label="A ProofAero survey"
                value="from $249"
                bar="w-[9%]"
                tone="cost"
              />
              <p className="pt-2 text-xs text-paper/50">
                Representative figures. Final pricing depends on property size
                and survey type — your quote is free and itemized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScaleRow({
  label,
  value,
  bar,
  tone,
}: {
  label: string;
  value: string;
  bar: string;
  tone: "loss" | "cost";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-paper/70">{label}</span>
        <span
          className={`font-display text-lg font-bold ${
            tone === "loss" ? "text-flag-red" : "text-flag-gold"
          }`}
        >
          {value}
        </span>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${bar} ${
            tone === "loss" ? "stripe-bar" : "bg-flag-gold"
          }`}
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- FAQ */
function FaqSection() {
  return (
    <section id="faq" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Questions, answered</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            Everything homeowners ask before they fly.
          </h2>
        </div>
        <div className="mt-14">
          <Faq />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- FINAL CTA */
function FinalCta() {
  return (
    <section id="quote" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="absolute inset-0 grid-faint" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-aero/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-flag-orange/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-paper/80">
            <span className="flag-dot" />
            Hurricane season is here
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-5xl">
            Document before the storm.
            <br />
            <span className="stripe-text">After is too late.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-paper/70">
            You can&apos;t capture &lsquo;before&rsquo; once the damage is done.
            Lock in your survey today and walk into any future claim with proof
            on your side.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Free, itemized quote in one business day",
              "FAA-certified, fully insured pilots",
              "Insurance-grade footage in your vault within 48 hours",
            ].map((p) => (
              <li key={p} className="flex items-center gap-3 text-paper/80">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-flag-gold text-ink">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="text-[15px]">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 shadow-lift backdrop-blur sm:p-9">
          <h3 className="font-display text-2xl font-semibold text-paper">
            Get my proof quote
          </h3>
          <p className="mt-1 text-sm text-paper/60">
            Two minutes now. Peace of mind through every storm.
          </p>
          <div className="mt-7">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- FOOTER */
function Footer() {
  return (
    <footer className="bg-ink-soft text-paper">
      <StripeRule className="h-1.5 w-full" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <LogoImage className="h-16 w-16 rounded-xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              Drone surveys that turn your property into proof — protecting
              homeowners from denied and underpaid storm claims, one flight at a
              time.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-paper/50">
              <Mark className="h-5 w-5" />
              Proof, not promises.
            </div>
          </div>

          <FooterCol
            title="Surveys"
            links={[
              "Pre-storm baseline",
              "On-demand response",
              "Annual protection plan",
              "Commercial properties",
            ]}
          />
          <FooterCol
            title="Company"
            links={["How it works", "Our pilots", "Coverage areas", "Contact"]}
          />
          <FooterCol
            title="Resources"
            links={[
              "Claim documentation guide",
              "Hurricane prep checklist",
              "FAQ",
              "Member login",
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-paper/50 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} ProofAero. All rights reserved. FAA
            Part 107 certified · Fully insured operations.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-paper">
              Privacy
            </a>
            <a href="#" className="hover:text-paper">
              Terms
            </a>
            <a href="#" className="hover:text-paper">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-paper/90">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-sm text-paper/60 transition-colors hover:text-aero-bright"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------- SHARED BITS */
function SectionEyebrow({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="stripe-bar h-3 w-7 rounded-full" />
      <span
        className={`text-xs font-bold uppercase tracking-[0.18em] ${
          light ? "text-paper/70" : "text-mist"
        }`}
      >
        {children}
      </span>
    </span>
  );
}
