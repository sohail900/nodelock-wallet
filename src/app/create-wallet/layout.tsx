import { Inter } from 'next/font/google'

import type { Metadata } from 'next'
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export const metadata: Metadata = {
    title: 'Wallet Creation',
    description: 'Create wallet',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' className='bg-bg-color text-white'>
            <body className={`${inter.className} antialiased`}>
                <section className='w-screen h-screen grid place-items-center'>
                    <div className='w-[30%] rounded-3xl py-8 px-6 border border-gray-500/20 relative'>
                        {children}
                    </div>
                </section>
            </body>
        </html>
    )
}
