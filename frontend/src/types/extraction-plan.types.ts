export type Monster = {
  name: string;
  count: number;
};

export type ExtractionPlanDto = {
  map: string;
  players: number;
  extractions_remaining: number;
  loot_percent: number;
  monsters: Monster[];
};
