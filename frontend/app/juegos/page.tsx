"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import DinosaurGame from "@/app/components/DinosaurGame";

export default function JuegosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-100">
      {/* Header */}
      <header className="w-full shadow-md">
        <div className="flex justify-between items-center py-4 px-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Juegos</h1>
          <Link href="/">
            <Button variant="outline">Volver</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <DinosaurGame />
      </main>

      {/* Footer */}
      <footer className="w-full shadow-md py-4"></footer>
    </div>
  );
}
