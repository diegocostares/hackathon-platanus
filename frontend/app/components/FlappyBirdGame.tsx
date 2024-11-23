"use client";

import { useEffect, useRef, useState } from "react";

export default function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  // Use both useState and useRef for score
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0); // Holds the latest score value

  const gameOver = useRef<boolean>(false);

  // Move game variables outside of useEffect and manage with useRef
  const bird = useRef({
    x: 50,
    y: 300, // Assuming canvas height is 600
    width: 30,
    height: 30,
    velocity: 0,
    gravity: 0.5,
    lift: -5,
  });
  const pipes = useRef<
    { x: number; y: number; width: number; height: number; passed?: boolean }[]
  >([]);
  const frameCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        bird.current.velocity = bird.current.lift;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const spawnPipe = () => {
      const gap = 200;
      const pipeWidth = 60;
      const pipeX = canvas.width;
      const pipeY = Math.random() * (canvas.height - gap - 200) + 100;

      // Top pipe
      pipes.current.push({
        x: pipeX,
        y: 0,
        width: pipeWidth,
        height: pipeY,
        passed: false,
      });
      // Bottom pipe
      pipes.current.push({
        x: pipeX,
        y: pipeY + gap,
        width: pipeWidth,
        height: canvas.height - (pipeY + gap),
        passed: false,
      });
    };

    const resetGame = () => {
      gameOver.current = false;
      setScore(0);
      scoreRef.current = 0;

      // Reset bird position and velocity
      bird.current.x = 50;
      bird.current.y = canvas.height / 2;
      bird.current.velocity = 0;

      // Clear pipes
      pipes.current = [];
      // Reset frame count
      frameCount.current = 0;

      // Restart the game loop
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    const gameLoop = () => {
      if (gameOver.current) return;

      frameCount.current++;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Update bird
      bird.current.velocity += bird.current.gravity;
      bird.current.y += bird.current.velocity;

      // Draw bird
      context.fillStyle = "#FFA500";
      context.fillRect(
        bird.current.x,
        bird.current.y,
        bird.current.width,
        bird.current.height
      );

      // Spawn pipes every 100 frames
      if (frameCount.current % 100 === 0) {
        spawnPipe();
      }

      // Update and draw pipes
      for (let i = 0; i < pipes.current.length; i++) {
        const pipe = pipes.current[i];
        pipe.x -= 2;

        // Draw pipe
        context.fillStyle = "#228B22";
        context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);

        // Collision detection
        if (
          bird.current.x < pipe.x + pipe.width &&
          bird.current.x + bird.current.width > pipe.x &&
          bird.current.y < pipe.y + pipe.height &&
          bird.current.y + bird.current.height > pipe.y
        ) {
          gameOver.current = true;
          alert(`Game Over! Your score: ${Math.floor(scoreRef.current)}`);
          resetGame();
          return;
        }

        // Increase score when bird passes pipes
        if (!pipe.passed && pipe.x + pipe.width < bird.current.x) {
          pipe.passed = true;
          scoreRef.current += 0.5;
          setScore(scoreRef.current);
        }

        // Remove off-screen pipes
        if (pipe.x + pipe.width < 0) {
          pipes.current.splice(i, 1);
          i--;
        }
      }

      // Check if bird hits the ground or goes off the top
      if (
        bird.current.y + bird.current.height > canvas.height ||
        bird.current.y < 0
      ) {
        gameOver.current = true;
        alert(`Game Over! Your score: ${Math.floor(scoreRef.current)}`);
        resetGame();
        return;
      }

      // Draw score
      context.fillStyle = "#000000";
      context.font = "20px Arial";
      context.fillText(`Score: ${Math.floor(scoreRef.current)}`, 10, 30);

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameId.current!);
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={800} height={600} className="border" />
      <p className="text-center mt-4">Press Space to flap</p>
    </div>
  );
}
