import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import BtnSaldo from "@/components/btnSaldo";

export default function DragonPage() {
  return (
    <>
      {/* Header */}
      <header className="w-full">
        <CardContent className="flex justify-between items-center py-4 px-6 max-w-4xl mx-auto">
          <BtnSaldo />

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
    </>
  );
}
