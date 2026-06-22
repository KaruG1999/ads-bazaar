"use client";

import { useState } from "react";
import type { UserProfile } from "./settings-data";

type ToggleItem = {
  id: string;
  label: string;
  description: string;
  defaultOn: boolean;
};

function buildToggles(role: UserProfile["role"]): ToggleItem[] {
  return [
    {
      id: "campaign-updates",
      label: "Campaign updates",
      description: "Status changes on campaigns you're part of.",
      defaultOn: true,
    },
    {
      id: "payout-notifications",
      label: "Payout notifications",
      description: "Alerts when funds settle or become claimable.",
      defaultOn: true,
    },
    role === "business"
      ? {
          id: "new-applicants",
          label: "New applicants",
          description: "When a creator applies to one of your campaigns.",
          defaultOn: true,
        }
      : {
          id: "campaign-match-alerts",
          label: "Campaign match alerts",
          description: "When a new campaign matches your audience.",
          defaultOn: true,
        },
    {
      id: "marketing-emails",
      label: "Marketing emails",
      description: "Product news and occasional promotions.",
      defaultOn: false,
    },
  ];
}

export function NotificationPreferences({
  role,
}: {
  role: UserProfile["role"];
}) {
  const toggles = buildToggles(role);
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(toggles.map((t) => [t.id, t.defaultOn])),
  );

  return (
    <section className="border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
      <h2 className="mb-4 text-sm font-semibold text-[var(--dash-heading)]">
        Notification preferences
      </h2>

      <div className="flex flex-col divide-y divide-[var(--dash-border)]">
        {toggles.map((toggle) => {
          const isOn = state[toggle.id];
          return (
            <div
              key={toggle.id}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm text-[var(--dash-body)]">
                  {toggle.label}
                </p>
                <p className="text-xs text-[var(--dash-muted)]">
                  {toggle.description}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isOn}
                aria-label={toggle.label}
                onClick={() =>
                  setState((prev) => ({ ...prev, [toggle.id]: !prev[toggle.id] }))
                }
                className={`flex size-10 shrink-0 items-center rounded-full px-1 transition-colors ${
                  isOn ? "bg-[var(--dash-accent)]" : "bg-[var(--dash-border)]"
                }`}
              >
                <span
                  className={`size-5 rounded-full bg-[var(--dash-surface)] transition-transform ${
                    isOn ? "translate-x-3" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
