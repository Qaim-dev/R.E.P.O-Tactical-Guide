"use client";

import {
  getExtractionPlan,
  type ExtractionPlanResponse,
} from "@/src/services/extraction-plan.service";
import { useExtractionStore } from "@/src/stores/extraction-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import ExtractionPlanModal from "./extraction-plan-modal";

type Status = "idle" | "loading" | "done";

export default function ExtractionPlanButton() {
  const [status, setStatus] = useState<Status>("idle");
  const [plan, setPlan] = useState<ExtractionPlanResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const extractionData = useExtractionStore((state) => state.data);

  useEffect(() => {
    if (status !== "loading") return;
    const interval = setInterval(() => {
      setMessageIndex((index) => (index + 1) % 6);
    }, 1400);
    return () => clearInterval(interval);
  }, [status]);

  async function handleClick() {
    setOpen(true);
    setStatus("loading");
    setMessageIndex(0);
    const result = await getExtractionPlan(extractionData);
    setPlan(result);
    setStatus("done");
  }

  function handleClose() {
    if (status === "loading") return;
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="group flex items-center gap-4 rounded-full bg-rust px-5 py-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-background transition-colors duration-200 hover:bg-rust-dim cursor-pointer"
      >
        <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-rust/60 group-hover:opacity-50">
          <Image
            src="/images/semibot-logo.ico"
            alt="Semibot AI"
            fill
            sizes="32px"
            className="object-cover"
          />
        </span>
        Get Extraction Plan
      </button>

      <ExtractionPlanModal
        open={open}
        status={status}
        plan={plan}
        messageIndex={messageIndex}
        onClose={handleClose}
      />
    </>
  );
}
