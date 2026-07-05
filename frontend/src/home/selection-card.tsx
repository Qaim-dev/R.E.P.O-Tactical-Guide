"use client";

import Image from "next/image";

export type SelectionCardProps = {
  image: string;
  title: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function SelectionCard({
  image,
  title,
  selected = false,
  onClick,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative isolate flex aspect-video w-full flex-col overflow-hidden rounded-lg border transition-colors duration-200 ${
        selected
          ? "border-rust ring-1 ring-rust"
          : "border-white/10 hover:border-rust/60"
      }`}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        className={`absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent transition-opacity duration-200 ${
          selected ? "opacity-90" : "opacity-80 group-hover:opacity-90"
        }`}
      />
      <span
        className={`relative mt-auto p-3 text-left font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
          selected ? "text-rust" : "text-steel"
        }`}
      >
        {title}
      </span>
    </button>
  );
}