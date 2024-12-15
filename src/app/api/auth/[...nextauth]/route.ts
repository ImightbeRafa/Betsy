// /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"

const ALLOWED_EMAIL = "whatasheetcr@gmail.com"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user }) {
      return user.email === ALLOWED_EMAIL
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      else if (new URL(url).origin === baseUrl) {
        return url
      }
      return baseUrl
    },
    async session({ session, token }) {
      if (session.user?.email !== ALLOWED_EMAIL) {
        throw new Error("Unauthorized")
      }
      return {
        ...session,
        accessToken: token.accessToken,
      }
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
        }
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }