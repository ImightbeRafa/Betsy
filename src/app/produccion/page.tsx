import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import ProductionContent from './production-content';

// Server Component
export default async function ProductionPage() {  // Changed function name and added export default
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return <ProductionContent />;
}