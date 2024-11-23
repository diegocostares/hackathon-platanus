// app/parent-dashboard/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ParentDashboard() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Padres</h1>
      <p className="text-center mb-8">
        Aquí podrás administrar las metas de ahorro y revisar el progreso de tu
        hijo.
      </p>
      <Link href="/">
        <Button size="lg">Volver al Inicio</Button>
      </Link>
    </div>
  );
}
