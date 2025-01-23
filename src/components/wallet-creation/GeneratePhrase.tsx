import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

const staticPhrase = [
    'only',
    'reward',
    'apple',
    'mango',
    'tomato',
    'hero',
    'banana',
    'monkey',
    'lion',
    'zebra',
    'ice',
    'mountain',
]
const GeneratePhrase = () => {
    return (
        <>
            <ChevronLeft
                className='text-white/60 absolute left-5 cursor-pointer'
                size={25}
            />
            <h1 className='text-center text-2xl font-semibold'>
                Secret Recovery Phrase
            </h1>
            <p className='mt-2 text-base text-center text-[#FFDC62]'>
                This phrase is the ONLY way to recover your wallet. Do NOT share
                it with anyone!
            </p>
            <div className='mb-4 grid grid-cols-3 gap-2 mt-6'>
                {staticPhrase.map((elem, index) => {
                    return (
                        <div
                            className='text-white text-center gap-1 rounded-lg bg-secondary py-2 w-full px-2 '
                            key={index}
                        >
                            <p>{elem}</p>
                        </div>
                    )
                })}
            </div>
            <Button className='w-full mb-2 py-5 font-medium rounded-lg text-bg-color'>
                Continue
            </Button>
        </>
    )
}

export default GeneratePhrase
