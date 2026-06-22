import { Check } from "lucide-react";

interface WizardStepIndicatorProps {
  steps: { label: string }[];
  currentStep: number; // 1-indexed
  onStepClick?: (step: number) => void;
}

export function WizardStepIndicator({ steps, currentStep, onStepClick }: WizardStepIndicatorProps) {
  return (
    <div className="mb-8 flex items-start justify-between">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={step.label} className="flex flex-1 flex-col items-center">
            <div className="relative flex w-full items-center">
              {/* Left connector */}
              {index > 0 && (
                <div
                  className="flex-1 border-t-2 transition-colors"
                  style={{ borderColor: isCompleted || isActive ? "#c8f232" : "rgba(255,255,255,0.15)" }}
                />
              )}

              {/* Step circle */}
              {isCompleted ? (
                <button
                  type="button"
                  onClick={() => onStepClick?.(stepNumber)}
                  aria-label={`Go to ${step.label}`}
                  className="relative z-10 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition-colors"
                  style={{
                    backgroundColor: "#c8f232",
                    color: "#293500",
                  }}
                >
                  <Check size={16} strokeWidth={3} />
                </button>
              ) : isActive ? (
                <button
                  type="button"
                  disabled
                  aria-current="step"
                  aria-label={`Current step: ${step.label}`}
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors"
                  style={{
                    backgroundColor: "#c8f232",
                    color: "#293500",
                  }}
                >
                  {stepNumber}
                </button>
              ) : (
                <div
                  aria-label={`Future step: ${step.label}`}
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {stepNumber}
                </div>
              )}

              {/* Right connector */}
              {index < steps.length - 1 && (
                <div
                  className="flex-1 border-t-2 transition-colors"
                  style={{ borderColor: stepNumber < currentStep ? "#c8f232" : "rgba(255,255,255,0.15)" }}
                />
              )}
            </div>

            {/* Label */}
            <span
              className="mt-2 hidden text-[10px] font-bold uppercase tracking-wide sm:block"
              style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
