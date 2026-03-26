import type { Metadata } from 'next'
import { Geist, Golos_Text } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
})

const golosText = Golos_Text({
  variable: '--font-golos',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'Финал олимпиады PROD',
  description: 'Проект победителей',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${golosText.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
