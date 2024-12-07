// src/app/auth/error/page.tsx
'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { useRouter } from "next/navigation"

export default function AuthError() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-600">
            Authentication Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              There was a problem signing you in. Please try again.
            </p>
            <Button
              className="w-full"
              onClick={() => router.push('/auth/signin')}
            >
              Return to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}