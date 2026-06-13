import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Tektur, Exo_2 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StoreProvider } from '@/lib/store'
import { AccountGate } from '@/components/account-gate'
import { ItemToaster } from '@/components/item-toast'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const tektur = Tektur({ subsets: ["latin", "cyrillic"], variable: "--font-tektur" });
const exo2 = Exo_2({ subsets: ["latin", "cyrillic"], variable: "--font-exo2" });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  interactiveWidget: 'resizes-content',
}

export const metadata: Metadata = {
  title: 'UPGRADER — Апгрейд CS2 скинов',
  description: 'Улучшайте свои CS2 предметы. Войдите через Steam и прокачивайте скины.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" href="/sounds/openCompensationCase.mp3" as="audio" type="audio/mpeg" />
      </head>
      <body className={`font-tektur antialiased ${tektur.variable} ${exo2.variable} bg-[#17181C] bg-[url('/assets/bg-PEFHGDDX.webp')] bg-cover bg-no-repeat bg-center overflow-x-hidden`}>
        <StoreProvider>
          <AccountGate>
            {children}
          </AccountGate>
        </StoreProvider>
        <ItemToaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
