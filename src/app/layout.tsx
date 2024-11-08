import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Providers from '../components/provider'

export const metadata: Metadata = {
  title: 'Bookly',
  description: 'Bookly',
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-background-100`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
