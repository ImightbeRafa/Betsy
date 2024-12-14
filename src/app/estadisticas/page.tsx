import EstadisticasLogic from "./components/estadisticas";

export default function EstadisticasPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Estadísticas Mieo</h1>
      <EstadisticasLogic />
    </div>
  );
}