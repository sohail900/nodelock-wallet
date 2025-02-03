'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AlignJustify, ArrowDown } from 'lucide-react'
import { useToggleSidebar } from '@/hooks/useToggleSidebar'
import AccountsPublicKeys from '@/components/dashboard/AccountsPublicKeys'
const Header = () => {
    const [toggleAccountKeys, setToggleAccountKeys] = useState(false)
    const { openSidebar } = useToggleSidebar()

    // hide when mouse leave

    return (
        <div className='w-full py-4 px-6 relative grid place-items-center bg-secondary'>
            <AlignJustify
                size={23}
                className='absolute left-6 cursor-pointer'
                onClick={() => openSidebar()}
            />
            <div
                className='flex items-center gap-2 rounded-xl py-2 px-4 bg-bg-color cursor-pointer z-30 border border-transparent  hover:border-blue-600'
                onMouseEnter={() => setToggleAccountKeys(true)}
                onMouseLeave={() => setToggleAccountKeys(false)}
            >
                <Avatar className='h-6 w-6 text-black text-sm'>
                    <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <p className='text-sm'>Account 1</p>
                <ArrowDown size={15} className='' />
            </div>
            <div
                className={`w-[280px] h-auto py-3 px-3 absolute ${
                    toggleAccountKeys ? 'top-16' : '-top-[500px]'
                }  left-1/2 -translate-x-1/2  rounded-xl bg-black  flex flex-col gap-2 transition-all duration-200 ease-in-out -z-0 `}
                onMouseEnter={() => setToggleAccountKeys(true)}
                onMouseLeave={() => setToggleAccountKeys(false)}
            >
                <AccountsPublicKeys />
            </div>
        </div>
    )
}

export default Header
