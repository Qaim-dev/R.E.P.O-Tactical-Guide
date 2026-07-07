"use client";

import type { ExtractionPlanResponse } from "@/src/services/extraction-plan.service";
import Image from "next/image";

type Status = "idle" | "loading" | "done";

const LOADING_MESSAGES = [
  "Thinking…",
  "Grinding gears…",
  "Tinkering…",
  "Rerouting circuits…",
  "Consulting field notes…",
  "Calibrating sensors…",
];

interface ExtractionPlanModalProps {
  open: boolean;
  status: Status;
  plan: ExtractionPlanResponse | null;
  messageIndex: number;
  onClose: () => void;
}

export default function ExtractionPlanModal({
  open,
  status,
  plan,
  messageIndex,
  onClose,
}: ExtractionPlanModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-lg flex-col gap-6 rounded-2xl border border-rust/30 bg-background p-8 shadow-[0_0_60px_rgba(0,0,0,0.6)] animate-fade-in-up"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={status === "loading"}
          aria-label="Close"
          className="absolute right-4 top-4 font-mono text-xs uppercase tracking-widest text-steel-dim transition-colors hover:text-steel disabled:cursor-not-allowed disabled:opacity-30"
        >
          Close
        </button>

        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-rust" />
          <span className="font-mono text-xs tracking-[0.3em] text-rust uppercase">
            Extraction Plan
          </span>
        </div>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-5 py-8">
            <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-rust/60 animate-bounce">
              <Image
                src="/images/semibot-logo.ico"
                alt="Semibot AI"
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-steel">
              {LOADING_MESSAGES[messageIndex]}
            </span>
          </div>
        )}

        {status === "done" && plan && (
          <div className="flex flex-col gap-6 animate-fade-in-up overflow-y-auto max-h-[60vh]">
            {/* Phases */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs tracking-[0.3em] text-rust uppercase">
                Phases
              </h3>
              <div className="flex flex-col gap-4">
                {plan.phases.map((phase, phaseIndex) => (
                  <div
                    key={phase.name}
                    className="flex flex-col gap-2 rounded-lg bg-steel/10 p-4 border-l-2 border-rust"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs text-rust">
                        {String(phaseIndex + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-mono text-sm font-bold text-steel">
                        {phase.name}
                      </h4>
                    </div>
                    <div className="text-xs text-steel-dim leading-relaxed">
                      {phase.reasoning}
                    </div>
                    <ol className="mt-2 flex flex-col gap-1 ml-4">
                      {phase.actions.map((action) => (
                        <li
                          key={action}
                          className="text-xs text-steel-dim list-disc"
                        >
                          {action}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="flex flex-col gap-2">
              <h3 className="font-mono text-xs tracking-[0.3em] text-rust uppercase">
                Risk Assessment
              </h3>
              <p className="text-xs leading-relaxed text-steel-dim">
                {plan.risk_assessment}
              </p>
            </div>

            {/* Confidence & Sources */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.3em] text-rust uppercase">
                  Confidence
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 bg-steel/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rust transition-all"
                      style={{
                        width: `${Math.round(plan.confidence)}%`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-xs text-steel">
                    {Math.round(plan.confidence)}%
                  </span>
                </div>
              </div>

              {plan.sources.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h3 className="font-mono text-xs tracking-[0.3em] text-rust uppercase">
                    Sources
                  </h3>
                  <ul className="flex flex-col gap-1">
                    {plan.sources.map((source) => (
                      <li
                        key={source}
                        className="text-xs text-steel-dim list-disc ml-4"
                      >
                        {source}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
