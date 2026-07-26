import type { Metadata } from 'next'
import { Cinzel, Lora } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Englewood Masonic Lodge No. 360',
  description: 'Englewood Masonic Lodge No. 360, Free & Accepted Masons — Englewood, Florida. Brotherhood, Relief, and Truth.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable}`}>
      <body>
        <Nav />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
