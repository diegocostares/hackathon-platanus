"use client";

import { useEffect, useRef } from "react";

export default function DinosaurGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  const dinoY = useRef<number>(0);
  const dinoVelocity = useRef<number>(0);
  const obstacleX = useRef<number>(0);
  const gameOver = useRef<boolean>(false);

  const gravity = 0.5;
  const jumpStrength = 12;
  const gameSpeed = useRef<number>(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * 0.9;
      canvas.height = window.innerHeight * 0.6;
      obstacleX.current = canvas.width + Math.random() * 500 + 100;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const groundY = canvas.height - 50;

    const handleJump = () => {
      if (dinoY.current === 0 && !gameOver.current) {
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

    const gameLoop = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      gameSpeed.current = canvas.width / 160;

      context.fillStyle = "#808080";
      context.fillRect(0, groundY, canvas.width, 50);

      dinoVelocity.current -= gravity;
      dinoY.current += dinoVelocity.current;

      if (dinoY.current < 0) {
        dinoY.current = 0;
        dinoVelocity.current = 0;
      }

      context.fillStyle = "#000000";
      const dinoWidth = canvas.width * 0.06;
      const dinoHeight = canvas.height * 0.15;
      context.fillRect(
        canvas.width * 0.1,
        groundY - dinoHeight - dinoY.current,
        dinoWidth,
        dinoHeight
      );

      obstacleX.current -= gameSpeed.current;

      context.fillStyle = "#FF0000";
      const obstacleWidth = canvas.width * 0.04;
      const obstacleHeight = canvas.height * 0.1;
      context.fillRect(
        obstacleX.current,
        groundY - obstacleHeight,
        obstacleWidth,
        obstacleHeight
      );

      const dinoRect = {
        x: canvas.width * 0.1,
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
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
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
    const canvas = canvasRef.current;
    if (canvas) {
      const groundY = canvas.height - 50;
      dinoY.current = 0;
      dinoVelocity.current = 0;
      obstacleX.current = canvas.width + Math.random() * 500 + 100;
      gameOver.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(gameLoop);
    }

    function gameLoop() {
      // Restart the game loop after resetting
    }
  };

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="border" />
      <p className="text-center mt-4">Tap or Press Space/Up Arrow to Jump</p>
    </div>
  );
}
