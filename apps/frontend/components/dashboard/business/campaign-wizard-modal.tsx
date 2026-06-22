"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, X } from "lucide-react";
import { WizardStepIndicator } from "@/components/campaigns/new/wizard-step-indicator";
import { StepCampaignBrief } from "@/components/campaigns/new/steps/step-campaign-brief";
import { StepTargeting } from "@/components/campaigns/new/steps/step-targeting";
import { StepBudget } from "@/components/campaigns/new/steps/step-budget";
import { StepProofRequirements } from "@/components/campaigns/new/steps/step-proof-requirements";
import { StepReviewFund } from "@/components/campaigns/new/steps/step-review-fund";
import { useWizardModal } from "./wizard-modal-context";

const STEPS = [
  { label: "Brief" },
  { label: "Targeting" },
  { label: "Budget" },
  { label: "Proof" },
  { label: "Review" },
];

const DRAFT_KEY = "adsbazaar_campaign_draft";

interface WizardState {
  currentStep: number;
  brief: {
    title: string;
    description: string;
    imageUrl: string | null;
    platforms: string[];
    startDate: string;
    endDate: string;
    campaignType: "awareness" | "conversion" | "community" | "";
  };
  targeting: {
    categories: string[];
    minAudienceSize: string;
    regions: string[];
    requirements: string;
  };
  budget: {
    asset: string;
    totalBudget: number;
    creatorSlots: number;
  };
  proof: {
    contentFormats: string[];
    deliverables: string;
    submissionDeadline: string;
    verificationType: string;
    linkSocialPost: boolean;
    viewCountThreshold: boolean;
  };
}

const initialState: WizardState = {
  currentStep: 1,
  brief: {
    title: "",
    description: "",
    imageUrl: null,
    platforms: [],
    startDate: "",
    endDate: "",
    campaignType: "",
  },
  targeting: {
    categories: [],
    minAudienceSize: "",
    regions: [],
    requirements: "",
  },
  budget: {
    asset: "USDC",
    totalBudget: 0,
    creatorSlots: 1,
  },
  proof: {
    contentFormats: [],
    deliverables: "",
    submissionDeadline: "",
    verificationType: "",
    linkSocialPost: true,
    viewCountThreshold: false,
  },
};

function validateStep(step: number, state: WizardState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 1) {
    if (!state.brief.title.trim()) errors.title = "Campaign title is required.";
    if (!state.brief.description.trim()) errors.description = "Description is required.";
    if (state.brief.platforms.length === 0) errors.platforms = "Select at least one platform.";
    if (!state.brief.startDate) errors.startDate = "Start date is required.";
    if (!state.brief.endDate) errors.endDate = "End date is required.";
    if (state.brief.startDate && state.brief.endDate && state.brief.endDate <= state.brief.startDate) {
      errors.endDate = "End date must be after start date.";
    }
  }

  if (step === 2) {
    if (state.targeting.categories.length < 3) errors.categories = "Select at least 3 categories.";
    if (!state.targeting.minAudienceSize) errors.minAudienceSize = "Select a minimum audience size.";
    if (state.targeting.regions.length === 0) errors.regions = "Select at least one region.";
  }

  if (step === 3) {
    if (!state.budget.asset) errors.asset = "Select a payment asset.";
    if (state.budget.totalBudget <= 0) errors.totalBudget = "Budget must be greater than 0.";
    if (state.budget.creatorSlots < 1) errors.creatorSlots = "At least 1 creator slot is required.";
  }

  if (step === 4) {
    if (state.proof.contentFormats.length === 0) errors.contentFormats = "Select at least one content format.";
    if (!state.proof.deliverables.trim()) errors.deliverables = "Deliverables description is required.";
    if (!state.proof.submissionDeadline) errors.submissionDeadline = "Submission deadline is required.";
  }

  return errors;
}

