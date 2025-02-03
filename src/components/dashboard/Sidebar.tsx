'use client'
import { useToggleSidebar } from '@/hooks/useToggleSidebar'
import { ArrowLeft, Pencil, Plus, Settings2 } from 'lucide-react'
import React from 'react'
import SidebarAccounts from '@/components/dashboard/SidebarAccounts'

let ACCOUNTS = 1 // default-account is (1)

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useToggleSidebar()
    const handleAddAccounts = () => {
        ACCOUNTS++
        localStorage.setItem('total-accounts', `${ACCOUNTS}`)
    }
    return (
        <div
            className={`w-16 bg-black h-[96vh] absolute top-3 rounded-2xl transition-all duration-100 ease-in-out ${
                isSidebarOpen ? 'left-2' : '-left-full'
            } z-50 px-2`}
        >
            <div className='h-full flex items-center justify-between flex-col py-3'>
                <div className='flex flex-col gap-2 overflow-y-auto'>
                    <div
                        className='w-9 h-9 mx-auto  grid place-items-center rounded-xl transition-all duration-100 ease-in-out hover:bg-white hover:text-black cursor-pointer mb-4'
                        onClick={() => closeSidebar()}
                    >
                        <ArrowLeft size={21} />
                    </div>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <SidebarAccounts key={i} index={i} />
                    ))}
                </div>
                <div className='w-full'>
                    <hr className='mb-3 border-none outline-none w-full h-[1px] bg-white/20' />
                    <div
                        className='w-9 h-9 mx-auto grid place-items-center rounded-xl transition-all duration-100 ease-in-out hover:bg-white hover:text-black cursor-pointer mb-1'
                        onClick={handleAddAccounts}
                    >
                        <Plus size={21} />
                    </div>
                    <div className='w-9 h-9 mx-auto grid place-items-center rounded-xl transition-all duration-100 ease-in-out hover:bg-white hover:text-black cursor-pointer mb-1'>
                        <Pencil size={21} />
                    </div>
                    <div className='w-9 h-9 mx-auto grid place-items-center rounded-xl transition-all duration-100 ease-in-out hover:bg-white hover:text-black cursor-pointer '>
                        <Settings2 size={21} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
