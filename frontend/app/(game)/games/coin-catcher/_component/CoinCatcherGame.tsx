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
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const mouseHeld = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = 400;
      canvas.height = 700;
      playerX.current = (canvas.width - playerWidth()) / 2; // Center player
    };

    const playerWidth = () => 60;
    const playerHeight = () => 60;
    const playerY = () => canvas.height - playerHeight() - 20;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const movePlayer = () => {
      const moveDistance = 5;
      if (keysPressed.current["ArrowLeft"]) {
        playerX.current -= moveDistance;
        if (playerX.current < 0) playerX.current = 0;
      }
      if (keysPressed.current["ArrowRight"]) {
        playerX.current += moveDistance;
        if (playerX.current + playerWidth() > canvas.width)
          playerX.current = canvas.width - playerWidth();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    const handleMouseDown = () => {
      mouseHeld.current = true;
    };

    const handleMouseUp = () => {
      mouseHeld.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseHeld.current) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      playerX.current = mouseX - playerWidth() / 2;

      if (playerX.current < 0) playerX.current = 0;
      if (playerX.current + playerWidth() > canvas.width)
        playerX.current = canvas.width - playerWidth();
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
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);

    const spawnObject = () => {
      const type = Math.random() < 0.7 ? "coin" : "bomb";
      const size = 40;
      const x = Math.random() * (canvas.width - size);
      objects.current.push({ x, y: -size, width: size, height: size, type });
    };

    const coinImage = new Image();
    coinImage.src = "/coin.webp";

    const bombImage = new Image();
    bombImage.src = "/bomb.webp";

    const playerImage = new Image();
    playerImage.src = "/dragon_0_1.png";

    const gameLoop = () => {
      if (gameOver) return;

      movePlayer();

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
        obj.y += 3;

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
      context.font = "20px Arial";
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
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId.current!);
    };
  }, [gameOver]);

  const resetGame = () => {
    objects.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      playerX.current = (canvas.width - 60) / 2;
    }
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="border border-gray-400 rounded-md"
        style={{ width: "400px", height: "700px" }}
      />
      <p className="text-center mt-4 text-sm text-gray-600">
        Desliza, haz clic o mantén presionado para mover
      </p>

      {/* Game Over Dialog */}
      {gameOver && (
        <AlertDialog open={gameOver} onOpenChange={setGameOver}>
          <AlertDialogContent className="max-w-md p-8">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-3xl font-bold">
                ¡Juego Terminado!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-lg mt-4">
                Tu puntaje fue:{" "}
                <span className="font-bold">{scoreRef.current}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex flex-col gap-4">
              <Button
                size="lg"
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-600 w-full"
              >
                Jugar de Nuevo
              </Button>
              <Link href="/games">
                <Button size="lg" variant="outline" className="w-full">
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
