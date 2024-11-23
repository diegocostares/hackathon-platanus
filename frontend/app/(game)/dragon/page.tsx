"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import BtnSaldo from "@/components/btnSaldo";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DragonPage() {
  const [items, setItems] = useState([
    { name: "Chocolate", price: 1500 },
    { name: "Pasaje Micro", price: 500 },
  ]);

  return (
    <>
      {/* Header */}
      <header className="w-full">
        <div className="max-w-4xl mx-auto">
          <CardContent className="flex justify-center items-center py-4 px-6">
            <BtnSaldo />
          </CardContent>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4">
        <Link href="/expenses">
          <Button
            className="bg-blue-500 hover:bg-blue-600 w-full mb-12"
            size="lg"
          >
            Agregar gastos
          </Button>
        </Link>
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Mascot Image with Animation */}
          <div className="relative w-64 h-64 animate-bounce">
            <Image
              src="/2.png"
              alt="Mascota del juego"
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* Updated Progress Bar with Icons */}
          <div className="w-full max-w-md relative">
            {/* Progress Bar Container */}
            <div className="relative h-4 bg-gray-200 rounded">
              {/* Filled Portion of the Progress Bar */}
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded"
                style={{ width: "33%" }} // Adjust this value to match your progress
              ></div>

              {/* Milestone Icons */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {/* Milestone at 25% */}
                <div
                  className="absolute"
                  style={{
                    left: "25%",
                    transform: "translateX(-50%)",
                    top: "-12px",
                  }}
                >
                  <Image
                    src="/flag.svg"
                    alt="Milestone 1"
                    width={24}
                    height={24}
                  />
                </div>
                {/* Milestone at 50% */}
                <div
                  className="absolute"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: "-12px",
                  }}
                >
                  <Image
                    src="/flag.svg"
                    alt="Milestone 2"
                    width={24}
                    height={24}
                  />
                </div>
                {/* Milestone at 75% */}
                <div
                  className="absolute"
                  style={{
                    left: "75%",
                    transform: "translateX(-50%)",
                    top: "-12px",
                  }}
                >
                  <Image
                    src="/flag.svg"
                    alt="Milestone 3"
                    width={24}
                    height={24}
                  />
                </div>
                {/* Milestone at 100% */}
                <div
                  className="absolute"
                  style={{
                    left: "100%",
                    transform: "translateX(-50%)",
                    top: "-12px",
                  }}
                >
                  <Image
                    src="/metas.svg"
                    alt="Milestone 4"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>

            {/* Milestone Labels */}
            <div className="flex justify-between text-xs text-gray-700 mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>

            {/* Experience Text */}
            <p className="text-center mt-2 text-sm text-gray-700">
              4,000 EXP / 12,000 EXP
            </p>
          </div>

          {/* List of Purchased Items */}
          <ul className="list-none mb-40">
            {items.map((item, index) => (
              <li key={index} className="flex flex-wrap">
                <span>{item.name}</span>
                <span
                  className="flex-grow border-b border-dotted mx-2"
                  style={{ marginTop: "0.75em" }}
                ></span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
