import HomeHeader from "@/src/home/header";
import MapRow from "@/src/home/map-row";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <HomeHeader />
      <main className="flex flex-1 flex-col gap-10 px-6 py-14 sm:px-10 lg:px-16">
        <MapRow />

        <div className="flex justify-center pt-4">
          <button
            type="button"
            className="rounded-full bg-rust px-8 py-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-background transition-colors duration-200 hover:bg-rust-dim"
          >
            Get Extraction Plan
          </button>
        </div>
      </main>
    </div>
  );
}
