import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


export default async function Page() {
  
  // If we have a session, redirect to home
  return redirect('/home');
}