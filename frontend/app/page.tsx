import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Trophy, Gamepad2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function GameInterface() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-100">
      {/* Header */}
      <header className="w-fullshadow-md">
        <CardContent className="flex justify-between items-center py-4 px-6 max-w-4xl mx-auto">
          <Card className="p-2">
            <Leaf className="w-6 h-6 text-green-600" />
          </Card>

          <Card className="px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600 text-2xl">💰</span>
              <span className="font-bold text-xl">1000</span>
            </div>
          </Card>

          <Card className="p-2 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <span className="font-bold">Meta</span>
          </Card>
        </CardContent>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Imagen de la mascota */}
          <div className="relative w-64 h-64">
            <Image
              src="/1.png"
              alt="Mascota del juego"
              layout="fill"
              objectFit="contain"
            />
          </div>
          {/* Barra de experiencia */}
          <div className="w-full max-w-md">
            <Progress value={33} className="h-4" />
            <p className="text-center mt-2 text-sm text-muted-foreground">
              Experiencia
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full shadow-md py-4">
        <div className="flex justify-center gap-4 max-w-4xl mx-auto">
          <Link href="/juegos">
            {" "}
            {/* Wrap the Button with Link */}
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <Gamepad2 className="w-5 h-5" />
              Juegos
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Compras
          </Button>
        </div>
      </footer>
    </div>
  );
}
