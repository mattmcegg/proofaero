import { getCurrentUser } from "@/lib/auth";

export default async function AccountPage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="font-display text-3xl font-bold text-ink">Account</h1>
      <p className="mt-2 text-mist">
        Your ProofAero member profile and vault access.
      </p>

      <dl className="mt-10 space-y-6 rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
        <div>
          <dt className="text-sm font-medium text-mist">Username</dt>
          <dd className="mt-1 font-display text-lg font-semibold text-ink">
            {user?.username}
          </dd>
        </div>
        {user?.name && (
          <div>
            <dt className="text-sm font-medium text-mist">Name</dt>
            <dd className="mt-1 text-ink">{user.name}</dd>
          </div>
        )}
        {user?.email && (
          <div>
            <dt className="text-sm font-medium text-mist">Email</dt>
            <dd className="mt-1 text-ink">{user.email}</dd>
          </div>
        )}
        <div>
          <dt className="text-sm font-medium text-mist">Role</dt>
          <dd className="mt-1 capitalize text-ink">{user?.role}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-mist">Member since</dt>
          <dd className="mt-1 text-ink">
            {user?.createdAt.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </dd>
        </div>
      </dl>

      <div className="mt-8 rounded-2xl border border-ink/10 bg-paper-dim/50 p-6 text-sm text-mist">
        <p className="font-semibold text-ink">Need help with your vault?</p>
        <p className="mt-2">
          Contact ProofAero support for claim documentation questions or to
          request adjuster-ready report packages.
        </p>
      </div>
    </div>
  );
}
