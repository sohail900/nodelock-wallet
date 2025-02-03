import React from 'react'
import DashboardHome from '@/components/dashboard/DashboardHome'
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'

const Dashboard = () => {
    return (
        <div className='w-[60%] h-[100vh] mx-auto border border-gray-500/20 overflow-hidden relative'>
            <Header />
            <Sidebar />
            <DashboardHome />
        </div>
    )
}

export default Dashboard
