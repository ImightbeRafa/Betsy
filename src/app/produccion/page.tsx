import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import BackupPage from '../produccion/components/BackupPage';
import { ProductionDashboard } from './components/ProduccionDashboard';
import HomeButton from '@/app/components/ui/HomeButtom';

export default async function ProductionPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <HomeButton />
        </div>
      </nav>
      
      <main className="container mx-auto py-6 space-y-8">
        <ProductionDashboard />
        
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
        </div>
        
        <BackupPage />
      </main>
      
      {/* Add some bottom padding */}
      <div className="h-16" />
    </div>
  );
}