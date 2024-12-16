'use client';

import { useState } from 'react';
import BackupPage from './BackupPage';
import { ProductionDashboard } from './ProduccionDashboard';
import HomeButton from '@/app/components/ui/HomeButtom';

export function ProductionPageClient() {
  const [isGuiaGeneratorOpen, setIsGuiaGeneratorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <HomeButton />
        </div>
      </nav>
      
      <main className="container mx-auto py-6 space-y-8">
        <ProductionDashboard 
          onGenerateGuias={() => setIsGuiaGeneratorOpen(true)}
          isGuiaGeneratorOpen={isGuiaGeneratorOpen}
          onGuiaGeneratorClose={() => setIsGuiaGeneratorOpen(false)}
        />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
        </div>
        
        <BackupPage />
      </main>
      
      <div className="h-16" />
    </div>
  );
}