"use client";

import { useEffect, useRef } from "react";

export default function DinosaurGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  // Game state variables
  const dinoY = useRef<number>(0);
  const dinoVelocity = useRef<number>(0);
  const obstacleX = useRef<number>(800);
  const gameOver = useRef<boolean>(false);

  const gravity = 0.5;
  const jumpStrength = 12;
  const gameSpeed = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) return;

    const groundY = canvas.height - 50;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.code === "Space" || e.code === "ArrowUp") &&
        dinoY.current === 0 &&
        !gameOver.current
      ) {
        dinoVelocity.current = jumpStrength;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const gameLoop = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#808080";
      context.fillRect(0, groundY, canvas.width, 50);

      dinoVelocity.current -= gravity;
      dinoY.current += dinoVelocity.current;

      if (dinoY.current < 0) {
        dinoY.current = 0;
        dinoVelocity.current = 0;
      }

      context.fillStyle = "#000000";
      const dinoWidth = 50;
      const dinoHeight = 50;
      context.fillRect(
        50,
        groundY - dinoHeight - dinoY.current,
        dinoWidth,
        dinoHeight
      );

      obstacleX.current -= gameSpeed;

      context.fillStyle = "#FF0000";
      const obstacleWidth = 20;
      const obstacleHeight = 30;
      context.fillRect(
        obstacleX.current,
        groundY - obstacleHeight,
        obstacleWidth,
        obstacleHeight
      );

      const dinoRect = {
        x: 50,
        y: groundY - dinoHeight - dinoY.current,
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
        gameOver.current = true;
        alert("Game Over!");
        resetGame();
        return;
      }

      if (obstacleX.current < -obstacleWidth) {
        obstacleX.current = canvas.width + Math.random() * 500 + 100;
      }

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameId.current!);
    };
  }, []);

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
    dinoY.current = 0;
    dinoVelocity.current = 0;
    obstacleX.current = 800;
    gameOver.current = false;
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      animationFrameId.current = requestAnimationFrame(() => {
        setTimeout(() => {
          if (!gameOver.current) {
            animationFrameId.current = requestAnimationFrame(() => {});
          }
        }, 100);
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={800} height={400} className="border" />
      <p className="text-center mt-4">Press Space or Up Arrow to Jump</p>
    </div>
  );
}
