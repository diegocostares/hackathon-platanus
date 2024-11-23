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

interface FallingObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "coin" | "bomb";
}

export default function CoinCatcherGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const playerX = useRef<number>(0);
  const objects = useRef<FallingObject[]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Resize canvas and adjust game elements
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * 0.9;
      canvas.height = window.innerHeight * 0.6;
      playerX.current = (canvas.width - playerWidth()) / 2; // Center player
    };

    const playerWidth = () => canvas.width * 0.1;
    const playerHeight = () => canvas.height * 0.1;
    const playerY = () => canvas.height - playerHeight() - 10;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleKeyDown = (e: KeyboardEvent) => {
      const moveDistance = canvas.width * 0.05;
      if (e.code === "ArrowLeft") {
        playerX.current -= moveDistance;
        if (playerX.current < 0) playerX.current = 0;
      } else if (e.code === "ArrowRight") {
        playerX.current += moveDistance;
        if (playerX.current + playerWidth() > canvas.width)
          playerX.current = canvas.width - playerWidth();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      playerX.current = touchX - playerWidth() / 2;
      if (playerX.current < 0) playerX.current = 0;
      if (playerX.current + playerWidth() > canvas.width)
        playerX.current = canvas.width - playerWidth();
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("touchmove", handleTouchMove);

    const spawnObject = () => {
      const type = Math.random() < 0.7 ? "coin" : "bomb";
      const size = canvas.width * 0.08;
      const x = Math.random() * (canvas.width - size);
      objects.current.push({ x, y: -size, width: size, height: size, type });
    };

    const coinImage = new Image();
    coinImage.src = "/coin.webp";

    const bombImage = new Image();
    bombImage.src = "/bomb.webp";

    const playerImage = new Image();
    playerImage.src = "/2.png";

    const gameLoop = () => {
      if (gameOver) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw player
      context.drawImage(
        playerImage,
        playerX.current,
        playerY(),
        playerWidth(),
        playerHeight()
      );

      for (let i = 0; i < objects.current.length; i++) {
        const obj = objects.current[i];
        obj.y += canvas.height * 0.005;

        // Draw objects
        const image = obj.type === "coin" ? coinImage : bombImage;
        context.drawImage(image, obj.x, obj.y, obj.width, obj.height);

        // Collision detection
        if (
          obj.x < playerX.current + playerWidth() &&
          obj.x + obj.width > playerX.current &&
          obj.y < playerY() + playerHeight() &&
          obj.y + obj.height > playerY()
        ) {
          if (obj.type === "coin") {
            scoreRef.current += 1;
            setScore(scoreRef.current);
          } else {
            setGameOver(true);
          }
          objects.current.splice(i, 1);
          i--;
          continue;
        }

        // Remove objects that are off-screen
        if (obj.y > canvas.height) {
          objects.current.splice(i, 1);
          i--;
        }
      }

      // Draw score
      context.fillStyle = "#000000";
      context.font = `${canvas.width * 0.03}px Arial`;
      context.fillText(`Puntaje: ${scoreRef.current}`, 10, 30);

      // Spawn new objects
      if (Math.random() < 0.02) {
        spawnObject();
      }

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId.current!);
    };
  }, [gameOver]);

  const resetGame = () => {
    objects.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      playerX.current = (canvas.width - canvas.width * 0.1) / 2;
    }
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="border" />
      <p className="text-center mt-4">Desliza o usa las flechas para mover</p>

      {/* Game Over Dialog */}
      {gameOver && (
        <AlertDialog open={gameOver} onOpenChange={setGameOver}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¡Juego Terminado!</AlertDialogTitle>
              <AlertDialogDescription>
                Tu puntaje fue: {scoreRef.current}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={resetGame}>
                Jugar de Nuevo
              </AlertDialogAction>
              <Link href="/games">
                <Button variant="outline" className="ml-2">
                  Volver a Juegos
                </Button>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-4 w-full max-w-sm">
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
