import DashboardHome from '@/components/dashboard/DashboardHome'
import Header from '@/layouts/Header'
import Sidebar from '@/layouts/Sidebar'

import React from 'react'

const Dashboard = () => {
    return (
        <div className='w-[60%] h-[100vh] mx-auto border border-gray-500/20 overflow-hidden relative'>
            <Sidebar />
            <Header />
            <DashboardHome />
        </div>
    )
}

export default Dashboard
