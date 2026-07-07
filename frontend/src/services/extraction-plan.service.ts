import { ExtractionPlanDto } from "../types/extraction-plan.types";

export interface ExtractionPlanResponse {
  phases: {
    name: string;
    actions: string[];
    reasoning: string;
  }[];
  risk_assessment: string;
  confidence: number;
  sources: string[];
}

export async function getExtractionPlan(
  payload: ExtractionPlanDto,
): Promise<ExtractionPlanResponse> {
  const response = await fetch("http://localhost:8000/plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  return JSON.parse(data.plan);
}
