"use client";

import { Progress } from "@/components/ui/progress";
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
          {/* Imagen de la mascota con animación */}
          <div className="relative w-64 h-64 animate-bounce">
            <Image
              src="/2.png"
              alt="Mascota del juego"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="w-full max-w-md">
            <Progress value={33} className="h-4" />
            <p className="text-center mt-2 text-sm text-gray-700">
              4.000 EXP / 12.000 EXP
            </p>
          </div>

          {/* List of purchased items */}
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
