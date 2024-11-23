"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DinosaurGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  const dinoY = useRef<number>(0);
  const dinoVelocity = useRef<number>(0);
  const obstacleX = useRef<number>(0);
  const [gameOverState, setGameOverState] = useState(false);
  const [score, setScore] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const gravity = 0.6; // Incrementé la gravedad para un salto más natural
  const jumpStrength = 18; // Aumenté la fuerza de salto
  const gameSpeed = useRef<number>(6);

  const dinoImage = useRef<HTMLImageElement>(new Image());
  const obstacleImage = useRef<HTMLImageElement>(new Image());

  // Preload Images
  useEffect(() => {
    const loadImages = () => {
      return Promise.all([
        new Promise<void>((resolve) => {
          dinoImage.current.src = "/5.png"; // Dragón
          dinoImage.current.onload = () => resolve();
        }),
        new Promise<void>((resolve) => {
          obstacleImage.current.src = "/moai.webp"; // Moai
          obstacleImage.current.onload = () => resolve();
        }),
      ]);
    };

    loadImages().then(() => {
      setImagesLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const containerWidth = Math.min(window.innerWidth * 0.9, 360); // Ancho máximo ajustado para móviles
      const aspectRatio = 5 / 3; // Relación de aspecto para un canvas más alto
      canvas.width = containerWidth;
      canvas.height = containerWidth * aspectRatio;

      obstacleX.current = canvas.width + Math.random() * 500 + 100;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleJump = () => {
      if (dinoY.current === 0 && !gameOverState) {
        dinoVelocity.current = jumpStrength;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        handleJump();
      }
    };

    const handleTouchStart = () => {
      handleJump();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);

    startGameLoop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      cancelAnimationFrame(animationFrameId.current!);
    };
  }, [imagesLoaded, gameOverState]);

  const startGameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const groundY = canvas.height - canvas.height * 0.1; // Suelo ocupa el 10% del canvas

    const gameLoop = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      gameSpeed.current = canvas.width / 60; // Ajusté la velocidad

      // Dibujar suelo
      context.fillStyle = "#808080";
      context.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Actualizar posición del dragón
      dinoVelocity.current -= gravity;
      dinoY.current += dinoVelocity.current;

      if (dinoY.current < 0) {
        dinoY.current = 0;
        dinoVelocity.current = 0;
      }

      const dinoWidth = canvas.width * 0.2; // 20% del ancho
      const dinoHeight = canvas.height * 0.4; // 40% de la altura
      const dinoX = canvas.width * 0.1;
      const dinoYPos = groundY - dinoHeight - dinoY.current;

      // Dibujar dragón
      context.drawImage(
        dinoImage.current,
        dinoX,
        dinoYPos,
        dinoWidth,
        dinoHeight
      );

      // Actualizar posición del moai
      obstacleX.current -= gameSpeed.current;

      const obstacleWidth = canvas.width * 0.2; // Moai más ancho
      const obstacleHeight = canvas.height * 0.25; // Moai más alto

      // Dibujar moai
      context.drawImage(
        obstacleImage.current,
        obstacleX.current,
        groundY - obstacleHeight,
        obstacleWidth,
        obstacleHeight
      );

      // Detección de colisión
      const dinoRect = {
        x: dinoX,
        y: dinoYPos,
        width: dinoWidth,
        height: dinoHeight,
      };

      const obstacleRect = {
        x: obstacleX.current,
        y: groundY - obstacleHeight,
        width: obstacleWidth,
        height: obstacleHeight,
      };

      if (isColliding(dinoRect, obstacleRect)) {
        setGameOverState(true);
        return;
      }

      // Reiniciar obstáculo cuando sale de la pantalla
      if (obstacleX.current < -obstacleWidth) {
        obstacleX.current = canvas.width + Math.random() * 500 + 100;
        setScore((prev) => prev + 1); // Incrementar puntaje
      }

      // Dibujar puntaje
      context.fillStyle = "#000000";
      context.font = `${canvas.height * 0.08}px Arial`; // Tamaño proporcional para mejor visibilidad
      context.fillText(`Puntaje: ${score}`, 10, 40);

      if (!gameOverState) {
        animationFrameId.current = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();
  };

  const isColliding = (
    rect1: { x: number; y: number; width: number; height: number },
    rect2: { x: number; y: number; width: number; height: number }
  ) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  const resetGame = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      dinoY.current = 0;
      dinoVelocity.current = 0;
      obstacleX.current = canvas.width + Math.random() * 500 + 100;
      setScore(0);
      setGameOverState(false);
      startGameLoop();
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Contenedor responsivo para el canvas */}
      <div className="w-full max-w-xs">
        <div className="relative w-full" style={{ paddingTop: "166.66%" }}>
          {/* Relación de aspecto 5:3 */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full border border-gray-400 rounded-md"
          />
        </div>
      </div>
      <p className="text-center mt-4 text-sm text-gray-600">
        Toca o Presiona Espacio/Flecha Arriba para Saltar
      </p>

      {/* Diálogo de Juego Terminado */}
      {gameOverState && (
        <AlertDialog open={gameOverState} onOpenChange={setGameOverState}>
          <AlertDialogContent className="max-w-sm p-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">
                ¡Juego Terminado!
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-lg">
                Tu puntaje fue: <span className="font-semibold">{score}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 flex flex-col gap-2">
              <Button
                size="lg"
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Jugar de Nuevo
              </Button>
              <Link href="/games">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  Volver a Juegos
                </Button>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Botones */}
      <div className="flex flex-col gap-4 mt-6 w-full max-w-xs">
        <Link href="/games">
          <Button
            size="lg"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Volver a Juegos
          </Button>
        </Link>
        <Link href="/dragon">
          <Button
            size="lg"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Volver a la Página Principal
          </Button>
        </Link>
      </div>
    </div>
  );
}
