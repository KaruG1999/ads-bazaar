import { User } from "lucide-react";
import type { UserProfile } from "./settings-data";

export function ProfileSection({ profile }: { profile: UserProfile }) {
  return (
    <section className="border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
      <h2 className="mb-4 text-sm font-semibold text-[var(--dash-heading)]">
        Profile
      </h2>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[var(--dash-border)]">
          <User className="size-7 text-[var(--dash-muted)]" aria-hidden="true" />
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                Display name
              </p>
              <p className="text-sm text-[var(--dash-body)]">
                {profile.displayName}
              </p>
            </div>

            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                Email
              </p>
              <p className="text-sm text-[var(--dash-body)]">{profile.email}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                Bio
              </p>
              <p className="text-sm text-[var(--dash-body)]">{profile.bio}</p>
            </div>
          </div>

          <button
            type="button"
            disabled
            title="Coming soon"
            className="mt-6 border border-[var(--dash-border)] px-4 py-2 text-sm font-semibold text-[var(--dash-body)] transition-colors hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-[var(--dash-border)] disabled:hover:text-[var(--dash-body)]"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
}
