import DinosaurGame from "./_component/DinosaurGame";

export default function DinosaurGamePage() {
  return (
    <div className="min-h-screen bg-sky-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Dinosaurio Runner</h1>
      <DinosaurGame />
    </div>
  );
}
