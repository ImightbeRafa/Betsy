import type { Metadata } from 'next'
import { Inter } from 'next/font/google'  // Optional: for custom font
import './globals.css'  // This is the important line!

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Betsy CRM',
  description: 'Sistema de ventas para Betsy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}