import Image from "next/image";

export default function HomeHeader() {
  return (
    <header className="relative isolate overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/landscape-hero.png"
          alt=""
          fill
          priority
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/20" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/40" />
      </div>

      <div className="relative flex flex-col gap-8 px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-rust" />
          <span className="font-mono text-xs tracking-[0.3em] text-rust uppercase">
            Extraction Ops
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <Image
            src="/images/repo-logo.png"
            alt="R.E.P.O."
            width={520}
            height={125}
            priority
            className="h-auto w-[min(90vw,420px)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          />
          <h1 className="font-mono text-2xl font-bold uppercase tracking-[0.2em] text-steel sm:text-3xl">
            Tactical Advisor
          </h1>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-steel-dim">
          AI-assisted extraction planning. Feed in your run — map, crew, haul,
          and what&apos;s hunting you — and get back a risk-scored plan built
          from the community&apos;s own field notes.
        </p>

        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 py-1.5 pl-1.5 pr-4 w-fit backdrop-blur-sm">
          <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-rust/60">
            <Image
              src="/images/semibot-logo.ico"
              alt="Semibot AI"
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
          <span className="font-mono text-[11px] tracking-wider text-steel-dim uppercase">
            Powered by Semibot
          </span>
        </div>
      </div>
    </header>
  );
}
