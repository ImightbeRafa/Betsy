"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import SalesForm from '@/app/ventas/components/SalesForm';
import { SalesDashboard } from '@/app/ventas/components/SalesDashboard';
import DailyStats from '@/app/ventas/components/DailyStats';

export default function VentasPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => router.push('/home')}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg 
                     bg-blue-500 text-white hover:bg-blue-600 
                     transition-all duration-200 ease-in-out
                     hover:shadow-md active:transform active:scale-95"
          >
            <Home 
              className="transition-transform group-hover:-translate-x-1" 
              size={20} 
            />
            <span className="font-medium">Inicio</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sales Form Column */}
          <section className="lg:w-1/2">
            <div className="sticky top-6">
              <SalesForm />
            </div>
          </section>
          
          {/* Dashboard Column */}
          <section className="lg:w-1/2 space-y-6">
            {/* Stats Panel */}
            <div className="bg-white rounded-lg shadow-sm">
              <DailyStats />
            </div>
            
            {/* Sales Dashboard Panel */}
            <div className="bg-white rounded-lg shadow-sm">
              <SalesDashboard />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}