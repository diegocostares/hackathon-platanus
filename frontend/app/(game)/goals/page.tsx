"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function SavingGoalsPage() {
  const eggs = [
    { id: 1, image: "/3.png", unlocked: true, name: "Dragón Mañoso" },
    { id: 2, image: "/4.png", unlocked: true, name: "Dragón Mañoso Nivel 2" },
    { id: 3, image: "/egg.svg", unlocked: false, name: "Dragón Hada Nivel 1" },
    {
      id: 4,
      image: "/egg.svg",
      unlocked: false,
      name: "Dragón Volcán Nivel 1",
    },
    {
      id: 5,
      image: "/egg.svg",
      unlocked: false,
      name: "Dragón de Hielo Nivel 1",
    },
  ];

  const goals = [
    {
      id: 1,
      name: "Pequeño Tesoro",
      description: "1200 de Oro Ahorrados",
      reward: "Dragón Mañoso",
      unlocked: true,
      image: "/3.png",
    },
    {
      id: 2,
      name: "Aliento de Fuego",
      description: "1500 de Oro Ahorrados",
      reward: "Dragón Mañoso Nivel 2",
      unlocked: true,
      image: "/4.png",
    },
    {
      id: 3,
      name: "Volando los Cielos",
      description: "2000 de Oro Necesarios",
      reward: "Dragón Hada Nivel 1",
      unlocked: false,
      image: "/egg.svg",
    },
  ];

  const GoalsTimeline = () => (
    <div className="relative w-full max-w-xl mb-8">
      <div className="flex flex-col space-y-12">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center group transition-all duration-200 hover:-translate-y-2"
          >
            {/* Icono */}
            <div className="w-16 h-16 flex-shrink-0 relative z-10">
              <Image
                src={goal.image}
                alt={goal.name}
                width={64}
                height={64}
                className={`rounded-full transform transition-transform duration-300 group-hover:scale-110 ${
                  goal.unlocked ? "border-green-500" : "border-gray-400"
                } border-4`}
              />
            </div>

            {/* Línea y Contenido */}
            <div className="relative flex-grow pl-8">
              <div className="absolute top-0 left-7 w-1 bg-gray-400 h-full"></div>
              <div className="relative ml-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {goal.name}
                </h3>
                <p className="text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                  {goal.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Recompensa: {goal.reward}
                </p>
                {!goal.unlocked && (
                  <Progress
                    value={50}
                    className="mt-2 h-2 group-hover:bg-blue-200"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col pb-[120px]">
      {/* Main Content */}
      <section className="flex-1 flex flex-col items-center p-6">
        {/* Savings Progress */}
        <div className="w-full max-w-md mb-8">
          <h2 className="text-xl font-bold text-center text-gray-800">
            Ahorro Actual: 1500 de Oro
          </h2>
          <h3 className="text-sm text-center text-gray-600">
            Próxima meta: 2000 de Oro
          </h3>
          <Progress value={75} className="h-4 mt-4" />
        </div>

        {/* Goals Timeline */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Metas de Ahorro
        </h1>
        <GoalsTimeline />

        {/* Egg Collection */}
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Colección de Huevos
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {eggs.map((egg) => (
              <Card
                key={egg.id}
                className={`overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  egg.unlocked ? "bg-blue-50" : "bg-gray-100"
                }`}
              >
                <CardContent className="p-4">
                  <div className="relative aspect-square">
                    <Image
                      src={egg.image}
                      alt={egg.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-2 text-center text-sm font-medium">
                    {egg.name}
                  </p>
                  <p className="mt-1 text-center text-xs text-gray-500">
                    {egg.unlocked ? "Desbloqueado" : "Bloqueado"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
