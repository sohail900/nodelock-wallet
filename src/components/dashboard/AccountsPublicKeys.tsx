'use client'
import React, { useState } from 'react'
import { SolanaIcon, EtheriumIcon } from '@/icons'
import { Copy } from 'lucide-react'
import { WalletService } from '@/lib/wallet'
import { useCurrentAccount } from '@/hooks/useCurrentAccount'

const KEY = localStorage.getItem('key')
const ENCRYPTED_SEEDS = localStorage.getItem('encryptedSeeds')

const AccountsPublicKeys = () => {
    const [solKeyCopied, setSolKeyCopied] = useState(false)
    const [ethKeyCopied, setEthKeyCopied] = useState(false)
    const { currentAccount } = useCurrentAccount()

    const walletInstance = WalletService.getInstance()

    // solana wallet
    const { publicKey } = walletInstance.getSolanaWallet({
        accountIndex: currentAccount,
        key: KEY as string,
        encryptedSeeds: ENCRYPTED_SEEDS as string,
    })
    // ethers wallet
    const { address } = walletInstance.getEthersWallet({
        accountIndex: currentAccount,
        key: KEY as string,
        encryptedSeeds: ENCRYPTED_SEEDS as string,
    })

    const ETHERIUM_PUBLIC_KEY = address
    const SOLANA_PUBLIC_KEY = publicKey

    // COPY SOL KEY
    const copySolKey = async (key: string) => {
        try {
            await navigator.clipboard.writeText(key)
            setSolKeyCopied(true)
            setTimeout(() => {
                setSolKeyCopied(false)
            }, 3000)
        } catch (err) {
            console.error('Failed to copy!', err)
        }
    }
    // COPY ETH KEY
    const copyEthKey = async (key: string) => {
        try {
            await navigator.clipboard.writeText(key)
            setEthKeyCopied(true)
            setTimeout(() => {
                setEthKeyCopied(false)
            }, 3000)
        } catch (err) {
            console.error('Failed to copy!', err)
        }
    }

    return (
        <>
            {/*  solana */}
            <div className='w-full flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <div className='size-6 rounded-lg bg-white grid place-items-center'>
                        <SolanaIcon size={16} />
                    </div>
                    <p className='text-sm font-medium'>Solana</p>
                </div>
                {solKeyCopied ? (
                    <p className='text-sm text-green-700'>Copied</p>
                ) : (
                    <p className='text-sm text-gray-500 flex items-center gap-1'>
                        {SOLANA_PUBLIC_KEY.slice(0, 4)}....
                        {SOLANA_PUBLIC_KEY.slice(-6)}
                        <Copy
                            size={15}
                            onClick={() => copySolKey(SOLANA_PUBLIC_KEY)}
                            className='cursor-pointer'
                        />
                    </p>
                )}
            </div>
            {/*  etherium */}
            <div className='w-full flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <div className='size-6 rounded-lg bg-white grid place-items-center'>
                        <EtheriumIcon size={20} />
                    </div>
                    <h1 className='text-sm font-medium'>Etherium</h1>
                </div>
                {ethKeyCopied ? (
                    <p className='text-sm text-green-700'>Copied</p>
                ) : (
                    <p className='text-sm text-gray-500 flex items-center gap-1'>
                        {ETHERIUM_PUBLIC_KEY.slice(0, 6)}....
                        {ETHERIUM_PUBLIC_KEY.slice(-6)}
                        <Copy
                            size={15}
                            onClick={() => copyEthKey(ETHERIUM_PUBLIC_KEY)}
                            className='cursor-pointer'
                        />
                    </p>
                )}
            </div>
        </>
    )
}

export default AccountsPublicKeys
