"use client";

import { useState } from "react";
import SelectionCard from "@/src/home/selection-card";
import { useExtractionStore } from "@/src/stores/extraction-store";

const MAPS = [
  { image: "/images/maps/headman-manor.webp", title: "Headman Manor" },
  { image: "/images/maps/mcjannek-station.webp", title: "Mcjannek Station" },
  {
    image: "/images/maps/museum-of-human-art.webp",
    title: "Museum of Human Art",
  },
  {
    image: "/images/maps/swiftbroom-academy.webp",
    title: "Swiftbroom Academy",
  },
];

export default function MapRow() {
  const [selected, setSelected] = useState<string | null>(null);
  const setMap = useExtractionStore((state) => state.setMap);

  function handleSelectMap(mapTitle: string) {
    setSelected(mapTitle);
    setMap(mapTitle);
  }

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-rust" />
        <span className="font-mono text-xs tracking-[0.3em] text-rust uppercase">
          Maps
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {MAPS.map((map) => (
          <SelectionCard
            key={map.title}
            image={map.image}
            title={map.title}
            selected={selected === map.title}
            onClick={() => handleSelectMap(map.title)}
          />
        ))}
      </div>
    </section>
  );
}