import { Button } from '@/components/ui/button'

import GeneratePhrase from '@/components/wallet-creation/GeneratePhrase'
import React from 'react'

export default function Home() {
    return (
        <section className='w-screen h-screen grid place-items-center'>
            <div className='w-[30%] rounded-3xl py-8 px-6 border border-gray-500/20 relative'>
                <h1 className='text-center text-2xl font-semibold'>
                    Welcome to NodeLock
                </h1>
                <p className='mt-1 text-base text-light-gray text-center'>
                    Let's get started.
                </p>
                <hr className='mx-auto my-8 border-none outline-none w-[0.2px] h-[70px] bg-gray-500/10' />
                <div className='mx-auto w-[85%]'>
                    <Button className='w-full mb-2 py-5 font-medium rounded-lg text-bg-color'>
                        Create a new wallet
                    </Button>
                    <Button className='w-full rounded-lg bg-light-gray py-5 font-medium text-white bg-secondary'>
                        Import Wallet
                    </Button>
                </div>
            </div>
        </section>
    )
}
