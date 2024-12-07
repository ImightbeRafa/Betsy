// src/app/components/UserMenu.tsx
'use client'

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/app/components/ui/button"

export function UserMenu() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className="flex items-center gap-4">
      <span>{session.user?.email}</span>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  )
}