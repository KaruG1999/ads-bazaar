"use client";

import { useEffect, useMemo, useState } from "react";
import { StellarWalletButton, type WalletState } from "./stellar-wallet-button";

type Role = "business" | "creator";
type Step = "closed" | "role" | "registration" | "complete";

type OnboardingFlowProps = {
  buttonClassName?: string;
  buttonLabel?: string;
  buttonSize?: "default" | "large";
};

const roleOptions = {
  business: {
    title: "Create campaigns as a business",
    text: "Register your business profile, then launch escrow-funded campaigns for creators.",
  },
  creator: {
    title: "Earn from campaigns as a creator",
    text: "Set up your creator profile, then apply to funded campaigns and claim payouts.",
  },
};

const businessHighlights = [
  "Verified business identity",
  "Escrow-backed campaign funding",
  "Creator applications dashboard",
  "Proof review and payout approval",
];

const creatorHighlights = [
  "Creator profile and social links",
  "Campaign discovery by market",
  "Proof submission tracking",
  "Wallet-native payout claims",
];

const fieldClass =
  "mt-2 min-h-12 w-full rounded-md border border-[#b9c0bc] bg-transparent px-3.5 text-base text-[#111814] outline-none transition focus:border-[#6da967] focus:ring-2 focus:ring-[#6da967]/25";

const selectClass = `${fieldClass} appearance-none`;

function FormField({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <label className={`block text-sm text-[#202722] ${className}`.trim()}>
      {label}
      {children}
    </label>
  );
}

function RegistrationAside({ role }: { role: Role }) {
  const isBusiness = role === "business";
  const highlights = isBusiness ? businessHighlights : creatorHighlights;

  return (
    <aside className="hidden min-h-[640px] border-r border-[#b8beb9] px-8 py-8 lg:block">
      <div className="flex items-center gap-8">
        <p className="rounded-full bg-[#dfeeea] px-3 py-1 text-[22px] font-black uppercase tracking-[0.28em] text-[#17201b]">
          Join us today
        </p>
        <div className="h-px flex-1 bg-[#b8beb9]" />
      </div>

      <div className="relative mx-auto mt-16 h-[280px] max-w-[440px]">
        <div className="absolute inset-x-0 bottom-3 h-[220px] rounded-[48%] bg-[#edf7cf]" />
        <div className="absolute bottom-14 left-1/2 h-32 w-64 -translate-x-1/2 rounded-lg border border-[#d79f53] bg-[#f5b65f] shadow-[0_22px_40px_rgba(31,44,37,0.12)]">
          <div className="absolute -top-10 left-8 h-14 w-10 rounded-t-full bg-[#f05a40]" />
          <div className="absolute -top-16 left-20 h-20 w-12 rounded-md bg-[#143f47]" />
          <div className="absolute -top-20 left-36 h-24 w-16 rounded-md bg-[#7fd0e4]" />
          <div className="absolute -top-12 right-10 size-16 rounded-full bg-[#8fd39d]" />
          <div className="absolute bottom-7 left-8 text-xs font-black uppercase text-white/80">
            {isBusiness ? "Campaign" : "Creator"}
          </div>
          <div className="absolute bottom-7 right-8 text-xs font-black uppercase text-white/80">
            Escrow
          </div>
        </div>
        <div className="absolute bottom-10 left-2 h-28 w-8 rounded-full bg-[#dd6b68]" />
        <div className="absolute bottom-9 right-8 h-32 w-10 rounded-full bg-[#6aac60]" />
        <div className="absolute right-24 top-8 size-7 rounded-full bg-[#f84c68]" />
        <div className="absolute right-16 top-20 size-4 rounded-full bg-[#f84c68]" />
      </div>

      <p className="mt-12 max-w-[560px] text-lg leading-loose text-[#68706b]">
        {isBusiness
          ? "Create a trusted AdsBazaar business profile before launching campaigns, funding escrow, and reviewing creator submissions."
          : "Build a creator profile that helps businesses understand your audience, content style, and preferred payout setup."}
      </p>

      <div className="mt-16 grid grid-cols-2 gap-x-10 gap-y-6">
        {highlights.map((item) => (
          <div className="flex items-center gap-3 text-lg font-black text-[#151b17]" key={item}>
            <span
              className="flex size-6 items-center justify-center rounded-full bg-[#6dad66] text-sm text-white shadow-[0_10px_20px_rgba(64,111,59,0.2)]"
              aria-hidden="true"
            >
              ✓
            </span>
            {item}
          </div>
        ))}
      </div>
    </aside>
  );
}

function BusinessRegistrationForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form className="grid gap-5" onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Business name *">
          <input className={fieldClass} required type="text" autoComplete="organization" />
        </FormField>
        <FormField label="Industry">
          <select className={selectClass} defaultValue="">
            <option value="" disabled>
              Select industry
            </option>
            <option>Fashion and beauty</option>
            <option>Food and hospitality</option>
            <option>Fintech</option>
            <option>Education</option>
            <option>Consumer products</option>
          </select>
        </FormField>
      </div>

      <FormField label="Business email *">
        <input className={fieldClass} required type="email" autoComplete="email" />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Country">
          <input className={fieldClass} type="text" autoComplete="country-name" />
        </FormField>
        <FormField label="Phone number">
          <input className={fieldClass} type="tel" autoComplete="tel" placeholder="+234" />
        </FormField>
      </div>

      <FormField label="Website or social page">
        <input className={fieldClass} type="url" autoComplete="url" placeholder="https://" />
      </FormField>

      <FormField label="Business description *">
        <textarea
          className={`${fieldClass} min-h-28 resize-none py-3`}
          required
          placeholder="Tell creators what your business does."
        />
      </FormField>

      <button
        className="mt-3 min-h-14 rounded-xl bg-[#6daa64] px-6 text-base font-black text-white transition hover:bg-[#5c9a55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6daa64]"
        type="submit"
      >
        Register business
      </button>
    </form>
  );
}

function CreatorRegistrationForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form className="grid gap-5" onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Display name *">
          <input className={fieldClass} required type="text" autoComplete="name" />
        </FormField>
        <FormField label="Primary category">
          <select className={selectClass} defaultValue="">
            <option value="" disabled>
              Select category
            </option>
            <option>Lifestyle</option>
            <option>Beauty</option>
            <option>Gaming</option>
            <option>Finance</option>
            <option>Food</option>
          </select>
        </FormField>
      </div>

      <FormField label="Email Address *">
        <input className={fieldClass} required type="email" autoComplete="email" />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Country">
          <input className={fieldClass} type="text" autoComplete="country-name" />
        </FormField>
        <FormField label="Audience size">
          <input className={fieldClass} type="number" min="0" placeholder="10000" />
        </FormField>
      </div>

      <FormField label="Primary social link *">
        <input className={fieldClass} required type="url" autoComplete="url" placeholder="https://" />
      </FormField>

      <FormField label="Creator bio *">
        <textarea
          className={`${fieldClass} min-h-28 resize-none py-3`}
          required
          placeholder="Share your niche, audience, and campaign style."
        />
      </FormField>

      <button
        className="mt-3 min-h-14 rounded-xl bg-[#6daa64] px-6 text-base font-black text-white transition hover:bg-[#5c9a55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6daa64]"
        type="submit"
      >
        Register creator profile
      </button>
    </form>
  );
}

