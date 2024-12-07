// src/app/api/protected/route.ts
import { getCurrentUser } from "@/lib/auth-utils"
import { NextResponse } from "next/server"

export async function GET() {
  const user = await getCurrentUser()
  
  if (!user) {
    return new NextResponse(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401 }
    )
  }
  
  // Your protected API logic here
  return NextResponse.json({ message: "Protected data" })
}