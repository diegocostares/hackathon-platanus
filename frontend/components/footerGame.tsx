"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function FooterGame() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 w-full shadow-md py-4 bg-gray-50">
      <div className="flex justify-center gap-12 max-w-4xl mx-auto">
        {/* Enlace Mi Dragon */}
        <Link href="/dragon">
          <div
            className={cn(
              "cursor-pointer flex flex-col items-center transition-all",
              pathname === "/dragon" && "brightness-150 scale-110"
            )}
          >
            <Image src="/home.svg" alt="Mi Dragon" width={140} height={140} />
            <span
              className={cn(
                "text-sm font-medium",
                pathname === "/dragon" && "text-blue-600 font-bold"
              )}
            >
              Mi Dragon
            </span>
          </div>
        </Link>

        {/* Enlace Juegos */}
        <Link href="/games">
          <div
            className={cn(
              "cursor-pointer flex flex-col items-center transition-all",
              pathname === "/games" && "brightness-150 scale-110"
            )}
          >
            <Image
              src="/game.svg"
              alt="Juegos"
              width={140}
              height={140}
              className="mb-2"
            />
            <span
              className={cn(
                "text-sm font-medium",
                pathname === "/games" && "text-blue-600 font-bold"
              )}
            >
              Juegos
            </span>
          </div>
        </Link>

        {/* Enlace Misiones */}
        <Link href="/missions">
          <div
            className={cn(
              "cursor-pointer flex flex-col items-center transition-all",
              pathname === "/missions" && "brightness-150 scale-110"
            )}
          >
            <Image
              src="/misiones.svg"
              alt="Misiones"
              width={140}
              height={140}
              className="mb-2"
            />
            <span
              className={cn(
                "text-sm font-medium",
                pathname === "/missions" && "text-blue-600 font-bold"
              )}
            >
              Misiones
            </span>
          </div>
        </Link>

        {/* Enlace Granja */}
        <Link href="/goals">
          <div
            className={cn(
              "cursor-pointer flex flex-col items-center transition-all",
              pathname === "/farm" && "brightness-150 scale-110"
            )}
          >
            <Image
              src="/granja.svg"
              alt="Granja"
              width={140}
              height={140}
              className="mb-2"
            />
            <span
              className={cn(
                "text-sm font-medium",
                pathname === "/farm" && "text-blue-600 font-bold"
              )}
            >
              Granja
            </span>
          </div>
        </Link>
      </div>
    </footer>
  );
}
