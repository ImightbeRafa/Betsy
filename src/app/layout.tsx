import '@/app/components/globals.css' 
import { getServerSession } from "next-auth/next"
import SessionProvider from "./components/Sessionprovider"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}