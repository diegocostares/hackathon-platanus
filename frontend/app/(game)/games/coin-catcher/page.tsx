import CoinCatcherGame from "./_component/CoinCatcherGame";

export default function CoinCatcherPage() {
  return (
    <div className="min-h-screen bg-radial-sky p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Atrapa Monedas</h1>
      <CoinCatcherGame />
    </div>
  );
}