export function OnboardingFlow({
  buttonClassName,
  buttonLabel = "Get started",
  buttonSize = "default",
}: OnboardingFlowProps) {
  const [step, setStep] = useState<Step>("closed");
  const [role, setRole] = useState<Role | null>(null);
  const [wallet, setWallet] = useState<WalletState | null>(null);

  const title = useMemo(() => {
    if (step === "role") {
      return "Welcome to AdsBazaar";
    }

    if (step === "complete") {
      return role === "business" ? "Business registered" : "Creator profile ready";
    }

    return role === "business" ? "Register your business" : "Set up your creator profile";
  }, [role, step]);

  useEffect(() => {
    if (step === "closed") {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStep("closed");
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [step]);

  const openRoleSelection = (connectedWallet: WalletState) => {
    setWallet(connectedWallet);
    setRole(null);
    setStep("role");
  };

  const chooseRole = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep("registration");
  };

  return (
    <>
      <StellarWalletButton
        className={buttonClassName}
        label={buttonLabel}
        onConnected={openRoleSelection}
        size={buttonSize}
      />

      {step !== "closed" ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#06171d]/80 px-3 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-title"
        >
          <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[28px] bg-[#fbfdf9] text-[#151b17] shadow-[0_34px_120px_rgba(0,0,0,0.36)]">
            <button
              className="absolute right-5 top-5 z-10 flex size-10 items-center justify-center rounded-full border border-[#d4dad5] text-xl text-[#465048] transition hover:bg-[#eef4ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6daa64]"
              type="button"
              onClick={() => setStep("closed")}
              aria-label="Close onboarding"
            >
              ×
            </button>

            {step === "role" ? (
              <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-10">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#6daa64]">
                  Wallet connected
                </p>
                <h2 id="onboarding-title" className="text-4xl font-black tracking-tight sm:text-5xl">
                  {title}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-[#68706b]">
                  What are you here to do?
                </p>
                {wallet ? (
                  <p className="mx-auto mt-3 w-fit rounded-full bg-[#eef4ef] px-4 py-2 font-mono text-xs text-[#59635d]">
                    {wallet.network} · {wallet.address.slice(0, 5)}...{wallet.address.slice(-5)}
                  </p>
                ) : null}

                <div className="mt-10 grid gap-4 text-left md:grid-cols-2">
                  {(["business", "creator"] as Role[]).map((option) => (
                    <button
                      className="rounded-2xl border border-[#d4dad5] bg-white p-6 text-left shadow-[0_18px_44px_rgba(21,27,23,0.08)] transition hover:-translate-y-1 hover:border-[#6daa64] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6daa64]"
                      key={option}
                      type="button"
                      onClick={() => chooseRole(option)}
                    >
                      <span className="mb-8 flex size-11 items-center justify-center rounded-full bg-[#e7f3df] text-lg font-black text-[#4d8847]">
                        {option === "business" ? "B" : "C"}
                      </span>
                      <strong className="block text-2xl font-black">
                        {roleOptions[option].title}
                      </strong>
                      <span className="mt-3 block text-base leading-relaxed text-[#68706b]">
                        {roleOptions[option].text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                {role ? <RegistrationAside role={role} /> : null}

                <section className="px-6 py-12 sm:px-10 lg:px-14" aria-labelledby="onboarding-title">
                  <h2 id="onboarding-title" className="text-4xl font-black tracking-tight sm:text-5xl">
                    {title}
                  </h2>
                  <div className="mt-3 h-1 w-18 bg-[#6daa64]" />

                  {step === "complete" ? (
                    <div className="mt-10 rounded-2xl border border-[#d4dad5] bg-white p-6">
                      <p className="text-lg leading-relaxed text-[#68706b]">
                        {role === "business"
                          ? "Your business profile is ready. The next production step will be creating campaigns and funding escrow."
                          : "Your creator profile is ready. The next production step will be browsing campaigns and applying with your profile."}
                      </p>
                      <button
                        className="mt-8 min-h-14 w-full rounded-xl bg-[#6daa64] px-6 text-base font-black text-white transition hover:bg-[#5c9a55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6daa64]"
                        type="button"
                        onClick={() => setStep("closed")}
                      >
                        Continue
                      </button>
                    </div>
                  ) : (
                    <div className="mt-10">
                      {role === "business" ? (
                        <BusinessRegistrationForm onSubmit={() => setStep("complete")} />
                      ) : (
                        <CreatorRegistrationForm onSubmit={() => setStep("complete")} />
                      )}
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
