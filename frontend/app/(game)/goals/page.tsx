import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GeneralNavbar from "@/components/generalNavbar";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, Clock } from "lucide-react";

export default function SavingGoalsPage() {
  const eggs = [
    { id: 1, image: "/3.png", unlocked: true },
    { id: 2, image: "/egg.svg", unlocked: false },
    { id: 3, image: "/egg.svg", unlocked: false },
    { id: 4, image: "/egg.svg", unlocked: false },
    { id: 5, image: "/egg.svg", unlocked: false },
    { id: 6, image: "/egg.svg", unlocked: false },
    { id: 7, image: "/egg.svg", unlocked: false },
    { id: 8, image: "/egg.svg", unlocked: false },
    { id: 9, image: "/egg.svg", unlocked: false },
    { id: 10, image: "/egg.svg", unlocked: false },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <GeneralNavbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6">
        {/* Experience Progress Bar */}
        <div className="w-full max-w-md mb-8">
          <Progress value={33} className="h-4" />
          <p className="text-center mt-2 text-sm text-gray-700">
            40.000 EXP / 12.000 EXP
          </p>
        </div>

        {/* Savings Goal Content */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Meta de Ahorro
        </h1>

        {/* Timeline Container */}
        <div className="relative w-full max-w-xl mb-8">
          <div className="absolute left-8 h-full border-l-4 border-blue-300" />
          <div className="space-y-8">
            {/* Evento 1 */}
            <div className="flex items-start gap-4">
              <div className="w-16 flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Pequeño Tesoro</h3>
                <p className="text-sm text-gray-700">Ahorra 1200. +5000 EXP</p>
              </div>
            </div>

            {/* Evento 2 */}
            <div className="flex items-start gap-4">
              <div className="w-16 flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Aliento de Fuego</h3>
                <p className="text-sm text-gray-700">
                  Ahorra 1500 de oro. +5000 EXP
                </p>
              </div>
            </div>

            {/* Evento 3 */}
            <div className="flex items-start gap-4">
              <div className="w-16 flex-shrink-0">
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Volando los cielos</h3>
                <p className="text-sm text-gray-700">
                  Ahorra 2000 de oro. +10000 EXP
                </p>
                <Progress value={50} className="mt-2 h-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Egg Collection Content */}
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Colección de Huevos</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {eggs.map((egg) => (
              <Card key={egg.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="relative aspect-square">
                    <Image
                      src={egg.image}
                      alt={`Huevo ${egg.id}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-2 text-center">
                    {egg.unlocked ? "Desbloqueado" : "Bloqueado"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full shadow-md py-4">
        <div className="flex justify-center gap-4 max-w-4xl mx-auto"></div>
      </footer>
    </div>
  );
}