export function CampaignWizardModal() {
  const { isOpen, closeWizard } = useWizardModal();
  const [state, setState] = useState<WizardState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Restore draft from sessionStorage when modal opens
  useEffect(() => {
    if (!isOpen) return;

    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as WizardState;
        setState(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [isOpen]);

  // Auto-save draft on every state change
  useEffect(() => {
    if (!hydrated || !isOpen) return;

    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, hydrated, isOpen]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape (with discard confirmation if draft has content)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCancelClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, state]);

  function scrollToTop() {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToStep(step: number) {
    setState((s) => ({ ...s, currentStep: step }));
    setErrors({});
    scrollToTop();
  }

  function nextStep() {
    if (state.currentStep === 5) return;
    const stepErrors = validateStep(state.currentStep, state);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    goToStep(state.currentStep + 1);
  }

  function prevStep() {
    if (state.currentStep > 1) goToStep(state.currentStep - 1);
  }

  function hasDraftContent() {
    return (
      state.brief.title.trim().length > 0 ||
      state.brief.description.trim().length > 0 ||
      state.currentStep > 1
    );
  }

  function handleCancelClick() {
    if (hasDraftContent()) {
      setShowDiscardDialog(true);
    } else {
      handleClose();
    }
  }

  function handleClose() {
    closeWizard();
    setShowDiscardDialog(false);
    setHydrated(false);
  }

  function handleDiscard() {
    sessionStorage.removeItem(DRAFT_KEY);
    setState(initialState);
    handleClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="New Campaign"
    >
      {/* Backdrop — shows the dashboard is still behind */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={handleCancelClick}
        aria-hidden="true"
      />

      {/* Modal panel — slides up from bottom */}
      <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col overflow-hidden bg-[var(--dash-bg)] sm:inset-x-4 sm:top-4 sm:rounded-t-2xl lg:inset-x-auto lg:left-1/2 lg:top-8 lg:w-full lg:max-w-[720px] lg:-translate-x-1/2 lg:rounded-2xl">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--dash-border)] px-5">
          <div className="flex items-center gap-3">
            <span className="text-[17px] font-bold text-[var(--dash-heading)]">
              AdsBazaar
            </span>
            <span className="text-[var(--dash-muted)] opacity-50">|</span>
            <span className="text-[13px] text-[var(--dash-muted)]">
              Campaign Creator
            </span>
          </div>
          <button
            type="button"
            onClick={handleCancelClick}
            aria-label="Close wizard"
            className="flex items-center gap-1.5 text-[13px] text-[var(--dash-muted)] transition hover:text-[var(--dash-body)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)]"
          >
            <X size={14} aria-hidden="true" />
            Cancel Setup
          </button>
        </header>

        {/* Scrollable step content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto pb-24">
          <div className="mx-auto max-w-[600px] px-5 py-8">
            {hydrated ? (
              <>
                <WizardStepIndicator steps={STEPS} currentStep={state.currentStep} onStepClick={goToStep} />

                {state.currentStep === 1 && (
                  <StepCampaignBrief
                    data={state.brief}
                    onChange={(brief) => setState((s) => ({ ...s, brief }))}
                    errors={errors}
                  />
                )}
                {state.currentStep === 2 && (
                  <StepTargeting
                    data={state.targeting}
                    onChange={(targeting) => setState((s) => ({ ...s, targeting }))}
                    errors={errors}
                  />
                )}
                {state.currentStep === 3 && (
                  <StepBudget
                    data={state.budget}
                    onChange={(budget) => setState((s) => ({ ...s, budget }))}
                    errors={errors}
                  />
                )}
                {state.currentStep === 4 && (
                  <StepProofRequirements
                    data={state.proof}
                    onChange={(proof) => setState((s) => ({ ...s, proof }))}
                    errors={errors}
                  />
                )}
                {state.currentStep === 5 && (
                  <StepReviewFund data={state} onGoToStep={goToStep} />
                )}
              </>
            ) : null}
          </div>
        </main>

        {/* Fixed bottom nav */}
        <nav className="flex h-16 shrink-0 items-center justify-between border-t border-[var(--dash-border)] bg-[var(--dash-surface)] px-5">
          <button
            type="button"
            onClick={prevStep}
            disabled={state.currentStep === 1}
            className="flex min-h-10 items-center rounded-full border border-[var(--dash-border)] px-5 text-sm font-medium text-[var(--dash-heading)] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)]"
          >
            ← Back
          </button>

          <span className="hidden text-[11px] text-[var(--dash-muted)] opacity-60 sm:block">
            Saved as draft automatically
          </span>

          <button
            type="button"
            onClick={nextStep}
            className="flex min-h-10 items-center gap-2 rounded-full bg-[var(--dash-accent-strong)] px-5 text-sm font-bold text-[var(--dash-on-accent-strong)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)]"
          >
            {state.currentStep === 5 ? (
              <>
                <Lock size={14} aria-hidden="true" />
                Fund Escrow &amp; Launch
              </>
            ) : (
              <>Next Step →</>
            )}
          </button>
        </nav>
      </div>

      {/* Discard confirmation */}
      {showDiscardDialog && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
            <h2 className="text-lg font-bold text-[var(--dash-heading)]">
              Discard this campaign?
            </h2>
            <p className="mt-2 text-sm text-[var(--dash-muted)]">
              Your draft will be cleared and cannot be recovered.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowDiscardDialog(false)}
                className="flex-1 rounded-full border border-[var(--dash-border)] py-2.5 text-sm font-medium text-[var(--dash-heading)] transition hover:bg-white/10"
              >
                Keep editing
              </button>
              <button
                type="button"
                onClick={handleDiscard}
                className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
