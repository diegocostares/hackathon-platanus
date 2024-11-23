"use client";

import { useState } from "react";
import { MissionCard } from "@/components/mission-card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

const initialMissions = [
  { id: 1, title: "Hacer la cama", points: 10, completed: false },
  { id: 2, title: "Lavar los platos", points: 15, completed: false },
  { id: 3, title: "Sacar la basura", points: 5, completed: false },
  { id: 4, title: "Hacer la tarea", points: 20, completed: false },
  { id: 5, title: "Alimentar a la mascota", points: 10, completed: false },
];

export default function Missions() {
  const [missions, setMissions] = useState(initialMissions);
  const totalPoints = missions.reduce(
    (sum, mission) => sum + (mission.completed ? mission.points : 0),
    0
  );
  const maxPoints = missions.reduce((sum, mission) => sum + mission.points, 0);

  const handleComplete = (id: number) => {
    setMissions(
      missions.map((mission) =>
        mission.id === id
          ? { ...mission, completed: !mission.completed }
          : mission
      )
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Misiones del Día</h1>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Progreso del Día</span>
          <span className="text-lg font-semibold">
            {totalPoints}/{maxPoints}
          </span>
        </div>
        <Progress value={(totalPoints / maxPoints) * 100} className="h-4" />
      </div>

      <div className="space-y-4">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            title={mission.title}
            points={mission.points}
            completed={mission.completed}
            onComplete={() => handleComplete(mission.id)}
          />
        ))}
      </div>

      {totalPoints === maxPoints && (
        <div className="mt-8 text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-600">
            ¡Felicidades! Has completado todas las misiones del día.
          </h2>
        </div>
      )}
    </div>
  );
}
