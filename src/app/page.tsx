import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  // If there's no session, redirect to sign in
  if (!session) {
    redirect('/auth/signin');
  }
  
  // If we have a session, redirect to home
  return redirect('/home');
}