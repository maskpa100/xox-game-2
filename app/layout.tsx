import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Крестики-нолики',
  description: 'Играйте в крестики-нолики и выигрывайте промокоды!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}

