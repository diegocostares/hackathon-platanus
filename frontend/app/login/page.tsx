import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-radial-sky p-4">
      <h1 className="text-2xl font-bold mb-6">Selecciona tu perfil</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/parent-dashboard">
          <Button size="lg" className="w-full">
            Soy Padre
          </Button>
        </Link>
        <Link href="/dragon">
          <Button size="lg" className="w-full">
            Soy Niño
          </Button>
        </Link>
      </div>
    </div>
  );
}
