import './globals.css'
import { NextAuthProvider } from '@/providers/NextAuthProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Glint - Job Board Platform',
  description: 'Connecting companies with talent',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <LanguageProvider>
            {children}
            <Analytics />
          </LanguageProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
} 