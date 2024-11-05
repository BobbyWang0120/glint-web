import './globals.css'
import { NextAuthProvider } from '@/providers/NextAuthProvider'

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
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
} 