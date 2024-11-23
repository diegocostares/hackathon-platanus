import Image from "next/image";

interface TreasureDisplayProps {
  amount: number;
}

export default function TreasureDisplay({ amount }: TreasureDisplayProps) {
  return (
    <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center">
      <Image
        src="/coin.png"
        alt="Treasure coin"
        width={24}
        height={24}
        className="mr-2"
      />
      {amount.toLocaleString()} Gold
    </div>
  );
}
