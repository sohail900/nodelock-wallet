import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AlignJustify, ArrowDown } from 'lucide-react'
const Header = () => {
    return (
        <div className='w-full py-4 px-6 relative grid place-items-center bg-secondary'>
            <AlignJustify size={23} className='absolute left-6' />
            <div className='flex items-center gap-2'>
                <Avatar className='h-8 w-8 text-black'>
                    <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                Account 1
                <ArrowDown />
            </div>
        </div>
    )
}

export default Header
