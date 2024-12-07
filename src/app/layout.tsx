import './globals.css'
import { AuthProvider } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}