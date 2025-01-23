import React, { Dispatch } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
const CreatePassword: React.FC<{ setStep: Dispatch<number> }> = ({
    setStep,
}) => {
    return (
        <>
            <ChevronLeft
                className='text-white/60 absolute left-5 cursor-pointer'
                size={25}
            />
            <h1 className='text-center text-2xl font-semibold'>
                Create a password
            </h1>
            <p className='mt-1 text-base text-light-gray text-center'>
                You will use this to unlock your wallet.
            </p>

            <Input
                type='password'
                placeholder='Password'
                className='mt-8 py-6 rounded-lg border-none bg-secondary text-white'
            />
            <Input
                type='password'
                placeholder='Confirm password'
                className='py-6 mt-2 mb-6 rounded-lg border-none bg-secondary text-white'
            />
            <Button
                onClick={() => setStep(2)}
                className='w-full mb-2 py-5 font-medium rounded-lg text-bg-color'
            >
                Continue
            </Button>
        </>
    )
}

export default CreatePassword
