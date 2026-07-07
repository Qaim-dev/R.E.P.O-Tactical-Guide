import HomeHeader from "@/src/home/header";
import MapRow from "@/src/home/map-row";
import MonstersRow from "@/src/home/monsters-row";
import ExtractionPlanButton from "@/src/home/extraction-plan-button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <HomeHeader />
      <main className="flex flex-1 flex-col gap-10 px-6 py-14 sm:px-10 lg:px-16">
        <MapRow />
        <MonstersRow />

        <div className="flex justify-center pt-4">
          <ExtractionPlanButton />
        </div>
      </main>
    </div>
  );
}
