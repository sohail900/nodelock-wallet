import { Button } from '@/components/ui/button'
import { EyeOff } from 'lucide-react'
import { redirect } from 'next/navigation'

const GeneratePhrase = ({ mnemonics }: { mnemonics: string }) => {
    return (
        <>
            <h1 className='text-center text-2xl font-semibold'>
                Secret Recovery Phrase
            </h1>
            <p className='mt-2 text-base text-center text-[#FFDC62]'>
                This phrase is the ONLY way to recover your wallet. Do NOT share
                it with anyone!
            </p>
            <div className='mb-6 mt-6 group relative '>
                <div className='z-30 absolute w-full h-full grid place-items-center transition-all duration-100 ease-in-out group-hover:hidden'>
                    <EyeOff size={30} className='' />
                </div>
                <div className='grid grid-cols-3 gap-2 transition-all duration-100 ease-in-out blur-sm group-hover:blur-none'>
                    {mnemonics.split(' ').map((elem, index) => {
                        return (
                            <div
                                className='text-white text-center gap-1 rounded-lg bg-secondary py-2 w-full px-2 '
                                key={index}
                            >
                                <p>
                                    <span>{index + 1}.</span> {elem}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Button
                className='w-full mb-2 py-5 font-medium rounded-lg text-bg-color'
                onClick={() => redirect('/unlock')}
            >
                Get Started
            </Button>
        </>
    )
}

export default GeneratePhrase
