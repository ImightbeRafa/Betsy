// src/app/produccion/page.tsx
"use client";
import { useRouter } from 'next/navigation';
import { Home, Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function ProductionPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Home Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 p-2 flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
      >
        <Home size={20} />
        <span>Inicio</span>
      </button>

      {/* Work in Progress Content */}
      <div className="flex items-center justify-center h-screen p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Construction className="h-6 w-6" />
              En Desarrollo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Esta sección está actualmente en desarrollo. Pronto tendremos nuevas funcionalidades disponibles.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}