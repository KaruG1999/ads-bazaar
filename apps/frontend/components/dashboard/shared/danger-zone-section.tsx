export function DangerZoneSection() {
  return (
    <section className="border border-red-400/30 bg-[var(--dash-surface)] p-6">
      <h2 className="mb-4 text-sm font-semibold text-[var(--dash-heading)]">
        Danger zone
      </h2>

      <p className="mb-6 max-w-2xl text-sm text-[var(--dash-muted)]">
        This action is irreversible. All campaign data and wallet associations
        will be permanently removed.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled
          title="Coming soon"
          className="border border-red-400 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
        >
          Deactivate Account
        </button>
        <button
          type="button"
          disabled
          title="Coming soon"
          className="bg-red-400 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-red-400"
        >
          Delete Account
        </button>
      </div>
    </section>
  );
}
