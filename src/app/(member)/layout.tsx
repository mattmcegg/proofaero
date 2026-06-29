import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import VaultNav from "@/components/vault/VaultNav";

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-paper">
      <VaultNav username={user.username} role={user.role} />
      <main>{children}</main>
    </div>
  );
}
