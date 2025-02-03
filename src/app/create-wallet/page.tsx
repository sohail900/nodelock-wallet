'use client'
import React, { useState } from 'react'
import CreatePassword from '@/components/wallet-creation/CreatePassword'
import GeneratePhrase from '@/components/wallet-creation/GeneratePhrase'
import { WalletService } from '@/lib/wallet'

const CreateWallet = () => {
    const [step, setStep] = useState(1)
    const [mnemonic, setMnemonic] = useState('')
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })

    // generate mnemonic and stored encrypted mnemonic in localStorage
    async function generateMnemonic() {
        const walletInstance = WalletService.getInstance()
        const newMnemonics = walletInstance.generateMnemonic()
        // encrypt seeds
        const encryptedSeeds = await walletInstance.encryptMnemonic(
            newMnemonics,
            formData.password
        )
        setMnemonic(newMnemonics)
        localStorage.setItem('encryptedSeeds', encryptedSeeds)
        setStep(2)
    }
    return (
        <section className='w-screen h-screen grid place-items-center'>
            <div className='w-[30%] rounded-3xl py-8 px-6 border border-gray-500/20 relative'>
                <div className='w-full h-full'>
                    {step === 1 && (
                        <CreatePassword
                            formData={formData}
                            setFormData={setFormData}
                            generateMnemonic={generateMnemonic}
                        />
                    )}
                    {step === 2 && <GeneratePhrase mnemonics={mnemonic} />}
                </div>
            </div>
        </section>
    )
}

export default CreateWallet
