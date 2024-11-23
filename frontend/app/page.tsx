// app/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-sky-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        ¡Bienvenido a Little Dragons!
      </h1>
      <p className="text-center mb-8">
        Un juego educativo diseñado para enseñar a los niños sobre el ahorro y
        la responsabilidad financiera de una manera divertida e interactiva.
      </p>
      <Link href="/login">
        <Button size="lg">Comenzar</Button>
      </Link>
    </div>
  );
}
