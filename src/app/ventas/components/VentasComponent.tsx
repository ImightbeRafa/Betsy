'use client';

import React from 'react';
import HomeButton from '@/app/components/ui/HomeButtom';
import SalesForm from '@/app/ventas/components/SalesForm';
import { SalesDashboard } from '@/app/ventas/components/SalesDashboard';
import DailyStats from '@/app/ventas/components/DailyStats';

export default function VentasContent() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <HomeButton />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="lg:w-1/2">
            <div className="sticky top-6">
              <SalesForm />
            </div>
          </section>
          
          <section className="lg:w-1/2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <DailyStats />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm">
              <SalesDashboard />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}