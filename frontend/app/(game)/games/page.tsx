// app/(game)/games/page.tsx

import Link from "next/link";
import { Card } from "@/components/ui/card";
import DinosaurGame from "@/app/components/DinosaurGame";
import CoinCatcherGame from "@/app/components/CoinCatcherGame";

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-sky-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Juegos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <Link href="/games/coin-catcher">
          <Card className="p-4 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Atrapa Monedas</h2>
            <p>¡Ayuda al dragón a atrapar todas las monedas!</p>
          </Card>
        </Link>
        <Link href="/games/dinosaur">
          <Card className="p-4 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Dinosaurio Runner</h2>
            <p>Corre y salta para evitar obstáculos.</p>
          </Card>
        </Link>
        {/* Puedes agregar más juegos aquí */}
      </div>
    </div>
  );
}
