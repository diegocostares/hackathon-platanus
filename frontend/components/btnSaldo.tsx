import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function BtnSaldo() {
  return (
    <Card className="px-4 py-2">
      <div className="flex items-center gap-2">
        <Image src="/money.svg" alt="Monedas" width={60} height={60} />
        <div className="flex flex-col">
          <span className="text-lg text-gray-600">Saldo</span>
          <span className="font-bold text-xl">$1000</span>
        </div>
      </div>
    </Card>
  );
}
