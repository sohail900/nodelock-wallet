import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Suspense } from 'react'
import Loading from '@/components/ui/loading'

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
            <body className={`${inter.className} antialiased`}>
                <Suspense fallback={<Loading />}>{children}</Suspense>
                <Toaster />
            </body>
        </html>
    )
}
