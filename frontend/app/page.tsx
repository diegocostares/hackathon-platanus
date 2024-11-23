import Image from "next/image";
import ExperienceBar from "./components/ExperienceBar";
import TreasureDisplay from "./components/TreasureDisplay";
import DailyMissions from "./components/DailyMissions";
import Goals from "./components/Goals";
import BuyButton from "./components/BuyButton";
import AdventureButton from "./components/AdventureButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-800 text-white p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cave-background.jpg"
          alt="Cave with gold mountains"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Game content */}
      <div className="relative z-10">
        {/* Top section */}
        <div className="mb-4">
          <TreasureDisplay amount={1000} />
          <ExperienceBar current={75} max={100} />
        </div>

        {/* Side sections */}
        <div className="flex justify-between mb-4">
          <DailyMissions />
          <Goals />
        </div>

        {/* Central character */}
        <div className="flex justify-center items-center my-8">
          <Image
            src="/dragon.png"
            alt="Cute dragon character"
            width={300}
            height={300}
            className="drop-shadow-2xl"
          />
        </div>

        {/* Bottom section */}
        <div className="flex justify-center space-x-4">
          <BuyButton />
          <AdventureButton />
        </div>
      </div>
    </main>
  );
}
