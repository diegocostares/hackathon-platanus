"use client";

import { useEffect, useRef, useState } from "react";

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
  const playerX = useRef<number>(375);
  const objects = useRef<FallingObject[]>([]);
  const gameOver = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const playerWidth = 50;
    const playerHeight = 50;
    const playerY = canvas.height - playerHeight - 10;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") {
        playerX.current -= 20;
        if (playerX.current < 0) playerX.current = 0;
      } else if (e.code === "ArrowRight") {
        playerX.current += 20;
        if (playerX.current + playerWidth > canvas.width)
          playerX.current = canvas.width - playerWidth;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const spawnObject = () => {
      const type = Math.random() < 0.7 ? "coin" : "bomb";
      const size = 30;
      const x = Math.random() * (canvas.width - size);
      objects.current.push({ x, y: -size, width: size, height: size, type });
    };

    const gameLoop = () => {
      if (gameOver.current) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#0000FF";
      context.fillRect(playerX.current, playerY, playerWidth, playerHeight);

      for (let i = 0; i < objects.current.length; i++) {
        const obj = objects.current[i];
        obj.y += 5;

        if (obj.type === "coin") {
          context.fillStyle = "#FFFF00";
        } else {
          context.fillStyle = "#FF0000";
        }
        context.beginPath();
        context.arc(
          obj.x + obj.width / 2,
          obj.y + obj.height / 2,
          obj.width / 2,
          0,
          Math.PI * 2
        );
        context.fill();

        if (
          obj.x < playerX.current + playerWidth &&
          obj.x + obj.width > playerX.current &&
          obj.y < playerY + playerHeight &&
          obj.y + obj.height > playerY
        ) {
          if (obj.type === "coin") {
            setScore((prevScore) => prevScore + 1);
          } else {
            gameOver.current = true;
            alert(`Game Over! Your score: ${score}`);
            resetGame();
            return;
          }
          objects.current.splice(i, 1);
          i--;
          continue;
        }

        if (obj.y > canvas.height) {
          objects.current.splice(i, 1);
          i--;
        }
      }

      context.fillStyle = "#000000";
      context.font = "20px Arial";
      context.fillText(`Score: ${score}`, 10, 30);

      if (Math.random() < 0.05) {
        spawnObject();
      }

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameId.current!);
    };
  }, [score]);

  const resetGame = () => {
    objects.current = [];
    playerX.current = 375;
    setScore(0);
    gameOver.current = false;
    animationFrameId.current = requestAnimationFrame(gameLoop);
  };

  const gameLoop = () => {
    // This function is intentionally left empty. It will be overridden in useEffect.
  };

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={800} height={600} className="border" />
      <p className="text-center mt-4">Use Left and Right Arrow keys to move</p>
    </div>
  );
}
