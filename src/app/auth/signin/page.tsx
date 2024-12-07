// src/app/auth/signin/page.tsx
'use client'

import { useSession, signIn } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card"

export default function SignInPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const callbackUrl = searchParams.get('callbackUrl') || '/home'

  useEffect(() => {
    if (session && !isRedirecting) {
      setIsRedirecting(true)
      router.push(callbackUrl)
    }
  }, [session, router, callbackUrl, isRedirecting])

  if (status === 'loading' || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Betsy CRM
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Please sign in to continue
            </p>
            <Button
              className="w-full"
              onClick={() => signIn('google', { callbackUrl })}
            >
              Sign in with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}