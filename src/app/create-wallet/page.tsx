'use client'
import React, { useState } from 'react'
import CreatePassword from '@/components/wallet-creation/CreatePassword'
import GeneratePhrase from '@/components/wallet-creation/GeneratePhrase'
const TOTAL_STAGES = 2
const CreateWallet = () => {
    const [step, setStep] = useState(1)
    return (
        <div className='w-full h-full'>
            {step === 1 && <CreatePassword setStep={setStep} />}
            {step === 2 && <GeneratePhrase />}
        </div>
    )
}

export default CreateWallet
