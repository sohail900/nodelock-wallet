import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export const metadata: Metadata = {
    title: 'Welcome to Nodelock Wallet',
    description: 'Nodelock wallet',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' className='bg-bg-color text-white'>
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    )
}
