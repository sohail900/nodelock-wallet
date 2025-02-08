import React, { MouseEventHandler } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'

const SidebarAccounts = ({
    index,
    onClick,
    currentAccount,
}: {
    index: number
    currentAccount: number
    onClick: MouseEventHandler<HTMLSpanElement>
}) => {
    return (
        <div className='flex items-center gap-1 flex-col w-full cursor-pointer relative'>
            <Avatar
                className={`h-12 w-full text-base cursor-pointer border ${
                    currentAccount === index
                        ? 'border-white'
                        : 'border-transparent'
                }`}
                onClick={onClick}
            >
                <AvatarFallback className='bg-bg-color'>
                    A{index + 1}
                </AvatarFallback>
            </Avatar>
            <p className='text-[0.6rem] text-center'>Account {index + 1}</p>
        </div>
    )
}

export default SidebarAccounts
