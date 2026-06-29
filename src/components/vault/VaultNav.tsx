"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoImage, StripeRule } from "@/components/brand";

export default function VaultNav({
  username,
  role,
}: {
  username: string;
  role: string;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-ink/10 bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/vault" className="flex items-center gap-3">
            <LogoImage className="h-10 w-10 rounded-lg" />
            <span className="font-display text-lg font-bold tracking-tight">
              Proof<span className="text-aero-bright">Aero</span> Vault
            </span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            <NavLink href="/vault">My surveys</NavLink>
            <NavLink href="/account">Account</NavLink>
            {role === "admin" && (
              <NavLink href="/admin" accent>Admin</NavLink>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-paper/60 sm:inline">
            {username}
          </span>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-paper/80 transition-colors hover:bg-white/5"
          >
            Sign out
          </button>
        </div>
      </div>
      <StripeRule className="h-1 w-full" />
    </header>
  );
}

function NavLink({
  href,
  children,
  accent,
}: {
  href: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        accent
          ? "bg-flag-orange/20 text-flag-gold hover:bg-flag-orange/30"
          : "text-paper/70 hover:bg-white/5 hover:text-paper"
      }`}
    >
      {children}
    </Link>
  );
}
