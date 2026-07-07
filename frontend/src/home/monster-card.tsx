"use client";

import Image from "next/image";

interface MonsterCardProps {
  image: string;
  title: string;
  selected?: boolean;
  selectedCount?: number;
  onCardClick?: () => void;
  onCountClick?: (count: number) => void;
}

export default function MonsterCard({
  image,
  title,
  selected = false,
  selectedCount,
  onCardClick,
  onCountClick,
}: MonsterCardProps) {
  return (
    <div
      className={`group relative isolate flex aspect-square w-full flex-col overflow-hidden rounded-lg border transition-colors duration-200 cursor-pointer ${
        selected
          ? "border-rust ring-1 ring-rust"
          : "border-white/10 hover:border-rust/60"
      }`}
      onClick={onCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onCardClick?.();
        }
      }}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
      />
      <div
        className={`absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent transition-opacity duration-200 ${
          selected ? "opacity-90" : "opacity-80 group-hover:opacity-90"
        }`}
      />
      <span
        className={`relative mt-auto p-2 text-center font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 ${
          selected ? "text-rust" : "text-steel"
        }`}
      >
        {title}
      </span>

      {/* Count selector overlay */}
      {selected && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 rounded-lg animate-fade-in p-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-rust" />
            <span className="font-mono text-xs tracking-[0.3em] text-rust uppercase">
              How many?
            </span>
          </div>
          <div className="flex gap-2 px-2 w-full">
            {[1, 2, 3].map((count) => (
              <button
                key={count}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCountClick?.(count);
                }}
                aria-pressed={selectedCount === count}
                className={`flex-1 rounded-lg border py-3 px-2 text-center font-mono text-sm font-bold uppercase tracking-widest transition-colors duration-200 ${
                  selectedCount === count
                    ? "border-rust bg-rust/20 text-rust"
                    : "border-white/10 text-steel-dim hover:border-rust/60 hover:text-steel"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
