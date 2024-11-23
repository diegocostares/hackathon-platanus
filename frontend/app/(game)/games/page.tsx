import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Footprints, Bird } from "lucide-react";

const games = [
  {
    title: "Atrapa Monedas",
    description: "¡Ayuda al dragón a atrapar todas las monedas!",
    href: "/games/coin-catcher",
    icon: Coins,
    difficulty: "Fácil",
    color: "bg-amber-100",
  },
  {
    title: "Dinosaurio Runner",
    description: "Corre y salta para evitar obstáculos.",
    href: "/games/dinosaur",
    icon: Footprints,
    difficulty: "Medio",
    color: "bg-emerald-100",
  },
  {
    title: "Flappy Dragon",
    description: "¡Atrapa monedas y evita obstáculos!",
    href: "/games/flappy_dragon",
    icon: Bird,
    difficulty: "Difícil",
    color: "bg-rose-100",
  },
];

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Minijuegos Divertidos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {games.map((game) => (
          <Link href={game.href} key={game.title} className="block h-full">
            <Card className="h-full transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
              <CardHeader className={`${game.color}`}>
                <CardTitle className="flex items-center justify-between text-lg md:text-xl">
                  {game.title}
                  <game.icon className="h-5 w-5 md:h-6 md:w-6" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="mb-4 text-sm md:text-base">{game.description}</p>
                <Badge variant="secondary" className="text-xs md:text-sm">
                  {game.difficulty}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
