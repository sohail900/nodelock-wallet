import Header from '@/components/dashboard/Header'
import React from 'react'

const Dashboard = () => {
    return (
        <div className='w-[60%] mx-auto'>
            <h1 className='py-10 text-center text-2xl font-medium'>
                Nodelock Wallet
            </h1>
            <div className='rounded-3xl border border-gray-500/20 overflow-hidden'>
                <Header />
            </div>
        </div>
    )
}

export default Dashboard
