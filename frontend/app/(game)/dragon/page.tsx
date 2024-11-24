"use client";

import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import BtnSaldo from "@/components/btnSaldo";
import GoalProgressBar from "@/components/goal-progress-bar";
import LastExpenses from "@/components/last-expenses";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export default function DragonPage() {
  const [isTalking, setIsTalking] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [response, setResponse] = useState("");
  const responseRef = useRef<HTMLDivElement>(null);

  const handleTalkClick = async () => {
    setIsTalking(true);
    try {
      const res = await fetch("/api/dragon-talk");
      const data = await res.json();
      setResponse(data.message || "¡Hola! ¿Cómo puedo ayudarte?");
    } catch (error) {
      console.error("Error fetching dragon response:", error);
      setResponse("Lo siento, no puedo hablar ahora.");
    }
    setTimeout(() => setIsTalking(false), 4000);
  };

  const handleMascotPressStart = () => {
    setIsShaking(true);
  };

  const handleMascotPressEnd = () => {
    setIsShaking(false);
  };

  useEffect(() => {
    const jumpInterval = setInterval(() => {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 1500); // Saltito suave de 1.5 segundos
    }, 8000); // Salta cada 8 segundos
    return () => clearInterval(jumpInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-36">
      {/* Header */}
      <header className="w-full px-4 pt-4">
        <div className="max-w-4xl mx-auto mb-6">
          <CardContent className="flex justify-center items-center py-4 px-6">
            <BtnSaldo />
          </CardContent>
        </div>
        <GoalProgressBar />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 gap-8">
        {/* Mascota */}
        <div
          className={`relative w-52 h-52 mt-6 sm:w-64 sm:h-64 ${
            isShaking ? "animate-shake" : isJumping ? "animate-bounce-slow" : ""
          } transition-transform duration-150`}
          onMouseDown={handleMascotPressStart}
          onMouseUp={handleMascotPressEnd}
          onTouchStart={handleMascotPressStart}
          onTouchEnd={handleMascotPressEnd}
        >
          <Image
            src="/dragon_0_1.png"
            alt="Mascota del juego"
            layout="fill"
            objectFit="contain"
          />
          {isTalking && (
            <div
              ref={responseRef}
              className="absolute top-[-20px] right-[-20px] bg-white shadow-md p-3 rounded-md text-sm text-gray-700 max-w-xs"
            >
              <p>{response}</p>
            </div>
          )}
        </div>

        {/* Botón de audio */}
        <button
          onClick={handleTalkClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2"
        >
          <Mic className="w-5 h-5" />
          Hablar con la mascota
        </button>
      </main>

      {/* Últimos gastos */}
      <LastExpenses />
    </div>
  );
}
