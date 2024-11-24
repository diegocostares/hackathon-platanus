"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllowance } from "@/api/getAllowance";

export default function BtnGastos() {
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAllowance() {
      try {
        const data = await getAllowance();
        setAmount(data.amount);
      } catch (error) {
        console.error("Failed to fetch allowance", error);
      }
    }
    fetchAllowance();
  }, []);

  return (
    <Card className="px-16 py-2">
      <div className="flex items-center gap-2">
        <Image src="/billetera.svg" alt="Monedas" width={60} height={60} />
        <div className="flex flex-col">
          <span className="text-lg text-gray-600">Gastos</span>
          <span className="font-bold text-xl">
            {amount !== null ? (
              `$${amount}`
            ) : (
              <span className="invisible">$0</span>
            )}
          </span>
        </div>
      </div>
    </Card>
  );
}
