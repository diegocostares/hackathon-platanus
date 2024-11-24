"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { getMissions } from "@/api/getMissions";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchMissions() {
      try {
        const missions = await getMissions();
        setTasks(missions);
      } catch (error) {
        console.error("Failed to fetch missions:", error);
      }
    }

    fetchMissions();
  }, []);

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
            className={`flex justify-between items-start border p-4 rounded-md shadow-sm transition-shadow ${
              task.status === "completed"
                ? "bg-green-50 line-through"
                : "bg-white"
            } hover:shadow-md`}
          >
            <div className="transition-all duration-200 group">
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600">
                {task.name}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-800">
                {task.description}
              </p>
              <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-700">
                Recompensa: ${task.reward_amount}
              </p>
            </div>
            <button
              onClick={() => handleToggleStatus(task.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                task.status === "completed"
                  ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {task.status === "completed" ? "Deshacer" : "Completar"}
            </button>
          </div>
        ))}
      </div>

      {totalReward === maxReward && (
        <div className="mt-8 text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-green-600">
            ¡Felicidades! Has completado todas las tareas del día.
          </h2>
        </div>
      )}
    </div>
  );
}
