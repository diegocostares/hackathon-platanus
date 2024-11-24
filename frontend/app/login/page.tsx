import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, UserCircle } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
            ¿Quién eres?
          </h1>
          <div className="flex flex-col gap-6 w-full">
            {/* Enlace ajustado al layout de (game) */}
            <Link href="/dragon" className="w-full">
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-4 h-36 text-lg font-bold rounded-lg shadow-lg"
              >
                <UserCircle className="w-8 h-8" />
                Jugador
              </Button>
            </Link>
            <Link href="/parent-dashboard" className="w-full">
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-800 text-white flex items-center justify-center gap-4 h-36 text-lg font-bold rounded-lg shadow-lg"
              >
                <User className="w-8 h-8" />
                Tutor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
