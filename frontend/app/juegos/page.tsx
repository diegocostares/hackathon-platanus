"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DinosaurGame from "@/app/components/DinosaurGame";
import CoinCatcherGame from "@/app/components/CoinCatcherGame";

export default function JuegosPage() {
  const [selectedGame, setSelectedGame] = useState<
    "dinosaur" | "coinCatcher" | null
  >(null);

  return (
    <div className="min-h-screen flex flex-col bg-sky-100">
      {/* Header */}
      <header className="w-full shadow-md">
        <div className="flex justify-between items-center py-4 px-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Juegos</h1>
          <Link href="/">
            <Button variant="outline">Volver</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        {selectedGame === null && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold">Selecciona un juego</h2>
            <Button onClick={() => setSelectedGame("dinosaur")}>
              Dinosaur Game
            </Button>
            <Button onClick={() => setSelectedGame("coinCatcher")}>
              Coin Catcher
            </Button>
          </div>
        )}
        {selectedGame === "dinosaur" && (
          <div>
            <Button
              onClick={() => setSelectedGame(null)}
              variant="outline"
              className="mb-4"
            >
              Volver a la selección de juegos
            </Button>
            <DinosaurGame />
          </div>
        )}
        {selectedGame === "coinCatcher" && (
          <div>
            <Button
              onClick={() => setSelectedGame(null)}
              variant="outline"
              className="mb-4"
            >
              Volver a la selección de juegos
            </Button>
            <CoinCatcherGame />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full shadow-md py-4">
        {/* Optional footer content */}
      </footer>
    </div>
  );
}
