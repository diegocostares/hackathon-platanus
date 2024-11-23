import Link from "next/link";
import Image from "next/image";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
      <footer className="fixed bottom-0 w-full shadow-md py-4">
        <div className="flex justify-center gap-12 max-w-4xl mx-auto">
          <Link href="/dragon">
            <div className="cursor-pointer flex flex-col items-center">
              <Image
                src="/home.svg"
                alt="Mi Dragon"
                width={140}
                height={140}
                className="hover:scale-110 transition-transform mb-2"
              />
              <span className="text-sm font-medium">Mi Dragon</span>
            </div>
          </Link>

          <Link href="/games">
            <div className="cursor-pointer flex flex-col items-center">
              <Image
                src="/game.svg"
                alt="Juegos"
                width={140}
                height={140}
                className="hover:scale-110 transition-transform mb-2"
              />
              <span className="text-sm font-medium">Juegos</span>
            </div>
          </Link>

          <Link href="/missions">
            <div className="cursor-pointer flex flex-col items-center">
              <Image
                src="/misiones.svg"
                alt="Misiones"
                width={140}
                height={140}
                className="hover:scale-110 transition-transform mb-2"
              />
              <span className="text-sm font-medium">Misiones</span>
            </div>
          </Link>

          <Link href="/goals">
            <div className="cursor-pointer flex flex-col items-center">
              <Image
                src="/granja.svg"
                alt="Granja"
                width={140}
                height={140}
                className="hover:scale-110 transition-transform mb-2"
              />
              <span className="text-sm font-medium">Granja</span>
            </div>
          </Link>

          <Link href="/expenses">
            <div className="cursor-pointer flex flex-col items-center">
              <Image
                src="/gastos.svg"
                alt="Gastos"
                width={140}
                height={140}
                className="hover:scale-110 transition-transform mb-2"
              />
              <span className="text-sm font-medium">Gastos</span>
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
