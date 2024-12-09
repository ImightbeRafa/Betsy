"use client";
import React from 'react';
import SalesForm from '@/app/ventas/components/SalesForm';
import { SalesDashboard } from '@/app/ventas/components/SalesDashboard';
import DailyStats from '@/app/ventas/components/DailyStats';

export default function VentasPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sales Form Section */}
        <div className="lg:w-1/2">
          <SalesForm />
        </div>
        
        {/* Dashboard Section */}
        <div className="lg:w-1/2 space-y-6">
          <div className="w-full">
            <DailyStats />
          </div>
          <div className="w-full">
            <SalesDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}