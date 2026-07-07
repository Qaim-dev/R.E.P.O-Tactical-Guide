"use client";

import { useState } from "react";
import { useExtractionStore, type Monster } from "@/src/stores/extraction-store";
import { MONSTERS, getMonsterDisplayName } from "./monsters.constants";
import MonsterCard from "./monster-card";

interface MonsterSelection {
  name: string;
  count: number;
}

export default function MonstersRow() {
  const [selectedMonsters, setSelectedMonsters] = useState<
    Map<string, MonsterSelection>
  >(new Map([["Nurse", { name: "Nurse", count: 1 }]]));
  const setMonsters = useExtractionStore((state) => state.setMonsters);

  function handleCardClick(monsterName: string) {
    const newSelection = new Map(selectedMonsters);
    if (newSelection.has(monsterName)) {
      newSelection.delete(monsterName);
    } else {
      newSelection.set(monsterName, { name: monsterName, count: 1 });
    }
    setSelectedMonsters(newSelection);
    setMonsters(Array.from(newSelection.values()));
  }

  function handleCountClick(monsterName: string, count: number) {
    const newSelection = new Map(selectedMonsters);
    newSelection.set(monsterName, { name: monsterName, count });
    setSelectedMonsters(newSelection);
    setMonsters(Array.from(newSelection.values()));
  }

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-rust" />
        <span className="font-mono text-xs tracking-[0.3em] text-rust uppercase">
          Monsters
        </span>
      </div>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {MONSTERS.map((monsterFile) => {
          const displayName = getMonsterDisplayName(monsterFile);
          const isSelected = selectedMonsters.has(displayName);
          const selectedCount = selectedMonsters.get(displayName)?.count;

          return (
            <MonsterCard
              key={monsterFile}
              image={`/images/monsters/${monsterFile}.webp`}
              title={displayName}
              selected={isSelected}
              selectedCount={selectedCount}
              onCardClick={() => handleCardClick(displayName)}
              onCountClick={(count) => handleCountClick(displayName, count)}
            />
          );
        })}
      </div>
    </section>
  );
}
