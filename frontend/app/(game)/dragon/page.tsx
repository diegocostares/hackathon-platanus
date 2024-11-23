import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function DragonPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full">
        <CardContent className="flex justify-between items-center py-4 px-6 max-w-4xl mx-auto">
          <Card className="px-4 py-2">
            <div className="flex items-center gap-2">
              <Image src="/money.svg" alt="Monedas" width={60} height={60} />
              <span className="font-bold text-xl">$1000</span>
            </div>
          </Card>

          <Link href="/savings-goal">
            <Card className="p-2 flex items-center gap-2 cursor-pointer">
              <Image src="/metas.svg" alt="Metas" width={60} height={60} />
              <span className="font-bold">Metas</span>
            </Card>
          </Link>
        </CardContent>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Imagen de la mascota con animación */}
          <div className="relative w-64 h-64 animate-bounce">
            <Image
              src="/2.png"
              alt="Mascota del juego"
              layout="fill"
              objectFit="contain"
            />
          </div>
          {/* Barra de experiencia */}
          <div className="w-full max-w-md">
            <Progress value={33} className="h-4" />
            <p className="text-center mt-2 text-sm text-gray-700">
              40.000 EXP / 12.000 EXP
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full shadow-md py-4">
        <div className="flex justify-center gap-8 max-w-4xl mx-auto">
          <Link href="/games">
            <div className="cursor-pointer">
              <Image
                src="/game.svg"
                alt="Juegos"
                width={140}
                height={140}
                className="hover:scale-110 transition-transform"
              />
            </div>
          </Link>

          <Link href="/missions">
            <div className="cursor-pointer">
              <Image
                src="/misiones.svg"
                alt="Misiones"
                width={140}
                height={140}
                className="hover:scale-110 transition-transform"
              />
            </div>
          </Link>

          <Link href="/farm">
            <div className="cursor-pointer">
              <Image
                src="/granja.svg"
                alt="Granja"
                width={140}
                height={140}
                className="hover:scale-110 transition-transform"
              />
            </div>
          </Link>
          <Link href="/expenses">
            <div className="cursor-pointer">
              <Image
                src="/gastos.svg"
                alt="Gastos"
                width={140}
                height={140}
                className="hover:scale-110 transition-transform"
              />
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
