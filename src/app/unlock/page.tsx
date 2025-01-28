'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { WalletService } from '@/lib/wallet'
import { toast } from '@/hooks/use-toast'

const UnlockWallet = () => {
    const [password, setPassword] = useState('')
    // TODO: Decrypt seeds with password
    const onClickHandler = async () => {
        if (!password) return
        const encryptSeed = localStorage.getItem('encryptedSeeds')
        const walletInstance = WalletService.getInstance()
        try {
            const decryptSeed = await walletInstance.decryptMnemonic(
                encryptSeed as string,
                password
            )
            console.log(decryptSeed)
            toast({
                title: "You've successfully unlocked your wallet",
            })
        } catch (e) {
            if (e instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: e.message,
                })
            }
            console.log(e)
        }
    }
    return (
        <section className='w-screen h-screen grid place-items-center'>
            <div className='w-[30%] rounded-3xl py-8 px-6 border border-gray-500/20 relative'>
                <h1 className='text-center text-2xl font-semibold'>
                    Unlock Wallet
                </h1>
                <p className='mt-1 text-base text-light-gray text-center'>
                    Enter your password to unlock your wallet.
                </p>
                <Input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='mt-8 mb-6 py-6 rounded-lg border-none bg-secondary text-white'
                />
                <Button
                    className='w-full py-5 font-medium rounded-lg text-bg-color disabled:bg-secondary disabled:text-white/70'
                    onClick={onClickHandler}
                >
                    Unlock Wallet
                </Button>
            </div>
        </section>
    )
}

export default UnlockWallet
