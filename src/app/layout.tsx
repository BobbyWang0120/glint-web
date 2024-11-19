import './globals.css'
import { NextAuthProvider } from '@/providers/NextAuthProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Analytics } from "@vercel/analytics/react"
import { JobProvider } from '@/contexts/JobContext'

export const metadata = {
  title: 'Glint - Job Board Platform',
  description: 'Connecting companies with talent',
}

export const unstable_settings = {
  disableScrollRestoration: true,
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
            <JobProvider>
              {children}
              <Analytics />
            </JobProvider>
          </LanguageProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
} 