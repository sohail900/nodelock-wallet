'use client'
import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AlignJustify, ArrowDown } from 'lucide-react'
import { useToggleSidebar } from '@/hooks/useToggleSidebar'
const Header = () => {
    const { openSidebar } = useToggleSidebar()
    return (
        <div className='w-full  py-4 px-6 relative grid place-items-center bg-secondary'>
            <AlignJustify
                size={23}
                className='absolute left-6 cursor-pointer'
                onClick={() => openSidebar()}
            />
            <div className='flex items-center gap-2 rounded-xl py-2 px-4 bg-bg-color cursor-pointer'>
                <Avatar className='h-6 w-6 text-black text-sm'>
                    <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <p className='text-sm'>Account 1</p>
                <ArrowDown size={15} className='' />
            </div>
        </div>
    )
}

export default Header
