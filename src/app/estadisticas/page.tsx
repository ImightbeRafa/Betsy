import EstadisticasLogic from "./components/estadisticas";
import HomeButton from "@/app/components/ui/HomeButtom";

export default function EstadisticasPage() {
  return (
    <div className="container mx-auto p-4">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <HomeButton />
        </div>
      </nav>
      <h1 className="text-2xl font-bold mb-4">Estadísticas Mieo</h1>
      <EstadisticasLogic />
    </div>
  );
}