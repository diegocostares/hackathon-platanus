"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

const initialTasks = [
  {
    id: 1,
    name: "Hacer la cama",
    description: "Ordena y limpia tu cama al levantarte.",
    reward_type: "money",
    reward_amount: 10,
    status: "completed",
  },
  {
    id: 2,
    name: "Lavar los platos",
    description: "Lava los platos después de la comida.",
    reward_type: "money",
    reward_amount: 15,
    status: "pending",
  },
  {
    id: 3,
    name: "Sacar la basura",
    description: "Lleva la basura al contenedor más cercano.",
    reward_type: "money",
    reward_amount: 5,
    status: "pending",
  },
  {
    id: 4,
    name: "Hacer la tarea",
    description: "Completa tus tareas escolares.",
    reward_type: "money",
    reward_amount: 20,
    status: "pending",
  },
  {
    id: 5,
    name: "Alimentar a la mascota",
    description: "Dale de comer a tu mascota.",
    reward_type: "money",
    reward_amount: 10,
    status: "completed",
  },
];

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const totalReward = tasks.reduce(
    (sum, task) =>
      task.status === "completed" ? sum + task.reward_amount : sum,
    0
  );
  const maxReward = tasks.reduce((sum, task) => sum + task.reward_amount, 0);

  const handleToggleStatus = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Tareas del Día</h1>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Recompensas del Día</span>
          <span className="text-lg font-semibold">
            ${totalReward}/${maxReward}
          </span>
        </div>
        <Progress value={(totalReward / maxReward) * 100} className="h-4" />
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-start border p-4 rounded-md shadow-sm ${
              task.status === "completed"
                ? "bg-green-50 line-through"
                : "bg-white"
            }`}
          >
            <div>
              <h3 className="font-bold text-lg text-gray-800">{task.name}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Recompensa: ${task.reward_amount}
              </p>
            </div>
            <button
              onClick={() => handleToggleStatus(task.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-md ${
                task.status === "completed"
                  ? "bg-gray-300 text-gray-700"
                  : "bg-blue-500 text-white"
              }`}
            >
              {task.status === "completed" ? "Deshacer" : "Completar"}
            </button>
          </div>
        ))}
      </div>

      {totalReward === maxReward && (
        <div className="mt-8 text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-600">
            ¡Felicidades! Has completado todas las tareas del día.
          </h2>
        </div>
      )}
    </div>
  );
}
