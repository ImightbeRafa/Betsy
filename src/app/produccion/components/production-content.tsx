// Client Component
'use client';
import HomeButton from '@/app/components/ui/HomeButtom';
import { Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

function ProductionContent() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Home Button */}
      <div className="absolute top-4 left-4">
        <HomeButton />
      </div>

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

export default ProductionContent;