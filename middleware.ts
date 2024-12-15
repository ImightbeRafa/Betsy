// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// This function will be executed for all routes except those excluded by the matcher
export default withAuth(
  function middleware(req) {
    // If the user is not authenticated, they will be redirected to the signin page
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
    /*
     * Match all request paths except:
     * - auth (authentication pages)
     * - api/auth (authentication API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - home (public home page)
     * - google.svg (auth button image)
     */
    '/ventas/:path*',
    '/produccion/:path*',
    '/estadisticas/:path*',
    '/api/:path*',
    '/((?!api/auth|auth|_next/static|_next/image|favicon.ico|home|google.svg).*)',
  ],
}