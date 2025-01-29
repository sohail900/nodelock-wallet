import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'

const Accounts = ({ index }: { index: number }) => {
    return (
        <div className='flex items-center gap-1 flex-col w-full cursor-pointer'>
            <Avatar className='h-12 w-full  text-base '>
                <AvatarFallback className='bg-bg-color'>
                    A{index + 1}
                </AvatarFallback>
            </Avatar>
            <p className='text-[0.6rem]'>Account {index + 1}</p>
        </div>
    )
}

export default Accounts
