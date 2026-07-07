import { create } from "zustand";
export type { Monster } from "@/src/types/extraction-plan.types";
import { Monster } from "@/src/types/extraction-plan.types";

export interface ExtractionData {
  map: string;
  players: number;
  extractions_remaining: number;
  loot_percent: number;
  monsters: Monster[];
}

interface ExtractionStore {
  data: ExtractionData;
  setMap: (map: string) => void;
  setPlayers: (players: number) => void;
  setExtractionsRemaining: (count: number) => void;
  setLootPercent: (percent: number) => void;
  setMonsters: (monsters: Monster[]) => void;
  setData: (data: Partial<ExtractionData>) => void;
}

export const useExtractionStore = create<ExtractionStore>((set) => ({
  data: {
    map: "",
    players: 2,
    extractions_remaining: 2,
    loot_percent: 99,
    monsters: [{ name: "Nurse", count: 1 }],
  },
  setMap: (map) =>
    set((state) => ({
      data: { ...state.data, map },
    })),
  setPlayers: (players) =>
    set((state) => ({
      data: { ...state.data, players },
    })),
  setExtractionsRemaining: (count) =>
    set((state) => ({
      data: { ...state.data, extractions_remaining: count },
    })),
  setLootPercent: (percent) =>
    set((state) => ({
      data: { ...state.data, loot_percent: percent },
    })),
  setMonsters: (monsters: Monster[]) =>
    set((state) => ({
      data: { ...state.data, monsters },
    })),
  setData: (updates) =>
    set((state) => ({
      data: { ...state.data, ...updates },
    })),
}));
