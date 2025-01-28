import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Welcome to Nodelock Wallet Dashboard',
    description: 'Nodelock Wallet Dashboard',
}

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <main>{children}</main>
}
