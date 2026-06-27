import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProofAero — Drone Survey Proof That Protects Your Insurance Claim",
  description:
    "FAA-certified drone surveys document your roof and property before the storm — timestamped, geo-tagged, insurance-grade evidence so your claim can never be denied for lack of proof.",
  keywords: [
    "drone roof inspection",
    "storm damage documentation",
    "insurance claim proof",
    "hurricane property survey",
    "pre-storm inspection",
  ],
  openGraph: {
    title: "ProofAero — Proof That Protects",
    description:
      "On-site and on-demand drone surveys that give homeowners insurance-grade proof against denied storm claims.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">{children}</body>
    </html>
  );
}
