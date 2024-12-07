import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { DefaultSession } from "next-auth";

// Extend the session and JWT types to include `role`.
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}


// Validate environment variables
if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
  throw new Error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable");
}

if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_SECRET environment variable");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET environment variable");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days max
  },
  callbacks: {
    // Attach user role info to the JWT token upon login
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role; // Assign the role to the token
      }
      return token;
    },
    async session({ session, token }) {
      // Pass JWT data into the NextAuth session
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure safe redirects
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  debug: process.env.NODE_ENV === "development",
};
