// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// This function will be executed for all routes except those excluded by the matcher
export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
)

export const config = {
  matcher: [
    // Protected routes that require authentication
    '/ventas/:path*',
    '/produccion/:path*',
    '/estadisticas/:path*',
    '/home/:path*',
    '/home',
    // Exclude authentication-related paths
    '/((?!auth|api/auth|_next/static|_next/image|favicon.ico|google.svg).*)',
  ]
}