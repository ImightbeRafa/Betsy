import { ProductionDashboard } from './components/ProduccionDashboard';
import  HomeButton  from '@/app/components/ui/HomeButtom';

export default function ProductionPage() {
  return (
    <>
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <HomeButton />
        </div>
      </nav>
      <div className="min-h-screen bg-gray-50">
        <ProductionDashboard />
      </div>
    </>
  );
}