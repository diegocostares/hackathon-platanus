import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function GeneralNavbar() {
  return (
    <header className="w-full">
      <CardContent className="flex justify-between items-center py-4 px-6 max-w-4xl mx-auto">
        <Link href="/dragon">
          <Card className="px-4 py-2 cursor-pointer">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={60} height={60} />
              <span className="font-bold">Volver</span>
            </div>
          </Card>
        </Link>

        <Card className="px-4 py-2">
          <div className="flex items-center gap-2">
            <Image src="/money.svg" alt="Monedas" width={60} height={60} />
            <span className="font-bold text-xl">$1000</span>
          </div>
        </Card>
      </CardContent>
    </header>
  );
}
