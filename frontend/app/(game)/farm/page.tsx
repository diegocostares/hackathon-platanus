import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EggCollection() {
  const eggs = [
    { id: 1, image: "/3.png", unlocked: true },
    { id: 2, image: "/egg.svg", unlocked: false },
    { id: 3, image: "/egg.svg", unlocked: false },
    { id: 4, image: "/egg.svg", unlocked: false },
    { id: 5, image: "/egg.svg", unlocked: false },
    { id: 6, image: "/egg.svg", unlocked: false },
    { id: 7, image: "/egg.svg", unlocked: false },
    { id: 8, image: "/egg.svg", unlocked: false },
    { id: 9, image: "/egg.svg", unlocked: false },
    { id: 10, image: "/egg.svg", unlocked: false },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Colección de Huevos</h1>
        <Link href="/dragon">
          <Button variant="outline">Volver</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {eggs.map((egg) => (
          <Card key={egg.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="relative aspect-square">
                <Image
                  src={egg.image}
                  alt={`Huevo ${egg.id}`}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-center">
                {egg.unlocked ? "Desbloqueado" : "Bloqueado"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
