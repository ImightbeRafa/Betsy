// src/app/ventas/page.tsx
"use client";
import SalesForm from './components/SalesForm';
import RecentSales from '../components/RecentSales';
import { Home } from 'lucide-react'; // Import Home icon
import { useRouter } from 'next/navigation'; // Import useRouter

export default function VentasPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen">
      {/* Home Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 p-2 flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
      >
        <Home size={20} />
        <span>Inicio</span>
      </button>

      {/* Main Content */}
      <div className="flex gap-6 p-6 pt-16">
        <div className="flex-1">
          <SalesForm />
        </div>
        <div className="w-80">
          <RecentSales />
        </div>
      </div>
    </div>
  );
}